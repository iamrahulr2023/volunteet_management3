// import React, { useState, useEffect } from 'react';

// const NavBar = () => {
//     return (
//         <header style={{
//             backgroundColor: '#22d3ee',
//             padding: '12px',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//         }}>
//             <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px'
//             }}>
//                 <div style={{
//                     backgroundColor: 'black',
//                     borderRadius: '50%',
//                     padding: '8px'
//                 }}>
//                     <span style={{
//                         color: 'white',
//                         fontSize: '20px'
//                     }}>⏱</span>
//                 </div>
//                 <span style={{
//                     color: 'black',
//                     fontWeight: 'bold',
//                     fontSize: '20px'
//                 }}>FaceTrack</span>
//             </div>
//             <nav style={{
//                 display: 'flex',
//                 gap: '24px'
//             }}>
//                 <button style={{
//                     color: 'black',
//                     fontSize: '14px',
//                     background: 'none',
//                     border: 'none',
//                     fontWeight:200,
//                     cursor: 'pointer'
//                 }} onClick={() => window.location.href='http://localhost:5173/'}>Dashboard</button>
//                 <button style={{
//                     color: 'black',
//                     fontSize: '14px',
//                     background: 'none',
//                     border: 'none',
//                     fontWeight:200,
//                     cursor: 'pointer'
//                 }} onClick={() => window.location.href='http://localhost:8002/'}>Register Face</button>
//                 <button style={{
//                     color: 'black',
//                     fontSize: '14px',
//                     background: 'none',
//                     border: 'none',
//                     fontWeight:200,
//                     cursor: 'pointer'
//                 }} onClick={() => window.location.href='http://localhost:8000/'}>Entry Camera</button>
//                 <button style={{
//                     color: 'black',
//                     fontSize: '14px',
//                     background: 'none',
//                     border: 'none',
//                     fontWeight:200,
//                     cursor: 'pointer'
//                 }} onClick={() => window.location.href='http://localhost:8001/'}>Exit Camera</button>
//                 <button style={{
//                     color: 'black',
//                     fontSize: '14px',
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontWeight:200,
//                      borderBottom: '2px solid black',
//                 }} onClick={() => window.location.href='/records'}>Records</button>
//                 {/* <button style={{
//                     color: 'black',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     borderBottom: '2px solid black',
//                     background: 'none',
//                     borderTop: 'none',
//                     borderLeft: 'none',
//                     borderRight: 'none',
//                     cursor: 'pointer'
//                 }} onClick={() => window.location.href='http://localhost:5173/unknown-faces'}>Unknown Faces</button> */}
//             </nav>
//             <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '16px'
//             }}>
//                 <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px'
//                 }}>
//                     <div style={{
//                         backgroundColor: '#e5e7eb',
//                         borderRadius: '50%',
//                         padding: '4px'
//                     }}>
//                         <span style={{
//                             color: '#4b5563',
//                             fontSize: '16px'
//                         }}>👤</span>
//                     </div>
//                     <span style={{
//                         color: 'white'
//                     }}>rk</span>
//                 </div>
//                 <button style={{
//                     backgroundColor: '#1f2937',
//                     color: 'white',
//                     padding: '4px 16px',
//                     borderRadius: '4px',
//                     border: 'none',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px'
//                 }} onClick={() => window.location.href='http://localhost:5173/login'}>
//                     <span>Logout</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                         <polyline points="16 17 21 12 16 7" />
//                         <line x1="21" y1="12" x2="9" y2="12" />
//                     </svg>
//                 </button>
//             </div>
//         </header>
//     );
// };

// const UnknownFaces = () => {
//     const [unknownFaces, setUnknownFaces] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const currentDateTime = "07:40 PM IST on Sunday, May 18, 2025";

//     useEffect(() => {
//         const fetchUnknownFaces = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/unknown_faces');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch unknown faces data');
//                 }
//                 const data = await response.json();
//                 setUnknownFaces(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };
//         fetchUnknownFaces();
//     }, []);

//     return (
//         <div style={{
//             backgroundColor: '#0a0e17',
//             minHeight: '100vh',
//             color: 'white',
//             fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//         }}>
//             <NavBar />
//             <main style={{
//                 maxWidth: '1200px',
//                 margin: '0 auto',
//                 padding: '24px'
//             }}>
//                 <h1 style={{
//                     fontSize: '36px',
//                     fontWeight: 'bold',
//                     marginBottom: '16px'
//                 }}>Unknown Faces</h1>
//                 <p style={{
//                     color: '#94A3B8',
//                     marginBottom: '8px'
//                 }}>Below are the records of unknown faces detected by the entry and exit cameras.</p>
//                 <p style={{
//                     color: '#94A3B8',
//                     marginBottom: '24px'
//                 }}>
//                     <span style={{
//                         color: '#F472B6',
//                         fontWeight: '600'
//                     }}>Current Time:</span> {currentDateTime}
//                 </p>

