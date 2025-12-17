
// import { useState } from "react";
// import { Clock, Users, Calendar, RotateCw, Search } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Cell } from 'recharts';

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Sample student data with attendance records
//   const students = [
//     { 
//       id: 1, 
//       name: "John Smith", 
//       initials: "JS",
//       attendance: Array(31).fill(null).map((_, i) => {
//         // Present on most days, absent on a few, partial on specific days
//         if ([4, 11, 19, 25].includes(i+1)) return "partial"; // Yellow
//         if ([7, 14, 21, 28].includes(i+1)) return "absent";  // Red
//         return "present"; // Green
//       })
//     },
//     { 
//       id: 2, 
//       name: "Emily Johnson", 
//       initials: "EJ",
//       attendance: Array(31).fill(null).map((_, i) => {
//         if ([4, 11, 19, 25].includes(i+1)) return "partial";
//         if ([6, 13, 20, 27].includes(i+1)) return "absent";
//         return "present";
//       })
//     },
//     { 
//       id: 3, 
//       name: "Michael Brown", 
//       initials: "MB",
//       attendance: Array(31).fill(null).map((_, i) => {
//         if ([4, 11, 19, 25].includes(i+1)) return "partial";
//         if ([5, 12, 22, 29].includes(i+1)) return "absent";
//         return "present";
//       })
//     },
//     { 
//       id: 4, 
//       name: "Sarah Davis", 
//       initials: "SD",
//       attendance: Array(31).fill(null).map((_, i) => {
//         if ([4, 11, 19, 25].includes(i+1)) return "partial";
//         if ([8, 15, 23, 30].includes(i+1)) return "absent";
//         return "present";
//       })
//     },
//     { 
//       id: 5, 
//       name: "William Wilson", 
//       initials: "WW",
//       attendance: Array(31).fill(null).map((_, i) => {
//         if ([4, 11, 19, 25].includes(i+1)) return "partial";
//         if ([9, 16, 24, 31].includes(i+1)) return "absent";
//         return "present";
//       })
//     },
//     { 
//       id: 6, 
//       name: "Olivia Taylor", 
//       initials: "OT",
//       attendance: Array(31).fill(null).map((_, i) => {
//         if ([4, 11, 19, 25].includes(i+1)) return "partial";
//         if ([3, 10, 17, 26].includes(i+1)) return "absent";
//         return "present";
//       })
//     },
//     { 
//       id: 7, 
//       name: "James Anderson", 
//       initials: "JA",
//       attendance: Array(31).fill(null).map((_, i) => {
//         if ([4, 11, 19, 25].includes(i+1)) return "partial";
//         if ([2, 9, 18, 27].includes(i+1)) return "absent";
//         return "present";
//       })
//     },
//     { 
//       id: 8, 
//       name: "Ava Martinez", 
//       initials: "AM",
//       attendance: Array(31).fill(null).map((_, i) => {
//         if ([4, 11, 19, 25].includes(i+1)) return "partial";
//         if ([1, 8, 15, 29].includes(i+1)) return "absent";
//         return "present";
//       })
//     }
//   ];

//   // Calculate total present students today (for today's date)
//   const todayDate = new Date().getDate() - 1; // Adjust to 0-based index
//   const presentToday = students.filter(s => 
//     s.attendance[todayDate] === "present" || s.attendance[todayDate] === "partial"
//   ).length;

//   // Calculate total records
//   const totalRecords = students.length * 31;

//   // Calculate average attendance time (fictional data)
//   const averageTime = "06:45:20";

//   // Example data for the charts
//   const lastFiveDaysData = [
//     { name: '05/03', students: 7 },
//     { name: '05/04', students: 8 },
//     { name: '05/05', students: 6 },
//     { name: '05/06', students: 8 },
//     { name: '05/07', students: 7 },
//   ];

//   // Calculate overall attendance percentage for pie chart
//   const totalDays = students.length * 31;
//   const presentDays = students.reduce((acc, student) => 
//     acc + student.attendance.filter(a => a === "present").length, 0);
//   const partialDays = students.reduce((acc, student) => 
//     acc + student.attendance.filter(a => a === "partial").length, 0);
//   const absentDays = totalDays - presentDays - partialDays;
  
//   const monthlyData = [
//     { name: 'Present', value: Math.round((presentDays / totalDays) * 100) },
//     { name: 'Partial', value: Math.round((partialDays / totalDays) * 100) },
//     { name: 'Absent', value: Math.round((absentDays / totalDays) * 100) },
//   ];

//   const COLORS = ['#10b981', '#facc15', '#ef4444']; // Green for present, Yellow for partial, Red for absent

//   const filteredStudents = students.filter(student => 
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Calculate attendance totals for each student
//   const calculateTotal = (attendance) => {
//     const present = attendance.filter(a => a === "present").length;
//     const partial = attendance.filter(a => a === "partial").length;
//     return present + (partial * 0.5); // Count partial as 0.5
//   };

//   // Get attendance status color
//   const getStatusColor = (status) => {
//     switch(status) {
//       case "present": return "#10b981"; // Green
//       case "absent": return "#ef4444";  // Red
//       case "partial": return "#facc15"; // Yellow
//       default: return "#e5e7eb";        // Gray
//     }
//   };

//   return (
//     <div style={{ 
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: "#09090d"
//     }}>
//       {/* Header */}
//       <header style={{
//         backgroundColor: "#22d3ee",
//         padding: "12px 24px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between"
//       }}>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <div style={{ 
//             backgroundColor: "black", 
//             borderRadius: "50%", 
//             padding: "8px", 
//             marginRight: "12px" 
//           }}>
//             <Clock style={{ color: "white", height: "20px", width: "20px" }} />
//           </div>
//           <span style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>FaceTrack</span>
//         </div>

//         <nav style={{ display: "flex", gap: "24px" }}>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Dashboard</button>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Register Face</button>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Entry Camera</button>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Exit Camera</button>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Records</button>
//         </nav>

//         <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <div style={{ 
//               backgroundColor: "#e5e7eb", 
//               borderRadius: "50%", 
//               padding: "4px", 
//               marginRight: "8px" 
//             }}>
//               <Users style={{ color: "#4b5563", height: "16px", width: "16px" }} />
//             </div>
//             <span>rk</span>
//           </div>
//           <button style={{ 
//             backgroundColor: "#1f2937", 
//             color: "white", 
//             padding: "4px 16px", 
//             borderRadius: "4px",
//             border: "none",
//             display: "flex",
//             alignItems: "center",
//             cursor: "pointer"
//           }}>
//             <span style={{ marginRight: "8px" }}>Logout</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//               <polyline points="16 17 21 12 16 7" />
//               <line x1="21" y1="12" x2="9" y2="12" />
//             </svg>
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main style={{ flex: 1, padding: "32px 40px" }}>
//         <h1 style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "32px" }}>
//           Attendance Dashboard
//         </h1>

//         {/* Stats Cards */}
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "row", 
//           gap: "24px", 
//           marginBottom: "32px" 
//         }}>
//           {/* Total Users Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Users</h2>
//               <Users style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{students.length}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Registered in the system</p>
//           </div>

//           {/* Present Today Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Present Today</h2>
//               <Calendar style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{presentToday}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>People checked in today</p>
//           </div>

//           {/* Average Time Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Average Time</h2>
//               <Clock style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{averageTime}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Average attendance duration</p>
//           </div>

//           {/* Total Records Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Records</h2>
//               <RotateCw style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{totalRecords}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Total attendance records</p>
//           </div>
//         </div>

//         {/* Charts Row */}
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "row", 
//           gap: "24px", 
//           marginBottom: "32px"
//         }}>
//           {/* Bar Chart - Last 5 Days */}
//           <div style={{ 
//             backgroundColor: "#222222", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             flex: 3,
//             height: "350px"
//           }}>
//             <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
//               Attendance (Last 5 Days)
//             </h2>
//             <ResponsiveContainer width="100%" height="85%">
//               <BarChart 
//                 data={lastFiveDaysData} 
//                 margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
//                 <XAxis dataKey="name" tick={{ fill: '#999' }} />
//                 <YAxis tick={{ fill: '#999' }} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: 'none', 
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
//                   }}
//                   labelStyle={{ color: '#ccc' }}
//                   itemStyle={{ color: '#eee' }}
//                 />
//                 <Bar 
//                   dataKey="students" 
//                   fill="#4ade80"
//                   radius={[4, 4, 0, 0]}
//                   barSize={25}
//                   animationDuration={1500}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Donut Chart - Monthly Attendance */}
//           <div style={{ 
//             backgroundColor: "#222222", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             flex: 2,
//             height: "350px"
//           }}>
//             <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
//               Monthly Attendance
//             </h2>
//             <ResponsiveContainer width="100%" height="85%">
//               <PieChart>
//                 <Pie
//                   data={monthlyData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={70}
//                   outerRadius={90}
//                   fill="#8884d8"
//                   paddingAngle={0}
//                   dataKey="value"
//                   stroke="#222"
//                   strokeWidth={4}
//                   animationDuration={1500}
//                 >
//                   {monthlyData.map((entry, index) => (
//                     <Cell 
//                       key={`cell-${index}`} 
//                       fill={COLORS[index % COLORS.length]}
//                       style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))' }} 
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: 'none', 
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
//                   }}
//                   formatter={(value, name) => [`${value}%`, name]}
//                   labelStyle={{ color: '#ccc' }}
//                   itemStyle={{ color: '#eee' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Records Tabs */}
//         <div style={{ backgroundColor: "#1f2937", borderRadius: "8px", overflow: "hidden", marginBottom: "32px" }}>
//           <div style={{ display: "flex" }}>
//             <button
//               style={{ 
//                 flex: 1, 
//                 padding: "12px 16px", 
//                 textAlign: "center",
//                 backgroundColor: activeTab === "all" ? "#1f2937" : "#374151",
//                 color: activeTab === "all" ? "white" : "#9ca3af",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//               onClick={() => setActiveTab("all")}
//             >
//               All Records
//             </button>
//             <button
//               style={{ 
//                 flex: 1, 
//                 padding: "12px 16px", 
//                 textAlign: "center",
//                 backgroundColor: activeTab === "today" ? "#1f2937" : "#374151",
//                 color: activeTab === "today" ? "white" : "#9ca3af",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//               onClick={() => setActiveTab("today")}
//             >
//               Today's Records
//             </button>
//           </div>

