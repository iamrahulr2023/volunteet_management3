
from fastapi import FastAPI, WebSocket, Query, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
import cv2
import base64
import numpy as np
import asyncio
from starlette.websockets import WebSocketDisconnect
import face_recognition
import pickle
import logging
from pymongo import MongoClient
from bson.binary import Binary
import urllib.parse
import time
from datetime import datetime
import pytz  # Add pytz for local time zone handling
import mediapipe as mp
import uvicorn
import threading
import os

# Suppress TensorFlow warnings
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create two FastAPI apps
app_entry = FastAPI(title="Entry Camera")
app_exit = FastAPI(title="Exit Camera")

# MongoDB setup
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
db = client["ai_monitoring_system"]
face_collection = db["face_encodings"]

# Initialize Mediapipe Face Detection
mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.3)

# Face persistence for attendance
FACE_PERSISTENCE_SECONDS = 1.0

# Helper function to format seconds into HH:MM:SS
def format_seconds(seconds):
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

# Embedded HTML content
def get_html_content(camera_type):
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>AI Monitoring System - {camera_type} Camera</title>
    </head>
    <body>
        <h1>AI Monitoring System - {camera_type} Camera</h1>
        <form id="registerForm">
            <label>Name:</label>
            <input type="text" id="name" required>
            <button type="submit">Register Face</button>
        </form>
        <div>
            <h2>Video Stream</h2>
            <button onclick="startVideo()">Start Video</button>
            <img id="videoFeed" src="" alt="Video Stream">
            <p id="warnings"></p>
            <p id="totalTime">Total time today: Not available</p>
        </div>
        <script>
            document.getElementById("registerForm").addEventListener("submit", async (e) => {{
                e.preventDefault();
                const name = document.getElementById("name").value;
                try {{
                    const response = await fetch(`/register_face?name=${{encodeURIComponent(name)}}`, {{
                        method: "POST"
                    }});
                    const result = await response.json();
                    alert(result.message || result.detail);
                }} catch (error) {{
                    alert("Error: " + error.message);
                }}
            }});
            function startVideo() {{
                const ws = new WebSocket(`ws://${{window.location.hostname}}:${{window.location.port}}/video`);
                const videoFeed = document.getElementById("videoFeed");
                const warnings = document.getElementById("warnings");
                const totalTime = document.getElementById("totalTime");
                ws.onmessage = (event) => {{
                    const data = JSON.parse(event.data);
                    if (data.image) {{
                        videoFeed.src = `data:image/jpeg;base64,${{data.image}}`;
                    }}
                    if (data.warnings && data.warnings.length > 0) {{
                        warnings.innerHTML = data.warnings.join("<br>");
                    }} else if (data.warning) {{
                        warnings.innerHTML = data.warning;
                    }} else {{
                        warnings.innerHTML = "";
                    }}
                    if (data.total_time) {{
                        totalTime.innerHTML = `Total time today: ${{data.total_time}}`;
                    }}
                }};
                ws.onclose = () => {{
                    warnings.innerHTML = "WebSocket disconnected";
                    totalTime.innerHTML = "Total time today: Not available";
                }};
                ws.onerror = (error) => {{
                    warnings.innerHTML = "WebSocket error: " + error;
                }};
            }}
        </script>
    </body>
    </html>
    """

# Shared endpoint definitions
def create_endpoints(app, camera_type, is_entry, camera_index):
    @app.get("/", response_class=HTMLResponse)
    async def get():
        try:
            return HTMLResponse(content=get_html_content(camera_type), status_code=200)
        except Exception as e:
            logger.error(f"Error serving HTML: {e}")
            return JSONResponse({"detail": "Failed to load page"}, status_code=500)

    @app.post("/register_face")
    async def register_face(name: str = Query(...)):
        name = urllib.parse.quote(name)
        cap = cv2.VideoCapture(camera_index)
        if not cap.isOpened():
            logger.error(f"Failed to open webcam {camera_index} for {camera_type}")
            return JSONResponse({"detail": f"Failed to access {camera_type.lower()} webcam"}, status_code=500)

        encodings_list = []
        prompts = [
            ("Look forward", "Capturing frontal face..."),
            ("Turn head left", "Capturing left profile..."),
            ("Turn head right", "Capturing right profile...")
        ]
        
        try:
            for prompt, message in prompts:
                logger.info(f"Prompting: {prompt}")
                face_encoded = None
                for countdown in range(3, 0, -1):
                    ret, frame = cap.read()
                    if not ret:
                        logger.error("Failed to capture frame")
                        cv2.destroyAllWindows()
                        return JSONResponse({"detail": "Failed to capture video"}, status_code=500)
                    cv2.putText(
                        frame, f"{prompt} in {countdown}...", (50, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA
                    )
                    cv2.imshow(f"Register Face - {camera_type}", frame)
                    cv2.waitKey(1)
                    await asyncio.sleep(1)

                for _ in range(30):
                    ret, frame = cap.read()
                    if not ret:
                        logger.error("Failed to capture frame")
                        cv2.destroyAllWindows()
                        return JSONResponse({"detail": "Failed to capture video"}, status_code=500)
                    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    encodings = face_recognition.face_encodings(rgb_frame, num_jitters=3)
                    if len(encodings) > 1:
                        logger.warning(f"Multiple faces detected during {prompt} for name: {name}")
                        cv2.destroyAllWindows()
                        return JSONResponse(
                            {"detail": f"Multiple faces detected during {prompt}. Ensure only one person is in frame."},
                            status_code=400
                        )
                    cv2.putText(
                        frame, prompt, (50, 50), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 255, 0), 2, cv2.LINE_AA
                    )
                    cv2.imshow(f"Register Face - {camera_type}", frame)
                    cv2.waitKey(1)
                    if encodings:
                        face_encoded = encodings[0]
                        logger.info(f"Face detected for {prompt} for name: {name}")
                        encodings_list.append(face_encoded)
                        break
                    await asyncio.sleep(0.1)

                if face_encoded is None:
                    logger.warning(f"No face detected for {prompt} for name: {name}")
                    cv2.destroyAllWindows()
                    return JSONResponse(
                        {"detail": f"No face detected for {prompt}. Please try again."},
                        status_code=400
                    )
                for _ in range(5):
                    ret, frame = cap.read()
                    if ret:
                        cv2.putText(
                            frame, "Get ready for next angle...", (50, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA
                        )
                        cv2.imshow(f"Register Face - {camera_type}", frame)
                        cv2.waitKey(1)
                    await asyncio.sleep(0.1)

            cv2.destroyAllWindows()
            if len(encodings_list) < 3:
                logger.warning(f"Incomplete face encodings for name: {name}")
                return JSONResponse(
                    {"detail": "Failed to capture all face angles. Please try again."},
                    status_code=400
                )
            distances = [
                face_recognition.face_distance([encodings_list[0]], encodings_list[1])[0],
                face_recognition.face_distance([encodings_list[0]], encodings_list[2])[0],
                face_recognition.face_distance([encodings_list[1]], encodings_list[2])[0]
            ]
            if any(d < 0.3 for d in distances):
                logger.warning(f"Encodings too similar for name: {name}")
                return JSONResponse(
                    {"detail": "Face encodings are too similar across angles. Try varying angles more."},
                    status_code=400
                )
            encodings_bytes = pickle.dumps(encodings_list)
            try:
                face_collection.update_one(
                    {"name": name},
                    {
                        "$set": {
                            "face_encodings": Binary(encodings_bytes),
                            "name": name,
                            "entry_times": [],
                            "exit_times": [],
                            "total_time": {},
                            "last_action": "none"
                        }
                    },
                    upsert=True
                )
                logger.info(f"Face encodings saved to MongoDB for name: {name}")
            except Exception as e:
                logger.error(f"Failed to save to MongoDB: {e}")
                return JSONResponse({"detail": "Failed to save face data"}, status_code=500)
            return {"message": f"Face registered for name {name} (frontal, left, right)"}
        except Exception as e:
            logger.error(f"Error in register_face: {e}")
            cv2.destroyAllWindows()
            return JSONResponse({"detail": f"Error registering face: {str(e)}"}, status_code=500)
        finally:
            cap.release()

    @app.websocket("/video")
    async def video_stream(websocket: WebSocket):
        await websocket.accept()
        cap = cv2.VideoCapture(camera_index)
        cap.set(cv2.CAP_PROP_FPS, 30)
        if not cap.isOpened():
            await websocket.send_json({"warning": f"Failed to access {camera_type.lower()} webcam"})
            await websocket.close()
            return
        all_face_encodings = {}
        try:
            for doc in face_collection.find():
                if "face_encodings" in doc and "name" in doc:
                    all_face_encodings[doc["name"]] = pickle.loads(doc["face_encodings"])
            logger.info(f"Loaded {len(all_face_encodings)} face encodings from MongoDB")
        except Exception as e:
            logger.error(f"Failed to load face encodings from MongoDB: {e}")
            await websocket.send_json({"warning": f"Error loading face data: {str(e)}"})
            await websocket.close()
            return
        if not all_face_encodings:
            await websocket.send_json({"warning": "No registered faces found"})
            await websocket.close()
            return
        face_positions = {}
        try:
            while True:
                start_time = time.time()
                ret, frame = cap.read()
                if not ret:
                    logger.error("Failed to read frame")
                    break
                frame = cv2.resize(frame, (640, 480))
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                warnings = []
                results = face_detection.process(rgb_frame)
                face_locations = []
                if results.detections:
                    for detection in results.detections:
                        bbox = detection.location_data.relative_bounding_box
                        h, w, _ = frame.shape
                        x_min = int(bbox.xmin * w)
                        y_min = int(bbox.ymin * h)
                        width = int(bbox.width * w)
                        height = int(bbox.height * h)
                        face_locations.append((y_min, x_min + width, y_min + height, x_min))
                current_time = time.time()
                # Use local time zone (e.g., Asia/Kolkata for IST)
                tz = pytz.timezone('Asia/Kolkata')  # Adjust to your time zone
                current_timestamp = datetime.now(tz).strftime('%Y-%m-%dT%H:%M:%SZ')
                current_date = current_timestamp.split('T')[0]
                detected_faces = []
                encodings = face_recognition.face_encodings(rgb_frame, face_locations)
                for encoding, (top, right, bottom, left) in zip(encodings, face_locations):
                    best_name = None
                    best_distance = float('inf')
                    for db_name, db_encodings in all_face_encodings.items():
                        distances = face_recognition.face_distance(db_encodings, encoding)
                        min_distance = min(distances)
                        if min_distance < best_distance and min_distance < 0.55:
                            best_name = db_name
                            best_distance = min_distance
                    if best_name:
                        detected_faces.append((best_name, (left, top, right - left, bottom - top)))
                        try:
                            # Fetch student's current record
                            student = face_collection.find_one({"name": best_name})
                            last_action = student.get("last_action", "none")
                            update_needed = False
                            update_data = {}
                            total_time_formatted = ""

                            if is_entry:
                                # Allow entry only if last action was exit or none
                                if last_action in ["exit", "none"]:
                                    update_needed = True
                                    update_data = {
                                        "$push": {"entry_times": current_timestamp},
                                        "$set": {"last_action": "entry"}
                                    }
                                    warnings.append(f"Student {best_name} entered at {current_timestamp}")
                                    logger.info(f"Recorded entry for {best_name} at {current_timestamp}")
                                else:
                                    warnings.append(f"Student {best_name} already entered, waiting for exit")
                            else:
                                # Allow exit only if last action was entry
                                if last_action == "entry":
                                    update_needed = True
                                    update_data = {
                                        "$push": {"exit_times": current_timestamp},
                                        "$set": {"last_action": "exit"}
                                    }
                                    # Calculate time difference and update total_time
                                    student = face_collection.find_one({"name": best_name})
                                    entry_times = student.get("entry_times", [])
                                    exit_times = student.get("exit_times", []) + [current_timestamp]
                                    if entry_times and len(entry_times) >= len(exit_times):
                                        # Parse times in local time zone
                                        latest_entry = datetime.strptime(entry_times[-1], '%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=tz)
                                        latest_exit = datetime.strptime(current_timestamp, '%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=tz)
                                        time_diff = int((latest_exit - latest_entry).total_seconds())
                                        logger.info(f"Calculated {best_name} session: {entry_times[-1]} to {current_timestamp} = {time_diff}s")
                                        total_time = student.get("total_time", {})
                                        current_total = total_time.get(current_date, 0) + time_diff
                                        update_data["$set"].update({
                                            "total_time." + current_date: current_total
                                        })
                                        total_time_formatted = format_seconds(current_total)
                                        warnings.append(f"Student {best_name} exited at {current_timestamp}, total time today: {total_time_formatted}")
                                        logger.info(f"Updated total_time for {best_name} on {current_date} to {current_total}s ({total_time_formatted})")
                                    else:
                                        warnings.append(f"Student {best_name} exited at {current_timestamp}, no matching entry")
                                else:
                                    warnings.append(f"Student {best_name} must enter before exiting")

                            # Apply updates if needed
                            if update_needed:
                                face_collection.update_one(
                                    {"name": best_name},
                                    update_data
                                )
                                logger.info(f"Updated {best_name}'s record")

                            # Send total_time for display
                            student = face_collection.find_one({"name": best_name})
                            total_time = student.get("total_time", {})
                            total_time_formatted = format_seconds(total_time.get(current_date, 0)) if total_time.get(current_date) else "00:00:00"

                        except Exception as e:
                            logger.error(f"Failed to update record for {best_name}: {e}")
                            warnings.append(f"Error updating record for {best_name}")
                    else:
                        detected_faces.append(("Unknown", (left, top, right - left, bottom - top)))
                        warnings.append("Unknown face detected")
                        logger.info(f"Unknown face detected with min distance {best_distance:.3f}")
                for name, (x, y, w, h) in detected_faces:
                    face_positions[name + str(len(face_positions))] = (x, y, w, h, current_time)
                expired_keys = [
                    key for key, (_, _, _, _, last_seen) in face_positions.items()
                    if current_time - last_seen > FACE_PERSISTENCE_SECONDS
                ]
                for key in expired_keys:
                    face_positions.pop(key, None)
                for key, (x, y, w, h, _) in face_positions.items():
                    name = key.split('_')[0] if '_' in key else key
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 3)
                    cv2.putText(frame, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
                _, buffer = cv2.imencode(".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
                base64_frame = base64.b64encode(buffer).decode("utf-8")
                warning_message = warnings[0] if warnings else ""
                await websocket.send_json({
                    "image": base64_frame,
                    "warning": warning_message,
                    "warnings": warnings,
                    "total_time": total_time_formatted
                })
                await asyncio.sleep(0.03)
                processing_time = time.time() - start_time
                if processing_time > 0.03:
                    logger.debug(f"Frame processing took {processing_time:.3f}s, may cause lag")
        except WebSocketDisconnect:
            logger.info("Client disconnected")
        except Exception as e:
            logger.error(f"Error in {camera_type.lower()} video stream: {e}")
            await websocket.send_json({"warning": f"Error: {str(e)}", "warnings": [f"Error: {str(e)}"]})
        finally:
            cap.release()

# Apply endpoints
create_endpoints(app_entry, "Entry", True, 0)
create_endpoints(app_exit, "Exit", False, 0)

# Run servers
def run_entry_server():
    uvicorn.run(app_entry, host="0.0.0.0", port=8000, log_level="info")

def run_exit_server():
    uvicorn.run(app_exit, host="0.0.0.0", port=8001, log_level="info")

if __name__ == "__main__":
    entry_thread = threading.Thread(target=run_entry_server)
    exit_thread = threading.Thread(target=run_exit_server)
    entry_thread.start()
    exit_thread.start()
    try:
        entry_thread.join()
        exit_thread.join()
    except KeyboardInterrupt:
        logger.info("Shutting down servers")
        