//                 {loading && <p style={{ color: '#94A3B8' }}>Loading...</p>}
//                 {error && <p style={{ color: '#EF4444' }}>Error: {error}</p>}
//                 {!loading && !error && unknownFaces.length === 0 && (
//                     <p style={{ color: '#94A3B8' }}>No unknown faces detected yet.</p>
//                 )}
//                 {!loading && !error && unknownFaces.length > 0 && (
//                     <div style={{
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                         gap: '24px'
//                     }}>
//                         {unknownFaces.map((face, index) => (
//                             <div key={index} style={{
//                                 backgroundColor: '#1F2A44',
//                                 borderRadius: '8px',
//                                 padding: '16px',
//                                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                                 transition: 'box-shadow 0.3s'
//                             }}>
//                                 <img
//                                     src={`data:image/jpeg;base64,${face.image}`}
//                                     alt="Unknown Face"
//                                     style={{
//                                         width: '100%',
//                                         height: '192px',
//                                         objectFit: 'cover',
//                                         borderRadius: '6px',
//                                         marginBottom: '16px'
//                                     }}
//                                 />
//                                 <div style={{
//                                     fontSize: '14px',
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     gap: '4px'
//                                 }}>
//                                     <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Date:</span> {face.date}</p>
//                                     <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Day:</span> {face.day}</p>
//                                     <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Month:</span> {face.month}</p>
//                                     <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Time:</span> {face.time}</p>
//                                     <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Department:</span> {face.dept}</p>
//                                     <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Camera:</span> {face.camera_type}</p>
//                                     <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Timestamp:</span> {new Date(face.timestamp).toLocaleString()}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default UnknownFaces;


import React, { useState, useEffect } from 'react';

const NavBar = () => {
    return (
        <header style={{
            backgroundColor: '#22d3ee',
            padding: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{
                    backgroundColor: 'black',
                    borderRadius: '50%',
                    padding: '8px'
                }}>
                    <span style={{
                        color: 'white',
                        fontSize: '20px'
                    }}>⏱</span>
                </div>
                <span style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '20px'
                }}>KnowFace</span>
            </div>
            <nav style={{
                display: 'flex',
                gap: '24px'
            }}>
                <button style={{
                    color: 'black',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }} onClick={() => window.location.href='http://localhost:5173/'}>Dashboard</button>
                <button style={{
                    color: 'black',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }} onClick={() => window.location.href='http://localhost:8002/'}>Register Face</button>
                <button style={{
                    color: 'black',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }} onClick={() => window.location.href='http://localhost:8000/'}>Entry Camera</button>
                <button style={{
                    color: 'black',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }} onClick={() => window.location.href='http://localhost:8001/'}>Exit Camera</button>
                <button style={{
                    color: 'black',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }} onClick={() => window.location.href='http://localhost:5173/records'}>Records</button>
                {/* <button style={{
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '600',
                    borderBottom: '2px solid black',
                    background: 'none',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    cursor: 'pointer'
                }} onClick={() => window.location.href='http://localhost:5173/unknown-faces'}>Unknown Faces</button> */}
            </nav>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        backgroundColor: '#e5e7eb',
                        borderRadius: '50%',
                        padding: '4px'
                    }}>
                        <span style={{
                            color: '#4b5563',
                            fontSize: '16px'
                        }}>👤</span>
                    </div>
                    <span style={{
                        color: 'white'
                    }}>rk</span>
                </div>
                <button style={{
                    backgroundColor: '#1f2937',
                    color: 'white',
                    padding: '4px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }} onClick={() => window.location.href='http://localhost:5173/login'}>
                    <span>Logout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

const UnknownFaces = () => {
    const [unknownFaces, setUnknownFaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        // Function to format the current time in IST
        const updateCurrentTime = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata',
            });
            const dayFormatter = new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'Asia/Kolkata',
            });
            const timeString = formatter.format(now);
            const dateString = dayFormatter.format(now);
            setCurrentDateTime(`${timeString} IST on ${dateString}`);
        };

        // Update time immediately on mount
        updateCurrentTime();

        // Update time every second
        const intervalId = setInterval(updateCurrentTime, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchUnknownFaces = async () => {
            try {
                const response = await fetch('http://localhost:5000/unknown_faces');
                if (!response.ok) {
                    throw new Error('Failed to fetch unknown faces data');
                }
                const data = await response.json();
                setUnknownFaces(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchUnknownFaces();
    }, []);

    return (
        <div style={{
            backgroundColor: '#0a0e17',
            minHeight: '100vh',
            color: 'white',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <NavBar />
            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '24px'
            }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    marginBottom: '16px'
                }}>Unknown Faces</h1>
                <p style={{
                    color: '#94A3B8',
                    marginBottom: '8px'
                }}>Below are the records of unknown faces detected by the entry and exit cameras.</p>
                <p style={{
                    color: '#94A3B8',
                    marginBottom: '24px'
                }}>
                    <span style={{
                        color: '#F472B6',
                        fontWeight: '600'
                    }}>Current Time:</span> {currentDateTime}
                </p>

                {loading && <p style={{ color: '#94A3B8' }}>Loading...</p>}
                {error && <p style={{ color: '#EF4444' }}>Error: {error}</p>}
                {!loading && !error && unknownFaces.length === 0 && (
                    <p style={{ color: '#94A3B8' }}>No unknown faces detected yet.</p>
                )}
                {!loading && !error && unknownFaces.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        {unknownFaces.map((face, index) => (
                            <div key={index} style={{
                                backgroundColor: '#1F2A44',
                                borderRadius: '8px',
                                padding: '16px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'box-shadow 0.3s'
                            }}>
                                <img
                                    src={`data:image/jpeg;base64,${face.image}`}
                                    alt="Unknown Face"
                                    style={{
                                        width: '100%',
                                        height: '192px',
                                        objectFit: 'cover',
                                        borderRadius: '6px',
                                        marginBottom: '16px'
                                    }}
                                />
                                <div style={{
                                    fontSize: '14px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px'
                                }}>
                                    <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Date:</span> {face.date}</p>
                                    <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Day:</span> {face.day}</p>
                                    <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Month:</span> {face.month}</p>
                                    <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Time:</span> {face.time}</p>
                                    <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Department:</span> {face.dept}</p>
                                    <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Camera:</span> {face.camera_type}</p>
                                    {/* <p><span style={{ fontWeight: '600', color: '#F472B6' }}>Timestamp:</span> {new Date(face.timestamp).toLocaleString()}</p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default UnknownFaces;