//           {/* Records Table - would go here */}
//           <div style={{ padding: "24px" }}>
//             {activeTab === "all" ? (
//               <div style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
//                 All records will be displayed here. Currently showing all attendance records in the table below.
//               </div>
//             ) : (
//               <div style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
//                 Today's records will be displayed here. Currently showing all attendance records in the table below.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Student Attendance Table */}
//         <div style={{ 
//           backgroundColor: "#1f2937", 
//           borderRadius: "8px", 
//           padding: "24px", 
//           marginBottom: "32px" 
//         }}>
//           <h2 style={{ color: "white", fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
//             Student Attendance
//           </h2>
          
//           {/* Search input */}
//           <div style={{ position: "relative", marginBottom: "24px" }}>
//             <div style={{ 
//               position: "absolute", 
//               top: "0", 
//               bottom: "0", 
//               left: "0", 
//               display: "flex", 
//               alignItems: "center", 
//               paddingLeft: "12px" 
//             }}>
//               <Search style={{ color: "#9ca3af", height: "16px", width: "16px" }} />
//             </div>
//             <input
//               type="text"
//               style={{ 
//                 backgroundColor: "#111827", 
//                 border: "1px solid #374151", 
//                 color: "white", 
//                 fontSize: "14px", 
//                 borderRadius: "8px", 
//                 width: "100%", 
//                 paddingLeft: "40px", 
//                 padding: "10px 12px" 
//               }}
//               placeholder="Search students..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           {/* Attendance table */}
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", fontSize: "14px", textAlign: "left" }}>
//               <thead style={{ textTransform: "uppercase", backgroundColor: "#111827", color: "#9ca3af", fontSize: "12px" }}>
//                 <tr>
//                   <th style={{ padding: "12px 16px", width: "192px" }}>Student Name</th>
//                   {Array.from({ length: 31 }, (_, i) => (
//                     <th key={i} style={{ padding: "12px 4px", textAlign: "center" }}>{(i + 1).toString().padStart(2, '0')}</th>
//                   ))}
//                   <th style={{ padding: "12px 12px", textAlign: "center" }}>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student) => (
//                   <tr key={student.id} style={{ borderBottom: "1px solid #374151" }}>
//                     <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
//                       <div style={{ 
//                         width: "32px", 
//                         height: "32px", 
//                         backgroundColor: "#3b82f6", 
//                         borderRadius: "50%", 
//                         display: "flex", 
//                         alignItems: "center", 
//                         justifyContent: "center", 
//                         color: "white" 
//                       }}>
//                         {student.initials}
//                       </div>
//                       <span style={{ color: "white" }}>{student.name}</span>
//                     </td>
//                     {student.attendance.map((status, index) => (
//                       <td key={index} style={{ padding: "12px 4px", textAlign: "center" }}>
//                         <div 
//                           style={{ 
//                             width: "24px", 
//                             height: "24px", 
//                             backgroundColor: getStatusColor(status), 
//                             borderRadius: "4px", 
//                             margin: "0 auto" 
//                           }}
//                         ></div>
//                       </td>
//                     ))}
//                     <td style={{ padding: "12px 12px", textAlign: "center", color: "white", fontWeight: "600" }}>
//                       {calculateTotal(student.attendance)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Legend */}
//           <div style={{ 
//             marginTop: "16px", 
//             display: "flex", 
//             alignItems: "center", 
//             gap: "24px", 
//             fontSize: "14px", 
//             color: "#9ca3af" 
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#10b981", borderRadius: "4px" }}></div>
//               <span>Present</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#ef4444", borderRadius: "4px" }}></div>
//               <span>Absent</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#facc15", borderRadius: "4px" }}></div>
//               <span>Partial</span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


//crt cod till

// import { useState, useEffect } from "react";
// import { Clock, Users, Calendar, RotateCw, Search } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Cell } from 'recharts';
// import { useNavigate } from 'react-router-dom';
// import "../App.css"

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch student data from the endpoint
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const data = await response.json();
//         // Process data to match the required student format
//         const processedStudents = data.map((student, index) => ({
//           id: index + 1,
//           name: student.name,
//           initials: student.name.split(' ').map(n => n[0]).join('').toUpperCase(),
//           attendance: Array(31).fill(null).map((_, i) => {
//             const date = `2025-05-${(i + 1).toString().padStart(2, '0')}`;
//             const totalSeconds = student.total_time[date] || 0;
//             const totalHours = totalSeconds / 3600; // Convert seconds to hours
//             if (totalHours >= 6) return "present";
//             if (totalHours >= 3) return "partial";
//             return "absent";
//           })
//         }));
//         setStudents(processedStudents);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Calculate total present students today (for May 11, 2025, as per current date)
//   const todayDate = 10; // May 11, 2025 (0-based index for May 11)
//   const presentToday = students.filter(s => 
//     s.attendance[todayDate] === "present" || s.attendance[todayDate] === "partial"
//   ).length;

//   // Calculate total records
//   const totalRecords = students.length * 31;

//   // Calculate average attendance time
//   const averageTime = students.reduce((acc, student) => {
//     const totalHours = student.attendance.reduce((sum, status, i) => {
//       const date = `2025-05-${(i + 1).toString().padStart(2, '0')}`;
//       const seconds = student.total_time?.[date] || 0;
//       return sum + (seconds / 3600);
//     }, 0);
//     return acc + totalHours / 31;
//   }, 0) / (students.length || 1);
//   const avgTimeFormatted = new Date(averageTime * 3600 * 1000).toISOString().substr(11, 8);

//   // Data for the last 5 days (May 7-11, 2025)
//   const lastFiveDaysData = [7, 8, 9, 10, 11].map(day => ({
//     name: `05/${day.toString().padStart(2, '0')}`,
//     students: students.filter(s => 
//       s.attendance[day - 1] === "present" || s.attendance[day - 1] === "partial"
//     ).length
//   }));

//   // Calculate overall attendance percentage for pie chart
//   const totalDays = students.length * 31;
//   const presentDays = students.reduce((acc, student) => 
//     acc + student.attendance.filter(a => a === "present").length, 0);
//   const partialDays = students.reduce((acc, student) => 
//     acc + student.attendance.filter(a => a === "partial").length, 0);
//   const absentDays = totalDays - presentDays - partialDays;
  
//   const monthlyData = [
//     { name: 'Present', value: Math.round((presentDays / totalDays) * 100) },
//     { name: 'Partial', value: Math.round((partialDays / totalDays) * 100) },
//     { name: 'Absent', value: Math.round((absentDays / totalDays) * 100) },
//   ];

//   const COLORS = ['#10b981', '#facc15', '#ef4444']; // Green for present, Yellow for partial, Red for absent

//   const filteredStudents = students.filter(student => 
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Calculate attendance totals for each student
//   const calculateTotal = (attendance) => {
//     const present = attendance.filter(a => a => "present").length;
//     const partial = attendance.filter(a => a => "partial").length;
//     return present + (partial * 0.5); // Count partial as 0.5
//   };

//   // Get attendance status color
//   const getStatusColor = (status) => {
//     switch(status) {
//       case "present": return "#10b981"; // Green
//       case "absent": return "#ef4444";  // Red
//       case "partial": return "#facc15"; // Yellow
//       default: return "#e5e7eb";        // Gray
//     }
//   };

//   if (loading) {
//     return <div style={{ color: "white", textAlign: "center", padding: "50px" }}>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: "#09090d"
//     }}>
//       {/* Header */}
//       <header style={{
//         backgroundColor: "#22d3ee",
//         padding: "12px 24px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between"
//       }}>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <div style={{ 
//             backgroundColor: "black", 
//             borderRadius: "50%", 
//             padding: "8px", 
//             marginRight: "12px" 
//           }}>
//             <Clock style={{ color: "white", height: "20px", width: "20px" }} />
//           </div>
//           <span style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>FaceTrack</span>
//         </div>

//         <nav style={{ display: "flex", gap: "24px" }}>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Dashboard</button>
//           <button onclick="window.location.href='http://localhost:8002/'" style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Register Face</button>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Entry Camera</button>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Exit Camera</button>
//           <button style={{ color: "black", background: "none", border: "none", cursor: "pointer" }}>Records</button>
//         </nav>

//         <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <div style={{ 
//               backgroundColor: "#e5e7eb", 
//               borderRadius: "50%", 
//               padding: "4px", 
//               marginRight: "8px" 
//             }}>
//               <Users style={{ color: "#4b5563", height: "16px", width: "16px" }} />
//             </div>
//             <span>rk</span>
//           </div>
//           <button style={{ 
//             backgroundColor: "#1f2937", 
//             color: "white", 
//             padding: "4px 16px", 
//             borderRadius: "4px",
//             border: "none",
//             display: "flex",
//             alignItems: "center",
//             cursor: "pointer"
//           }}>
//             <span style={{ marginRight: "8px" }}>Logout</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//               <polyline points="16 17 21 12 16 7" />
//               <line x1="21" y1="12" x2="9" y2="12" />
//             </svg>
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main style={{ flex: 1, padding: "0" }}> 
//         <h1 style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "32px" }}>
//           Attendance Dashboard
//         </h1>

//         {/* Stats Cards */}
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "row", 
//           gap: "24px", 
//           marginBottom: "32px" 
//         }}>
//           {/* Total Users Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Users</h2>
//               <Users style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{students.length}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Registered in the system</p>
//           </div>

//           {/* Present Today Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Present Today</h2>
//               <Calendar style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{presentToday}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>People checked in today</p>
//           </div>

//           {/* Average Time Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Average Time</h2>
//               <Clock style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{avgTimeFormatted}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Average attendance duration</p>
//           </div>

//           {/* Total Records Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Records</h2>
//               <RotateCw style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{totalRecords}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Total attendance records</p>
//           </div>
//         </div>

