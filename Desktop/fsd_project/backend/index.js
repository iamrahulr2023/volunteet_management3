const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Post Schema (from your original code)
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

// New Attendance Record Schema
const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  rollno: {
    type: String,
    required: true,
    unique: true
  },
  semno: {
    type: Number,
    required: true
  },
  entry_times: [{
    type: Date
  }],
  exit_times: [{
    type: Date
  }],
  face_encodings: {
    type: Buffer
  },
  last_action: {
    type: String,
    enum: ['entry', 'exit']
  },
  total_time: {
    type: Map,
    of: Number
  },
  attendance: {
    type: Boolean,
    default: false
  }
});

const AttendanceRecord = mongoose.model('stu3', attendanceSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);


const unknownFaceSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  camera_type: {
    type: String,
    required: true,
    enum: ['entry', 'exit']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const UnknownFace = mongoose.model('unknown_faces', unknownFaceSchema);

// Post Routes (from your original code)
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await AttendanceRecord.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New GET Route for Attendance Records
app.get('/attendance', async (req, res) => {
  try {
    const { rollno, id } = req.query;
    let records;
    
    if (rollno) {
      records = await AttendanceRecord.findOne({ rollno });
      if (!records) {
        return res.status(404).json({ error: 'Record not found' });
      }
    } else if (id) {
      records = await AttendanceRecord.findById(id);
      if (!records) {
        return res.status(404).json({ error: 'Record not found' });
      }
    } else {
      records = await AttendanceRecord.find();
    }
    
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/attendance', async (req, res) => {
  try {
    const { name, dept, rollno, semno, entry_times, exit_times, face_encodings, last_action, total_time, attendance } = req.body;
    const newRecord = new AttendanceRecord({
      name,
      dept,
      rollno,
      semno,
      entry_times,
      exit_times,
      face_encodings: face_encodings ? Buffer.from(face_encodings, 'base64') : null,
      last_action,
      total_time,
      attendance
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to register user: ' + error.message });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password });

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ error: 'Email not found' });
    }

    console.log('Stored hashed password:', user.password);
    const isMatch = password == user.password? true:false;
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login: ' + error.message });
  }
});

app.get('/unknown_faces', async (req, res) => {
  try {
    const faces = await UnknownFace.find();
    const facesWithBase64 = faces.map(face => ({
      ...face.toObject(),
      image: face.image.toString('base64'),
      _id: face._id.toString()
    }));
    res.json(facesWithBase64);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});