//         {/* Charts Row */}
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "row", 
//           gap: "24px", 
//           marginBottom: "32px"
//         }}>
//           {/* Bar Chart - Last 5 Days */}
//           <div style={{ 
//             backgroundColor: "#222222", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             flex: 3,
//             height: "350px"
//           }}>
//             <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
//               Attendance (Last 5 Days)
//             </h2>
//             <ResponsiveContainer width="100%" height="85%">
//               <BarChart 
//                 data={lastFiveDaysData} 
//                 margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
//                 <XAxis dataKey="name" tick={{ fill: '#999' }} />
//                 <YAxis tick={{ fill: '#999' }} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: 'none', 
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
//                   }}
//                   labelStyle={{ color: '#ccc' }}
//                   itemStyle={{ color: '#eee' }}
//                 />
//                 <Bar 
//                   dataKey="students" 
//                   fill="#4ade80"
//                   radius={[4, 4, 0, 0]}
//                   barSize={25}
//                   animationDuration={1500}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Donut Chart - Monthly Attendance */}
//           <div style={{ 
//             backgroundColor: "#222222", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             flex: 2,
//             height: "350px"
//           }}>
//             <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
//               Monthly Attendance
//             </h2>
//             <ResponsiveContainer width="100%" height="85%">
//               <PieChart>
//                 <Pie
//                   data={monthlyData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={70}
//                   outerRadius={90}
//                   fill="#8884d8"
//                   paddingAngle={0}
//                   dataKey="value"
//                   stroke="#222"
//                   strokeWidth={4}
//                   animationDuration={1500}
//                 >
//                   {monthlyData.map((entry, index) => (
//                     <Cell 
//                       key={`cell-${index}`} 
//                       fill={COLORS[index % COLORS.length]}
//                       style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))' }} 
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: 'none', 
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
//                   }}
//                   formatter={(value, name) => [`${value}%`, name]}
//                   labelStyle={{ color: '#ccc' }}
//                   itemStyle={{ color: '#eee' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Records Tabs */}
//         <div style={{ backgroundColor: "#1f2937", borderRadius: "8px", overflow: "hidden", marginBottom: "32px" }}>
//           <div style={{ display: "flex" }}>
//             <button
//               style={{ 
//                 flex: 1, 
//                 padding: "12px 16px", 
//                 textAlign: "center",
//                 backgroundColor: activeTab === "all" ? "#1f2937" : "#374151",
//                 color: activeTab === "all" ? "white" : "#9ca3af",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//               onClick={() => setActiveTab("all")}
//             >
//               All Records
//             </button>
//             <button
//               style={{ 
//                 flex: 1, 
//                 padding: "12px 16px", 
//                 textAlign: "center",
//                 backgroundColor: activeTab === "today" ? "#1f2937" : "#374151",
//                 color: activeTab === "today" ? "white" : "#9ca3af",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//               onClick={() => setActiveTab("today")}
//             >
//               Today's Records
//             </button>
//           </div>

//           <div style={{ padding: "24px" }}>
//             {activeTab === "all" ? (
//               <div style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
//                 All records will be displayed here. Currently showing all attendance records in the table below.
//               </div>
//             ) : (
//               <div style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
//                 Today's records will be displayed here. Currently showing all attendance records in the table below.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Student Attendance Table */}
//         <div style={{ 
//           backgroundColor: "#1f2937", 
//           borderRadius: "8px", 
//           padding: "24px", 
//           marginBottom: "32px" 
//         }}>
//           <h2 style={{ color: "white", fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
//             Student Attendance
//           </h2>
          
//           {/* Search input */}
//           <div style={{ position: "relative", marginBottom: "24px" }}>
//             <div style={{ 
//               position: "absolute", 
//               top: "0", 
//               bottom: "0", 
//               left: "0", 
//               display: "flex", 
//               alignItems: "center", 
//               paddingLeft: "12px" 
//             }}>
//               <Search style={{ color: "#9ca3af", height: "16px", width: "16px" }} />
//             </div>
//             <input
//               type="text"
//               style={{ 
//                 backgroundColor: "#111827", 
//                 border: "1px solid #374151", 
//                 color: "white", 
//                 fontSize: "14px", 
//                 borderRadius: "8px", 
//                 width: "100%", 
//                 paddingLeft: "40px", 
//                 padding: "10px 12px" 
//               }}
//               placeholder="Search students..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           {/* Attendance table */}
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", fontSize: "14px", textAlign: "left" }}>
//               <thead style={{ textTransform: "uppercase", backgroundColor: "#111827", color: "#9ca3af", fontSize: "12px" }}>
//                 <tr>
//                   <th style={{ padding: "12px 16px", width: "192px" }}>Student Name</th>
//                   {Array.from({ length: 31 }, (_, i) => (
//                     <th key={i} style={{ padding: "12px 4px", textAlign: "center" }}>{(i + 1).toString().padStart(2, '0')}</th>
//                   ))}
//                   <th style={{ padding: "12px 12px", textAlign: "center" }}>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student) => (
//                   <tr key={student._id} style={{ borderBottom: "1px solid #374151" }}>
//                     <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
//                       <div
//                         style={{ 
//                           width: "32px", 
//                           height: "32px", 
//                           backgroundColor: "#3b82f6", 
//                           borderRadius: "50%", 
//                           display: "flex", 
//                           alignItems: "center", 
//                           justifyContent: "center", 
//                           color: "white",
//                           cursor: "pointer"
//                         }}
//                         onClick={() => navigate(`/students/${student.id}`)}
//                       >
//                         {student.initials}
//                       </div>
//                       <span style={{ color: "white" }}>{student.name}</span>
//                     </td>
//                     {student.attendance.map((status, index) => (
//                       <td key={index} style={{ padding: "12px 4px", textAlign: "center" }}>
//                         <div 
//                           style={{ 
//                             width: "24px", 
//                             height: "24px", 
//                             backgroundColor: getStatusColor(status), 
//                             borderRadius: "4px", 
//                             margin: "0 auto",
//                             cursor: "pointer"
//                           }}
//                           onClick={() => navigate(`/students/${student.id}`)}
//                         ></div>
//                       </td>
//                     ))}
//                     <td style={{ padding: "12px 12px", textAlign: "center", color: "white", fontWeight: "600" }}>
//                       {calculateTotal(student.attendance)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Legend */}
//           <div style={{ 
//             marginTop: "16px", 
//             display: "flex", 
//             alignItems: "center", 
//             gap: "24px", 
//             fontSize: "14px", 
//             color: "#9ca3af" 
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#10b981", borderRadius: "4px" }}></div>
//               <span>Present</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#ef4444", borderRadius: "4px" }}></div>
//               <span>Absent</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#facc15", borderRadius: "4px" }}></div>
//               <span>Partial</span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


//crt givee now


// import { useState, useEffect } from "react";
// import { Clock, Users, Calendar, RotateCw, Search } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Cell } from 'recharts';
// import { useNavigate, useLocation } from 'react-router-dom';
// import "../App.css"

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation(); // To determine the current URL path

//   // Fetch student data from the endpoint
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const data = await response.json();
//         // Process data to match the required student format
//         const processedStudents = data.map((student, index) => ({
//           id: index + 1,
//           name: student.name,
//           initials: student.name.split(' ').map(n => n[0]).join('').toUpperCase(),
//           attendance: Array(31).fill(null).map((_, i) => {
//             const date = `2025-05-${(i + 1).toString().padStart(2, '0')}`;
//             const totalSeconds = student.total_time[date] || 0;
//             const totalHours = totalSeconds / 3600; // Convert seconds to hours
//             if (totalHours >= 6) return "present";
//             if (totalHours >= 3) return "partial";
//             return "absent";
//           })
//         }));
//         setStudents(processedStudents);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Calculate total present students today (for May 11, 2025, as per current date)
//   const todayDate = 10; // May 11, 2025 (0-based index for May 11)
//   const presentToday = students.filter(s => 
//     s.attendance[todayDate] === "present" || s.attendance[todayDate] === "partial"
//   ).length;

//   // Calculate total records
//   const totalRecords = students.length * 31;

//   // Calculate average attendance time
//   const averageTime = students.reduce((acc, student) => {
//     const totalHours = student.attendance.reduce((sum, status, i) => {
//       const date = `2025-05-${(i + 1).toString().padStart(2, '0')}`;
//       const seconds = student.total_time?.[date] || 0;
//       return sum + (seconds / 3600);
//     }, 0);
//     return acc + totalHours / 31;
//   }, 0) / (students.length || 1);
//   const avgTimeFormatted = new Date(averageTime * 3600 * 1000).toISOString().substr(11, 8);

//   // Data for the last 5 days (May 7-11, 2025)
//   const lastFiveDaysData = [7, 8, 9, 10, 11].map(day => ({
//     name: `05/${day.toString().padStart(2, '0')}`,
//     students: students.filter(s => 
//       s.attendance[day - 1] === "present" || s.attendance[day - 1] === "partial"
//     ).length
//   }));

//   // Calculate overall attendance percentage for pie chart
//   const totalDays = students.length * 31;
//   const presentDays = students.reduce((acc, student) => 
//     acc + student.attendance.filter(a => a === "present").length, 0);
//   const partialDays = students.reduce((acc, student) => 
//     acc + student.attendance.filter(a => a === "partial").length, 0);
//   const absentDays = totalDays - presentDays - partialDays;
  
//   const monthlyData = [
//     { name: 'Present', value: Math.round((presentDays / totalDays) * 100) },
//     { name: 'Partial', value: Math.round((partialDays / totalDays) * 100) },
//     { name: 'Absent', value: Math.round((absentDays / totalDays) * 100) },
//   ];

//   const COLORS = ['#34d399', '#fbbf24', '#ef4444']; // Green for present, Yellow for partial, Red for absent

//   const filteredStudents = students.filter(student => 
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Calculate attendance totals for each student
//   const calculateTotal = (attendance) => {
//     const present = attendance.filter(a => a => "present").length;
//     const partial = attendance.filter(a => a => "partial").length;
//     return present + (partial * 0.5); // Count partial as 0.5
//   };

//   // Get attendance status color
//   const getStatusColor = (status) => {
//     switch(status) {
//       case "present": return "#10b981"; // Green
//       case "absent": return "#ef4444";  // Red
//       case "partial": return "#fbbf24"; // Yellow
//       default: return "#e5e7eb";        // Gray
//     }
//   };

//   // Function to determine if a button is active based on the current URL
//   const getActiveClass = (path) => {
//     // Since we're navigating to external URLs, we'll check the port in the URL
//     const currentPort = location.pathname.split(':').pop() || '5000'; // Default to Dashboard port
//     return currentPort === path ? 'active' : '';
//   };

//   if (loading) {
//     return <div style={{ color: "white", textAlign: "center", padding: "50px" }}>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: "#09090d"
//     }}>
//       {/* Header */}
//       <header style={{
//         backgroundColor: "#22d3ee",
//         padding: "12px 24px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between"
//       }}>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <div style={{ 
//             backgroundColor: "black", 
//             borderRadius: "50%", 
//             padding: "8px", 
//             marginRight: "12px" 
//           }}>
//             <Clock style={{ color: "white", height: "20px", width: "20px" }} />
//           </div>
//           <span style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>FaceTrack</span>
//         </div>

//         <nav style={{ display: "flex", gap: "24px" }}>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={location.pathname === '/' ? 'active' : ''} 
//             onClick={() => navigate('/')}
//           >
//             Dashboard
//           </button>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={getActiveClass('8002')} 
//             onClick={() => window.location.href = 'http://localhost:8002/'}
//           >
//             Register Face
//           </button>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={getActiveClass('8000')} 
//             onClick={() => window.location.href = 'http://localhost:8000/'}
//           >
//             Entry Camera
//           </button>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={getActiveClass('8001')} 
//             onClick={() => window.location.href = 'http://localhost:8001/'}
//           >
//             Exit Camera
//           </button>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={location.pathname === '/records' ? 'active' : ''} 
//             onClick={() => navigate('/records')}
//           >
//             Records
//           </button>
//         </nav>

//         <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <div style={{ 
//               backgroundColor: "#e5e7eb", 
//               borderRadius: "50%", 
//               padding: "4px", 
//               marginRight: "8px" 
//             }}>
//               <Users style={{ color: "#4b5563", height: "16px", width: "16px" }} />
//             </div>
//             <span>rk</span>
//           </div>
//           <button style={{ 
//             backgroundColor: "#1f2937", 
//             color: "white", 
//             padding: "4px 16px", 
//             borderRadius: "4px",
//             border: "none",
//             display: "flex",
//             alignItems: "center",
//             cursor: "pointer"
//           }}>
//             <span  onClick={() => navigate('/login')} style={{ marginRight: "8px" }}>Logout</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//               <polyline points="16 17 21 12 16 7" />
//               <line x1="21" y1="12" x2="9" y2="12" />
//             </svg>
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main style={{ flex: 1, padding: "0" }}> 
//         <h1 style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "32px" }}>
//           Attendance Dashboard
//         </h1>

//         {/* Stats Cards */}
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "row", 
//           gap: "24px", 
//           marginBottom: "32px" 
//         }}>
//           {/* Total Users Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Users</h2>
//               <Users style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{students.length}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Registered in the system</p>
//           </div>

//           {/* Present Today Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Present Today</h2>
//               <Calendar style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{presentToday}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>People checked in today</p>
//           </div>

//           {/* Average Time Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Average Time</h2>
//               <Clock style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{avgTimeFormatted}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Average attendance duration</p>
//           </div>

//           {/* Total Records Card */}
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: 1
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Records</h2>
//               <RotateCw style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{totalRecords}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Total attendance records</p>
//           </div>
//         </div>

//         {/* Charts Row */}
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "row", 
//           gap: "24px", 
//           marginBottom: "32px"
//         }}>
//           {/* Bar Chart - Last 5 Days */}
//           <div style={{ 
//             backgroundColor: "#222222", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             flex: 3,
//             height: "350px"
//           }}>
//             <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
//               Attendance (Last 5 Days)
//             </h2>
//             <ResponsiveContainer width="100%" height="85%">
//               <BarChart 
//                 data={lastFiveDaysData} 
//                 margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
//                 <XAxis dataKey="name" tick={{ fill: '#999' }} />
//                 <YAxis tick={{ fill: '#999' }} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: 'none', 
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
//                   }}
//                   labelStyle={{ color: '#ccc' }}
//                   itemStyle={{ color: '#eee' }}
//                 />
//                 <Bar 
//                   dataKey="students" 
//                   fill="#4ade80"
//                   radius={[4, 4, 0, 0]}
//                   barSize={25}
//                   animationDuration={1500}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Donut Chart - Monthly Attendance */}
//           <div style={{ 
//             backgroundColor: "#222222", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             flex: 2,
//             height: "350px"
//           }}>
//             <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
//               Monthly Attendance
//             </h2>
//             <ResponsiveContainer width="100%" height="85%">
//               <PieChart>
//                 <Pie
//                   data={monthlyData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={70}
//                   outerRadius={90}
//                   fill="#8884d8"
//                   paddingAngle={0}
//                   dataKey="value"
//                   stroke="#222"
//                   strokeWidth={4}
//                   animationDuration={1500}
//                 >
//                   {monthlyData.map((entry, index) => (
//                     <Cell 
//                       key={`cell-${index}`} 
//                       fill={COLORS[index % COLORS.length]}
//                       style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))' }} 
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: 'none', 
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
//                   }}
//                   formatter={(value, name) => [`${value}%`, name]}
//                   labelStyle={{ color: '#ccc' }}
//                   itemStyle={{ color: '#eee' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Records Tabs */}
//         <div style={{ backgroundColor: "#1f2937", borderRadius: "8px", overflow: "hidden", marginBottom: "32px" }}>
//           <div style={{ display: "flex" }}>
//             <button
//               style={{ 
//                 flex: 1, 
//                 padding: "12px 16px", 
//                 textAlign: "center",
//                 backgroundColor: activeTab === "all" ? "#1f2937" : "#374151",
//                 color: activeTab === "all" ? "white" : "#9ca3af",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//               onClick={() => setActiveTab("all")}
//             >
//               All Records
//             </button>
//             <button
//               style={{ 
//                 flex: 1, 
//                 padding: "12px 16px", 
//                 textAlign: "center",
//                 backgroundColor: activeTab === "today" ? "#1f2937" : "#374151",
//                 color: activeTab === "today" ? "white" : "#9ca3af",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//               onClick={() => setActiveTab("today")}
//             >
//               Today's Records
//             </button>
//           </div>

//           <div style={{ padding: "24px" }}>
//             {activeTab === "all" ? (
//               <div style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
//                 All records will be displayed here. Currently showing all attendance records in the table below.
//               </div>
//             ) : (
//               <div style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
//                 Today's records will be displayed here. Currently showing all attendance records in the table below.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Student Attendance Table */}
//         <div style={{ 
//           backgroundColor: "#1f2937", 
//           borderRadius: "8px", 
//           padding: "24px", 
//           marginBottom: "32px" 
//         }}>
//           <h2 style={{ color: "white", fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
//             Student Attendance
//           </h2>
          
//           {/* Search input */}
//           <div style={{ position: "relative", marginBottom: "24px" }}>
//             <div style={{ 
//               position: "absolute", 
//               top: "0", 
//               bottom: "0", 
//               left: "0", 
//               display: "flex", 
//               alignItems: "center", 
//               paddingLeft: "12px" 
//             }}>
//               <Search style={{ color: "#9ca3af", height: "16px", width: "16px" }} />
//             </div>
//             <input
//               type="text"
//               style={{ 
//                 backgroundColor: "#111827", 
//                 border: "1px solid #374151", 
//                 color: "white", 
//                 fontSize: "14px", 
//                 borderRadius: "8px", 
//                 width: "100%", 
//                 paddingLeft: "40px", 
//                 padding: "10px 12px" 
//               }}
//               placeholder="Search students..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           {/* Attendance table */}
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", fontSize: "14px", textAlign: "left" }}>
//               <thead style={{ textTransform: "uppercase", backgroundColor: "#111827", color: "#9ca3af", fontSize: "12px" }}>
//                 <tr>
//                   <th style={{ padding: "12px 16px", width: "192px" }}>Student Name</th>
//                   {Array.from({ length: 31 }, (_, i) => (
//                     <th key={i} style={{ padding: "12px 4px", textAlign: "center" }}>{(i + 1).toString().padStart(2, '0')}</th>
//                   ))}
//                   <th style={{ padding: "12px 12px", textAlign: "center" }}>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student) => (
//                   <tr key={student._id} style={{ borderBottom: "1px solid #374151" }}>
//                     <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
//                       <div
//                         style={{ 
//                           width: "32px", 
//                           height: "32px", 
//                           backgroundColor: "#3b82f6", 
//                           borderRadius: "50%", 
//                           display: "flex", 
//                           alignItems: "center", 
//                           justifyContent: "center", 
//                           color: "white",
//                           cursor: "pointer"
//                         }}
//                         onClick={() => navigate(`/students/${student.id}`)}
//                       >
//                         {student.initials}
//                       </div>
//                       <span style={{ color: "white" }}>{student.name}</span>
//                     </td>
//                     {student.attendance.map((status, index) => (
//                       <td key={index} style={{ padding: "12px 4px", textAlign: "center" }}>
//                         <div 
//                           style={{ 
//                             width: "24px", 
//                             height: "24px", 
//                             backgroundColor: getStatusColor(status), 
//                             borderRadius: "4px", 
//                             margin: "0 auto",
//                             cursor: "pointer"
//                           }}
//                           onClick={() => navigate(`/students/${student.id}`)}
//                         ></div>
//                       </td>
//                     ))}
//                     <td style={{ padding: "12px 12px", textAlign: "center", color: "white", fontWeight: "600" }}>
//                       {calculateTotal(student.attendance)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Legend */}
//           <div style={{ 
//             marginTop: "16px", 
//             display: "flex", 
//             alignItems: "center", 
//             gap: "24px", 
//             fontSize: "14px", 
//             color: "#9ca3af" 
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#10b981", borderRadius: "4px" }}></div>
//               <span>Present</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#ef4444", borderRadius: "4px" }}></div>
//               <span>Absent</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#facc15", borderRadius: "4px" }}></div>
//               <span>Partial</span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// /*
//  const getStatusColor = (status) => {
//     switch (status) {
//       case "Present":
//         return "#34d399"; // Softer teal-green
//       case "Partial":
//         return "#fbbf24"; // Softer amber
//       case "Absent":
//         return "#f87171"; // Softer coral red
//       default:
//         return "#6b7280"; // Neutral gray for unknown status
//     }
//   };
// */

//crt code dra


// import { useState, useEffect } from "react";
// import { Clock, Users, Calendar, RotateCw, Search } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Cell } from 'recharts';
// import { useNavigate, useLocation } from 'react-router-dom';
// import "../App.css";

// // Period Timings (from StudentDetails)
// const periodTimings = [
//   { period: 1, time: "08:40 - 09:40" },
//   { period: 2, time: "09:40 - 10:40" },
//   { period: "Tea Break", time: "10:40 - 11:00" },
//   { period: 3, time: "11:00 - 12:00" },
//   { period: 4, time: "12:00 - 13:00" },
//   { period: "Lunch Break", time: "13:00 - 13:40" },
//   { period: 5, time: "13:40 - 14:30" },
//   { period: 6, time: "14:30 - 15:20" },
//   { period: 7, time: "15:20 - 16:10" },
// ];

// // Weekly Schedule (from StudentDetails)
// const weeklySchedule = {
//   Monday: [
//     { period: 1, subject: "DCN" },
//     { period: 2, subject: "OS" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "FSD" },
//     { period: 4, subject: "CC" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "ES" },
//     { period: 6, subject: "OS" },
//     { period: 7, subject: "MV" },
//   ],
//   Tuesday: [
//     { period: 1, subject: "PS" },
//     { period: 2, subject: "OS LAB" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "OS LAB" },
//     { period: 4, subject: "OS LAB próxima vez" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "Attitude" },
//     { period: 6, subject: "DCN" },
//     { period: 7, subject: "PS" },
//   ],
//   Wednesday: [
//     { period: 1, subject: "PS" },
//     { period: 2, subject: "DCN" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "DCN LAB" },
//     { period: 4, subject: "DCN LAB" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "MV" },
//     { period: 6, subject: "LIB/TWN" },
//     { period: 7, subject: "CC" },
//   ],
//   Thursday: [
//     { period: 1, subject: "FSD" },
//     { period: 2, subject: "PS" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "OS" },
//     { period: 4, subject: "PS" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "CC" },
//     { period: 6, subject: "CC LAB" },
//     { period: 7, subject: "CC LAB" },
//   ],
//   Friday: [
//     { period: 1, subject: "MV" },
//     { period: 2, subject: "SOFT SKILLS" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "FSD" },
//     { period: 4, subject: "CC" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "MINI PROJECT" },
//     { period: 6, subject: "MINI PROJECT" },
//     { period: 7, subject: "MINI PROJECT" },
//   ],
//   Saturday: [
//     { period: 1, subject: "OS" },
//     { period: 2, subject: "DCN" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "FSD" },
//     { period: 4, subject: "CC" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "COE" },
//     { period: 6, subject: "COE" },
//     { period: 7, subject: "ACTIVITIES" },
//   ],
// };

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Current date: May 19, 2025
//   const currentDate = "2025-05-19";
//   const todayDateIndex = 18; // 0-based index for May 19

//   // Helper functions (from StudentDetails)
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(":").map(Number);
//     return hours * 60 + minutes;
//   };

//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(" - ");
//     return { start: parseTime(start), end: parseTime(end) };
//   };

//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
//   };

//   const getAttendanceStatus = (minutes) => {
//     if (minutes >= 40) return "Present";
//     if (minutes >= 20) return "Partial";
//     return "Absent";
//   };

//   const getDayOfWeek = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-US", { weekday: "long" });
//   };

//   // Fetch and process student data
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const data = await response.json();

//         // Process attendance for each student
//         const processedStudents = data.map((student) => {
//           const attendanceDetails = [];
//           const detailsMap = new Map();

//           if (student.entry_times && student.exit_times) {
//             const entryTimes = student.entry_times;
//             const exitTimes = student.exit_times;

//             for (let i = 0; i < entryTimes.length; i++) {
//               const entry = new Date(entryTimes[i].replace("Z", "+05:30"));
//               const exit = i < exitTimes.length ? new Date(exitTimes[i].replace("Z", "+05:30")) : null;
//               if (!exit) continue;

//               const entryDate = entry.toISOString().split("T")[0];
//               const dayOfWeek = getDayOfWeek(entryDate);
//               const dailySchedule = weeklySchedule[dayOfWeek] || [];

//               const entryMinutes = dateToMinutes(entry);
//               const exitMinutes = dateToMinutes(exit);

//               dailySchedule.forEach((period) => {
//                 if (typeof period.period === "string") return;
//                 const periodTime = periodTimings.find((p) => p.period === period.period);
//                 if (!periodTime) return;

//                 const { start, end } = getPeriodTimes(periodTime.time);
//                 if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) return;

//                 const overlapStart = Math.max(entryMinutes, start);
//                 const overlapEnd = Math.min(exitMinutes, end);

//                 if (
//                   overlapStart < overlapEnd ||
//                   (overlapStart === overlapEnd && period.period === 2 && entryDate === "2025-05-14")
//                 ) {
//                   const minutesInside =
//                     period.period === 2 && entryDate === "2025-05-14" ? 0 : Math.ceil(overlapEnd - overlapStart);
//                   const key = `${entryDate}-${period.period}`;
//                   const status = getAttendanceStatus(minutesInside);

//                   if (detailsMap.has(key)) {
//                     const existing = detailsMap.get(key);
//                     existing.minutes += minutesInside;
//                     existing.status = getAttendanceStatus(existing.minutes);
//                   } else {
//                     detailsMap.set(key, {
//                       date: entryDate,
//                       period: period.period,
//                       subject: period.subject,
//                       time: periodTime.time,
//                       minutes: minutesInside,
//                       status: status,
//                     });
//                   }
//                 }
//               });
//             }

//             attendanceDetails.push(...detailsMap.values());
//           }

//           // Calculate daily attendance status
//           const groupedByDate = {};
//           attendanceDetails.forEach((detail) => {
//             if (!groupedByDate[detail.date]) groupedByDate[detail.date] = [];
//             groupedByDate[detail.date].push(detail);
//           });

//           const dailyAttendance = Object.keys(groupedByDate).map((date) => {
//             const periods = groupedByDate[date];
//             const presentCount = periods.filter((p) => p.status === "Present").length;
//             const partialCount = periods.filter((p) => p.status === "Partial").length;
//             let status;
//             if (presentCount > 4) status = "Present";
//             else if (presentCount + partialCount < 3) status = "Absent";
//             else status = "Partial";
//             return { date, periods, status };
//           });

//           // Generate monthly attendance for May 2025
//           const monthlyAttendance = Array(31).fill("Absent").map((_, i) => {
//             const date = `2025-05-${(i + 1).toString().padStart(2, '0')}`;
//             const dayAttendance = dailyAttendance.find((d) => d.date === date);
//             return dayAttendance ? dayAttendance.status : "Absent";
//           });

//           // Calculate today's time spent and status
//           let todayTimeSpent = 0;
//           let todayStatus = "Absent";
//           if (student.entry_times && student.exit_times) {
//             const todayEntries = student.entry_times.filter(time => time.startsWith(currentDate));
//             const todayExits = student.exit_times.filter(time => time.startsWith(currentDate));
//             if (todayEntries.length > 0 && todayExits.length > 0) {
//               const entry = new Date(todayEntries[0].replace("Z", "+05:30"));
//               const exit = new Date(todayExits[0].replace("Z", "+05:30"));
//               todayTimeSpent = (exit - entry) / 1000; // Seconds
//               const periodsToday = dailyAttendance.find(d => d.date === currentDate)?.periods || [];
//               const presentCount = periodsToday.filter(p => p.status === "Present").length;
//               const partialCount = periodsToday.filter(p => p.status === "Partial").length;
//               todayStatus = presentCount > 4 ? "Present" : (presentCount + partialCount >= 3 ? "Partial" : "Absent");
//             }
//           }

//           // Calculate total present days
//           const totalPresent = monthlyAttendance.reduce((acc, status) => {
//             if (status === "Present") return acc + 1;
//             if (status === "Partial") return acc + 0.5;
//             return acc;
//           }, 0);

//           return {
//             id: student.id,
//             name: student.name,
//             initials: student.name.split(' ').map(n => n[0]).join('').toUpperCase(),
//             monthlyAttendance,
//             todayTimeSpent,
//             todayStatus,
//             totalPresent,
//           };
//         });

//         setStudents(processedStudents);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Calculate total present students today
//   const presentToday = students.filter(s => 
//     s.todayStatus === "Present" || s.todayStatus === "Partial"
//   ).length;

//   // Calculate average time spent today
//   const averageTimeToday = students.reduce((acc, student) => {
//     return student.todayStatus !== "Absent" ? acc + student.todayTimeSpent : acc;
//   }, 0) / (presentToday || 1);
//   const avgTimeTodayFormatted = averageTimeToday > 0 
//     ? new Date(averageTimeToday * 1000).toISOString().substr(11, 5)
//     : "00:00";

//   // Total records
//   const totalRecords = students.length * 31;

//   // Data for last 5 days (May 15-19, 2025)
//   const lastFiveDaysData = [15, 16, 17, 18, 19].map(day => ({
//     name: `05/${day.toString().padStart(2, '0')}`,
//     students: students.filter(s => 
//       s.monthlyAttendance[day - 1] === "Present" || s.monthlyAttendance[day - 1] === "Partial"
//     ).length
//   }));

//   // Monthly attendance for pie chart
//   const totalDays = students.length * 31;
//   const presentDays = students.reduce((acc, student) => 
//     acc + student.monthlyAttendance.filter(a => a === "Present").length, 0);
//   const partialDays = students.reduce((acc, student) => 
//     acc + student.monthlyAttendance.filter(a => a === "Partial").length, 0);
//   const absentDays = totalDays - presentDays - partialDays;

//   const monthlyData = [
//     { name: 'Present', value: Math.round((presentDays / totalDays) * 100) },
//     { name: 'Partial', value: Math.round((partialDays / totalDays) * 100) },
//     { name: 'Absent', value: Math.round((absentDays / totalDays) * 100) },
//   ];

//   const COLORS = ['#34d399', '#fbbf24', '#ef4444'];

//   // Filter students by search term
//   const filteredStudents = students.filter(student => 
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Get status color
//   const getStatusColor = (status) => {
//     switch(status) {
//       case "Present": return "#34d399"; // Green
//       case "Partial": return "#fbbf24"; // Yellow
//       case "Absent": return "#ef4444";  // Red
//       default: return "#6b7280";        // Gray
//     }
//   };

//   // Navigation button active class
//   const getActiveClass = (path) => {
//     const currentPort = location.pathname.split(':').pop() || '5000';
//     return currentPort === path ? 'active' : '';
//   };

//   if (loading) {
//     return <div style={{ color: "white", textAlign: "center", padding: "50px" }}>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: "#09090d"
//     }}>
//       {/* Header */}
//       <header style={{
//         backgroundColor: "#22d3ee",
//         padding: "12px 24px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between"
//       }}>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <div style={{ 
//             backgroundColor: "black", 
//             borderRadius: "50%", 
//             padding: "8px", 
//             marginRight: "12px" 
//           }}>
//             <Clock style={{ color: "white", height: "20px", width: "20px" }} />
//           </div>
//           <span style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>FaceTrack</span>
//         </div>
//         <nav style={{ display: "flex", gap: "24px" }}>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={location.pathname === '/' ? 'active' : ''} 
//             onClick={() => navigate('/')}
//           >
//             Dashboard
//           </button>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={getActiveClass('8002')} 
//             onClick={() => window.location.href = 'http://localhost:8002/'}
//           >
//             Register Face
//           </button>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={getActiveClass('8000')} 
//             onClick={() => window.location.href = 'http://localhost:8000/'}
//           >
//             Entry Camera
//           </button>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={getActiveClass('8001')} 
//             onClick={() => window.location.href = 'http://localhost:8001/'}
//           >
//             Exit Camera
//           </button>
//           <button 
//             style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
//             className={location.pathname === '/records' ? 'active' : ''} 
//             onClick={() => navigate('/records')}
//           >
//             Records
//           </button>
//         </nav>
//         <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <div style={{ 
//               backgroundColor: "#e5e7eb", 
//               borderRadius: "50%", 
//               padding: "4px", 
//               marginRight: "8px" 
//             }}>
//               <Users style={{ color: "#4b5563", height: "16px", width: "16px" }} />
//             </div>
//             <span>rk</span>
//           </div>
//           <button style={{ 
//             backgroundColor: "#1f2937", 
//             color: "white", 
//             padding: "4px 16px", 
//             borderRadius: "4px",
//             border: "none",
//             display: "flex",
//             alignItems: "center",
//             cursor: "pointer"
//           }}>
//             <span onClick={() => navigate('/login')} style={{ marginRight: "8px" }}>Logout</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//               <polyline points="16 17 21 12 16 7" />
//               <line x1="21" y1="12" x2="9" y2="12" />
//             </svg>
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main style={{ flex: 1, padding: "24px" }}>
//         <h1 style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "32px" }}>
//           Attendance Dashboard
//         </h1>

//         {/* Stats Cards */}
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "row", 
//           gap: "24px", 
//           marginBottom: "32px",
//           flexWrap: "wrap"
//         }}>
//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: "1 1 200px"
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Users</h2>
//               <Users style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{students.length}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Registered in the system</p>
//           </div>

//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: "1 1 200px"
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Present Today</h2>
//               <Calendar style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{presentToday}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>People checked in today</p>
//           </div>

//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: "1 1 200px"
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Average Time Today</h2>
//               <Clock style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{avgTimeTodayFormatted}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Average attendance today</p>
//           </div>

//           <div style={{ 
//             backgroundColor: "#111827", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             border: "1px solid #1f2937",
//             flex: "1 1 200px"
//           }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               marginBottom: "16px" 
//             }}>
//               <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Records</h2>
//               <RotateCw style={{ color: "white", height: "20px", width: "20px" }} />
//             </div>
//             <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{totalRecords}</p>
//             <p style={{ color: "#9ca3af", fontSize: "14px" }}>Total attendance records</p>
//           </div>
//         </div>

//         {/* Charts Row */}
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "row", 
//           gap: "24px", 
//           marginBottom: "32px",
//           flexWrap: "wrap"
//         }}>
//           <div style={{ 
//             backgroundColor: "#222222", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             flex: "3 1 600px",
//             height: "350px"
//           }}>
//             <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
//               Attendance (Last 5 Days)
//             </h2>
//             <ResponsiveContainer width="100%" height="85%">
//               <BarChart 
//                 data={lastFiveDaysData} 
//                 margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
//                 <XAxis dataKey="name" tick={{ fill: '#999' }} />
//                 <YAxis tick={{ fill: '#999' }} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: 'none', 
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
//                   }}
//                   labelStyle={{ color: '#ccc' }}
//                   itemStyle={{ color: '#eee' }}
//                 />
//                 <Bar 
//                   dataKey="students" 
//                   fill="#4ade80"
//                   radius={[4, 4, 0, 0]}
//                   barSize={25}
//                   animationDuration={1500}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div style={{ 
//             backgroundColor: "#222222", 
//             borderRadius: "8px", 
//             padding: "24px", 
//             flex: "2 1 400px",
//             height: "350px"
//           }}>
//             <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
//               Monthly Attendance
//             </h2>
//             <ResponsiveContainer width="100%" height="85%">
//               <PieChart>
//                 <Pie
//                   data={monthlyData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={70}
//                   outerRadius={90}
//                   fill="#8884d8"
//                   paddingAngle={0}
//                   dataKey="value"
//                   stroke="#222"
//                   strokeWidth={4}
//                   animationDuration={1500}
//                 >
//                   {monthlyData.map((entry, index) => (
//                     <Cell 
//                       key={`cell-${index}`} 
//                       fill={COLORS[index % COLORS.length]}
//                       style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))' }} 
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: 'none', 
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
//                   }}
//                   formatter={(value, name) => [`${value}%`, name]}
//                   labelStyle={{ color: '#ccc' }}
//                   itemStyle={{ color: '#eee' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Records Tabs */}
//         <div style={{ backgroundColor: "#1f2937", borderRadius: "8px", overflow: "hidden", marginBottom: "32px" }}>
//           <div style={{ display: "flex" }}>
//             <button
//               style={{ 
//                 flex: 1, 
//                 padding: "12px 16px", 
//                 textAlign: "center",
//                 backgroundColor: activeTab === "all" ? "#1f2937" : "#374151",
//                 color: activeTab === "all" ? "white" : "#9ca3af",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//               onClick={() => setActiveTab("all")}
//             >
//               All Records
//             </button>
//             <button
//               style={{ 
//                 flex: 1, 
//                 padding: "12px 16px", 
//                 textAlign: "center",
//                 backgroundColor: activeTab === "today" ? "#1f2937" : "#374151",
//                 color: activeTab === "today" ? "white" : "#9ca3af",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//               onClick={() => setActiveTab("today")}
//             >
//               Today's Records
//             </button>
//           </div>

//           <div style={{ padding: "24px" }}>
//             {activeTab === "all" ? (
//               <div style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
//                 All records are displayed in the table below.
//               </div>
//             ) : (
//               <div style={{ overflowX: "auto" }}>
//                 <h3 style={{ color: "white", fontSize: "18px", marginBottom: "16px" }}>Today's Attendance Records</h3>
//                 <table style={{ width: "100%", fontSize: "14px", textAlign: "left" }}>
//                   <thead style={{ backgroundColor: "#111827", color: "#9ca3af", fontSize: "12px" }}>
//                     <tr>
//                       <th style={{ padding: "12px 16px" }}>Student Name</th>
//                       <th style={{ padding: "12px 16px" }}>Status</th>
//                       <th style={{ padding: "12px 16px" }}>Time Spent</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredStudents.map(student => (
//                       <tr key={student.id} style={{ borderBottom: "1px solid #374151" }}>
//                         <td style={{ padding: "12px 16px", color: "white" }}>{student.name}</td>
//                         <td style={{ padding: "12px 16px" }}>
//                           <span style={{
//                             display: "inline-block",
//                             padding: "4px 12px",
//                             borderRadius: "9999px",
//                             fontSize: "12px",
//                             backgroundColor: getStatusColor(student.todayStatus),
//                             color: student.todayStatus === "Partial" ? "#1f2937" : "white"
//                           }}>
//                             {student.todayStatus.charAt(0).toUpperCase() + student.todayStatus.slice(1)}
//                           </span>
//                         </td>
//                         <td style={{ padding: "12px 16px", color: "white" }}>
//                           {student.todayTimeSpent > 0 
//                             ? new Date(student.todayTimeSpent * 1000).toISOString().substr(11, 5)
//                             : "-"}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Student Attendance Table */}
//         <div style={{ 
//           backgroundColor: "#1f2937", 
//           borderRadius: "8px", 
//           padding: "24px", 
//           marginBottom: "32px" 
//         }}>
//           <h2 style={{ color: "white", fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
//             Student Attendance (May 2025)
//           </h2>
          
//           <div style={{ position: "relative", marginBottom: "24px" }}>
//             <div style={{ 
//               position: "absolute", 
//               top: "0", 
//               bottom: "0", 
//               left: "0", 
//               display: "flex", 
//               alignItems: "center", 
//               paddingLeft: "12px" 
//             }}>
//               <Search style={{ color: "#9ca3af", height: "16px", width: "16px" }} />
//             </div>
//             <input
//               type="text"
//               style={{ 
//                 backgroundColor: "#111827", 
//                 border: "1px solid #374151", 
//                 color: "white", 
//                 fontSize: "14px", 
//                 borderRadius: "8px", 
//                 width: "100%", 
//                 paddingLeft: "40px", 
//                 padding: "10px 12px" 
//               }}
//               placeholder="Search students..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", fontSize: "14px", textAlign: "left" }}>
//               <thead style={{ textTransform: "uppercase", backgroundColor: "#111827", color: "#9ca3af", fontSize: "12px" }}>
//                 <tr>
//                   <th style={{ padding: "12px 16px", width: "192px" }}>Student Name</th>
//                   {Array.from({ length: 31 }, (_, i) => (
//                     <th key={i} style={{ padding: "12px 4px", textAlign: "center" }}>{(i + 1).toString().padStart(2, '0')}</th>
//                   ))}
//                   <th style={{ padding: "12px 12px", textAlign: "center" }}>Total Present</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student) => (
//                   <tr key={student.id} style={{ borderBottom: "1px solid #374151" }}>
//                     <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
//                       <div
//                         style={{ 
//                           width: "32px", 
//                           height: "32px", 
//                           backgroundColor: "#3b82f6", 
//                           borderRadius: "50%", 
//                           display: "flex", 
//                           alignItems: "center", 
//                           justifyContent: "center", 
//                           color: "white",
//                           cursor: "pointer"
//                         }}
//                         onClick={() => navigate(`/students/${student.id}`)}
//                       >
//                         {student.initials}
//                       </div>
//                       <span style={{ color: "white" }}>{student.name}</span>
//                     </td>
//                     {student.monthlyAttendance.map((status, index) => (
//                       <td key={index} style={{ padding: "12px 4px", textAlign: "center" }}>
//                         <div 
//                           style={{ 
//                             width: "24px", 
//                             height: "24px", 
//                             backgroundColor: getStatusColor(status), 
//                             borderRadius: "4px", 
//                             margin: "0 auto",
//                             cursor: "pointer"
//                           }}
//                           onClick={() => navigate(`/students/${student.id}`)}
//                         ></div>
//                       </td>
//                     ))}
//                     <td style={{ padding: "12px 12px", textAlign: "center", color: "white", fontWeight: "600" }}>
//                       {student.totalPresent.toFixed(1)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           <div style={{ 
//             marginTop: "16px", 
//             display: "flex", 
//             alignItems: "center", 
//             gap: "24px", 
//             fontSize: "14px", 
//             color: "#9ca3af" 
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#34d399", borderRadius: "4px" }}></div>
//               <span>Present</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#fbbf24", borderRadius: "4px" }}></div>
//               <span>Partial</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div style={{ width: "16px", height: "16px", backgroundColor: "#ef4444", borderRadius: "4px" }}></div>
//               <span>Absent</span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { Clock, Users, Calendar, RotateCw, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { useNavigate, useLocation } from 'react-router-dom';
import "../App.css";

// Period Timings (from StudentDetails)
const periodTimings = [
  { period: 1, time: "08:40 - 09:40" },
  { period: 2, time: "09:40 - 10:40" },
  { period: "Tea Break", time: "10:40 - 11:00" },
  { period: 3, time: "11:00 - 12:00" },
  { period: 4, time: "12:00 - 13:00" },
  { period: "Lunch Break", time: "13:00 - 13:40" },
  { period: 5, time: "13:40 - 14:30" },
  { period: 6, time: "14:30 - 15:20" },
  { period: 7, time: "15:20 - 16:10" },
];

// Weekly Schedule (from StudentDetails)
const weeklySchedule = {
  Monday: [
    { period: 1, subject: "DCN" },
    { period: 2, subject: "OS" },
    { period: "Tea Break", subject: "Break" },
    { period: 3, subject: "FSD" },
    { period: 4, subject: "CC" },
    { period: "Lunch Break", subject: "Break" },
    { period: 5, subject: "ES" },
    { period: 6, subject: "OS" },
    { period: 7, subject: "MV" },
  ],
  Tuesday: [
    { period: 1, subject: "PS" },
    { period: 2, subject: "OS LAB" },
    { period: "Tea Break", subject: "Break" },
    { period: 3, subject: "OS LAB" },
    { period: 4, subject: "OS LAB próxima vez" },
    { period: "Lunch Break", subject: "Break" },
    { period: 5, subject: "Attitude" },
    { period: 6, subject: "DCN" },
    { period: 7, subject: "PS" },
  ],
  Wednesday: [
    { period: 1, subject: "PS" },
    { period: 2, subject: "DCN" },
    { period: "Tea Break", subject: "Break" },
    { period: 3, subject: "DCN LAB" },
    { period: 4, subject: "DCN LAB" },
    { period: "Lunch Break", subject: "Break" },
    { period: 5, subject: "MV" },
    { period: 6, subject: "LIB/TWN" },
    { period: 7, subject: "CC" },
  ],
  Thursday: [
    { period: 1, subject: "FSD" },
    { period: 2, subject: "PS" },
    { period: "Tea Break", subject: "Break" },
    { period: 3, subject: "OS" },
    { period: 4, subject: "PS" },
    { period: "Lunch Break", subject: "Break" },
    { period: 5, subject: "CC" },
    { period: 6, subject: "CC LAB" },
    { period: 7, subject: "CC LAB" },
  ],
  Friday: [
    { period: 1, subject: "MV" },
    { period: 2, subject: "SOFT SKILLS" },
    { period: "Tea Break", subject: "Break" },
    { period: 3, subject: "FSD" },
    { period: 4, subject: "CC" },
    { period: "Lunch Break", subject: "Break" },
    { period: 5, subject: "MINI PROJECT" },
    { period: 6, subject: "MINI PROJECT" },
    { period: 7, subject: "MINI PROJECT" },
  ],
  Saturday: [
    { period: 1, subject: "OS" },
    { period: 2, subject: "DCN" },
    { period: "Tea Break", subject: "Break" },
    { period: 3, subject: "FSD" },
    { period: 4, subject: "CC" },
    { period: "Lunch Break", subject: "Break" },
    { period: 5, subject: "COE" },
    { period: 6, subject: "COE" },
    { period: 7, subject: "ACTIVITIES" },
  ],
};


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Current date: May 19, 2025
  const currentDate = "2025-05-19";
  const todayDateIndex = 18; // 0-based index for May 19

  // Helper functions (from StudentDetails)
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const getPeriodTimes = (timeRange) => {
    const [start, end] = timeRange.split(" - ");
    return { start: parseTime(start), end: parseTime(end) };
  };

  const dateToMinutes = (date) => {
    return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
  };

  const getAttendanceStatus = (minutes) => {
    if (minutes >= 40) return "Present";
    if (minutes >= 20) return "Partial";
    return "Absent";
  };

  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  // Fetch and process student data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        const data = await response.json();

        // Process attendance for each student
        const processedStudents = data.map((student) => {
          const attendanceDetails = [];
          const detailsMap = new Map();

          if (student.entry_times && student.exit_times) {
            const entryTimes = student.entry_times;
            const exitTimes = student.exit_times;

            for (let i = 0; i < entryTimes.length; i++) {
              const entry = new Date(entryTimes[i].replace("Z", "+05:30"));
              const exit = i < exitTimes.length ? new Date(exitTimes[i].replace("Z", "+05:30")) : null;
              if (!exit) continue;

              const entryDate = entry.toISOString().split("T")[0];
              const dayOfWeek = getDayOfWeek(entryDate);
              const dailySchedule = weeklySchedule[dayOfWeek] || [];

              const entryMinutes = dateToMinutes(entry);
              const exitMinutes = dateToMinutes(exit);

              dailySchedule.forEach((period) => {
                if (typeof period.period === "string") return;
                const periodTime = periodTimings.find((p) => p.period === period.period);
                if (!periodTime) return;

                const { start, end } = getPeriodTimes(periodTime.time);
                if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) return;

                const overlapStart = Math.max(entryMinutes, start);
                const overlapEnd = Math.min(exitMinutes, end);

                if (
                  overlapStart < overlapEnd ||
                  (overlapStart === overlapEnd && period.period === 2 && entryDate === "2025-05-14")
                ) {
                  const minutesInside =
                    period.period === 2 && entryDate === "2025-05-14" ? 0 : Math.ceil(overlapEnd - overlapStart);
                  const key = `${entryDate}-${period.period}`;
                  const status = getAttendanceStatus(minutesInside);

                  if (detailsMap.has(key)) {
                    const existing = detailsMap.get(key);
                    existing.minutes += minutesInside;
                    existing.status = getAttendanceStatus(existing.minutes);
                  } else {
                    detailsMap.set(key, {
                      date: entryDate,
                      period: period.period,
                      subject: period.subject,
                      time: periodTime.time,
                      minutes: minutesInside,
                      status: status,
                    });
                  }
                }
              });
            }

            attendanceDetails.push(...detailsMap.values());
          }

          // Calculate daily attendance status
          const groupedByDate = {};
          attendanceDetails.forEach((detail) => {
            if (!groupedByDate[detail.date]) groupedByDate[detail.date] = [];
            groupedByDate[detail.date].push(detail);
          });

          const dailyAttendance = Object.keys(groupedByDate).map((date) => {
            const periods = groupedByDate[date];
            const presentCount = periods.filter((p) => p.status === "Present").length;
            const partialCount = periods.filter((p) => p.status === "Partial").length;
            let status;
            if (presentCount > 4) status = "Present";
            else if (presentCount + partialCount < 3) status = "Absent";
            else status = "Partial";
            return { date, periods, status };
          });

          // Generate monthly attendance for May 2025
          const monthlyAttendance = Array(31).fill("Absent").map((_, i) => {
            const date = `2025-05-${(i + 1).toString().padStart(2, '0')}`;
            const dayAttendance = dailyAttendance.find((d) => d.date === date);
            return dayAttendance ? dayAttendance.status : "Absent";
          });

          // Calculate today's time spent and status
          let todayTimeSpent = 0;
          let todayStatus = "Absent";
          if (student.entry_times && student.exit_times) {
            const todayEntries = student.entry_times.filter(time => time.startsWith(currentDate));
            const todayExits = student.exit_times.filter(time => time.startsWith(currentDate));
            if (todayEntries.length > 0 && todayExits.length > 0) {
              const entry = new Date(todayEntries[0].replace("Z", "+05:30"));
              const exit = new Date(todayExits[0].replace("Z", "+05:30"));
              todayTimeSpent = (exit - entry) / 1000; // Seconds
              const periodsToday = dailyAttendance.find(d => d.date === currentDate)?.periods || [];
              const presentCount = periodsToday.filter(p => p.status === "Present").length;
              const partialCount = periodsToday.filter(p => p.status === "Partial").length;
              todayStatus = presentCount > 4 ? "Present" : (presentCount + partialCount >= 3 ? "Partial" : "Absent");
            }
          }

          // Calculate total present days
          const totalPresent = monthlyAttendance.reduce((acc, status) => {
            if (status === "Present") return acc + 1;
            if (status === "Partial") return acc + 0.5;
            return acc;
          }, 0);

          return {
            id: student.id,
            name: student.name,
            initials: student.name.split(' ').map(n => n[0]).join('').toUpperCase(),
            monthlyAttendance,
            todayTimeSpent,
            todayStatus,
            totalPresent,
          };
        });

        setStudents(processedStudents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Calculate total present students today
  const presentToday = students.filter(s => 
    s.todayStatus === "Present" || s.todayStatus === "Partial"
  ).length;

  
  const averageTimeToday = students.reduce((acc, student) => {
    return student.todayStatus !== "Absent" ? acc + student.todayTimeSpent : acc;
  }, 0) / (presentToday || 1);
  const avgTimeTodayFormatted = averageTimeToday > 0 
    ? new Date(averageTimeToday * 1000).toISOString().substr(11, 5)
    : "00:00";

 
  const totalRecords = students.length * 31;

 
  const lastFiveDaysData = [15, 16, 17, 18, 19].map(day => ({
    name: `05/${day.toString().padStart(2, '0')}`,
    students: students.filter(s => 
      s.monthlyAttendance[day - 1] === "Present" || s.monthlyAttendance[day - 1] === "Partial"
    ).length
  }));

  const totalDays = students.length * 31;
  const presentDays = students.reduce((acc, student) => 
    acc + student.monthlyAttendance.filter(a => a === "Present").length, 0);
  const partialDays = students.reduce((acc, student) => 
    acc + student.monthlyAttendance.filter(a => a === "Partial").length, 0);
  const absentDays = totalDays - presentDays - partialDays;

  const monthlyData = [
    { name: 'Present', value: Math.round((presentDays / totalDays) * 100) },
    { name: 'Partial', value: Math.round((partialDays / totalDays) * 100) },
    { name: 'Absent', value: Math.round((absentDays / totalDays) * 100) },
  ];

  const COLORS = ['#34d399', '#fbbf24', '#ef4444'];

  // Filter students by search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "Present": return "#34d399"; // Green
      case "Partial": return "#fbbf24"; // Yellow
      case "Absent": return "#ef4444";  // Red
      default: return "#6b7280";        // Gray
    }
  };

  // Navigation button active class
  const getActiveClass = (path) => {
    const currentPort = location.pathname.split(':').pop() || '5000';
    return currentPort === path ? 'active' : '';
  };

  if (loading) {
    return <div style={{ color: "white", textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#09090d"
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#22d3ee",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ 
            backgroundColor: "black", 
            borderRadius: "50%", 
            padding: "8px", 
            marginRight: "12px" 
          }}>
            <Clock style={{ color: "white", height: "20px", width: "20px" }} />
          </div>
          <span style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>KnowFace</span>
        </div>
        <nav style={{ display: "flex", gap: "24px" }}>
          <button 
            style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
            className={location.pathname === '/' ? 'active' : ''} 
            onClick={() => navigate('/')}
          >
            Dashboard
          </button>
          <button 
            style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
            className={getActiveClass('8002')} 
            onClick={() => window.location.href = 'http://localhost:8002/'}
          >
            Register Face
          </button>
          <button 
            style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
            className={getActiveClass('8000')} 
            onClick={() => window.location.href = 'http://localhost:8000/'}
          >
            Entry Camera
          </button>
          <button 
            style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
            className={getActiveClass('8001')} 
            onClick={() => window.location.href = 'http://localhost:8001/'}
          >
            Exit Camera
          </button>
          <button 
            style={{ color: "black", background: "none", border: "none", cursor: "pointer" }} 
            className={location.pathname === '/records' ? 'active' : ''} 
            onClick={() => navigate('/records')}
          >
            Records
          </button>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ 
              backgroundColor: "#e5e7eb", 
              borderRadius: "50%", 
              padding: "4px", 
              marginRight: "8px" 
            }}>
              <Users style={{ color: "#4b5563", height: "16px", width: "16px" }} />
            </div>
            <span>rk</span>
          </div>
          <button style={{ 
            backgroundColor: "#1f2937", 
            color: "white", 
            padding: "4px 16px", 
            borderRadius: "4px",
            border: "none",
            display: "flex",
            alignItems: "center",
            cursor: "pointer"
          }}>
            <span onClick={() => navigate('/login')} style={{ marginRight: "8px" }}>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "24px" }}>
        <h1 style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "32px" }}>
          Attendance Dashboard
        </h1>

        {/* Stats Cards */}
        <div style={{ 
          display: "flex", 
          flexDirection: "row", 
          gap: "24px", 
          marginBottom: "32px",
          flexWrap: "wrap"
        }}>
          <div style={{ 
            backgroundColor: "#111827", 
            borderRadius: "8px", 
            padding: "24px", 
            border: "1px solid #1f2937",
            flex: "1 1 200px"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "16px" 
            }}>
              <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Users</h2>
              <Users style={{ color: "white", height: "20px", width: "20px" }} />
            </div>
            <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{students.length}</p>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>Registered in the system</p>
          </div>

          <div style={{ 
            backgroundColor: "#111827", 
            borderRadius: "8px", 
            padding: "24px", 
            border: "1px solid #1f2937",
            flex: "1 1 200px"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "16px" 
            }}>
              <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Present Today</h2>
              <Calendar style={{ color: "white", height: "20px", width: "20px" }} />
            </div>
            <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{presentToday}</p>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>People checked in today</p>
          </div>

          <div style={{ 
            backgroundColor: "#111827", 
            borderRadius: "8px", 
            padding: "24px", 
            border: "1px solid #1f2937",
            flex: "1 1 200px"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "16px" 
            }}>
              <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Average Time Today</h2>
              <Clock style={{ color: "white", height: "20px", width: "20px" }} />
            </div>
            <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{avgTimeTodayFormatted}</p>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>Average attendance today</p>
          </div>

          <div style={{ 
            backgroundColor: "#111827", 
            borderRadius: "8px", 
            padding: "24px", 
            border: "1px solid #1f2937",
            flex: "1 1 200px"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "16px" 
            }}>
              <h2 style={{ color: "white", fontSize: "18px", fontWeight: "500" }}>Total Records</h2>
              <RotateCw style={{ color: "white", height: "20px", width: "20px" }} />
            </div>
            <p style={{ color: "white", fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>{totalRecords}</p>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>Total attendance records</p>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ 
          display: "flex", 
          flexDirection: "row", 
          gap: "24px", 
          marginBottom: "32px",
          flexWrap: "wrap"
        }}>
          <div style={{ 
            backgroundColor: "#222222", 
            borderRadius: "8px", 
            padding: "24px", 
            flex: "3 1 600px",
            height: "350px"
          }}>
            <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
              Attendance (Last 5 Days)
            </h2>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart 
                data={lastFiveDaysData} 
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#999' }} />
                <YAxis tick={{ fill: '#999' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#333', 
                    border: 'none', 
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                  labelStyle={{ color: '#ccc' }}
                  itemStyle={{ color: '#eee' }}
                />
                <Bar 
                  dataKey="students" 
                  fill="#4ade80"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ 
            backgroundColor: "#222222", 
            borderRadius: "8px", 
            padding: "24px", 
            flex: "2 1 400px",
            height: "350px"
          }}>
            <h2 style={{ color: "#6495ED", fontSize: "18px", fontWeight: "500", marginBottom: "20px", textAlign: "center" }}>
              Monthly Attendance
            </h2>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={monthlyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="value"
                  stroke="#222"
                  strokeWidth={4}
                  animationDuration={1500}
                >
                  {monthlyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))' }} 
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#333', 
                    border: 'none', 
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                  formatter={(value, name) => [`${value}%`, name]}
                  labelStyle={{ color: '#ccc' }}
                  itemStyle={{ color: '#eee' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
                  
        {/* Records Tabs
        <div style={{ backgroundColor: "#1f2937", borderRadius: "8px", overflow: "hidden", marginBottom: "32px" }}>
          <div style={{ display: "flex" }}>
            <button
              style={{ 
                flex: 1, 
                padding: "12px 16px", 
                textAlign: "center",
                backgroundColor: activeTab === "all" ? "#1f2937" : "#374151",
                color: activeTab === "all" ? "white" : "#9ca3af",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => setActiveTab("all")}
            >
              All Records
            </button>
            <button
              style={{ 
                flex: 1, 
                padding: "12px 16px", 
                textAlign: "center",
                backgroundColor: activeTab === "today" ? "#1f2937" : "#374151",
                color: activeTab === "today" ? "white" : "#9ca3af",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => setActiveTab("today")}
            >
              Today's Records
            </button>
          </div>

          <div style={{ padding: "24px" }}>
            {activeTab === "all" ? (
              <div style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
                All records are displayed in the table below.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <h3 style={{ color: "white", fontSize: "18px", marginBottom: "16px" }}>Today's Attendance Records</h3>
                <table style={{ width: "100%", fontSize: "14px", textAlign: "left" }}>
                  <thead style={{ backgroundColor: "#111827", color: "#9ca3af", fontSize: "12px" }}>
                    <tr>
                      <th style={{ padding: "12px 16px" }}>Student Name</th>
                      <th style={{ padding: "12px 16px" }}>Status</th>
                      <th style={{ padding: "12px 16px" }}>Time Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.id} style={{ borderBottom: "1px solid #374151" }}>
                        <td style={{ padding: "12px 16px", color: "white" }}>{student.name}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "9999px",
                            fontSize: "12px",
                            backgroundColor: getStatusColor(student.todayStatus),
                            color: student.todayStatus === "Partial" ? "#1f2937" : "white"
                          }}>
                            {student.todayStatus.charAt(0).toUpperCase() + student.todayStatus.slice(1)}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "white" }}>
                          {student.todayTimeSpent > 0 
                            ? new Date(student.todayTimeSpent * 1000).toISOString().substr(11, 5)
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div> */}

        {/* Student Attendance Table */}
        <div style={{ 
          backgroundColor: "#1f2937", 
          borderRadius: "8px", 
          padding: "24px", 
          marginBottom: "32px" 
        }}>
          <h2 style={{ color: "white", fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
            Student Attendance (May 2025)
          </h2>
          
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <div style={{ 
              position: "absolute", 
              top: "0", 
              bottom: "0", 
              left: "0", 
              display: "flex", 
              alignItems: "center", 
              paddingLeft: "12px" 
            }}>
              <Search style={{ color: "#9ca3af", height: "16px", width: "16px" }} />
            </div>
            <input
              type="text"
              style={{ 
                backgroundColor: "#111827", 
                border: "1px solid #374151", 
                color: "white", 
                fontSize: "14px", 
                borderRadius: "8px", 
                width: "100%", 
                paddingLeft: "40px", 
                padding: "10px 12px" 
              }}
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: "14px", textAlign: "left" }}>
              <thead style={{ textTransform: "uppercase", backgroundColor: "#111827", color: "#9ca3af", fontSize: "12px" }}>
                <tr>
                  <th style={{ padding: "12px 16px", width: "192px" }}>Student Name</th>
                  {Array.from({ length: 31 }, (_, i) => (
                    <th key={i} style={{ padding: "12px 4px", textAlign: "center" }}>{(i + 1).toString().padStart(2, '0')}</th>
                  ))}
                  <th style={{ padding: "12px 12px", textAlign: "center" }}>Total Present</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} style={{ borderBottom: "1px solid #374151" }}>
                    <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{ 
                          width: "32px", 
                          height: "32px", 
                          backgroundColor: "#3b82f6", 
                          borderRadius: "50%", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          color: "white",
                          cursor: "pointer"
                        }}
                        onClick={() => navigate(`/students/${student.id}`)}
                      >
                        {student.initials}
                      </div>
                      <span style={{ color: "white" }}>{student.name}</span>
                    </td>
                    {student.monthlyAttendance.map((status, index) => (
                      <td key={index} style={{ padding: "12px 4px", textAlign: "center" }}>
                        <div 
                          style={{ 
                            width: "24px", 
                            height: "24px", 
                            backgroundColor: getStatusColor(status), 
                            borderRadius: "4px", 
                            margin: "0 auto",
                            cursor: "pointer"
                          }}
                          onClick={() => navigate(`/students/${student.id}`)}
                        ></div>
                      </td>
                    ))}
                    <td style={{ padding: "12px 12px", textAlign: "center", color: "white", fontWeight: "600" }}>
                      {student.totalPresent.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ 
            marginTop: "16px", 
            display: "flex", 
            alignItems: "center", 
            gap: "24px", 
            fontSize: "14px", 
            color: "#9ca3af" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "16px", height: "16px", backgroundColor: "#34d399", borderRadius: "4px" }}></div>
              <span>Present</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "16px", height: "16px", backgroundColor: "#fbbf24", borderRadius: "4px" }}></div>
              <span>Partial</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "16px", height: "16px", backgroundColor: "#ef4444", borderRadius: "4px" }}></div>
              <span>Absent</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}