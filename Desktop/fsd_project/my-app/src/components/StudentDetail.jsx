

// import { useState } from 'react';
// import { ChevronLeft, ChevronRight, User, Calendar, Clock, ArrowLeft } from 'lucide-react';

// export default function StudentDetail() {
//   const [view, setView] = useState('daily');
//   const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025
//   const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 5)); // May 5, 2025
  
//   const student = { 
//     name: "John Smith",
//     rollNo: "IT001",
//     semester: "5th Semester",
//     attendanceRate: "92.7%",
//     presentDays: 27,
//     absentDays: 5
//   };
  
//   const getDaysInMonth = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const days = [];
//     const firstDay = new Date(year, month, 1).getDay();
//     const prevMonthDays = new Date(year, month, 0).getDate();
//     for (let i = firstDay - 1; i >= 0; i--) {
//       days.push({
//         date: new Date(year, month - 1, prevMonthDays - i),
//         currentMonth: false,
//         status: 'none'
//       });
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//       let status = 'Present';
//       const dayOfWeek = new Date(year, month, i).getDay();
//       if (dayOfWeek === 0) status = 'Absent';
//       if (dayOfWeek === 6) status = 'Partial';
//       if (i % 7 === 3) status = 'Absent';
//       if (i % 5 === 0) status = 'Partial';
//       days.push({
//         date: new Date(year, month, i),
//         currentMonth: true,
//         status
//       });
//     }
//     const remainingSlots = 35 - days.length;
//     for (let i = 1; i <= remainingSlots; i++) {
//       days.push({
//         date: new Date(year, month + 1, i),
//         currentMonth: false,
//         status: 'none'
//       });
//     }
//     return days;
//   };
  
//   const dailySchedule = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN", status: "Present" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS", status: "Present" },
//     { period: 3, time: "11:00 - 12:00", subject: "FSD", status: "Present" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC", status: "Absent" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES", status: "Partial" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS", status: "Present" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV", status: "Present" }
//   ];
  
//   const weeklySchedule = [
//     { 
//       day: 1, 
//       date: new Date(2025, 4, selectedDate.getDate() - selectedDate.getDay() + 1),
//       periods: [
//         { subject: "DCN", status: "Present" },
//         { subject: "OS", status: "Present" },
//         { subject: "FSD", status: "Present" },
//         { subject: "CC", status: "Absent" },
//         { subject: "ES", status: "Partial" },
//         { subject: "OS", status: "Present" },
//         { subject: "MV", status: "Present" }
//       ]
//     },
//     { 
//       day: 2, 
//       date: new Date(2025, 4, selectedDate.getDate() - selectedDate.getDay() + 2),
//       periods: [
//         { subject: "PS", status: "Present" },
//         { subject: "OS LAB", status: "Present" },
//         { subject: "OS LAB", status: "Present" },
//         { subject: "DCN LAB", status: "Present" },
//         { subject: "DCN LAB", status: "Partial" },
//         { subject: "Attitude", status: "Present" },
//         { subject: "DCN", status: "Present" }
//       ]
//     },
//     { 
//       day: 3, 
//       date: new Date(2025, 4, selectedDate.getDate() - selectedDate.getDay() + 3),
//       periods: [
//         { subject: "PS", status: "Present" },
//         { subject: "DCN", status: "Present" },
//         { subject: "OS", status: "Present" },
//         { subject: "PS", status: "Present" },
//         { subject: "MV", status: "Partial" },
//         { subject: "LIB/TWN", status: "Present" },
//         { subject: "LIB/TWN", status: "Present" }
//       ]
//     },
//     { 
//       day: 4, 
//       date: new Date(2025, 4, selectedDate.getDate() - selectedDate.getDay() + 4),
//       periods: [
//         { subject: "FSD", status: "Present" },
//         { subject: "PS", status: "Present" },
//         { subject: "OS", status: "Present" },
//         { subject: "PS", status: "Absent" },
//         { subject: "CC LAB", status: "Partial" },
//         { subject: "CC LAB", status: "Present" },
//         { subject: "CC LAB", status: "Present" }
//       ]
//     },
//     { 
//       day: 5,
//       date: new Date(2025, 4, selectedDate.getDate() - selectedDate.getDay() + 5),
//       periods: [
//         { subject: "MV", status: "Present" },
//         { subject: "SOFT SKILLS", status: "Present" },
//         { subject: "FSD", status: "Present" },
//         { subject: "CC", status: "Present" },
//         { subject: "Mini Project", status: "Partial" },
//         { subject: "Mini Project", status: "Present" },
//         { subject: "Mini Project", status: "Present" }
//       ]
//     },
//     { 
//       day: 6,
//       date: new Date(2025, 4, selectedDate.getDate() - selectedDate.getDay() + 6),
//       periods: [
//         { subject: "OS", status: "Partial" },
//         { subject: "DCN", status: "Partial" },
//         { subject: "FSD", status: "Partial" },
//         { subject: "CC", status: "Partial" },
//         { subject: "COE Activities", status: "Partial" },
//         { subject: "COE Activities", status: "Partial" },
//         { subject: "COE Activities", status: "Partial" }
//       ]
//     },
//     { 
//       day: 0,
//       date: new Date(2025, 4, selectedDate.getDate() - selectedDate.getDay()),
//       periods: [
//         { subject: "-", status: "Absent" },
//         { subject: "-", status: "Absent" },
//         { subject: "-", status: "Absent" },
//         { subject: "-", status: "Absent" },
//         { subject: "-", status: "Absent" },
//         { subject: "-", status: "Absent" },
//         { subject: "-", status: "Absent" }
//       ]
//     }
//   ];
  
//   const formatDay = (date) => {
//     return date.getDate();
//   };
  
//   const isSelectedDate = (date) => {
//     return date.getDate() === selectedDate.getDate() && 
//            date.getMonth() === selectedDate.getMonth() && 
//            date.getFullYear() === selectedDate.getFullYear();
//   };
  
//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//   };
  
//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
//   };
  
//   const formatMonthYear = (date) => {
//     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };
  
//   const getDayName = (dayNum) => {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     return days[dayNum];
//   };
  
//   const getSubjectStats = () => {
//     const subjects = {};
//     weeklySchedule.forEach(day => {
//       day.periods.forEach(period => {
//         if (period.subject !== "-") {
//           if (!subjects[period.subject]) {
//             subjects[period.subject] = { present: 0, absent: 0, partial: 0, total: 0 };
//           }
//           subjects[period.subject].total++;
//           if (period.status === "Present") {
//             subjects[period.subject].present++;
//           } else if (period.status === "Absent") {
//             subjects[period.subject].absent++;
//           } else if (period.status === "Partial") {
//             subjects[period.subject].partial++;
//           }
//         }
//       });
//     });
//     return Object.keys(subjects).map(name => {
//       const { present, partial, total } = subjects[name];
//       const percentage = Math.round(((present + (partial * 0.5)) / total) * 100);
//       return { name, percentage, ...subjects[name] };
//     }).sort((a, b) => a.percentage - b.percentage);
//   };
  
//   const StatusBadge = ({ status }) => {
//     let bgColor = "#e5e7eb";
//     let textColor = "#374151";
//     if (status === "Present") {
//       bgColor = "#dcfce7";
//       textColor = "#15803d";
//     } else if (status === "Absent") {
//       bgColor = "#fee2e2";
//       textColor = "#b91c1c";
//     } else if (status === "Partial") {
//       bgColor = "#fef9c3";
//       textColor = "#a16207";
//     }
//     return (
//       <span style={{
//         padding: '0.25rem 0.75rem',
//         borderRadius: '9999px',
//         fontSize: '0.875rem',
//         fontWeight: '500',
//         backgroundColor: bgColor,
//         color: textColor
//       }}>
//         {status}
//       </span>
//     );
//   };

//   const DayCell = ({ day }) => {
//     if (!day.currentMonth) {
//       return (
//         <div style={{
//           height: '2rem',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '0.875rem',
//           color: '#9ca3af'
//         }}>
//           {formatDay(day.date)}
//         </div>
//       );
//     }

//     let statusColor = "";
//     if (day.status === "Present") statusColor = "#22c55e";
//     if (day.status === "Partial") statusColor = "#eab308";
//     if (day.status === "Absent") statusColor = "#ef4444";

//     return (
//       <button
//         onClick={() => setSelectedDate(day.date)}
//         style={{
//           height: '2rem',
//           width: '2rem',
//           borderRadius: '9999px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'relative',
//           ...(isSelectedDate(day.date) ? { boxShadow: '0 0 0 2px #3b82f6' } : {})
//         }}
//       >
//         <span style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           borderRadius: '9999px',
//           backgroundColor: statusColor,
//           opacity: 0.2
//         }}></span>
//         <span style={{
//           zIndex: 10,
//           ...(isSelectedDate(day.date) ? { fontWeight: '700' } : {})
//         }}>
//           {formatDay(day.date)}
//         </span>
//         {day.status !== "none" && (
//           <span style={{
//             position: 'absolute',
//             bottom: 0,
//             right: 0,
//             width: '0.5rem',
//             height: '0.5rem',
//             borderRadius: '9999px',
//             backgroundColor: statusColor
//           }}></span>
//         )}
//       </button>
//     );
//   };
  
//   const renderContent = () => {
//     switch(view) {
//       case 'daily':
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Calendar size={16} style={{ color: '#9ca3af' }} />
//                 <span style={{ marginLeft: '0.5rem' }}>
//                   {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//                 </span>
//               </div>
//             </div>
            
//             <div style={{ padding: '1rem' }}>
//               <table style={{ width: '100%' }}>
//                 <thead>
//                   <tr style={{ borderBottom: '1px solid #1f2937' }}>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Period</th>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Time</th>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Subject</th>
//                     <th style={{ textAlign: 'right', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dailySchedule.map((period) => (
//                     <tr key={period.period} style={{
//                       borderBottom: '1px solid #1f2937',
//                       transition: 'background-color 0.2s',
//                       ':hover': { backgroundColor: '#1f2937' }
//                     }}>
//                       <td style={{ padding: '0.75rem 1rem' }}>{period.period}</td>
//                       <td style={{ padding: '0.75rem 1rem' }}>{period.time}</td>
//                       <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>{period.subject}</td>
//                       <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
//                         <StatusBadge status={period.status} />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
      
//       case 'weekly':
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Calendar size={16} style={{ color: '#9ca3af' }} />
//                   <span style={{ marginLeft: '0.5rem' }}>
//                     Week of {weeklySchedule[1].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weeklySchedule[6].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             <div style={{ overflowX: 'auto' }}>
//               <table style={{ width: '100%' }}>
//                 <thead>
//                   <tr style={{ borderBottom: '1px solid #1f2937' }}>
//                     <th style={{ padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Day</th>
//                     {Array.from({ length: 7 }, (_, i) => {
//                       const periods = [
//                         "08:40 - 09:40",
//                         "09:40 - 10:40",
//                         "11:00 - 12:00",
//                         "12:00 - 13:00",
//                         "13:40 - 14:30",
//                         "14:30 - 15:20", 
//                         "15:20 - 16:10"
//                       ];
//                       return (
//                         <th key={i} style={{ padding: '0.5rem', textAlign: 'center', color: '#9ca3af', fontWeight: '500' }}>
//                           <div>Period {i+1}</div>
//                           <div style={{ fontSize: '0.75rem' }}>{periods[i]}</div>
//                         </th>
//                       );
//                     })}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {weeklySchedule.map((day) => {
//                     const sortedDay = day.day;
//                     return (
//                       <tr 
//                         key={sortedDay} 
//                         style={{
//                           borderBottom: '1px solid #1f2937',
//                           transition: 'background-color 0.2s',
//                           backgroundColor: isSelectedDate(day.date) ? '#1f2937' : 'transparent',
//                           ':hover': { backgroundColor: '#1f2937' }
//                         }}
//                         onClick={() => setSelectedDate(day.date)}
//                       >
//                         <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>
//                           <div>{getDayName(sortedDay)}</div>
//                           <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
//                             {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                           </div>
//                         </td>
//                         {day.periods.map((period, idx) => {
//                           let bgColor = "";
//                           let textColor = "";
//                           if (period.status === "Present") {
//                             bgColor = "rgba(22, 163, 74, 0.2)";
//                             textColor = "#16a34a";
//                           } else if (period.status === "Absent") {
//                             bgColor = "rgba(220, 38, 38, 0.2)";
//                             textColor = "#dc2626";
//                           } else if (period.status === "Partial") {
//                             bgColor = "rgba(234, 179, 8, 0.2)";
//                             textColor = "#ca8a04";
//                           }
//                           return (
//                             <td key={idx} style={{
//                               padding: '0.5rem',
//                               textAlign: 'center',
//                               backgroundColor: bgColor
//                             }}>
//                               <div style={{ fontWeight: '500' }}>{period.subject}</div>
//                               <div style={{ fontSize: '0.75rem', color: textColor }}>{period.status}</div>
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
      
//       case 'monthly':
//       default:
//         const subjectStats = getSubjectStats();
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Calendar size={16} style={{ color: '#9ca3af' }} />
//                 <span style={{ marginLeft: '0.5rem' }}>
//                   Month of {formatMonthYear(currentMonth)}
//                 </span>
//               </div>
//             </div>
            
//             <div style={{
//               padding: '1rem',
//               display: 'grid',
//               gridTemplateColumns: '1fr',
//               gap: '2rem',
//               '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }
//             }}>
//               <div>
//                 <h3 style={{ fontWeight: '500', marginBottom: '1rem', fontSize: '1.125rem' }}>Month at a Glance</h3>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(7, 1fr)',
//                   gap: '1rem',
//                   marginBottom: '1rem'
//                 }}>
//                   {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
//                     <div key={idx} style={{ textAlign: 'center', fontWeight: '500', color: '#9ca3af' }}>{day}</div>
//                   ))}
//                   {getDaysInMonth().map((day, idx) => (
//                     <div key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
//                       <DayCell day={day} />
//                     </div>
//                   ))}
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '0.875rem' }}>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Working Days</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.25rem' }}>22</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Present</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e', marginTop: '0.25rem' }}>18</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Partial</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#eab308', marginTop: '0.25rem' }}>3</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Absent</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444', marginTop: '0.25rem' }}>1</div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 style={{ fontWeight: '500', marginBottom: '1rem', fontSize: '1.125rem' }}>Subject-wise Attendance</h3>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                   {subjectStats.map((subject, idx) => (
//                     <div key={idx} style={{
//                       backgroundColor: '#1f2937',
//                       padding: '1rem',
//                       borderRadius: '0.5rem'
//                     }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
//                         <div style={{ fontWeight: '500' }}>{subject.name}</div>
//                         <div style={{
//                           fontWeight: '700',
//                           color: subject.percentage >= 85 ? '#22c55e' : subject.percentage >= 75 ? '#eab308' : '#ef4444'
//                         }}>
//                           {subject.percentage}%
//                         </div>
//                       </div>
//                       <div style={{ width: '100%', backgroundColor: '#4b5563', borderRadius: '9999px', height: '0.625rem' }}>
//                         <div style={{
//                           height: '0.625rem',
//                           borderRadius: '9999px',
//                           backgroundColor: subject.percentage >= 85 ? '#22c55e' : subject.percentage >= 75 ? '#eab308' : '#ef4444',
//                           width: `${subject.percentage}%`
//                         }}></div>
//                       </div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
//                         <div>Classes: {subject.total}</div>
//                         <div>Present: {subject.present}</div>
//                         <div>Partial: {subject.partial}</div>
//                         <div>Absent: {subject.absent}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//     }
//   };
  
//   return (
//     <>
//       <style>
//         {`
//           body {
//             min-height: 100vh;
//             background-color: #000000;
//             color: #ffffff;
//             margin: 0;
//             font-family: Arial, sans-serif;
//           }
//           .header {
//             padding: 1rem;
//             border-bottom: 1px solid #1f2937;
//           }
//           .back-button {
//             display: flex;
//             align-items: center;
//             color: #9ca3af;
//             background: none;
//             border: none;
//             cursor: pointer;
//             transition: color 0.2s;
//           }
//           .back-button:hover {
//             color: #ffffff;
//           }
//           .back-button span {
//             margin-left: 0.25rem;
//           }
//           .student-info {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             padding: 1.5rem;
//             border-bottom: 1px solid #1f2937;
//           }
//           .student-avatar {
//             background: linear-gradient(to right, #3b82f6, #8b5cf6);
//             border-radius: 9999px;
//             height: 3.5rem;
//             width: 3.5rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #ffffff;
//             font-weight: 700;
//           }
//           .student-details {
//             margin-left: 1rem;
//           }
//           .student-name {
//             font-size: 1.5rem;
//             font-weight: 700;
//           }
//           .student-meta {
//             color: #9ca3af;
//           }
//           .view-buttons {
//             display: flex;
//             gap: 0.5rem;
//           }
//           .view-button {
//             padding: 0.5rem 1rem;
//             border-radius: 0.375rem;
//             font-size: 0.875rem;
//             background-color: #1f2937;
//             color: #ffffff;
//             border: none;
//             cursor: pointer;
//             transition: background-color 0.2s;
//           }
//           .view-button:hover {
//             background-color: #374151;
//           }
//           .view-button.active {
//             background-color: #2563eb;
//           }
//           .stats-grid {
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 1rem;
//             padding: 1.5rem;
//           }
//           @media (min-width: 768px) {
//             .stats-grid {
//               grid-template-columns: repeat(3, 1fr);
//             }
//           }
//           .stat-card {
//             border-radius: 0.5rem;
//             padding: 1.25rem;
//             color: #ffffff;
//           }
//           .stat-card.attendance {
//             background: linear-gradient(to right, #2563eb, #3b82f6);
//           }
//           .stat-card.present {
//             background: linear-gradient(to right, #16a34a, #22c55e);
//           }
//           .stat-card.absent {
//             background: linear-gradient(to right, #dc2626, #ef4444);
//           }
//           .stat-header {
//             display: flex;
//             align-items: center;
//           }
//           .stat-icon {
//             color: rgba(255, 255, 255, 0.7);
//           }
//           .stat-title {
//             margin-left: 0.5rem;
//             color: rgba(255, 255, 255, 0.7);
//             font-weight: 500;
//           }
//           .stat-subtitle {
//             color: rgba(255, 255, 255, 0.7);
//             font-size: 0.875rem;
//             margin-top: 0.25rem;
//           }
//           .stat-value {
//             font-size: 2.25rem;
//             font-weight: 700;
//             margin-top: 0.5rem;
//           }
//           .stat-progress {
//             margin-top: 0.5rem;
//             width: 100%;
//             background-color: rgba(255, 255, 255, 0.3);
//             border-radius: 9999px;
//             height: 0.375rem;
//           }
//           .stat-progress-bar {
//             height: 0.375rem;
//             border-radius: 9999px;
//             background-color: #ffffff;
//           }
//           .stat-footer {
//             margin-top: 0.5rem;
//             font-size: 0.875rem;
//             color: rgba(255, 255, 255, 0.7);
//           }
//           .content-container {
//             padding: 0 1.5rem 1.5rem;
//           }
//           .content-box {
//             background-color: #111827;
//             border-radius: 0.5rem;
//             overflow: hidden;
//             border: 1px solid #1f2937;
//           }
//           .legend {
//             padding: 1.5rem;
//           }
//           .legend-box {
//             background-color: #111827;
//             border-radius: 0.5rem;
//             padding: 1rem;
//             border: 1px solid #1f2937;
//           }
//           .legend-title {
//             font-weight: 500;
//             margin-bottom: 0.5rem;
//           }
//           .legend-items {
//             display: flex;
//             gap: 1.5rem;
//           }
//           .legend-item {
//             display: flex;
//             align-items: center;
//           }
//           .legend-dot {
//             width: 0.75rem;
//             height: 0.75rem;
//             border-radius: 9999px;
//             margin-right: 0.5rem;
//           }
//           .legend-dot.present {
//             background-color: #22c55e;
//           }
//           .legend-dot.partial {
//             background-color: #eab308;
//           }
//           .legend-dot.absent {
//             background-color: #ef4444;
//           }
//           .legend-text {
//             font-size: 0.875rem;
//           }
//           table tr:hover {
//             background-color: #1f2937;
//           }
//         `}
//       </style>
//       <div className="container">
//         <div className="header">
//           <button className="back-button">
//             <ArrowLeft size={18} />
//             <span>Back to Dashboard</span>
//           </button>
//         </div>
        
//         <div className="student-info">
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div className="student-avatar">JS</div>
//             <div className="student-details">
//               <h1 className="student-name">{student.name}</h1>
//               <p className="student-meta">Roll No: {student.rollNo} • {student.semester}</p>
//             </div>
//           </div>
          
//           <div className="view-buttons">
//             <button 
//               onClick={() => setView('daily')}
//               className={`view-button ${view === 'daily' ? 'active' : ''}`}
//             >
//               Daily
//             </button>
//             <button 
//               onClick={() => setView('weekly')}
//               className={`view-button ${view === 'weekly' ? 'active' : ''}`}
//             >
//               Weekly
//             </button>
//             <button 
//               onClick={() => setView('monthly')}
//               className={`view-button ${view === 'monthly' ? 'active' : ''}`}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>
        
//         <div className="stats-grid">
//           <div className="stat-card attendance">
//             <div className="stat-header">
//               <User size={20} className="stat-icon" />
//               <span className="stat-title">Attendance Rate</span>
//             </div>
//             <p className="stat-subtitle">Overall semester attendance</p>
//             <p className="stat-value">{student.attendanceRate}</p>
//             <div className="stat-progress">
//               <div className="stat-progress-bar" style={{ width: "92.7%" }}></div>
//             </div>
//           </div>
          
//           <div className="stat-card present">
//             <div className="stat-header">
//               <Calendar size={20} className="stat-icon" />
//               <span className="stat-title">Present Days</span>
//             </div>
//             <p className="stat-subtitle">Total days present this semester</p>
//             <p className="stat-value">{student.presentDays} days</p>
//             <div className="stat-footer">
//               {Math.round((student.presentDays / (student.presentDays + student.absentDays)) * 100)}% of total days
//             </div>
//           </div>
          
//           <div className="stat-card absent">
//             <div className="stat-header">
//               <Clock size={20} className="stat-icon" />
//               <span className="stat-title">Absent Days</span>
//             </div>
//             <p className="stat-subtitle">Total days absent this semester</p>
//             <p className="stat-value">{student.absentDays} days</p>
//             <div className="stat-footer">
//               {Math.round((student.absentDays / (student.presentDays + student.absentDays)) * 100)}% of total days
//             </div>
//           </div>
//         </div>
        
//         <div className="content-container">
//           <div className="content-box">
//             {renderContent()}
//           </div>
//         </div>
        
//         <div className="legend">
//           <div className="legend-box">
//             <h3 className="legend-title">Attendance Legend</h3>
//             <div className="legend-items">
//               <div className="legend-item">
//                 <div className="legend-dot present"></div>
//                 <span className="legend-text">Present</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-dot partial"></div>
//                 <span className="legend-text">Partial</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-dot absent"></div>
//                 <span className="legend-text">Absent</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, User, Calendar, Clock, ArrowLeft } from 'lucide-react';

// export default function StudentDetail() {
//   const [view, setView] = useState('daily');
//   const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025
//   const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 5)); // May 5, 2025
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams(); // Expecting numeric id like "1"
//   const navigate = useNavigate();

//   // Periods configuration
//   const periods = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS" },
//     { period: 3, time: "11:00 - 12:00", subject: "FSD" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV" },
//   ];

//   // Fetch student data
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         if (!id) {
//           throw new Error('Student ID is missing');
//         }

//         // Fetch from /posts endpoint
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const data = await response.json();

//         // Find student by id (numeric id field)
//         const studentData = data.find(s => s.id === id);
//         if (!studentData) {
//           throw new Error(`Student with ID ${id} not found`);
//         }

//         // Combine entry_times and exit_times into entry_exit format
//         const entryExit = {};
//         studentData.entry_times.forEach((entry, index) => {
//           const exit = studentData.exit_times[index];
//           if (entry && exit) {
//             const entryDate = new Date(entry).toISOString().split('T')[0]; // e.g., "2025-05-01"
//             if (!entryExit[entryDate]) {
//               entryExit[entryDate] = [];
//             }
//             // Map to period based on entry time
//             const entryTime = new Date(entry).toTimeString().split(' ')[0].slice(0, 5); // e.g., "08:45"
//             const exitTime = new Date(exit).toTimeString().split(' ')[0].slice(0, 5); // e.g., "08:46"
//             const period = periods.find(p => {
//               const [start] = p.time.split(' - ');
//               return entryTime >= start && entryTime < (periods[periods.indexOf(p) + 1]?.time.split(' - ')[0] || '16:10');
//             })?.period || 1; // Default to period 1 if no match
//             entryExit[entryDate].push({
//               period,
//               entry: entryTime,
//               exit: exitTime,
//             });
//           }
//         });

//         // Process student data
//         const processedStudent = {
//           id: studentData.id,
//           name: studentData.name || `Student ${id}`,
//           rollNo: studentData.rollno || `IT${id.padStart(3, '0')}`,
//           semester: `${studentData.semno}th Semester` || '4th Semester',
//           attendance: processAttendance(entryExit),
//         };
//         setStudent(processedStudent);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching student:', err);
//         console.error('Response details:', {
//           endpoint: '/posts',
//           message: err.message,
//         });
//         setError(`Failed to load student data: ${err.message}`);
//         setLoading(false);
//       }
//     };
//     fetchStudent();
//   }, [id]);

//   // Process attendance data
//   const processAttendance = (entryExit) => {
//     const attendance = {};
//     Object.keys(entryExit).forEach(date => {
//       const periodsData = entryExit[date] || [];
//       attendance[date] = periodsData.map(p => {
//         const duration = calculateDuration(p.entry, p.exit);
//         let status = 'Absent';
//         if (duration >= 25) status = 'Present';
//         else if (duration >= 20 ) status = 'Partial';
        
//         return { ...p, status, duration };
//       });
//     });
//     return attendance;
//   };

//   // Calculate duration in minutes between entry and exit times
//   const calculateDuration = (entry, exit) => {
//     if (!entry || !exit) return 0;
//     const entryTime = parseTime(entry);
//     const exitTime = parseTime(exit);
//     if (!entryTime || !exitTime) return 0;
//     const diffMs = exitTime - entryTime;
//     return Math.max(0, Math.floor(diffMs / 1000 / 60)); // Convert to minutes
//   };

//   // Parse time string (e.g., "08:40") to Date object
//   const parseTime = (timeStr) => {
//     if (!timeStr) return null;
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes, 0, 0);
//     return date;
//   };

//   // Get days in month for calendar
//   const getDaysInMonth = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const days = [];
//     const firstDay = new Date(year, month, 1).getDay();
//     const prevMonthDays = new Date(year, month, 0).getDate();

//     // Previous month days
//     for (let i = firstDay - 1; i >= 0; i--) {
//       days.push({
//         date: new Date(year, month - 1, prevMonthDays - i),
//         currentMonth: false,
//         status: 'none',
//       });
//     }

//     // Current month days
//     for (let i = 1; i <= daysInMonth; i++) {
//       const dateStr = `2025-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
//       const dayAttendance = student?.attendance[dateStr] || [];
//       const presentCount = dayAttendance.filter(p => p.status === 'Present').length;
//       const partialCount = dayAttendance.filter(p => p.status === 'Partial').length;
//       const totalPeriods = periods.length;
//       let status = 'Absent';
//       if (presentCount + partialCount > 0) {
//         status = presentCount >= totalPeriods / 2 ? 'Present' : 'Partial';
//       }
//       days.push({
//         date: new Date(year, month, i),
//         currentMonth: true,
//         status,
//       });
//     }

//     // Next month days
//     const remainingSlots = 35 - days.length;
//     for (let i = 1; i <= remainingSlots; i++) {
//       days.push({
//         date: new Date(year, month + 1, i),
//         currentMonth: false,
//         status: 'none',
//       });
//     }
//     return days;
//   };

//   // Get daily schedule for selected date
//   const getDailySchedule = () => {
//     const dateStr = selectedDate.toISOString().split('T')[0]; // e.g., "2025-05-05"
//     const dayAttendance = student?.attendance[dateStr] || [];
//     return periods.map(p => {
//       const periodData = dayAttendance.find(pd => pd.period === p.period) || {};
//       return {
//         period: p.period,
//         time: p.time,
//         subject: p.subject,
//         status: periodData.status || 'Absent',
//       };
//     });
//   };

//   // Get weekly schedule
//   const getWeeklySchedule = () => {
//     const startOfWeek = new Date(selectedDate);
//     startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
//     return Array.from({ length: 7 }, (_, i) => {
//       const date = new Date(startOfWeek);
//       date.setDate(startOfWeek.getDate() + i);
//       const dateStr = date.toISOString().split('T')[0];
//       const dayAttendance = student?.attendance[dateStr] || [];
//       const periodsData = periods.map(p => {
//         const periodData = dayAttendance.find(pd => pd.period === p.period) || {};
//         return {
//           subject: p.subject,
//           status: periodData.status || 'Absent',
//         };
//       });
//       return {
//         day: i,
//         date,
//         periods: periodsData,
//       };
//     });
//   };

//   // Calculate subject stats
//   const getSubjectStats = () => {
//     const subjects = {};
//     if (!student) return [];
//     Object.values(student.attendance).forEach(day => {
//       day.forEach(period => {
//         const subject = periods[period.period - 1]?.subject;
//         if (subject) {
//           if (!subjects[subject]) {
//             subjects[subject] = { present: 0, absent: 0, partial: 0, total: 0 };
//           }
//           subjects[subject].total++;
//           if (period.status === 'Present') subjects[subject].present++;
//           else if (period.status === 'Partial') subjects[subject].partial++;
//           else subjects[subject].absent++;
//         }
//       });
//     });
//     return Object.keys(subjects).map(name => {
//       const { present, partial, total } = subjects[name];
//       const percentage = total > 0 ? Math.round(((present + partial * 0.5) / total) * 100) : 0;
//       return { name, percentage, ...subjects[name] };
//     }).sort((a, b) => a.percentage - b.percentage);
//   };

//   // Calculate semester stats
//   const getSemesterStats = () => {
//     if (!student) return { attendanceRate: '0%', presentDays: 0, absentDays: 0 };
//     let totalPeriods = 0;
//     let presentPeriods = 0;
//     let partialPeriods = 0;
//     let presentDays = 0;
//     let absentDays = 0;

//     Object.keys(student.attendance).forEach(date => {
//       const dayAttendance = student.attendance[date];
//       totalPeriods += periods.length;
//       const dayPresent = dayAttendance.filter(p => p.status === 'Present').length;
//       const dayPartial = dayAttendance.filter(p => p.status === 'Partial').length;
//       presentPeriods += dayPresent;
//       partialPeriods += dayPartial;
//       const isPresentDay = dayPresent + dayPartial > 0 && dayPresent >= periods.length / 2;
//       if (isPresentDay) presentDays++;
//       else if (dayPresent + dayPartial === 0) absentDays++;
//     });

//     const attendanceRate = totalPeriods > 0 
//       ? ((presentPeriods + partialPeriods * 0.5) / totalPeriods * 100).toFixed(1) + '%'
//       : '0%';
//     return { attendanceRate, presentDays, absentDays };
//   };

//   // Monthly stats for "Month at a Glance"
//   const getMonthlyStats = () => {
//     const days = getDaysInMonth();
//     const workingDays = days.filter(d => d.currentMonth && d.date.getDay() !== 0).length;
//     const present = days.filter(d => d.currentMonth && d.status === 'Present').length;
//     const partial = days.filter(d => d.currentMonth && d.status === 'Partial').length;
//     const absent = days.filter(d => d.currentMonth && d.status === 'Absent').length;
//     return { workingDays, present, partial, absent };
//   };

//   const formatDay = (date) => date.getDate();

//   const isSelectedDate = (date) => {
//     return date.getDate() === selectedDate.getDate() &&
//            date.getMonth() === selectedDate.getMonth() &&
//            date.getFullYear() === selectedDate.getFullYear();
//   };

//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//   };

//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
//   };

//   const formatMonthYear = (date) => {
//     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };

//   const getDayName = (dayNum) => {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     return days[dayNum];
//   };

//   const StatusBadge = ({ status }) => {
//     let bgColor = "#e5e7eb";
//     let textColor = "#374151";
//     if (status === "Present") {
//       bgColor = "#dcfce7";
//       textColor = "#15803d";
//     } else if (status === "Absent") {
//       bgColor = "#fee2e2";
//       textColor = "#b91c1c";
//     } else if (status === "Partial") {
//       bgColor = "#fef9c3";
//       textColor = "#a16207";
//     }
//     return (
//       <span style={{
//         padding: '0.25rem 0.75rem',
//         borderRadius: '9999px',
//         fontSize: '0.875rem',
//         fontWeight: '500',
//         backgroundColor: bgColor,
//         color: textColor,
//       }}>
//         {status}
//       </span>
//     );
//   };

//   const DayCell = ({ day }) => {
//     if (!day.currentMonth) {
//       return (
//         <div style={{
//           height: '2rem',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '0.875rem',
//           color: '#9ca3af',
//         }}>
//           {formatDay(day.date)}
//         </div>
//       );
//     }

//     let statusColor = "";
//     if (day.status === "Present") statusColor = "#22c55e";
//     if (day.status === "Partial") statusColor = "#eab308";
//     if (day.status === "Absent") statusColor = "#ef4444";

//     return (
//       <button
//         onClick={() => setSelectedDate(day.date)}
//         style={{
//           height: '2rem',
//           width: '2rem',
//           borderRadius: '9999px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'relative',
//           ...(isSelectedDate(day.date) ? { boxShadow: '0 0 0 2px #3b82f6' } : {}),
//         }}
//       >
//         <span style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           borderRadius: '9999px',
//           backgroundColor: statusColor,
//           opacity: 0.2,
//         }}></span>
//         <span style={{
//           zIndex: 10,
//           ...(isSelectedDate(day.date) ? { fontWeight: '700' } : {}),
//         }}>
//           {formatDay(day.date)}
//         </span>
//         {day.status !== "none" && (
//           <span style={{
//             position: 'absolute',
//             bottom: 0,
//             right: 0,
//             width: '0.5rem',
//             height: '0.5rem',
//             borderRadius: '9999px',
//             backgroundColor: statusColor,
//           }}></span>
//         )}
//       </button>
//     );
//   };

//   const renderContent = () => {
//     if (!student) return null;

//     switch (view) {
//       case 'daily':
//         const dailySchedule = getDailySchedule();
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Calendar size={16} style={{ color: '#9ca3af' }} />
//                 <span style={{ marginLeft: '0.5rem' }}>
//                   {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//                 </span>
//               </div>
//             </div>
//             <div style={{ padding: '1rem' }}>
//               <table style={{ width: '100%' }}>
//                 <thead>
//                   <tr style={{ borderBottom: '1px solid #1f2937' }}>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Period</th>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Time</th>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Subject</th>
//                     <th style={{ textAlign: 'right', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dailySchedule.map((period) => (
//                     <tr key={period.period} style={{
//                       borderBottom: '1px solid #1f2937',
//                     }}>
//                       <td style={{ padding: '0.75rem 1rem' }}>{period.period}</td>
//                       <td style={{ padding: '0.75rem 1rem' }}>{period.time}</td>
//                       <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>{period.subject}</td>
//                       <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
//                         <StatusBadge status={period.status} />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case 'weekly':
//         const weeklySchedule = getWeeklySchedule();
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Calendar size={16} style={{ color: '#9ca3af' }} />
//                   <span style={{ marginLeft: '0.5rem' }}>
//                     Week of {weeklySchedule[1].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weeklySchedule[6].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div style={{ overflowX: 'auto' }}>
//               <table style={{ width: '100%' }}>
//                 <thead>
//                   <tr style={{ borderBottom: '1px solid #1f2937' }}>
//                     <th style={{ padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Day</th>
//                     {periods.map((p, i) => (
//                       <th key={i} style={{ padding: '0.5rem', textAlign: 'center', color: '#9ca3af', fontWeight: '500' }}>
//                         <div>Period {p.period}</div>
//                         <div style={{ fontSize: '0.75rem' }}>{p.time}</div>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {weeklySchedule.map((day) => (
//                     <tr
//                       key={day.day}
//                       style={{
//                         borderBottom: '1px solid #1f2937',
//                         backgroundColor: isSelectedDate(day.date) ? '#1f2937' : 'transparent',
//                       }}
//                       onClick={() => setSelectedDate(day.date)}
//                     >
//                       <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>
//                         <div>{getDayName(day.day)}</div>
//                         <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
//                           {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                         </div>
//                       </td>
//                       {day.periods.map((period, idx) => {
//                         let bgColor = "";
//                         let textColor = "";
//                         if (period.status === "Present") {
//                           bgColor = "rgba(22, 163, 74, 0.2)";
//                           textColor = "#16a34a";
//                         } else if (period.status === "Absent") {
//                           bgColor = "rgba(220, 38, 38, 0.2)";
//                           textColor = "#dc2626";
//                         } else if (period.status === "Partial") {
//                           bgColor = "rgba(234, 179, 8, 0.2)";
//                           textColor = "#ca8a04";
//                         }
//                         return (
//                           <td key={idx} style={{
//                             padding: '0.5rem',
//                             textAlign: 'center',
//                             backgroundColor: bgColor,
//                           }}>
//                             <div style={{ fontWeight: '500' }}>{period.subject}</div>
//                             <div style={{ fontSize: '0.75rem', color: textColor }}>{period.status}</div>
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case 'monthly':
//       default:
//         const subjectStats = getSubjectStats();
//         const monthlyStats = getMonthlyStats();
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Calendar size={16} style={{ color: '#9ca3af' }} />
//                   <span style={{ marginLeft: '0.5rem' }}>
//                     Month of {formatMonthYear(currentMonth)}
//                   </span>
//                 </div>
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div style={{
//               padding: '1rem',
//               display: 'grid',
//               gridTemplateColumns: '1fr',
//               gap: '2rem',
//             }}>
//               <div>
//                 <h3 style={{ fontWeight: '500', marginBottom: '1rem', fontSize: '1.125rem' }}>Month at a Glance</h3>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(7, 1fr)',
//                   gap: '1rem',
//                   marginBottom: '1rem',
//                 }}>
//                   {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
//                     <div key={idx} style={{ textAlign: 'center', fontWeight: '500', color: '#9ca3af' }}>{day}</div>
//                   ))}
//                   {getDaysInMonth().map((day, idx) => (
//                     <div key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
//                       <DayCell day={day} />
//                     </div>
//                   ))}
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '0.875rem' }}>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Working Days</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.25rem' }}>{monthlyStats.workingDays}</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Present</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e', marginTop: '0.25rem' }}>{monthlyStats.present}</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Partial</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#eab308', marginTop: '0.25rem' }}>{monthlyStats.partial}</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Absent</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444', marginTop: '0.25rem' }}>{monthlyStats.absent}</div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 style={{ fontWeight: '500', marginBottom: '1rem', fontSize: '1.125rem' }}>Subject-wise Attendance</h3>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                   {subjectStats.map((subject, idx) => (
//                     <div key={idx} style={{
//                       backgroundColor: '#1f2937',
//                       padding: '1rem',
//                       borderRadius: '0.5rem',
//                     }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
//                         <div style={{ fontWeight: '500' }}>{subject.name}</div>
//                         <div style={{
//                           fontWeight: '700',
//                           color: subject.percentage >= 85 ? '#22c55e' : subject.percentage >= 75 ? '#eab308' : '#ef4444',
//                         }}>
//                           {subject.percentage}%
//                         </div>
//                       </div>
//                       <div style={{ width: '100%', backgroundColor: '#4b5563', borderRadius: '9999px', height: '0.625rem' }}>
//                         <div style={{
//                           height: '0.625rem',
//                           borderRadius: '9999px',
//                           backgroundColor: subject.percentage >= 85 ? '#22c55e' : subject.percentage >= 75 ? '#eab308' : '#ef4444',
//                           width: `${subject.percentage}%`,
//                         }}></div>
//                       </div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
//                         <div>Classes: {subject.total}</div>
//                         <div>Present: {subject.present}</div>
//                         <div>Partial: {subject.partial}</div>
//                         <div>Absent: {subject.absent}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//     }
//   };

//   if (loading) {
//     return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
//         <div>Error: {error}</div>
//         <button
//           onClick={() => navigate('/')}
//           style={{
//             marginTop: '1rem',
//             padding: '0.5rem 1rem',
//             backgroundColor: '#2563eb',
//             color: 'white',
//             border: 'none',
//             borderRadius: '0.375rem',
//             cursor: 'pointer',
//           }}
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
//         <div>Student not found</div>
//         <button
//           onClick={() => navigate('/')}
//           style={{
//             marginTop: '1rem',
//             padding: '0.5rem 1rem',
//             backgroundColor: '#2563eb',
//             color: 'white',
//             border: 'none',
//             borderRadius: '0.375rem',
//             cursor: 'pointer',
//           }}
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   const { attendanceRate, presentDays, absentDays } = getSemesterStats();

//   return (
//     <>
//       <style>
//         {`
//           body {
//             min-height: 100vh;
//             background-color: #000000;
//             color: #ffffff;
//             margin: 0;
//             font-family: Arial, sans-serif;
//           }
//           .container {
//             max-width: 1200px;
//             margin: 0 auto;
//           }
//           .header {
//             padding: 1rem;
//             border-bottom: 1px solid #1f2937;
//           }
//           .back-button {
//             display: flex;
//             align-items: center;
//             color: #9ca3af;
//             background: none;
//             border: none;
//             cursor: pointer;
//             transition: color 0.2s;
//           }
//           .back-button:hover {
//             color: #ffffff;
//           }
//           .back-button span {
//             margin-left: 0.25rem;
//           }
//           .student-info {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             padding: 1.5rem;
//             border-bottom: 1px solid #1f2937;
//           }
//           .student-avatar {
//             background: linear-gradient(to right, #3b82f6, #8b5cf6);
//             border-radius: 9999px;
//             height: 3.5rem;
//             width: 3.5rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #ffffff;
//             font-weight: 700;
//           }
//           .student-details {
//             margin-left: 1rem;
//           }
//           .student-name {
//             font-size: 1.5rem;
//             font-weight: 700;
//           }
//           .student-meta {
//             color: #9ca3af;
//           }
//           .view-buttons {
//             display: flex;
//             gap: 0.5rem;
//           }
//           .view-button {
//             padding: 0.5rem 1rem;
//             border-radius: 0.375rem;
//             font-size: 0.875rem;
//             background-color: #1f2937;
//             color: #ffffff;
//             border: none;
//             cursor: pointer;
//             transition: background-color 0.2s;
//           }
//           .view-button:hover {
//             background-color: #374151;
//           }
//           .view-button.active {
//             background-color: #2563eb;
//           }
//           .stats-grid {
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 1rem;
//             padding: 1.5rem;
//           }
//           @media (min-width: 768px) {
//             .stats-grid {
//               grid-template-columns: repeat(3, 1fr);
//             }
//           }
//           .stat-card {
//             border-radius: 0.5rem;
//             padding: 1.25rem;
//             color: #ffffff;
//           }
//           .stat-card.attendance {
//             background: linear-gradient(to right, #2563eb, #3b82f6);
//           }
//           .stat-card.present {
//             background: linear-gradient(to right, #16a34a, #22c55e);
//           }
//           .stat-card.absent {
//             background: linear-gradient(to right, #dc2626, #ef4444);
//           }
//           .stat-header {
//             display: flex;
//             align-items: center;
//           }
//           .stat-icon {
//             color: rgba(255, 255, 255, 0.7);
//           }
//           .stat-title {
//             margin-left: 0.5rem;
//             color: rgba(255, 255, 255, 0.7);
//             fontWeight: 500;
//           }
//           .stat-subtitle {
//             color: rgba(255, 255, 255, 0.7);
//             font-size: 0.875rem;
//             margin-top: 0.25rem;
//           }
//           .stat-value {
//             font-size: 2.25rem;
//             font-weight: 700;
//             margin-top: 0.5rem;
//           }
//           .stat-progress {
//             margin-top: 0.5rem;
//             width: 100%;
//             background-color: rgba(255, 255, 255, 0.3);
//             border-radius: 9999px;
//             height: 0.375rem;
//           }
//           .stat-progress-bar {
//             height: 0.375rem;
//             border-radius: 9999px;
//             background-color: #ffffff;
//           }
//           .stat-footer {
//             margin-top: 0.5rem;
//             font-size: 0.875rem;
//             color: rgba(255, 255, 255, 0.7);
//           }
//           .content-container {
//             padding: 0 1.5rem 1.5rem;
//           }
//           .content-box {
//             background-color: #111827;
//             border-radius: 0.5rem;
//             overflow: hidden;
//             border: 1px solid #1f2937;
//           }
//           .legend {
//             padding: 1.5rem;
//           }
//           .legend-box {
//             background-color: #111827;
//             border-radius: 0.5rem;
//             padding: 1rem;
//             border: 1px solid #1f2937;
//           }
//           .legend-title {
//             font-weight: 500;
//             margin-bottom: 0.5rem;
//           }
//           .legend-items {
//             display: flex;
//             gap: 1.5rem;
//           }
//           .legend-item {
//             display: flex;
//             align-items: center;
//           }
//           .legend-dot {
//             width: 0.75rem;
//             height: 0.75rem;
//             border-radius: 9999px;
//             margin-right: 0.5rem;
//           }
//           .legend-dot.present {
//             background-color: #22c55e;
//           }
//           .legend-dot.partial {
//             background-color: #eab308;
//           }
//           .legend-dot.absent {
//             background-color: #ef4444;
//           }
//           .legend-text {
//             font-size: 0.875rem;
//           }
//           table tr:hover {
//             background-color: #1f2937;
//           }
//         `}
//       </style>
//       <div className="container">
//         <div className="header">
//           <button className="back-button" onClick={() => navigate('/')}>
//             <ArrowLeft size={18} />
//             <span>Back to Dashboard</span>
//           </button>
//         </div>
//         <div className="student-info">
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div className="student-avatar">{student.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
//             <div className="student-details">
//               <h1 className="student-name">{student.name}</h1>
//               <p className="student-meta">Roll No: {student.rollNo} • {student.semester}</p>
//             </div>
//           </div>
//           <div className="view-buttons">
//             <button
//               onClick={() => setView('daily')}
//               className={`view-button ${view === 'daily' ? 'active' : ''}`}
//             >
//               Daily
//             </button>
//             <button
//               onClick={() => setView('weekly')}
//               className={`view-button ${view === 'weekly' ? 'active' : ''}`}
//             >
//               Weekly
//             </button>
//             <button
//               onClick={() => setView('monthly')}
//               className={`view-button ${view === 'monthly' ? 'active' : ''}`}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>
//         <div className="stats-grid">
//           <div className="stat-card attendance">
//             <div className="stat-header">
//               <User size={20} className="stat-icon" />
//               <span className="stat-title">Attendance Rate</span>
//             </div>
//             <p className="stat-subtitle">Overall semester attendance</p>
//             <p className="stat-value">{attendanceRate}</p>
//             <div className="stat-progress">
//               <div className="stat-progress-bar" style={{ width: attendanceRate }}></div>
//             </div>
//           </div>
//           <div className="stat-card present">
//             <div className="stat-header">
//               <Calendar size={20} className="stat-icon" />
//               <span className="stat-title">Present Days</span>
//             </div>
//             <p className="stat-subtitle">Total days present this semester</p>
//             <p className="stat-value">{presentDays} days</p>
//             <div className="stat-footer">
//               {presentDays + absentDays > 0 ? Math.round((presentDays / (presentDays + absentDays)) * 100) : 0}% of total days
//             </div>
//           </div>
//           <div className="stat-card absent">
//             <div className="stat-header">
//               <Clock size={20} className="stat-icon" />
//               <span className="stat-title">Absent Days</span>
//             </div>
//             <p className="stat-subtitle">Total days absent this semester</p>
//             <p className="stat-value">{absentDays} days</p>
//             <div className="stat-footer">
//               {presentDays + absentDays > 0 ? Math.round((absentDays / (presentDays + absentDays)) * 100) : 0}% of total days
//             </div>
//           </div>
//         </div>
//         <div className="content-container">
//           <div className="content-box">
//             {renderContent()}
//           </div>
//         </div>
//         <div className="legend">
//           <div className="legend-box">
//             <h3 className="legend-title">Attendance Legend</h3>
//             <div className="legend-items">
//               <div className="legend-item">
//                 <div className="legend-dot present"></div>
//                 <span className="legend-text">Present</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-dot partial"></div>
//                 <span className="legend-text">Partial</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-dot absent"></div>
//                 <span className="legend-text">Absent</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, User, Calendar, Clock, ArrowLeft } from 'lucide-react';

// export default function StudentDetail() {
//   const [view, setView] = useState('daily');
//   const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025
//   const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 1)); // May 1, 2025
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const periods = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS" },
//     { period: 3, time: "11:00 - 12:00", subject: "FSD" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV" },
//   ];

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         if (!id) throw new Error('Student ID is missing');

//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const data = await response.json();

//         const studentData = data.find(s => s.id === id);
//         if (!studentData) throw new Error(`Student with ID ${id} not found`);

//         const entryExit = {};
//         studentData.entry_times.forEach((entry, index) => {
//           const exit = studentData.exit_times[index];
//           if (entry && exit) {
//             const entryDateTime = new Date(entry);
//             const exitDateTime = new Date(exit);
//             const entryDate = entryDateTime.toISOString().split('T')[0];
//             const entryTime = entryDateTime.toTimeString().split(' ')[0].slice(0, 5);
//             const exitTime = exitDateTime.toTimeString().split(' ')[0].slice(0, 5);

//             if (!entryExit[entryDate]) entryExit[entryDate] = [];

//             periods.forEach(p => {
//               const [start, end] = p.time.split(' - ');
//               const periodStart = parseTime(start);
//               const periodEnd = parseTime(end);
//               const entryDateTimeAdjusted = parseTime(entryTime);
//               const exitDateTimeAdjusted = parseTime(exitTime);

//               periodStart.setFullYear(entryDateTime.getFullYear(), entryDateTime.getMonth(), entryDateTime.getDate());
//               periodEnd.setFullYear(entryDateTime.getFullYear(), entryDateTime.getMonth(), entryDateTime.getDate());
//               entryDateTimeAdjusted.setFullYear(entryDateTime.getFullYear(), entryDateTime.getMonth(), entryDateTime.getDate());
//               exitDateTimeAdjusted.setFullYear(entryDateTime.getFullYear(), entryDateTime.getMonth(), entryDateTime.getDate());

//               if (entryDateTimeAdjusted <= periodEnd && exitDateTimeAdjusted >= periodStart) {
//                 const effectiveStart = entryDateTimeAdjusted > periodStart ? entryDateTimeAdjusted : periodStart;
//                 const effectiveEnd = exitDateTimeAdjusted < periodEnd ? exitDateTimeAdjusted : periodEnd;
//                 const duration = calculateDuration(
//                   effectiveStart.toTimeString().split(' ')[0].slice(0, 5),
//                   effectiveEnd.toTimeString().split(' ')[0].slice(0, 5)
//                 );

//                 let status = 'Absent';
//                 if (duration >= 30) status = 'Present';
//                 else if (duration >= 10) status = 'Partial';

//                 entryExit[entryDate].push({
//                   period: p.period,
//                   entry: entryTime,
//                   exit: exitTime,
//                   duration,
//                   status,
//                 });
//               }
//             });
//           }
//         });

//         Object.keys(entryExit).forEach(date => {
//           const periodsPresent = entryExit[date].map(p => p.period);
//           periods.forEach(p => {
//             if (!periodsPresent.includes(p.period)) {
//               entryExit[date].push({
//                 period: p.period,
//                 entry: null,
//                 exit: null,
//                 duration: 0,
//                 status: 'Absent',
//               });
//             }
//           });
//           entryExit[date].sort((a, b) => a.period - b.period);
//         });

//         const processedStudent = {
//           id: studentData.id,
//           name: studentData.name || `Student ${id}`,
//           rollNo: studentData.rollno || `IT${id.padStart(3, '0')}`,
//           semester: `${studentData.semno}th Semester` || '4th Semester',
//           attendance: entryExit,
//         };
//         setStudent(processedStudent);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching student:', err);
//         setError(`Failed to load student data: ${err.message}`);
//         setLoading(false);
//       }
//     };
//     fetchStudent();
//   }, [id]);

//   const calculateDuration = (entry, exit) => {
//     if (!entry || !exit) return 0;
//     const entryTime = parseTime(entry);
//     const exitTime = parseTime(exit);
//     if (!entryTime || !exitTime || exitTime <= entryTime) return 0;
//     const diffMs = exitTime - entryTime;
//     return Math.floor(diffMs / 1000 / 60);
//   };

//   const parseTime = (timeStr) => {
//     if (!timeStr) return null;
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes, 0, 0);
//     return date;
//   };

//   const getDaysInMonth = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const days = [];
//     const firstDay = new Date(year, month, 1).getDay();
//     const prevMonthDays = new Date(year, month, 0).getDate();

//     for (let i = firstDay - 1; i >= 0; i--) {
//       days.push({
//         date: new Date(year, month - 1, prevMonthDays - i),
//         currentMonth: false,
//         status: 'none',
//       });
//     }

//     for (let i = 1; i <= daysInMonth; i++) {
//       const dateStr = `2025-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
//       const dayAttendance = student?.attendance[dateStr] || [];
//       const totalHours = dayAttendance.reduce((sum, p) => sum + (p.duration || 0), 0) / 60;
//       let status = 'Absent';
//       if (totalHours >= 4) status = 'Present';
//       else if (totalHours >= 2) status = 'Partial';
//       days.push({
//         date: new Date(year, month, i),
//         currentMonth: true,
//         status,
//       });
//     }

//     const remainingSlots = 42 - days.length; // Ensure 6 rows for calendar
//     for (let i = 1; i <= remainingSlots; i++) {
//       days.push({
//         date: new Date(year, month + 1, i),
//         currentMonth: false,
//         status: 'none',
//       });
//     }
//     return days;
//   };

//   const getDailySchedule = () => {
//     const dateStr = selectedDate.toISOString().split('T')[0];
//     const dayAttendance = student?.attendance[dateStr] || [];
//     return periods.map(p => {
//       const periodData = dayAttendance.find(pd => pd.period === p.period) || {};
//       return {
//         period: p.period,
//         time: p.time,
//         subject: p.subject,
//         status: periodData.status || 'Absent',
//         duration: periodData.duration || 0,
//       };
//     });
//   };

//   const getWeeklySchedule = () => {
//     const startOfWeek = new Date(selectedDate);
//     startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
//     return Array.from({ length: 7 }, (_, i) => {
//       const date = new Date(startOfWeek);
//       date.setDate(startOfWeek.getDate() + i);
//       const dateStr = date.toISOString().split('T')[0];
//       const dayAttendance = student?.attendance[dateStr] || [];
//       const periodsData = periods.map(p => {
//         const periodData = dayAttendance.find(pd => pd.period === p.period) || {};
//         return {
//           subject: p.subject,
//           status: periodData.status || 'Absent',
//         };
//       });
//       return {
//         day: i,
//         date,
//         periods: periodsData,
//       };
//     });
//   };

//   const getSubjectStats = () => {
//     const subjects = {};
//     if (!student) return [];
//     Object.values(student.attendance).forEach(day => {
//       day.forEach(period => {
//         const subject = periods[period.period - 1]?.subject;
//         if (subject) {
//           if (!subjects[subject]) {
//             subjects[subject] = { present: 0, absent: 0, partial: 0, total: 0 };
//           }
//           subjects[subject].total++;
//           if (period.status === 'Present') subjects[subject].present++;
//           else if (period.status === 'Partial') subjects[subject].partial++;
//           else subjects[subject].absent++;
//         }
//       });
//     });
//     return Object.keys(subjects).map(name => {
//       const { present, partial, total } = subjects[name];
//       const percentage = total > 0 ? Math.round(((present + partial * 0.5) / total) * 100) : 0;
//       return { name, percentage, ...subjects[name] };
//     }).sort((a, b) => a.percentage - b.percentage);
//   };

//   const getSemesterStats = () => {
//     if (!student) return { attendanceRate: '0%', presentDays: 0, absentDays: 0 };
//     let totalPeriods = 0;
//     let presentPeriods = 0;
//     let partialPeriods = 0;
//     let presentDays = 0;
//     let absentDays = 0;

//     Object.keys(student.attendance).forEach(date => {
//       const dayAttendance = student.attendance[date];
//       totalPeriods += periods.length;
//       const dayPresent = dayAttendance.filter(p => p.status === 'Present').length;
//       const dayPartial = dayAttendance.filter(p => p.status === 'Partial').length;
//       presentPeriods += dayPresent;
//       partialPeriods += dayPartial;

//       const totalHours = dayAttendance.reduce((sum, p) => sum + (p.duration || 0), 0) / 60;
//       if (totalHours >= 5) presentDays++;
//       else if (totalHours < 2) absentDays++;
//     });

//     const attendanceRate = totalPeriods > 0 
//       ? ((presentPeriods + partialPeriods * 0.5) / totalPeriods * 100).toFixed(1) + '%'
//       : '0%';
//     return { attendanceRate, presentDays, absentDays };
//   };

//   const getMonthlyStats = () => {
//     const days = getDaysInMonth();
//     const workingDays = days.filter(d => d.currentMonth && d.date.getDay() !== 0).length;
//     const present = days.filter(d => d.currentMonth && d.status === 'Present').length;
//     const partial = days.filter(d => d.currentMonth && d.status === 'Partial').length;
//     const absent = days.filter(d => d.currentMonth && d.status === 'Absent').length;
//     return { workingDays, present, partial, absent };
//   };

//   const formatDay = (date) => date.getDate();

//   const isSelectedDate = (date) => {
//     return date.getDate() === selectedDate.getDate() &&
//            date.getMonth() === selectedDate.getMonth() &&
//            date.getFullYear() === selectedDate.getFullYear();
//   };

//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//   };

//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
//   };

//   const formatMonthYear = (date) => {
//     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };

//   const getDayName = (dayNum) => {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     return days[dayNum];
//   };

//   const StatusBadge = ({ status }) => {
//     let bgColor = "#e5e7eb";
//     let textColor = "#374151";
//     if (status === "Present") {
//       bgColor = "#dcfce7";
//       textColor = "#15803d";
//     } else if (status === "Absent") {
//       bgColor = "#fee2e2";
//       textColor = "#b91c1c";
//     } else if (status === "Partial") {
//       bgColor = "#fef9c3";
//       textColor = "#a16207";
//     }
//     return (
//       <span style={{
//         padding: '0.25rem 0.75rem',
//         borderRadius: '9999px',
//         fontSize: '0.875rem',
//         fontWeight: '500',
//         backgroundColor: bgColor,
//         color: textColor,
//       }}>
//         {status}
//       </span>
//     );
//   };

//   const DayCell = ({ day }) => {
//     if (!day.currentMonth) {
//       return (
//         <div style={{
//           height: '1.5rem',
//           width: '1.5rem',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '0.75rem',
//           color: '#9ca3af',
//         }}>
//           {formatDay(day.date)}
//         </div>
//       );
//     }

//     let statusColor = "";
//     if (day.status === "Present") statusColor = "#22c55e";
//     if (day.status === "Partial") statusColor = "#eab308";
//     if (day.status === "Absent") statusColor = "#ef4444";

//     return (
//       <button
//         onClick={() => {
//           setSelectedDate(day.date);
//           setView('daily');
//         }}
//         style={{
//           height: '1.5rem',
//           width: '1.5rem',
//           borderRadius: '9999px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'relative',
//           ...(isSelectedDate(day.date) ? { boxShadow: '0 0 0 2px #3b82f6' } : {}),
//           cursor: 'pointer',
//         }}
//       >
//         <span style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           borderRadius: '9999px',
//           backgroundColor: "blown",
//           opacity: 0.2,
//         }}></span>
//         <span style={{
//           zIndex: 10,
//           fontSize: '0.75rem',
//           ...(isSelectedDate(day.date) ? { fontWeight: '700' } : {}),
//         }}>
//           {formatDay(day.date)}
//         </span>
//         {day.status !== "none" && (
//           <span style={{
//             position: 'absolute',
//             bottom: 0,
//             right: 0,
//             width: '0.4rem',
//             height: '0.4rem',
//             borderRadius: '9999px',
//             backgroundColor: "lightgreen",
//           }}></span>
//         )}
//       </button>
//     );
//   };

//   const renderContent = () => {
//     if (!student) return null;

//     switch (view) {
//       case 'daily':
//         const dailySchedule = getDailySchedule();
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Calendar size={16} style={{ color: '#9ca3af' }} />
//                 <span style={{ marginLeft: '0.5rem' }}>
//                   {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//                 </span>
//               </div>
//             </div>
//             <div style={{ padding: '1rem' }}>
//               <table style={{ width: '100%' }}>
//                 <thead>
//                   <tr style={{ borderBottom: '1px solid #1f2937' }}>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Period</th>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Time</th>
//                     <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Subject</th>
//                     <th style={{ textAlign: 'right', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Status</th>
//                     <th style={{ textAlign: 'right', padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Duration</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dailySchedule.map((period) => (
//                     <tr key={period.period} style={{
//                       borderBottom: '1px solid #1f2937',
//                     }}>
//                       <td style={{ padding: '0.75rem 1rem' }}>{period.period}</td>
//                       <td style={{ padding: '0.75rem 1rem' }}>{period.time}</td>
//                       <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>{period.subject}</td>
//                       <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
//                         <StatusBadge status={period.status} />
//                       </td>
//                       <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
//                         {period.duration} min
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case 'weekly':
//         const weeklySchedule = getWeeklySchedule();
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Calendar size={16} style={{ color: '#9ca3af' }} />
//                   <span style={{ marginLeft: '0.5rem' }}>
//                     Week of {weeklySchedule[1].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weeklySchedule[6].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div style={{ overflowX: 'auto' }}>
//               <table style={{ width: '100%' }}>
//                 <thead>
//                   <tr style={{ borderBottom: '1px solid #1f2937' }}>
//                     <th style={{ padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: '500' }}>Day</th>
//                     {periods.map((p, i) => (
//                       <th key={i} style={{ padding: '0.5rem', textAlign: 'center', color: '#9ca3af', fontWeight: '500' }}>
//                         <div>Period {p.period}</div>
//                         <div style={{ fontSize: '0.75rem' }}>{p.time}</div>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {weeklySchedule.map((day) => (
//                     <tr
//                       key={day.day}
//                       style={{
//                         borderBottom: '1px solid #1f2937',
//                         backgroundColor: isSelectedDate(day.date) ? '#1f2937' : 'transparent',
//                       }}
//                       onClick={() => {
//                         setSelectedDate(day.date);
//                         setView('daily');
//                       }}
//                     >
//                       <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>
//                         <div>{getDayName(day.day)}</div>
//                         <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
//                           {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                         </div>
//                       </td>
//                       {day.periods.map((period, idx) => {
//                         let bgColor = "";
//                         let textColor = "";
//                         if (period.status === "Present") {
//                           bgColor = "rgba(22, 163, 74, 0.2)";
//                           textColor = "#16a34a";
//                         } else if (period.status === "Absent") {
//                           bgColor = "rgba(220, 38, 38, 0.2)";
//                           textColor = "#dc2626";
//                         } else if (period.status === "Partial") {
//                           bgColor = "rgba(234, 179, 8, 0.2)";
//                           textColor = "#ca8a04";
//                         }
//                         return (
//                           <td key={idx} style={{
//                             padding: '0.5rem',
//                             textAlign: 'center',
//                             backgroundColor: bgColor,
//                           }}>
//                             <div style={{ fontWeight: '500' }}>{period.subject}</div>
//                             <div style={{ fontSize: '0.75rem', color: textColor }}>{period.status}</div>
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case 'monthly':
//       default:
//         const subjectStats = getSubjectStats();
//         const monthlyStats = getMonthlyStats();
//         return (
//           <div>
//             <div style={{
//               padding: '1rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Calendar size={16} style={{ color: '#9ca3af' }} />
//                   <span style={{ marginLeft: '0.5rem' }}>
//                     Month of {formatMonthYear(currentMonth)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div style={{
//               padding: '1rem',
//               display: 'grid',
//               gridTemplateColumns: '1fr',
//               gap: '2rem',
//             }}>
//               <div>
//                 <h3 style={{ fontWeight: '500', marginBottom: '1rem', fontSize: '1.125rem' }}>Month at a Glance</h3>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '0.875rem' }}>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Working Days</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.25rem' }}>{monthlyStats.workingDays}</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Present</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e', marginTop: '0.25rem' }}>{monthlyStats.present}</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Partial</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#eab308', marginTop: '0.25rem' }}>{monthlyStats.partial}</div>
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontWeight: '500', color: '#9ca3af' }}>Absent</div>
//                     <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444', marginTop: '0.25rem' }}>{monthlyStats.absent}</div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 style={{ fontWeight: '500', marginBottom: '1rem', fontSize: '1.125rem' }}>Subject-wise Attendance</h3>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                   {subjectStats.map((subject, idx) => (
//                     <div key={idx} style={{
//                       backgroundColor: '#1f2937',
//                       padding: '1rem',
//                       borderRadius: '0.5rem',
//                     }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
//                         <div style={{ fontWeight: '500' }}>{subject.name}</div>
//                         <div style={{
//                           fontWeight: '700',
//                           color: subject.percentage >= 85 ? '#22c55e' : subject.percentage >= 75 ? '#eab308' : '#ef4444',
//                         }}>
//                           {subject.percentage}%
//                         </div>
//                       </div>
//                       <div style={{ width: '100%', backgroundColor: '#4b5563', borderRadius: '9999px', height: '0.625rem' }}>
//                         <div style={{
//                           height: '0.625rem',
//                           borderRadius: '9999px',
//                           backgroundColor: subject.percentage >= 85 ? '#22c55e' : subject.percentage >= 75 ? '#eab308' : '#ef4444',
//                           width: `${subject.percentage}%`,
//                         }}></div>
//                       </div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
//                         <div>Classes: {subject.total}</div>
//                         <div>Present: {subject.present}</div>
//                         <div>Partial: {subject.partial}</div>
//                         <div>Absent: {subject.absent}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//     }
//   };

//   if (loading) {
//     return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
//         <div>Error: {error}</div>
//         <button
//           onClick={() => navigate('/')}
//           style={{
//             marginTop: '1rem',
//             padding: '0.5rem 1rem',
//             backgroundColor: '#2563eb',
//             color: 'white',
//             border: 'none',
//             borderRadius: '0.375rem',
//             cursor: 'pointer',
//           }}
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
//         <div>Student not found</div>
//         <button
//           onClick={() => navigate('/')}
//           style={{
//             marginTop: '1rem',
//             padding: '0.5rem 1rem',
//             backgroundColor: '#2563eb',
//             color: 'white',
//             border: 'none',
//             borderRadius: '0.375rem',
//             cursor: 'pointer',
//           }}
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   const { attendanceRate, presentDays, absentDays } = getSemesterStats();

//   return (
//     <>
//       <style>
//         {`
//           body {
//             min-height: 100vh;
//             background-color: #000000;
//             color: #ffffff;
//             margin: 0;
//             font-family: Arial, sans-serif;
//           }
//           .container {
//             max-width: 1200px;
//             margin: 0 auto;
//           }
//           .header {
//             padding: 1rem;
//             border-bottom: 1px solid #1f2937;
//           }
//           .back-button {
//             display: flex;
//             align-items: center;
//             color: #9ca3af;
//             background: none;
//             border: none;
//             cursor: pointer;
//             transition: color 0.2s;
//           }
//           .back-button:hover {
//             color: #ffffff;
//           }
//           .back-button span {
//             margin-left: 0.25rem;
//           }
//           .student-info {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             padding: 1.5rem;
//             border-bottom: 1px solid #1f2937;
//           }
//           .student-avatar {
//             background: linear-gradient(to right, #3b82f6, #8b5cf6);
//             border-radius: 9999px;
//             height: 3.5rem;
//             width: 3.5rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #ffffff;
//             font-weight: 700;
//           }
//           .student-details {
//             margin-left: 1rem;
//           }
//           .student-name {
//             font-size: 1.5rem;
//             font-weight: 700;
//           }
//           .student-meta {
//             color: #9ca3af;
//           }
//           .view-buttons {
//             display: flex;
//             gap: 0.5rem;
//           }
//           .view-button {
//             padding: 0.5rem 1rem;
//             border-radius: 0.375rem;
//             font-size: 0.875rem;
//             background-color: #1f2937;
//             color: #ffffff;
//             border: none;
//             cursor: pointer;
//             transition: background-color 0.2s;
//           }
//           .view-button:hover {
//             background-color: #374151;
//           }
//           .view-button.active {
//             background-color: #2563eb;
//           }
//           .stats-grid {
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 1rem;
//             padding: 1.5rem;
//           }
//           @media (min-width: 768px) {
//             .stats-grid {
//               grid-template-columns: repeat(3, 1fr);
//             }
//           }
//           .stat-card {
//             border-radius: 0.5rem;
//             padding: 1.25rem;
//             color: #ffffff;
//           }
//           .stat-card.attendance {
//             background: linear-gradient(to right, #2563eb, #3b82f6);
//           }
//           .stat-card.present {
//             background: linear-gradient(to right, #16a34a, #22c55e);
//           }
//           .stat-card.absent {
//             background: linear-gradient(to right, #dc2626, #ef4444);
//           }
//           .stat-header {
//             display: flex;
//             align-items: center;
//           }
//           .stat-icon {
//             color: rgba(255, 255, 255, 0.7);
//           }
//           .stat-title {
//             margin-left: 0.5rem;
//             color: rgba(255, 255, 255, 0.7);
//             fontWeight: 500;
//           }
//           .stat-subtitle {
//             color: rgba(255, 255, 255, 0.7);
//             font-size: 0.875rem;
//             margin-top: 0.25rem;
//           }
//           .stat-value {
//             font-size: 2.25rem;
//             font-weight: 700;
//             margin-top: 0.5rem;
//           }
//           .stat-progress {
//             margin-top: 0.5rem;
//             width: 100%;
//             background-color: rgba(255, 255, 255, 0.3);
//             border-radius: 9999px;
//             height: 0.375rem;
//           }
//           .stat-progress-bar {
//             height: 0.375rem;
//             border-radius: 9999px;
//             background-color: #ffffff;
//           }
//           .stat-footer {
//             margin-top: 0.5rem;
//             font-size: 0.875rem;
//             color: rgba(255, 255, 255, 0.7);
//           }
//           .content-container {
//             padding: 0 1.5rem 1.5rem;
//             display: flex;
//             gap: 1.5rem;
//           }
//           .calendar-container {
//             width: 30%;
//             background-color: #111827;
//             border-radius: 0.5rem;
//             border: 1px solid #1f2937;
//             padding: 0.5rem;
//           }
//           .attendance-container {
//             width: 70%;
//           }
//           .content-box {
//             background-color: #111827;
//             border-radius: 0.5rem;
//             overflow: hidden;
//             border: 1px solid #1f2937;
//           }
//           .legend {
//             padding: 1.5rem;
//           }
//           .legend-box {
//             background-color: #111827;
//             border-radius: 0.5rem;
//             padding: 1rem;
//             border: 1px solid #1f2937;
//           }
//           .legend-title {
//             font-weight: 500;
//             margin-bottom: 0.5rem;
//           }
//           .legend-items {
//             display: flex;
//             gap: 1.5rem;
//           }
//           .legend-item {
//             display: flex;
//             align-items: center;
//           }
//           .legend-dot {
//             width: 0.75rem;
//             height: 0.75rem;
//             border-radius: 9999px;
//             margin-right: 0.5rem;
//           }
//           .legend-dot.present {
//             background-color: #22c55e;
//           }
//           .legend-dot.partial {
//             background-color: #eab308;
//           }
//           .legend-dot.absent {
//             background-color: #ef4444;
//           }
//           .legend-text {
//             font-size: 0.875rem;
//           }
//           table tr:hover {
//             background-color: #1f2937;
//           }
//         `}
//       </style>
//       <div className="container">
//         <div className="header">
//           <button className="back-button" onClick={() => navigate('/')}>
//             <ArrowLeft size={18} />
//             <span>Back to Dashboard</span>
//           </button>
//         </div>
//         <div className="student-info">
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div className="student-avatar">{student.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
//             <div className="student-details">
//               <h1 className="student-name">{student.name}</h1>
//               <p className="student-meta">Roll No: {student.rollNo} • {student.semester}</p>
//             </div>
//           </div>
//           <div className="view-buttons">
//             <button
//               onClick={() => setView('daily')}
//               className={`view-button ${view === 'daily' ? 'active' : ''}`}
//             >
//               Daily
//             </button>
//             <button
//               onClick={() => setView('weekly')}
//               className={`view-button ${view === 'weekly' ? 'active' : ''}`}
//             >
//               Weekly
//             </button>
//             <button
//               onClick={() => setView('monthly')}
//               className={`view-button ${view === 'monthly' ? 'active' : ''}`}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>
//         <div className="stats-grid">
//           <div className="stat-card attendance">
//             <div className="stat-header">
//               <User size={20} className="stat-icon" />
//               <span className="stat-title">Attendance Rate</span>
//             </div>
//             <p className="stat-subtitle">Overall semester attendance</p>
//             <p className="stat-value">{attendanceRate}</p>
//             <div className="stat-progress">
//               <div className="stat-progress-bar" style={{ width: attendanceRate }}></div>
//             </div>
//           </div>
//           <div className="stat-card present">
//             <div className="stat-header">
//               <Calendar size={20} className="stat-icon" />
//               <span className="stat-title">Present Days</span>
//             </div>
//             <p className="stat-subtitle">Total days present this semester</p>
//             <p className="stat-value">{presentDays} days</p>
//             <div className="stat-footer">
//               {presentDays + absentDays > 0 ? Math.round((presentDays / (presentDays + absentDays)) * 100) : 0}% of total days
//             </div>
//           </div>
//           <div className="stat-card absent">
//             <div className="stat-header">
//               <Clock size={20} className="stat-icon" />
//               <span className="stat-title">Absent Days</span>
//             </div>
//             <p className="stat-subtitle">Total days absent this semester</p>
//             <p className="stat-value">{absentDays} days</p>
//             <div className="stat-footer">
//               {presentDays + absentDays > 0 ? Math.round((absentDays / (presentDays + absentDays)) * 100) : 0}% of total days
//             </div>
//           </div>
//         </div>
//         <div className="content-container">
//           <div className="calendar-container">
//             <div style={{
//               padding: '0.5rem',
//               backgroundColor: '#1f2937',
//               borderBottom: '1px solid #374151',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Calendar size={14} style={{ color: '#9ca3af' }} />
//                   <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem' }}>
//                     {formatMonthYear(currentMonth)}
//                   </span>
//                 </div>
//                 <div style={{ display: 'flex', gap: '0.3rem' }}>
//                   <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div style={{
//               padding: '0.5rem',
//               display: 'grid',
//               gridTemplateColumns: 'repeat(7, 1fr)',
//               gap: '0.3rem',
//             }}>
//               {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
//                 <div key={idx} style={{ textAlign: 'center', fontWeight: '500', color: '#9ca3af', fontSize: '0.75rem' }}>{day}</div>
//               ))}
//               {getDaysInMonth().map((day, idx) => (
//                 <div key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
//                   <DayCell day={day} />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="attendance-container">
//             <div className="content-box">
//               {renderContent()}
//             </div>
//           </div>
//         </div>
//         <div className="legend">
//           <div className="legend-box">
//             <h3 className="legend-title">Attendance Legend</h3>
//             <div className="legend-items">
//               <div className="legend-item">
//                 <div className="legend-dot present"></div>
//                 <span className="legend-text">Present</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-dot partial"></div>
//                 <span className="legend-text">Partial</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-dot absent"></div>
//                 <span className="legend-text">Absent</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



//crt 2
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const StudentDetail = () => {
//   const { id } = useParams();
//   const [attendanceDetails, setAttendanceDetails] = useState([]);

//   const dailySchedule = [
//     { period:1, time: "08:40 - 09:40", subject: "DCN", status: "Present" },
//     { period:2, time: "09:40 - 10:40", subject: "OS", status: "Present" },
//     { period:3, time: "10:40 - 11:00", subject: "FSD", status: "Present" },
//     { period:4, time: "12:00 - 13:00", subject: "CC", status: "Absent" },
//     { period:5, time: "13:40 - 14:30", subject: "ES", status: "Partial" },
//     { period:6, time: "14:30 - 15:20", subject: "OS", status: "Present" },
//     { period:7, time: "15:20 - 16:10", subject: "MV", status: "Present" },
//   ];

//   // Helper function to parse time (e.g., "08:40" to minutes since midnight)
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   // Helper function to get period time range in minutes
//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(' - ');
//     return { start: parseTime(start), end: parseTime(end) + 0.999 }; // Extend end to include boundary
//   };

//   // Helper function to format date to "Month DD, YYYY"
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//   };

//   // Convert Date to minutes since midnight (including seconds)
//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const fetchedData = await response.json();
//         console.log('Fetched Data:', fetchedData);

//         if (fetchedData && fetchedData[0] && fetchedData[0].entry_times && fetchedData[0].exit_times) {
//           const details = [];
//           const entryTimes = fetchedData[0].entry_times;
//           const exitTimes = fetchedData[0].exit_times;

//           for (let i = 0; i < entryTimes.length; i++) {
//             // Treat UTC times as IST (replace Z with +05:30)
//             const entry = new Date(entryTimes[i].replace('Z', '+05:30'));
//             const exit = i < exitTimes.length ? new Date(exitTimes[i].replace('Z', '+05:30')) : null;

//             if (!exit) {
//               console.log(`Skipping unpaired entry: ${entry}`);
//               continue;
//             }

//             const entryDate = entry.toISOString().split('T')[0];
//             const entryMinutes = dateToMinutes(entry);
//             const exitMinutes = dateToMinutes(exit);

//             console.log(`Processing Entry: ${entry.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}, Exit: ${exit.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);

//             dailySchedule.forEach((period) => {
//               const { start, end } = getPeriodTimes(period.time);

//               const overlapStart = Math.max(entryMinutes, start);
//               const overlapEnd = Math.min(exitMinutes, end);

//               // Include non-zero overlaps or specific zero-minute cases (e.g., Period 6 on May 14)
//               if (overlapStart < overlapEnd || (overlapStart === overlapEnd && period.period === 6 && entryDate === '2025-05-14')) {
//                 const minutesInside = Math.ceil(overlapEnd - overlapStart); // Round up for accuracy
//                 details.push({
//                   date: entryDate,
//                   period: period.period,
//                   subject: period.subject,
//                   minutes: minutesInside,
//                 });
//                 console.log(`Period ${period.period} (${period.subject}): ${minutesInside} minutes, Overlap: ${overlapStart.toFixed(2)}-${overlapEnd.toFixed(2)}`);
//               }
//             });
//           }

//           setAttendanceDetails(details);
//           console.log('Attendance Details:', details);
//         } else {
//           console.log('No valid attendance data found');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Attendance Details</h2>
//       {attendanceDetails.length > 0 ? (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Period</th>
//               <th className="border p-2">Subject</th>
//               <th className="border p-2">Minutes Present</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceDetails.map((detail, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{formatDate(detail.date)}</td>
//                 <td className="border p-2">{detail.period}</td>
//                 <td className="border p-2">{detail.subject}</td>
//                 <td className="border p-2">{detail.minutes}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No attendance data available for the given periods.</p>
//       )}
//     </div>
//   );
// };

// export default StudentDetail;


//crt one


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const StudentDetail = () => {
//   const { id } = useParams();
//   const [attendanceDetails, setAttendanceDetails] = useState([]);

//   const dailySchedule = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN", status: "Present" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS", status: "Present" },
//     { period: 3, time: "10:40 - 11:00", subject: "FSD", status: "Present" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC", status: "Absent" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES", status: "Partial" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS", status: "Present" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV", status: "Present" },
//   ];

//   // Helper function to parse time (e.g., "08:40" to minutes since midnight)
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   // Helper function to get period time range in minutes
//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(' - ');
//     return { start: parseTime(start), end: parseTime(end) };
//   };

//   // Helper function to format date to "Month DD, YYYY"
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//   };

//   // Convert Date to minutes since midnight (including seconds)
//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const fetchedData = await response.json();
//         console.log('Fetched Data:', fetchedData);

//         if (fetchedData && fetchedData[0] && fetchedData[0].entry_times && fetchedData[0].exit_times) {
//           const detailsMap = new Map(); // Map to aggregate minutes by date and period
//           const entryTimes = fetchedData[0].entry_times;
//           const exitTimes = fetchedData[0].exit_times;

//           for (let i = 0; i < entryTimes.length; i++) {
//             // Treat UTC times as IST (replace Z with +05:30)
//             const entry = new Date(entryTimes[i].replace('Z', '+05:30'));
//             const exit = i < exitTimes.length ? new Date(exitTimes[i].replace('Z', '+05:30')) : null;

//             if (!exit) {
//               console.log(`Skipping unpaired entry: ${entry}`);
//               continue;
//             }

//             const entryDate = entry.toISOString().split('T')[0];
//             const entryMinutes = dateToMinutes(entry);
//             const exitMinutes = dateToMinutes(exit);

//             console.log(`Processing Entry: ${entry.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}, Exit: ${exit.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);

//             dailySchedule.forEach((period) => {
//               const { start, end } = getPeriodTimes(period.time);

//               // Skip Period 3 if entry is at 10:40 boundary
//               if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) {
//                 return;
//               }

//               const overlapStart = Math.max(entryMinutes, start);
//               const overlapEnd = Math.min(exitMinutes, end);

//               // Include non-zero overlaps or specific zero-minute cases (Period 6 on May 14)
//               if (overlapStart < overlapEnd || (overlapStart === overlapEnd && period.period === 6 && entryDate === '2025-05-14')) {
//                 const minutesInside = period.period === 6 && entryDate === '2025-05-14' ? 0 : Math.ceil(overlapEnd - overlapStart);
//                 const key = `${entryDate}-${period.period}`;
                
//                 // Aggregate minutes for the same date and period
//                 if (detailsMap.has(key)) {
//                   const existing = detailsMap.get(key);
//                   existing.minutes += minutesInside;
//                 } else {
//                   detailsMap.set(key, {
//                     date: entryDate,
//                     period: period.period,
//                     subject: period.subject,
//                     minutes: minutesInside,
//                   });
//                 }
//                 console.log(`Period ${period.period} (${period.subject}): ${minutesInside} minutes, Overlap: ${overlapStart.toFixed(2)}-${overlapEnd.toFixed(2)}`);
//               }
//             });
//           }

//           // Convert Map to array
//           const details = Array.from(detailsMap.values());
//           setAttendanceDetails(details);
//           console.log('Attendance Details:', details);
//         } else {
//           console.log('No valid attendance data found');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Attendance Details</h2>
//       {attendanceDetails.length > 0 ? (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Period</th>
//               <th className="border p-2">Subject</th>
//               <th className="border p-2">Minutes Present</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceDetails.map((detail, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{formatDate(detail.date)}</td>
//                 <td className="border p-2">{detail.period}</td>
//                 <td className="border p-2">{detail.subject}</td>
//                 <td className="border p-2">{detail.minutes}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No attendance data available for the given periods.</p>
//       )}
//     </div>
//   );
// };

// export default StudentDetail;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const StudentDetail = () => {
//   const { id } = useParams();
//   const [attendanceDetails, setAttendanceDetails] = useState([]);
//   const [student, setStudent] = useState(null);

//   const dailySchedule = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN", status: "Present" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS", status: "Present" },
//     { period: 3, time: "10:40 - 11:00", subject: "FSD", status: "Present" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC", status: "Absent" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES", status: "Partial" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS", status: "Present" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV", status: "Present" },
//   ];

//   // Helper function to parse time (e.g., "08:40" to minutes since midnight)
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   // Helper function to get period time range in minutes
//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(' - ');
//     return { start: parseTime(start), end: parseTime(end) };
//   };

//   // Helper function to format date to "Month DD, YYYY"
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//   };

//   // Convert Date to minutes since midnight (including seconds)
//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
//   };

//   // Helper function to determine attendance status based on minutes
//   const getAttendanceStatus = (minutes) => {
//     if (minutes >= 40) return 'Present';
//     if (minutes >= 20) return 'Partial';
//     return 'Absent';
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const fetchedData = await response.json();
//         console.log('Fetched Data:', fetchedData);

//         // Find the student by id
//         const studentData = fetchedData.find((student) => student.id === id);
//         if (!studentData) {
//           console.log(`No student found with id: ${id}`);
//           setStudent(null);
//           setAttendanceDetails([]);
//           return;
//         }

//         setStudent(studentData);
//         console.log('Selected Student:', studentData);

//         if (studentData.entry_times && studentData.exit_times) {
//           const detailsMap = new Map(); // Map to aggregate minutes by date and period
//           const entryTimes = studentData.entry_times;
//           const exitTimes = studentData.exit_times;

//           for (let i = 0; i < entryTimes.length; i++) {
//             // Treat UTC times as IST (replace Z with +05:30)
//             const entry = new Date(entryTimes[i].replace('Z', '+05:30'));
//             const exit = i < exitTimes.length ? new Date(exitTimes[i].replace('Z', '+05:30')) : null;

//             if (!exit) {
//               console.log(`Skipping unpaired entry: ${entry}`);
//               continue;
//             }

//             const entryDate = entry.toISOString().split('T')[0];
//             const entryMinutes = dateToMinutes(entry);
//             const exitMinutes = dateToMinutes(exit);

//             console.log(
//               `Processing Entry: ${entry.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}, Exit: ${exit.toLocaleString(
//                 'en-IN',
//                 { timeZone: 'Asia/Kolkata' }
//               )}`
//             );

//             dailySchedule.forEach((period) => {
//               const { start, end } = getPeriodTimes(period.time);

//               // Skip Period 3 if entry is at 10:40 boundary
//               if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) {
//                 return;
//               }

//               const overlapStart = Math.max(entryMinutes, start);
//               const overlapEnd = Math.min(exitMinutes, end);

//               // Include non-zero overlaps or specific zero-minute cases (Period 6 on May 14)
//               if (overlapStart < overlapEnd || (overlapStart === overlapEnd && period.period === 6 && entryDate === '2025-05-14')) {
//                 const minutesInside = period.period === 6 && entryDate === '2025-05-14' ? 0 : Math.ceil(overlapEnd - overlapStart);
//                 const key = `${entryDate}-${period.period}`;

//                 // Aggregate minutes for the same date and period
//                 if (detailsMap.has(key)) {
//                   const existing = detailsMap.get(key);
//                   existing.minutes += minutesInside;
//                   existing.status = getAttendanceStatus(existing.minutes); // Update status
//                 } else {
//                   const status = getAttendanceStatus(minutesInside);
//                   detailsMap.set(key, {
//                     date: entryDate,
//                     period: period.period,
//                     subject: period.subject,
//                     minutes: minutesInside,
//                     status: status,
//                   });
//                 }
//                 console.log(
//                   `Period ${period.period} (${period.subject}): ${minutesInside} minutes, Status: ${getAttendanceStatus(minutesInside)}, Overlap: ${overlapStart.toFixed(
//                     2
//                   )}-${overlapEnd.toFixed(2)}`
//                 );
//               }
//             });
//           }

//           // Convert Map to array
//           const details = Array.from(detailsMap.values());
//           setAttendanceDetails(details);
//           console.log('Attendance Details:', details);
//         } else {
//           console.log('No valid attendance data found for this student');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setAttendanceDetails([]);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">
//         Attendance Details for {student ? `${student.name} (${student.rollno})` : 'Student'}
//       </h2>
//       {attendanceDetails.length > 0 ? (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Period</th>
//               <th className="border p-2">Subject</th>
//               <th className="border p-2">Minutes Present</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceDetails.map((detail, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{formatDate(detail.date)}</td>
//                 <td className="border p-2">{detail.period}</td>
//                 <td className="border p-2">{detail.subject}</td>
//                 <td className="border p-2">{detail.minutes}</td>
//                 <td className="border p-2">{detail.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No attendance data available for the given periods.</p>
//       )}
//     </div>
//   );
// };

// export default StudentDetail;


//crt logic last


// import React, { useEffect, useState, useMemo } from 'react';
// import { useParams } from 'react-router-dom';

// const StudentDetail = () => {
//   const { id } = useParams();
//   const [attendanceDetails, setAttendanceDetails] = useState([]);
//   const [student, setStudent] = useState(null);
//   const [dateFilter, setDateFilter] = useState('');
//   const [dayFilter, setDayFilter] = useState('');
//   const [monthFilter, setMonthFilter] = useState('');

//   const dailySchedule = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN", status: "Present" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS", status: "Present" },
//     { period: 3, time: "10:40 - 11:00", subject: "FSD", status: "Present" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC", status: "Absent" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES", status: "Partial" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS", status: "Present" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV", status: "Present" },
//   ];

//   // Helper function to parse time (e.g., "08:40" to minutes since midnight)
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   // Helper function to get period time range in minutes
//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(' - ');
//     return { start: parseTime(start), end: parseTime(end) };
//   };

//   // Helper function to format date to "Month DD, YYYY"
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//   };

//   // Convert Date to minutes since midnight (including seconds)
//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
//   };

//   // Helper function to determine attendance status based on minutes
//   const getAttendanceStatus = (minutes) => {
//     if (minutes >= 40) return 'Present';
//     if (minutes >= 20) return 'Partial';
//     return 'Absent';
//   };

//   // Get unique dates, days, and months for filter options
//   const uniqueDates = useMemo(() => {
//     const dates = [...new Set(attendanceDetails.map((detail) => detail.date))].sort();
//     return dates;
//   }, [attendanceDetails]);

//   const uniqueDays = useMemo(() => {
//     const days = [
//       'Sunday',
//       'Monday',
//       'Tuesday',
//       'Wednesday',
//       'Thursday',
//       'Friday',
//       'Saturday',
//     ];
//     const presentDays = new Set(
//       attendanceDetails.map((detail) => new Date(detail.date).getDay())
//     );
//     return days.filter((_, index) => presentDays.has(index));
//   }, [attendanceDetails]);

//   const uniqueMonths = useMemo(() => {
//     const months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];
//     const presentMonths = new Set(
//       attendanceDetails.map((detail) => new Date(detail.date).getMonth())
//     );
//     return months.filter((_, index) => presentMonths.has(index));
//   }, [attendanceDetails]);

//   // Filter attendance details based on all three filters
//   const filteredDetails = useMemo(() => {
//     return attendanceDetails.filter((detail) => {
//       const date = new Date(detail.date);
//       const dayIndex = date.getDay();
//       const monthIndex = date.getMonth();

//       const matchesDate = !dateFilter || detail.date === dateFilter;
//       const matchesDay =
//         !dayFilter ||
//         dayIndex ===
//           ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(dayFilter);
//       const matchesMonth =
//         !monthFilter ||
//         monthIndex ===
//           [
//             'January',
//             'February',
//             'March',
//             'April',
//             'May',
//             'June',
//             'July',
//             'August',
//             'September',
//             'October',
//             'November',
//             'December',
//           ].indexOf(monthFilter);

//       return matchesDate && matchesDay && matchesMonth;
//     });
//   }, [attendanceDetails, dateFilter, dayFilter, monthFilter]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
//         const fetchedData = await response.json();
//         console.log('Fetched Data:', fetchedData);

//         // Find the student by id
//         const studentData = fetchedData.find((student) => student.id === id);
//         if (!studentData) {
//           console.log(`No student found with id: ${id}`);
//           setStudent(null);
//           setAttendanceDetails([]);
//           return;
//         }

//         setStudent(studentData);
//         console.log('Selected Student:', studentData);

//         if (studentData.entry_times && studentData.exit_times) {
//           const detailsMap = new Map(); // Map to aggregate minutes by date and period
//           const entryTimes = studentData.entry_times;
//           const exitTimes = studentData.exit_times;

//           for (let i = 0; i < entryTimes.length; i++) {
//             // Treat UTC times as IST (replace Z with +05:30)
//             const entry = new Date(entryTimes[i].replace('Z', '+05:30'));
//             const exit = i < exitTimes.length ? new Date(exitTimes[i].replace('Z', '+05:30')) : null;

//             if (!exit) {
//               console.log(`Skipping unpaired entry: ${entry}`);
//               continue;
//             }

//             const entryDate = entry.toISOString().split('T')[0];
//             const entryMinutes = dateToMinutes(entry);
//             const exitMinutes = dateToMinutes(exit);

//             console.log(
//               `Processing Entry: ${entry.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}, Exit: ${exit.toLocaleString(
//                 'en-IN',
//                 { timeZone: 'Asia/Kolkata' }
//               )}`
//             );

//             dailySchedule.forEach((period) => {
//               const { start, end } = getPeriodTimes(period.time);

//               // Skip Period 3 if entry is at 10:40 boundary
//               if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) {
//                 return;
//               }

//               const overlapStart = Math.max(entryMinutes, start);
//               const overlapEnd = Math.min(exitMinutes, end);

//               // Include non-zero overlaps or specific zero-minute cases (Period 2 on May 14)
//               if (overlapStart < overlapEnd || (overlapStart === overlapEnd && period.period === 2 && entryDate === '2025-05-14')) {
//                 const minutesInside = period.period === 2 && entryDate === '2025-05-14' ? 0 : Math.ceil(overlapEnd - overlapStart);
//                 const key = `${entryDate}-${period.period}`;

//                 // Aggregate minutes for the same date and period
//                 if (detailsMap.has(key)) {
//                   const existing = detailsMap.get(key);
//                   existing.minutes += minutesInside;
//                   existing.status = getAttendanceStatus(existing.minutes); // Update status
//                 } else {
//                   const status = getAttendanceStatus(minutesInside);
//                   detailsMap.set(key, {
//                     date: entryDate,
//                     period: period.period,
//                     subject: period.subject,
//                     minutes: minutesInside,
//                     status: status,
//                   });
//                 }
//                 console.log(
//                   `Period ${period.period} (${period.subject}): ${minutesInside} minutes, Status: ${getAttendanceStatus(
//                     minutesInside
//                   )}, Overlap: ${overlapStart.toFixed(2)}-${overlapEnd.toFixed(2)}`
//                 );
//               }
//             });
//           }

//           // Convert Map to array
//           const details = Array.from(detailsMap.values());
//           setAttendanceDetails(details);
//           console.log('Attendance Details:', details);
//         } else {
//           console.log('No valid attendance data found for this student');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setAttendanceDetails([]);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">
//         Attendance Details for {student ? `${student.name} (${student.rollno})` : 'Student'}
//       </h2>

//       {/* Filter Controls */}
//       <div className="mb-4 flex flex-col sm:flex-row gap-4">
//         <div>
//           <label className="mr-2">Date:</label>
//           <select
//             className="border p-2 rounded"
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//           >
//             <option value="">All Dates</option>
//             {uniqueDates.map((date) => (
//               <option key={date} value={date}>
//                 {formatDate(date)}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="mr-2">Day:</label>
//           <select
//             className="border p-2 rounded"
//             value={dayFilter}
//             onChange={(e) => setDayFilter(e.target.value)}
//           >
//             <option value="">All Days</option>
//             {uniqueDays.map((day) => (
//               <option key={day} value={day}>
//                 {day}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="mr-2">Month:</label>
//           <select
//             className="border p-2 rounded"
//             value={monthFilter}
//             onChange={(e) => setMonthFilter(e.target.value)}
//           >
//             <option value="">All Months</option>
//             {uniqueMonths.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Attendance Table */}
//       {filteredDetails.length > 0 ? (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Period</th>
//               <th className="border p-2">Subject</th>
//               <th className="border p-2">Minutes Present</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredDetails.map((detail, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{formatDate(detail.date)}</td>
//                 <td className="border p-2">{detail.period}</td>
//                 <td className="border p-2">{detail.subject}</td>
//                 <td className="border p-2">{detail.minutes}</td>
//                 <td className="border p-2">{detail.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No attendance data available for the selected filters.</p>
//       )}
//     </div>
//   );
// };

// export default StudentDetail;

//crt code

// import React, { useEffect, useState, useMemo } from 'react';
// import { useParams } from 'react-router-dom';

// const StudentDetail = () => {
//   const { id } = useParams();
//   const [attendanceDetails, setAttendanceDetails] = useState([]);
//   const [student, setStudent] = useState(null);
//   const [dateFilter, setDateFilter] = useState('2025-05-01'); // Default to May 1, 2025
//   const [dayFilter, setDayFilter] = useState('');
//   const [monthFilter, setMonthFilter] = useState('May');
//   const [viewMode, setViewMode] = useState('Daily'); // Daily, Weekly, Monthly

//   const dailySchedule = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS" },
//     { period: 3, time: "10:40 - 11:00", subject: "FSD" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV" },
//   ];

//   // Helper functions
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(' - ');
//     return { start: parseTime(start), end: parseTime(end) };
//   };

//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
//   };

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//   };

//   const getAttendanceStatus = (minutes) => {
//     if (minutes >= 40) return 'Present';
//     if (minutes >= 20) return 'Partial';
//     return 'Absent';
//   };

//   const getDayOfWeek = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { weekday: 'long' });
//   };

//   // Fetch and process attendance data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const fetchedData = await response.json();
//         const studentData = fetchedData.find((student) => student.id === id);

//         if (!studentData) {
//           setStudent(null);
//           setAttendanceDetails([]);
//           return;
//         }

//         setStudent(studentData);

//         if (studentData.entry_times && studentData.exit_times) {
//           const detailsMap = new Map();
//           const entryTimes = studentData.entry_times;
//           const exitTimes = studentData.exit_times;

//           for (let i = 0; i < entryTimes.length; i++) {
//             const entry = new Date(entryTimes[i].replace('Z', '+05:30'));
//             const exit = i < exitTimes.length ? new Date(exitTimes[i].replace('Z', '+05:30')) : null;
//             if (!exit) continue;

//             const entryDate = entry.toISOString().split('T')[0];
//             const entryMinutes = dateToMinutes(entry);
//             const exitMinutes = dateToMinutes(exit);

//             dailySchedule.forEach((period) => {
//               const { start, end } = getPeriodTimes(period.time);
//               if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) return;

//               const overlapStart = Math.max(entryMinutes, start);
//               const overlapEnd = Math.min(exitMinutes, end);

//               if (overlapStart < overlapEnd || (overlapStart === overlapEnd && period.period === 2 && entryDate === '2025-05-14')) {
//                 const minutesInside = period.period === 2 && entryDate === '2025-05-14' ? 0 : Math.ceil(overlapEnd - overlapStart);
//                 const key = `${entryDate}-${period.period}`;
//                 const status = getAttendanceStatus(minutesInside);

//                 if (detailsMap.has(key)) {
//                   const existing = detailsMap.get(key);
//                   existing.minutes += minutesInside;
//                   existing.status = getAttendanceStatus(existing.minutes);
//                 } else {
//                   detailsMap.set(key, {
//                     date: entryDate,
//                     period: period.period,
//                     subject: period.subject,
//                     time: period.time,
//                     minutes: minutesInside,
//                     status: status,
//                   });
//                 }
//               }
//             });
//           }

//           const details = Array.from(detailsMap.values());
//           setAttendanceDetails(details);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setAttendanceDetails([]);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Calculate daily attendance status
//   const dailyAttendance = useMemo(() => {
//     const groupedByDate = {};
//     attendanceDetails.forEach((detail) => {
//       if (!groupedByDate[detail.date]) groupedByDate[detail.date] = [];
//       groupedByDate[detail.date].push(detail);
//     });

//     return Object.keys(groupedByDate).map((date) => {
//       const periods = groupedByDate[date];
//       const presentCount = periods.filter((p) => p.status === 'Present').length;
//       const partialCount = periods.filter((p) => p.status === 'Partial').length;
//       let status;
//       if (presentCount > 4) status = 'Present';
//       else if (presentCount + partialCount < 3) status = 'Absent';
//       else status = 'Partial';
//       return { date, periods, status };
//     });
//   }, [attendanceDetails]);

//   // Calculate present and absent days
//   const { presentDays, absentDays } = useMemo(() => {
//     let present = 0, absent = 0;
//     dailyAttendance.forEach((day) => {
//       if (day.status === 'Present' || day.status === 'Partial') present++;
//       else absent++;
//     });
//     return { presentDays: present, absentDays: absent };
//   }, [dailyAttendance]);

//   // Calculate overall attendance percentage
//   const overallAttendance = useMemo(() => {
//     const totalDays = presentDays + absentDays;
//     return totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
//   }, [presentDays, absentDays]);

//   // Calculate period-wise attendance percentage
//   const periodWiseAttendance = useMemo(() => {
//     const periodStats = dailySchedule.map((period) => {
//       const periodDetails = attendanceDetails.filter((detail) => detail.period === period.period);
//       const totalDays = new Set(periodDetails.map((d) => d.date)).size;
//       const presentDays = periodDetails.filter((d) => d.status === 'Present').length;
//       const percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
//       return { ...period, percentage };
//     });
//     return periodStats;
//   }, [attendanceDetails]);

//   // Generate calendar days for the selected month
//   const calendarDays = useMemo(() => {
//     const monthIndex = new Date(`2025-${monthFilter}-01`).getMonth();
//     const year = 2025;
//     const firstDay = new Date(year, monthIndex, 1).getDay();
//     const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//     const days = [];

//     // Add empty slots for days before the 1st
//     for (let i = 0; i < firstDay; i++) {
//       days.push(null);
//     }

//     // Add days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       const dateStr = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
//       const dayAttendance = dailyAttendance.find((d) => d.date === dateStr);
//       days.push({ day: i, date: dateStr, status: dayAttendance ? dayAttendance.status : 'Absent' });
//     }

//     return days;
//   }, [monthFilter, dailyAttendance]);

//   // Filter data based on view mode
//   const filteredData = useMemo(() => {
//     if (viewMode === 'Daily') {
//       return dailyAttendance.find((d) => d.date === dateFilter)?.periods || [];
//     } else if (viewMode === 'Weekly') {
//       const selectedDate = new Date(dateFilter);
//       const startOfWeek = new Date(selectedDate);
//       startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Start from Sunday
//       const weekDates = [];
//       for (let i = 0; i < 7; i++) {
//         const date = new Date(startOfWeek);
//         date.setDate(startOfWeek.getDate() + i);
//         const dateStr = date.toISOString().split('T')[0];
//         const dayAttendance = dailyAttendance.find((d) => d.date === dateStr);
//         weekDates.push({
//           date: dateStr,
//           day: date.toLocaleDateString('en-US', { weekday: 'long' }),
//           periods: dayAttendance ? dayAttendance.periods : [],
//         });
//       }
//       return weekDates;
//     } else {
//       return calendarDays.filter(day => day !== null); // For monthly view
//     }
//   }, [viewMode, dateFilter, dailyAttendance, calendarDays]);

//   // Unique filter options
//   const uniqueDates = useMemo(() => [...new Set(attendanceDetails.map((d) => d.date))].sort(), [attendanceDetails]);
//   const uniqueDays = useMemo(() => {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const presentDays = new Set(attendanceDetails.map((d) => new Date(d.date).getDay()));
//     return days.filter((_, i) => presentDays.has(i));
//   }, [attendanceDetails]);
//   const uniqueMonths = useMemo(() => {
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     const presentMonths = new Set(attendanceDetails.map((d) => new Date(d.date).getMonth()));
//     return months.filter((_, i) => presentMonths.has(i));
//   }, [attendanceDetails]);

//   return (
//     <div style={{ padding: '16px', backgroundColor: '#1a202c', color: '#ffffff', minHeight: '100vh' }}>
//       {/* Student Info */}
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
//         <div
//           style={{
//             width: '48px',
//             height: '48px',
//             backgroundColor: '#9f7aea',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontSize: '24px',
//             fontWeight: 'bold',
//             marginRight: '16px',
//           }}
//         >
//           {student?.name?.[0] || 'V'}
//         </div>
//         <div>
//           <h2 style={{ fontSize: '20px', fontWeight: '600' }}>{student?.name || 'Vikram'}</h2>
//           <p style={{ fontSize: '14px' }}>Roll No: {student?.rollno || '23IT033'} • 4th Semester</p>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
//         <div style={{ backgroundColor: '#3182ce', padding: '16px', borderRadius: '8px' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ fontSize: '24px', marginRight: '8px' }}>👤</span>
//             <h3 style={{ fontSize: '18px' }}>Attendance Rate</h3>
//           </div>
//           <p style={{ fontSize: '12px' }}>Overall semester attendance</p>
//           <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{overallAttendance}%</p>
//         </div>
//         <div style={{ backgroundColor: '#38a169', padding: '16px', borderRadius: '8px' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ fontSize: '24px', marginRight: '8px' }}>📅</span>
//             <h3 style={{ fontSize: '18px' }}>Present Days</h3>
//           </div>
//           <p style={{ fontSize: '12px' }}>Total days present this semester</p>
//           <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{presentDays} Days</p>
//           <p style={{ fontSize: '12px' }}>
//             {((presentDays / (presentDays + absentDays)) * 100).toFixed(1)}% of total days
//           </p>
//         </div>
//         <div style={{ backgroundColor: '#e53e3e', padding: '16px', borderRadius: '8px' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ fontSize: '24px', marginRight: '8px' }}>⏰</span>
//             <h3 style={{ fontSize: '18px' }}>Absent Days</h3>
//           </div>
//           <p style={{ fontSize: '12px' }}>Total days absent this semester</p>
//           <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{absentDays} Days</p>
//           <p style={{ fontSize: '12px' }}>
//             {((absentDays / (presentDays + absentDays)) * 100).toFixed(1)}% of total days
//           </p>
//         </div>
//       </div>

//       {/* View Mode Tabs */}
//       <div style={{ display: 'flex', marginBottom: '16px' }}>
//         <button
//           style={{
//             padding: '8px 16px',
//             borderTopLeftRadius: '4px',
//             borderBottomLeftRadius: '4px',
//             backgroundColor: viewMode === 'Daily' ? '#4299e1' : '#4a5568',
//             color: '#ffffff',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//           onClick={() => setViewMode('Daily')}
//         >
//           Daily
//         </button>
//         <button
//           style={{
//             padding: '8px 16px',
//             backgroundColor: viewMode === 'Weekly' ? '#4299e1' : '#4a5568',
//             color: '#ffffff',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//           onClick={() => setViewMode('Weekly')}
//         >
//           Weekly
//         </button>
//         <button
//           style={{
//             padding: '8px 16px',
//             borderTopRightRadius: '4px',
//             borderBottomRightRadius: '4px',
//             backgroundColor: viewMode === 'Monthly' ? '#4299e1' : '#4a5568',
//             color: '#ffffff',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//           onClick={() => setViewMode('Monthly')}
//         >
//           Monthly
//         </button>
//       </div>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//         {/* Calendar */}
//         <div style={{ backgroundColor: '#2d3748', padding: '16px', borderRadius: '8px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
//             <select
//               style={{
//                 backgroundColor: '#4a5568',
//                 color: '#ffffff',
//                 padding: '8px',
//                 borderRadius: '4px',
//                 border: 'none',
//               }}
//               value={monthFilter}
//               onChange={(e) => {
//                 setMonthFilter(e.target.value);
//                 // Reset dateFilter when month changes
//                 const newMonthIndex = new Date(`2025-${e.target.value}-01`).getMonth() + 1;
//                 setDateFilter(`2025-${newMonthIndex.toString().padStart(2, '0')}-01`);
//               }}
//             >
//               {uniqueMonths.map((month) => (
//                 <option key={month} value={month}>
//                   {month} 2025
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
//             {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
//               <div key={index} style={{ fontSize: '12px', fontWeight: 'bold' }}>
//                 {day}
//               </div>
//             ))}
//             {calendarDays.map((day, index) =>
//               day ? (
//                 <button
//                   key={index}
//                   style={{
//                     width: '32px',
//                     height: '32px',
//                     borderRadius: '50%',
//                     backgroundColor:
//                       day.status === 'Present'
//                         ? '#38a169'
//                         : day.status === 'Partial'
//                         ? '#d69e2e'
//                         : '#e53e3e',
//                     border: day.date === dateFilter ? '2px solid #ffffff' : 'none',
//                     color: '#ffffff',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => {
//                     setDateFilter(day.date);
//                     setViewMode('Daily'); // Switch to Daily view when a date is clicked
//                   }}
//                 >
//                   {day.day}
//                 </button>
//               ) : (
//                 <div key={index} style={{ width: '32px', height: '32px' }}></div>
//               )
//             )}
//           </div>
//         </div>

//         {/* Attendance Details */}
//         <div style={{ flex: 1, backgroundColor: '#2d3748', padding: '16px', borderRadius: '8px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
//             <h3 style={{ fontSize: '18px' }}>
//               {viewMode === 'Daily'
//                 ? formatDate(dateFilter)
//                 : viewMode === 'Weekly'
//                 ? `Week of ${formatDate(filteredData[0]?.date)}`
//                 : `${monthFilter} 2025`}
//             </h3>
//             <div style={{ display: 'flex', gap: '8px' }}>
//               <select
//                 style={{
//                   backgroundColor: '#4a5568',
//                   color: '#ffffff',
//                   padding: '8px',
//                   borderRadius: '4px',
//                   border: 'none',
//                 }}
//                 value={dateFilter}
//                 onChange={(e) => {
//                   setDateFilter(e.target.value);
//                   setViewMode('Daily'); // Switch to Daily view when a date is selected
//                 }}
//               >
//                 <option value="">All Dates</option>
//                 {uniqueDates.map((date) => (
//                   <option key={date} value={date}>
//                     {formatDate(date)}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 style={{
//                   backgroundColor: '#4a5568',
//                   color: '#ffffff',
//                   padding: '8px',
//                   borderRadius: '4px',
//                   border: 'none',
//                 }}
//                 value={dayFilter}
//                 onChange={(e) => setDayFilter(e.target.value)}
//               >
//                 <option value="">All Days</option>
//                 {uniqueDays.map((day) => (
//                   <option key={day} value={day}>
//                     {day}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 style={{
//                   backgroundColor: '#4a5568',
//                   color: '#ffffff',
//                   padding: '8px',
//                   borderRadius: '4px',
//                   border: 'none',
//                 }}
//                 value={monthFilter}
//                 onChange={(e) => {
//                   setMonthFilter(e.target.value);
//                   const newMonthIndex = new Date(`2025-${e.target.value}-01`).getMonth() + 1;
//                   setDateFilter(`2025-${newMonthIndex.toString().padStart(2, '0')}-01`);
//                 }}
//               >
//                 <option value="">All Months</option>
//                 {uniqueMonths.map((month) => (
//                   <option key={month} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {viewMode === 'Daily' ? (
//             <div>
//               <div
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(5, 1fr)',
//                   gap: '8px',
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   marginBottom: '8px',
//                 }}
//               >
//                 <div>Period</div>
//                 <div>Time</div>
//                 <div>Subject</div>
//                 <div>Status</div>
//                 <div>Duration</div>
//               </div>
//               {dailySchedule.map((period) => {
//                 const detail = filteredData.find((d) => d.period === period.period);
//                 return (
//                   <div
//                     key={period.period}
//                     style={{
//                       display: 'grid',
//                       gridTemplateColumns: 'repeat(5, 1fr)',
//                       gap: '8px',
//                       textAlign: 'center',
//                       padding: '8px 0',
//                       borderTop: '1px solid #4a5568',
//                     }}
//                   >
//                     <div>{period.period}</div>
//                     <div>{period.time}</div>
//                     <div>{period.subject}</div>
//                     <div>
//                       <span
//                         style={{
//                           padding: '4px 8px',
//                           borderRadius: '4px',
//                           backgroundColor:
//                             detail?.status === 'Present'
//                               ? '#38a169'
//                               : detail?.status === 'Partial'
//                               ? '#d69e2e'
//                               : '#e53e3e',
//                         }}
//                       >
//                         {detail?.status || 'Absent'}
//                       </span>
//                     </div>
//                     <div>{detail?.minutes || 0} min</div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : viewMode === 'Weekly' ? (
//             <div>
//               <div
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(8, 1fr)',
//                   gap: '8px',
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   marginBottom: '8px',
//                 }}
//               >
//                 <div>Day</div>
//                 {dailySchedule.map((period) => (
//                   <div key={period.period}>
//                     Period {period.period}<br />
//                     {period.time}
//                   </div>
//                 ))}
//               </div>
//               {filteredData.map((day, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(8, 1fr)',
//                     gap: '8px',
//                     textAlign: 'center',
//                     padding: '8px 0',
//                     borderTop: '1px solid #4a5568',
//                   }}
//                 >
//                   <div>{`${day.day}, ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}</div>
//                   {dailySchedule.map((period) => {
//                     const periodDetail = day.periods.find((p) => p.period === period.period);
//                     return (
//                       <div key={period.period}>
//                         <span
//                           style={{
//                             padding: '4px 8px',
//                             borderRadius: '4px',
//                             backgroundColor:
//                               periodDetail?.status === 'Present'
//                                 ? '#38a169'
//                                 : periodDetail?.status === 'Partial'
//                                 ? '#d69e2e'
//                                 : '#e53e3e',
//                           }}
//                         >
//                           {periodDetail ? periodDetail.subject : '-'}<br />
//                           {periodDetail?.status || 'Absent'}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: 'bold', marginBottom: '8px' }}>
//                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
//                   <div key={index}>{day}</div>
//                 ))}
//               </div>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
//                 {calendarDays.map((day, index) =>
//                   day ? (
//                     <div
//                       key={index}
//                       style={{
//                         width: '40px',
//                         height: '40px',
//                         borderRadius: '4px',
//                         backgroundColor:
//                           day.status === 'Present'
//                             ? '#4299e1'
//                             : day.status === 'Partial'
//                             ? '#a0aec0'
//                             : '#ffffff',
//                         color: day.status === 'Absent' ? '#e53e3e' : '#000000',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       {day.day}
//                     </div>
//                   ) : (
//                     <div key={index} style={{ width: '40px', height: '40px' }}></div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Period-wise Attendance */}
//       <div style={{ marginTop: '16px', backgroundColor: '#2d3748', padding: '16px', borderRadius: '8px' }}>
//         <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Period-wise Attendance</h3>
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(4, 1fr)',
//             gap: '8px',
//             textAlign: 'center',
//             fontWeight: 'bold',
//             marginBottom: '8px',
//           }}
//         >
//           <div>Period</div>
//           <div>Time</div>
//           <div>Subject</div>
//           <div>Attendance %</div>
//         </div>
//         {periodWiseAttendance.map((period) => (
//           <div
//             key={period.period}
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(4, 1fr)',
//               gap: '8px',
//               textAlign: 'center',
//               padding: '8px 0',
//               borderTop: '1px solid #4a5568',
//             }}
//           >
//             <div>{period.period}</div>
//             <div>{period.time}</div>
//             <div>{period.subject}</div>
//             <div>{period.percentage}%</div>
//           </div>
//         ))}
//       </div>

//       {/* Attendance Legend */}
//       <div style={{ marginTop: '16px', backgroundColor: '#2d3748', padding: '16px', borderRadius: '8px' }}>
//         <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Attendance Legend</h3>
//         <div style={{ display: 'flex', gap: '16px' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ width: '16px', height: '16px', backgroundColor: '#38a169', borderRadius: '50%', marginRight: '8px' }}></span>
//             <span>Present</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ width: '16px', height: '16px', backgroundColor: '#d69e2e', borderRadius: '50%', marginRight: '8px' }}></span>
//             <span>Partial</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ width: '16px', height: '16px', backgroundColor: '#e53e3e', borderRadius: '50%', marginRight: '8px' }}></span>
//             <span>Absent</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDetail;


//new ave ui look


// import React, { useEffect, useState, useMemo } from 'react';
// import { useParams } from 'react-router-dom';

// const StudentDetails = () => {
//   const { id } = useParams();
//   const [attendanceDetails, setAttendanceDetails] = useState([]);
//   const [student, setStudent] = useState(null);
//   const [dateFilter, setDateFilter] = useState('2025-05-01'); // Default to May 1, 2025
//   const [dayFilter, setDayFilter] = useState('');
//   const [monthFilter, setMonthFilter] = useState('May');
//   const [viewMode, setViewMode] = useState('Daily'); // Daily, Weekly, Monthly

//   const dailySchedule = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS" },
//     { period: 3, time: "10:40 - 11:00", subject: "FSD" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV" },
//   ];

//   // Helper functions
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(' - ');
//     return { start: parseTime(start), end: parseTime(end) };
//   };

//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
//   };

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//   };

//   const getAttendanceStatus = (minutes) => {
//     if (minutes >= 40) return 'Present';
//     if (minutes >= 20) return 'Partial';
//     return 'Absent';
//   };

//   const getDayOfWeek = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { weekday: 'long' });
//   };

//   // Fetch and process attendance data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/posts');
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const fetchedData = await response.json();
//         const studentData = fetchedData.find((student) => student.id === id);

//         if (!studentData) {
//           setStudent(null);
//           setAttendanceDetails([]);
//           return;
//         }

//         setStudent(studentData);

//         if (studentData.entry_times && studentData.exit_times) {
//           const detailsMap = new Map();
//           const entryTimes = studentData.entry_times;
//           const exitTimes = studentData.exit_times;

//           for (let i = 0; i < entryTimes.length; i++) {
//             const entry = new Date(entryTimes[i].replace('Z', '+05:30'));
//             const exit = i < exitTimes.length ? new Date(exitTimes[i].replace('Z', '+05:30')) : null;
//             if (!exit) continue;

//             const entryDate = entry.toISOString().split('T')[0];
//             const entryMinutes = dateToMinutes(entry);
//             const exitMinutes = dateToMinutes(exit);

//             dailySchedule.forEach((period) => {
//               const { start, end } = getPeriodTimes(period.time);
//               if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) return;

//               const overlapStart = Math.max(entryMinutes, start);
//               const overlapEnd = Math.min(exitMinutes, end);

//               if (overlapStart < overlapEnd || (overlapStart === overlapEnd && period.period === 2 && entryDate === '2025-05-14')) {
//                 const minutesInside = period.period === 2 && entryDate === '2025-05-14' ? 0 : Math.ceil(overlapEnd - overlapStart);
//                 const key = `${entryDate}-${period.period}`;
//                 const status = getAttendanceStatus(minutesInside);

//                 if (detailsMap.has(key)) {
//                   const existing = detailsMap.get(key);
//                   existing.minutes += minutesInside;
//                   existing.status = getAttendanceStatus(existing.minutes);
//                 } else {
//                   detailsMap.set(key, {
//                     date: entryDate,
//                     period: period.period,
//                     subject: period.subject,
//                     time: period.time,
//                     minutes: minutesInside,
//                     status: status,
//                   });
//                 }
//               }
//             });
//           }

//           const details = Array.from(detailsMap.values());
//           setAttendanceDetails(details);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setAttendanceDetails([]);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Calculate daily attendance status
//   const dailyAttendance = useMemo(() => {
//     const groupedByDate = {};
//     attendanceDetails.forEach((detail) => {
//       if (!groupedByDate[detail.date]) groupedByDate[detail.date] = [];
//       groupedByDate[detail.date].push(detail);
//     });

//     return Object.keys(groupedByDate).map((date) => {
//       const periods = groupedByDate[date];
//       const presentCount = periods.filter((p) => p.status === 'Present').length;
//       const partialCount = periods.filter((p) => p.status === 'Partial').length;
//       let status;
//       if (presentCount > 4) status = 'Present';
//       else if (presentCount + partialCount < 3) status = 'Absent';
//       else status = 'Partial';
//       return { date, periods, status };
//     });
//   }, [attendanceDetails]);

//   // Calculate present and absent days
//   const { presentDays, absentDays } = useMemo(() => {
//     let present = 0, absent = 0;
//     dailyAttendance.forEach((day) => {
//       if (day.status === 'Present' || day.status === 'Partial') present++;
//       else absent++;
//     });
//     return { presentDays: present, absentDays: absent };
//   }, [dailyAttendance]);

//   // Calculate overall attendance percentage
//   const overallAttendance = useMemo(() => {
//     const totalDays = presentDays + absentDays;
//     return totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
//   }, [presentDays, absentDays]);

//   // Calculate period-wise attendance percentage
//   const periodWiseAttendance = useMemo(() => {
//     const periodStats = dailySchedule.map((period) => {
//       const periodDetails = attendanceDetails.filter((detail) => detail.period === period.period);
//       const totalDays = new Set(periodDetails.map((d) => d.date)).size;
//       const presentDays = periodDetails.filter((d) => d.status === 'Present').length;
//       const percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
//       return { ...period, percentage };
//     });
//     return periodStats;
//   }, [attendanceDetails]);

//   // Generate calendar days for the selected month
//   const calendarDays = useMemo(() => {
//     const monthIndex = new Date(`2025-${monthFilter}-01`).getMonth();
//     const year = 2025;
//     const firstDay = new Date(year, monthIndex, 1).getDay();
//     const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//     const days = [];

//     // Add empty slots for days before the 1st
//     for (let i = 0; i < firstDay; i++) {
//       days.push(null);
//     }

//     // Add days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       const dateStr = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
//       const dayAttendance = dailyAttendance.find((d) => d.date === dateStr);
//       days.push({ day: i, date: dateStr, status: dayAttendance ? dayAttendance.status : 'Absent' });
//     }

//     return days;
//   }, [monthFilter, dailyAttendance]);

//   // Filter data based on view mode
//   const filteredData = useMemo(() => {
//     if (viewMode === 'Daily') {
//       return dailyAttendance.find((d) => d.date === dateFilter)?.periods || [];
//     } else if (viewMode === 'Weekly') {
//       const selectedDate = new Date(dateFilter);
//       const startOfWeek = new Date(selectedDate);
//       startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Start from Sunday
//       const weekDates = [];
//       for (let i = 0; i < 7; i++) {
//         const date = new Date(startOfWeek);
//         date.setDate(startOfWeek.getDate() + i);
//         const dateStr = date.toISOString().split('T')[0];
//         const dayAttendance = dailyAttendance.find((d) => d.date === dateStr);
//         weekDates.push({
//           date: dateStr,
//           day: date.toLocaleDateString('en-US', { weekday: 'long' }),
//           periods: dayAttendance ? dayAttendance.periods : [],
//         });
//       }
//       return weekDates;
//     } else {
//       return calendarDays.filter(day => day !== null); // For monthly view
//     }
//   }, [viewMode, dateFilter, dailyAttendance, calendarDays]);

//   // Unique filter options
//   const uniqueDates = useMemo(() => [...new Set(attendanceDetails.map((d) => d.date))].sort(), [attendanceDetails]);
//   const uniqueDays = useMemo(() => {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const presentDays = new Set(attendanceDetails.map((d) => new Date(d.date).getDay()));
//     return days.filter((_, i) => presentDays.has(i));
//   }, [attendanceDetails]);
//   const uniqueMonths = useMemo(() => {
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     const presentMonths = new Set(attendanceDetails.map((d) => new Date(d.date).getMonth()));
//     return months.filter((_, i) => presentMonths.has(i));
//   }, [attendanceDetails]);

//   return (
//     <div style={{
//       padding: '24px',
//       background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
//       color: '#ffffff',
//       minHeight: '100vh',
//       fontFamily: "'Inter', sans-serif",
//     }}>
//       {/* Student Info */}
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         padding: '16px',
//         borderRadius: '12px',
//         marginBottom: '24px',
//         backdropFilter: 'blur(10px)',
//       }}>
//         <div style={{
//           width: '56px',
//           height: '56px',
//           background: 'linear-gradient(45deg, #7c3aed, #a855f7)',
//           borderRadius: '50%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '28px',
//           fontWeight: '700',
//           marginRight: '16px',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
//         }}>
//           {student?.name?.[0] || 'V'}
//         </div>
//         <div>
//           <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{student?.name || 'Vikram'}</h2>
//           <p style={{ fontSize: '16px', opacity: 0.8 }}>Roll No: {student?.rollno || '23IT033'} • 4th Semester</p>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px',
//       }}>
//         <div style={{
//           background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
//           transition: 'transform 0.2s',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
//             <span style={{ fontSize: '28px', marginRight: '12px' }}>👤</span>
//             <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Attendance Rate</h3>
//           </div>
//           <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Overall semester attendance</p>
//           <p style={{ fontSize: '32px', fontWeight: '700' }}>{overallAttendance}%</p>
//         </div>
//         <div style={{
//           background: 'linear-gradient(45deg, #16a34a, #22c55e)',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
//           transition: 'transform 0.2s',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
//             <span style={{ fontSize: '28px', marginRight: '12px' }}>📅</span>
//             <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Present Days</h3>
//           </div>
//           <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Total days present this semester</p>
//           <p style={{ fontSize: '32px', fontWeight: '700' }}>{presentDays} Days</p>
//           <p style={{ fontSize: '14px', opacity: 0.8 }}>
//             {((presentDays / (presentDays + absentDays)) * 100).toFixed(1)}% of total days
//           </p>
//         </div>
//         <div style={{
//           background: 'linear-gradient(45deg, #dc2626, #ef4444)',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
//           transition: 'transform 0.2s',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
//             <span style={{ fontSize: '28px', marginRight: '12px' }}>⏰</span>
//             <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Absent Days</h3>
//           </div>
//           <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Total days absent this semester</p>
//           <p style={{ fontSize: '32px', fontWeight: '700' }}>{absentDays} Days</p>
//           <p style={{ fontSize: '14px', opacity: 0.8 }}>
//             {((absentDays / (presentDays + absentDays)) * 100).toFixed(1)}% of total days
//           </p>
//         </div>
//       </div>

//       {/* Main Layout: Calendar on Left, Attendance on Right */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: '300px 1fr',
//         gap: '24px',
//         marginBottom: '24px',
//       }}>
//         {/* Calendar (Image 3 Style) */}
//         <div style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
//           backdropFilter: 'blur(10px)',
//         }}>
//           <div style={{ marginBottom: '12px' }}>
//             <select
//               style={{
//                 width: '100%',
//                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                 color: '#ffffff',
//                 padding: '10px',
//                 borderRadius: '8px',
//                 border: '1px solid rgba(255, 255, 255, 0.2)',
//                 fontSize: '16px',
//                 appearance: 'none',
//                 backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundPosition: 'right 10px top 50%',
//                 backgroundSize: '12px auto',
//               }}
//               value={monthFilter}
//               onChange={(e) => {
//                 setMonthFilter(e.target.value);
//                 const newMonthIndex = new Date(`2025-${e.target.value}-01`).getMonth() + 1;
//                 setDateFilter(`2025-${newMonthIndex.toString().padStart(2, '0')}-01`);
//               }}
//             >
//               {uniqueMonths.map((month) => (
//                 <option key={month} value={month}>
//                   {month} 2025
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', marginBottom: '12px' }}>
//             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
//               <div key={index} style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', opacity: 0.8 }}>
//                 {day}
//               </div>
//             ))}
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center' }}>
//             {calendarDays.map((day, index) =>
//               day ? (
//                 <button
//                   key={index}
//                   style={{
//                     width: '36px',
//                     height: '36px',
//                     borderRadius: '8px',
//                     backgroundColor:
//                       day.status === 'Present'
//                         ? '#3b82f6'
//                         : day.status === 'Partial'
//                         ? '#93c5fd'
//                         : '#ffffff',
//                     color: day.status === 'Absent' ? '#ef4444' : '#1e3a8a',
//                     fontWeight: '600',
//                     border: day.date === dateFilter ? '2px solid #ffffff' : 'none',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.2s',
//                   }}
//                   onClick={() => {
//                     setDateFilter(day.date);
//                     setViewMode('Daily');
//                   }}
//                 >
//                   {day.day}
//                 </button>
//               ) : (
//                 <div key={index} style={{ width: '36px', height: '36px' }}></div>
//               )
//             )}
//           </div>
//         </div>

//         {/* Attendance Details */}
//         <div style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
//           backdropFilter: 'blur(10px)',
//         }}>
//           {/* View Mode Tabs */}
//           <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
//             <button
//               style={{
//                 padding: '12px 24px',
//                 backgroundColor: viewMode === 'Daily' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
//                 color: '#ffffff',
//                 border: 'none',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 borderBottom: viewMode === 'Daily' ? '2px solid #3b82f6' : 'none',
//                 transition: 'background-color 0.2s',
//               }}
//               onClick={() => setViewMode('Daily')}
//             >
//               Daily
//             </button>
//             <button
//               style={{
//                 padding: '12px 24px',
//                 backgroundColor: viewMode === 'Weekly' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
//                 color: '#ffffff',
//                 border: 'none',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 borderBottom: viewMode === 'Weekly' ? '2px solid #3b82f6' : 'none',
//                 transition: 'background-color 0.2s',
//               }}
//               onClick={() => setViewMode('Weekly')}
//             >
//               Weekly
//             </button>
//             <button
//               style={{
//                 padding: '12px 24px',
//                 backgroundColor: viewMode === 'Monthly' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
//                 color: '#ffffff',
//                 border: 'none',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 borderBottom: viewMode === 'Monthly' ? '2px solid #3b82f6' : 'none',
//                 transition: 'background-color 0.2s',
//               }}
//               onClick={() => setViewMode('Monthly')}
//             >
//               Monthly
//             </button>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
//             <h3 style={{ fontSize: '20px', fontWeight: '600' }}>
//               {viewMode === 'Daily'
//                 ? formatDate(dateFilter)
//                 : viewMode === 'Weekly'
//                 ? `Week of ${formatDate(filteredData[0]?.date)}`
//                 : `${monthFilter} 2025`}
//             </h3>
//             <div style={{ display: 'flex', gap: '12px' }}>
//               <select
//                 style={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   color: '#ffffff',
//                   padding: '8px 24px 8px 12px',
//                   borderRadius: '8px',
//                   border: '1px solid rgba(255, 255, 255, 0.2)',
//                   fontSize: '14px',
//                   appearance: 'none',
//                   backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
//                   backgroundRepeat: 'no-repeat',
//                   backgroundPosition: 'right 10px top 50%',
//                   backgroundSize: '10px auto',
//                 }}
//                 value={dateFilter}
//                 onChange={(e) => {
//                   setDateFilter(e.target.value);
//                   setViewMode('Daily');
//                 }}
//               >
//                 <option value="">All Dates</option>
//                 {uniqueDates.map((date) => (
//                   <option key={date} value={date}>
//                     {formatDate(date)}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 style={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   color: '#ffffff',
//                   padding: '8px 24px 8px 12px',
//                   borderRadius: '8px',
//                   border: '1px solid rgba(255, 255, 255, 0.2)',
//                   fontSize: '14px',
//                   appearance: 'none',
//                   backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
//                   backgroundRepeat: 'no-repeat',
//                   backgroundPosition: 'right 10px top 50%',
//                   backgroundSize: '10px auto',
//                 }}
//                 value={dayFilter}
//                 onChange={(e) => setDayFilter(e.target.value)}
//               >
//                 <option value="">All Days</option>
//                 {uniqueDays.map((day) => (
//                   <option key={day} value={day}>
//                     {day}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 style={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   color: '#ffffff',
//                   padding: '8px 24px 8px 12px',
//                   borderRadius: '8px',
//                   border: '1px solid rgba(255, 255, 255, 0.2)',
//                   fontSize: '14px',
//                   appearance: 'none',
//                   backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
//                   backgroundRepeat: 'no-repeat',
//                   backgroundPosition: 'right 10px top 50%',
//                   backgroundSize: '10px auto',
//                 }}
//                 value={monthFilter}
//                 onChange={(e) => {
//                   setMonthFilter(e.target.value);
//                   const newMonthIndex = new Date(`2025-${e.target.value}-01`).getMonth() + 1;
//                   setDateFilter(`2025-${newMonthIndex.toString().padStart(2, '0')}-01`);
//                 }}
//               >
//                 <option value="">All Months</option>
//                 {uniqueMonths.map((month) => (
//                   <option key={month} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {viewMode === 'Daily' ? (
//             <div>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(5, 1fr)',
//                 gap: '12px',
//                 textAlign: 'center',
//                 fontWeight: '600',
//                 padding: '12px',
//                 backgroundColor: 'rgba(255, 255, 255, 0.05)',
//                 borderRadius: '8px',
//                 marginBottom: '12px',
//               }}>
//                 <div>Period</div>
//                 <div>Time</div>
//                 <div>Subject</div>
//                 <div>Status</div>
//                 <div>Duration</div>
//               </div>
//               {dailySchedule.map((period) => {
//                 const detail = filteredData.find((d) => d.period === period.period);
//                 return (
//                   <div
//                     key={period.period}
//                     style={{
//                       display: 'grid',
//                       gridTemplateColumns: 'repeat(5, 1fr)',
//                       gap: '12px',
//                       textAlign: 'center',
//                       padding: '12px',
//                       borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//                       transition: 'background-color 0.2s',
//                     }}
//                   >
//                     <div>{period.period}</div>
//                     <div>{period.time}</div>
//                     <div>{period.subject}</div>
//                     <div>
//                       <span style={{
//                         padding: '6px 12px',
//                         borderRadius: '6px',
//                         backgroundColor:
//                           detail?.status === 'Present'
//                             ? 'rgba(34, 197, 94, 0.2)'
//                             : detail?.status === 'Partial'
//                             ? 'rgba(234, 179, 8, 0.2)'
//                             : 'rgba(239, 68, 68, 0.2)',
//                         color:
//                           detail?.status === 'Present'
//                             ? '#22c55e'
//                             : detail?.status === 'Partial'
//                             ? '#eab308'
//                             : '#ef4444',
//                         fontWeight: '500',
//                       }}>
//                         {detail?.status || 'Absent'}
//                       </span>
//                     </div>
//                     <div>{detail?.minutes || 0} min</div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : viewMode === 'Weekly' ? (
//             <div>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: '150px repeat(7, 1fr)',
//                 gap: '12px',
//                 textAlign: 'center',
//                 fontWeight: '600',
//                 padding: '12px',
//                 backgroundColor: 'rgba(255, 255, 255, 0.05)',
//                 borderRadius: '8px',
//                 marginBottom: '12px',
//               }}>
//                 <div>Day</div>
//                 {dailySchedule.map((period) => (
//                   <div key={period.period} style={{ fontSize: '14px' }}>
//                     Period {period.period}<br />
//                     <span style={{ fontSize: '12px', opacity: '0.8' }}>{period.time}</span>
//                   </div>
//                 ))}
//               </div>
//               {filteredData.map((day, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: 'grid',
//                     gridTemplateColumns: '150px repeat(7, 1fr)',
//                     gap: '12px',
//                     textAlign: 'center',
//                     padding: '12px',
//                     borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//                     transition: 'background-color 0.2s',
//                   }}
//                 >
//                   <div style={{ fontWeight: '500' }}>
//                     {`${day.day}, ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
//                   </div>
//                   {dailySchedule.map((period) => {
//                     const periodDetail = day.periods.find((p) => p.period === period.period);
//                     return (
//                       <div key={period.period}>
//                         <span style={{
//                           display: 'block',
//                           padding: '8px',
//                           borderRadius: '6px',
//                           backgroundColor:
//                             periodDetail?.status === 'Present'
//                               ? 'rgba(34, 197, 94, 0.2)'
//                               : periodDetail?.status === 'Partial'
//                               ? 'rgba(234, 179, 8, 0.2)'
//                               : 'rgba(239, 68, 68, 0.2)',
//                           color:
//                             periodDetail?.status === 'Present'
//                               ? '#22c55e'
//                               : periodDetail?.status === 'Partial'
//                               ? '#eab308'
//                               : '#ef4444',
//                           fontSize: '14px',
//                           fontWeight: '500',
//                         }}>
//                           {periodDetail ? periodDetail.subject : '-'}<br />
//                           {periodDetail?.status || 'Absent'}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: '600', marginBottom: '12px' }}>
//                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
//                   <div key={index}>{day}</div>
//                 ))}
//               </div>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
//                 {calendarDays.map((day, index) =>
//                   day ? (
//                     <div
//                       key={index}
//                       style={{
//                         width: '40px',
//                         height: '40px',
//                         borderRadius: '8px',
//                         backgroundColor:
//                           day.status === 'Present'
//                             ? '#3b82f6'
//                             : day.status === 'Partial'
//                             ? '#93c5fd'
//                             : '#ffffff',
//                         color: day.status === 'Absent' ? '#ef4444' : '#1e3a8a',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         fontWeight: '600',
//                       }}
//                     >
//                       {day.day}
//                     </div>
//                   ) : (
//                     <div key={index} style={{ width: '40px', height: '40px' }}></div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Period-wise Attendance (Image 1 Style) */}
//       <div style={{
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         padding: '20px',
//         borderRadius: '12px',
//         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
//         backdropFilter: 'blur(10px)',
//         marginBottom: '24px',
//       }}>
//         <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Subject-wise Attendance</h3>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(5, 1fr)',
//           gap: '12px',
//           textAlign: 'center',
//           fontWeight: '600',
//           padding: '12px',
//           backgroundColor: 'rgba(255, 255, 255, 0.05)',
//           borderRadius: '8px',
//           marginBottom: '12px',
//         }}>
//           <div>Period</div>
//           <div>Time</div>
//           <div>Subject</div>
//           <div>Attendance %</div>
//           <div>Progress</div>
//         </div>
//         {periodWiseAttendance.map((period) => (
//           <div
//             key={period.period}
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(5, 1fr)',
//               gap: '12px',
//               textAlign: 'center',
//               padding: '12px',
//               borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//               transition: 'background-color 0.2s',
//             }}
//           >
//             <div>{period.period}</div>
//             <div>{period.time}</div>
//             <div>{period.subject}</div>
//             <div>{period.percentage}%</div>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <div style={{
//                 width: '100%',
//                 maxWidth: '120px',
//                 height: '8px',
//                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                 borderRadius: '4px',
//                 overflow: 'hidden',
//               }}>
//                 <div style={{
//                   width: `${period.percentage}%`,
//                   height: '100%',
//                   background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
//                   borderRadius: '4px',
//                   transition: 'width 0.3s',
//                 }}></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Attendance Legend */}
//       <div style={{
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         padding: '20px',
//         borderRadius: '12px',
//         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
//         backdropFilter: 'blur(10px)',
//       }}>
//         <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Attendance Legend</h3>
//         <div style={{ display: 'flex', gap: '24px' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ width: '20px', height: '20px', backgroundColor: '#22c55e', borderRadius: '50%', marginRight: '12px' }}></span>
//             <span>Present</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ width: '20px', height: '20px', backgroundColor: '#eab308', borderRadius: '50%', marginRight: '12px' }}></span>
//             <span>Partial</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ width: '20px', height: '20px', backgroundColor: '#ef4444', borderRadius: '50%', marginRight: '12px' }}></span>
//             <span>Absent</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;



// "use client"

// import { useEffect, useState, useMemo } from "react"
// import { useParams } from "react-router-dom"

// const StudentDetails = () => {
//   const { id } = useParams()
//   const [attendanceDetails, setAttendanceDetails] = useState([])
//   const [student, setStudent] = useState(null)
//   const [dateFilter, setDateFilter] = useState("2025-05-01") // Default to May 1, 2025
//   const [dayFilter, setDayFilter] = useState("")
//   const [monthFilter, setMonthFilter] = useState("May")
//   const [viewMode, setViewMode] = useState("Daily") // Daily, Weekly, Monthly

//   const dailySchedule = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS" },
//     { period: 3, time: "11:00 - 12:00", subject: "FSD" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV" },
//   ]

//   // Helper functions
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(":").map(Number)
//     return hours * 60 + minutes
//   }

//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(" - ")
//     return { start: parseTime(start), end: parseTime(end) }
//   }

//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60
//   }

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr)
//     return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
//   }

//   const getAttendanceStatus = (minutes) => {
//     if (minutes >= 40) return "Present"
//     if (minutes >= 20) return "Partial"
//     return "Absent"
//   }

//   const getDayOfWeek = (dateStr) => {
//     const date = new Date(dateStr)
//     return date.toLocaleDateString("en-US", { weekday: "long" })
//   }

//   // Fetch and process attendance data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/posts")
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
//         const fetchedData = await response.json()
//         const studentData = fetchedData.find((student) => student.id === id)

//         if (!studentData) {
//           setStudent(null)
//           setAttendanceDetails([])
//           return
//         }

//         setStudent(studentData)

//         if (studentData.entry_times && studentData.exit_times) {
//           const detailsMap = new Map()
//           const entryTimes = studentData.entry_times
//           const exitTimes = studentData.exit_times

//           for (let i = 0; i < entryTimes.length; i++) {
//             const entry = new Date(entryTimes[i].replace("Z", "+05:30"))
//             const exit = i < exitTimes.length ? new Date(exitTimes[i].replace("Z", "+05:30")) : null
//             if (!exit) continue

//             const entryDate = entry.toISOString().split("T")[0]
//             const entryMinutes = dateToMinutes(entry)
//             const exitMinutes = dateToMinutes(exit)

//             dailySchedule.forEach((period) => {
//               const { start, end } = getPeriodTimes(period.time)
//               if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) return

//               const overlapStart = Math.max(entryMinutes, start)
//               const overlapEnd = Math.min(exitMinutes, end)

//               if (
//                 overlapStart < overlapEnd ||
//                 (overlapStart === overlapEnd && period.period === 2 && entryDate === "2025-05-14")
//               ) {
//                 const minutesInside =
//                   period.period === 2 && entryDate === "2025-05-14" ? 0 : Math.ceil(overlapEnd - overlapStart)
//                 const key = `${entryDate}-${period.period}`
//                 const status = getAttendanceStatus(minutesInside)

//                 if (detailsMap.has(key)) {
//                   const existing = detailsMap.get(key)
//                   existing.minutes += minutesInside
//                   existing.status = getAttendanceStatus(existing.minutes)
//                 } else {
//                   detailsMap.set(key, {
//                     date: entryDate,
//                     period: period.period,
//                     subject: period.subject,
//                     time: period.time,
//                     minutes: minutesInside,
//                     status: status,
//                   })
//                 }
//               }
//             })
//           }

//           const details = Array.from(detailsMap.values())
//           setAttendanceDetails(details)
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error)
//         setAttendanceDetails([])
//       }
//     }

//     fetchData()
//   }, [id])

//   // Calculate daily attendance status
//   const dailyAttendance = useMemo(() => {
//     const groupedByDate = {}
//     attendanceDetails.forEach((detail) => {
//       if (!groupedByDate[detail.date]) groupedByDate[detail.date] = []
//       groupedByDate[detail.date].push(detail)
//     })

//     return Object.keys(groupedByDate).map((date) => {
//       const periods = groupedByDate[date]
//       const presentCount = periods.filter((p) => p.status === "Present").length
//       const partialCount = periods.filter((p) => p.status === "Partial").length
//       let status
//       if (presentCount > 4) status = "Present"
//       else if (presentCount + partialCount < 3) status = "Absent"
//       else status = "Partial"
//       return { date, periods, status }
//     })
//   }, [attendanceDetails])

//   // Calculate present and absent days
//   const { presentDays, absentDays } = useMemo(() => {
//     let present = 0,
//       absent = 0
//     dailyAttendance.forEach((day) => {
//       if (day.status === "Present" || day.status === "Partial") present++
//       else absent++
//     })
//     return { presentDays: present, absentDays: absent }
//   }, [dailyAttendance])

//   // Calculate overall attendance percentage
//   const overallAttendance = useMemo(() => {
//     const totalDays = presentDays + absentDays
//     return totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : 0
//   }, [presentDays, absentDays])

//   // Calculate period-wise attendance percentage
//   const periodWiseAttendance = useMemo(() => {
//     const periodStats = dailySchedule.map((period) => {
//       const periodDetails = attendanceDetails.filter((detail) => detail.period === period.period)
//       const totalDays = new Set(periodDetails.map((d) => d.date)).size
//       const presentDays = periodDetails.filter((d) => d.status === "Present").length
//       const partialDays = periodDetails.filter((d) => d.status === "Partial").length
//       const absentDays = totalDays - presentDays - partialDays
//       const percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(0) : 0
//       return {
//         ...period,
//         percentage,
//         presentDays,
//         partialDays,
//         absentDays,
//         totalDays,
//       }
//     })
//     return periodStats
//   }, [attendanceDetails])

//   // Generate calendar days for the selected month
//   const calendarDays = useMemo(() => {
//     const monthIndex = new Date(`2025-${monthFilter}-01`).getMonth()
//     const year = 2025
//     const firstDay = new Date(year, monthIndex, 1).getDay()
//     const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
//     const days = []

//     // Add empty slots for days before the 1st
//     for (let i = 0; i < firstDay; i++) {
//       days.push(null)
//     }

//     // Add days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       const dateStr = `${year}-${(monthIndex + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`
//       const dayAttendance = dailyAttendance.find((d) => d.date === dateStr)
//       days.push({ day: i, date: dateStr, status: dayAttendance ? dayAttendance.status : "Absent" })
//     }

//     return days
//   }, [monthFilter, dailyAttendance])

//   // Filter data based on view mode
//   const filteredData = useMemo(() => {
//     if (viewMode === "Daily") {
//       return dailyAttendance.find((d) => d.date === dateFilter)?.periods || []
//     } else if (viewMode === "Weekly") {
//       const selectedDate = new Date(dateFilter)
//       const startOfWeek = new Date(selectedDate)
//       startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()) // Start from Sunday
//       const weekDates = []
//       for (let i = 0; i < 7; i++) {
//         const date = new Date(startOfWeek)
//         date.setDate(startOfWeek.getDate() + i)
//         const dateStr = date.toISOString().split("T")[0]
//         const dayAttendance = dailyAttendance.find((d) => d.date === dateStr)
//         weekDates.push({
//           date: dateStr,
//           day: date.toLocaleDateString("en-US", { weekday: "long" }),
//           shortDay: date.toLocaleDateString("en-US", { weekday: "short" }),
//           dayNum: date.getDate(),
//           periods: dayAttendance ? dayAttendance.periods : [],
//         })
//       }
//       return weekDates
//     } else {
//       return calendarDays.filter((day) => day !== null) // For monthly view
//     }
//   }, [viewMode, dateFilter, dailyAttendance, calendarDays])

//   // Unique filter options
//   const uniqueDates = useMemo(() => [...new Set(attendanceDetails.map((d) => d.date))].sort(), [attendanceDetails])
//   const uniqueDays = useMemo(() => {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//     const presentDays = new Set(attendanceDetails.map((d) => new Date(d.date).getDay()))
//     return days.filter((_, i) => presentDays.has(i))
//   }, [attendanceDetails])
//   const uniqueMonths = useMemo(() => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ]
//     const presentMonths = new Set(attendanceDetails.map((d) => new Date(d.date).getMonth()))
//     return months.filter((_, i) => presentMonths.has(i))
//   }, [attendanceDetails])

//   // Helper for status colors
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Present":
//         return { bg: "#4CAF50", text: "#FFFFFF", lightBg: "rgba(76, 175, 80, 0.1)" }
//       case "Partial":
//         return { bg: "#FFC107", text: "#212121", lightBg: "rgba(255, 193, 7, 0.1)" }
//       case "Absent":
//         return { bg: "#F44336", text: "#FFFFFF", lightBg: "rgba(244, 67, 54, 0.1)" }
//       default:
//         return { bg: "#F44336", text: "#FFFFFF", lightBg: "rgba(244, 67, 54, 0.1)" }
//     }
//   }

//   // Navigate between months in the calendar
//   const navigateMonth = (direction) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ]
//     const currentIndex = months.indexOf(monthFilter)
//     let newIndex = currentIndex + direction

//     if (newIndex < 0) newIndex = 11
//     if (newIndex > 11) newIndex = 0

//     setMonthFilter(months[newIndex])
//     const newMonthNum = newIndex + 1
//     setDateFilter(`2025-${newMonthNum.toString().padStart(2, "0")}-01`)
//   }

//   // CSS Styles
//   const styles = {
//     container: {
//       minHeight: "100vh",
//       backgroundColor: "#0f172a",
//       color: "#ffffff",
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//     },
//     backLink: {
//       display: "flex",
//       alignItems: "center",
//       padding: "16px",
//       color: "#94a3b8",
//       textDecoration: "none",
//       cursor: "pointer",
//     },
//     backIcon: {
//       marginRight: "8px",
//     },
//     mainContainer: {
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "0 16px",
//     },
//     profileSection: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       marginBottom: "32px",
//     },
//     profileSectionMd: {
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "flex-start",
//       gap: "24px",
//       marginBottom: "32px",
//     },
//     avatar: {
//       width: "80px",
//       height: "80px",
//       borderRadius: "50%",
//       background: "linear-gradient(to right, #3b82f6, #4f46e5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "28px",
//       fontWeight: "bold",
//       color: "#ffffff",
//       flexShrink: 0,
//     },
//     profileInfo: {
//       textAlign: "center",
//     },
//     profileInfoMd: {
//       textAlign: "left",
//     },
//     studentName: {
//       fontSize: "30px",
//       fontWeight: "bold",
//       margin: "0 0 4px 0",
//     },
//     studentDetails: {
//       fontSize: "16px",
//       color: "#94a3b8",
//       margin: 0,
//     },
//     cardsGrid: {
//       display: "grid",
//       gridTemplateColumns: "1fr",
//       gap: "24px",
//       marginBottom: "32px",
//     },
//     cardsGridMd: {
//       gridTemplateColumns: "repeat(3, 1fr)",
//     },
//     card: {
//       padding: "24px",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     },
//     attendanceCard: {
//       background: "linear-gradient(to right, #2563eb, #3b82f6)",
//     },
//     presentCard: {
//       background: "linear-gradient(to right, #16a34a, #22c55e)",
//     },
//     absentCard: {
//       background: "linear-gradient(to right, #dc2626, #ef4444)",
//     },
//     cardHeader: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "16px",
//     },
//     cardIcon: {
//       marginRight: "8px",
//       width: "24px",
//       height: "24px",
//     },
//     cardTitle: {
//       fontSize: "18px",
//       fontWeight: "600",
//       margin: 0,
//     },
//     cardSubtitle: {
//       fontSize: "14px",
//       opacity: 0.8,
//       marginBottom: "8px",
//     },
//     cardValue: {
//       fontSize: "36px",
//       fontWeight: "bold",
//       margin: 0,
//     },
//     mainGrid: {
//       display: "grid",
//       gridTemplateColumns: "1fr",
//       gap: "24px",
//       marginBottom: "32px",
//     },
//     mainGridLg: {
//       gridTemplateColumns: "300px 1fr",
//     },
//     sidebarCard: {
//       backgroundColor: "#1e293b",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     cardSection: {
//       padding: "16px",
//       borderBottom: "1px solid #334155",
//     },
//     cardSectionNoBorder: {
//       padding: "16px",
//     },
//     flexBetween: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "16px",
//     },
//     sectionTitle: {
//       fontSize: "20px",
//       fontWeight: "600",
//       margin: 0,
//     },
//     monthTitle: {
//       fontSize: "18px",
//       fontWeight: "500",
//       marginBottom: "16px",
//     },
//     navButtons: {
//       display: "flex",
//       gap: "8px",
//     },
//     navButton: {
//       padding: "4px",
//       borderRadius: "50%",
//       backgroundColor: "transparent",
//       border: "none",
//       cursor: "pointer",
//       color: "#ffffff",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     calendarGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(7, 1fr)",
//       gap: "4px",
//       textAlign: "center",
//       marginBottom: "8px",
//     },
//     calendarHeader: {
//       fontSize: "12px",
//       fontWeight: "500",
//       color: "#94a3b8",
//     },
//     calendarDay: {
//       width: "32px",
//       height: "32px",
//       borderRadius: "50%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "14px",
//       fontWeight: "500",
//       cursor: "pointer",
//       border: "none",
//       margin: "0 auto",
//     },
//     viewModeSection: {
//       marginBottom: "24px",
//     },
//     viewModeButtons: {
//       display: "flex",
//       gap: "8px",
//       marginBottom: "24px",
//     },
//     viewModeButton: {
//       padding: "8px 16px",
//       borderRadius: "8px",
//       fontSize: "14px",
//       fontWeight: "500",
//       border: "none",
//       cursor: "pointer",
//       transition: "background-color 0.2s",
//     },
//     viewModeButtonActive: {
//       backgroundColor: "#3b82f6",
//       color: "#ffffff",
//     },
//     viewModeButtonInactive: {
//       backgroundColor: "#334155",
//       color: "#cbd5e1",
//     },
//     legendTitle: {
//       fontSize: "18px",
//       fontWeight: "600",
//       marginBottom: "16px",
//     },
//     legendItem: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "8px",
//     },
//     legendDot: {
//       width: "16px",
//       height: "16px",
//       borderRadius: "50%",
//       marginRight: "8px",
//     },
//     legendText: {
//       fontSize: "14px",
//     },
//     mainContent: {
//       backgroundColor: "#1e293b",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     contentHeader: {
//       padding: "16px",
//       borderBottom: "1px solid #334155",
//     },
//     contentTitle: {
//       fontSize: "20px",
//       fontWeight: "600",
//       margin: 0,
//     },
//     contentBody: {
//       padding: "16px",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//     },
//     tableHeader: {
//       backgroundColor: "#334155",
//       textAlign: "left",
//     },
//     tableHeaderCell: {
//       padding: "12px 16px",
//       fontSize: "14px",
//       fontWeight: "500",
//       color: "#94a3b8",
//     },
//     tableRow: {
//       borderBottom: "1px solid #334155",
//     },
//     tableCell: {
//       padding: "12px 16px",
//     },
//     tableCellSmall: {
//       padding: "12px 16px",
//       fontSize: "14px",
//       color: "#cbd5e1",
//     },
//     statusBadge: {
//       display: "inline-block",
//       padding: "4px 12px",
//       borderRadius: "9999px",
//       fontSize: "12px",
//       fontWeight: "500",
//     },
//     weeklyTable: {
//       width: "100%",
//       borderCollapse: "collapse",
//       overflowX: "auto",
//     },
//     weeklyTableHeader: {
//       backgroundColor: "#334155",
//     },
//     weeklyTableHeaderCell: {
//       padding: "8px",
//       fontSize: "14px",
//       fontWeight: "500",
//       color: "#94a3b8",
//       textAlign: "center",
//     },
//     weeklyTableCell: {
//       padding: "4px",
//       textAlign: "center",
//     },
//     weeklyDayHeader: {
//       textAlign: "center",
//     },
//     weeklyDayName: {
//       fontSize: "14px",
//     },
//     weeklyDayNumber: {
//       fontSize: "12px",
//     },
//     weeklySubjectCell: {
//       padding: "8px",
//       borderRadius: "4px",
//       fontSize: "12px",
//       fontWeight: "500",
//     },
//     weeklySubjectName: {
//       marginBottom: "4px",
//     },
//     weeklySubjectStatus: {
//       fontSize: "10px",
//     },
//     monthlyGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(1, 1fr)",
//       gap: "16px",
//     },
//     monthlyGridMd: {
//       gridTemplateColumns: "repeat(2, 1fr)",
//     },
//     monthlyDay: {
//       padding: "12px",
//       borderRadius: "8px",
//       border: "1px solid #334155",
//     },
//     monthlyDayHeader: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "8px",
//     },
//     monthlyDayTitle: {
//       fontWeight: "500",
//       margin: 0,
//     },
//     monthlyDayStatus: {
//       padding: "4px 8px",
//       borderRadius: "9999px",
//       fontSize: "12px",
//       fontWeight: "500",
//     },
//     monthlyDayLink: {
//       marginTop: "4px",
//       fontSize: "12px",
//       color: "#60a5fa",
//       textDecoration: "none",
//       cursor: "pointer",
//       textAlign: "left",
//       background: "none",
//       border: "none",
//       padding: 0,
//       display: "block",
//       width: "100%",
//     },
//     subjectGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(1, 1fr)",
//       gap: "16px",
//       marginTop: "32px",
//     },
//     subjectGridMd: {
//       gridTemplateColumns: "repeat(2, 1fr)",
//     },
//     subjectGridLg: {
//       gridTemplateColumns: "repeat(3, 1fr)",
//     },
//     subjectCard: {
//       backgroundColor: "#334155",
//       borderRadius: "8px",
//       padding: "16px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     },
//     subjectHeader: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "8px",
//     },
//     subjectTitle: {
//       fontSize: "18px",
//       fontWeight: "600",
//       margin: 0,
//     },
//     subjectPercentage: {
//       fontSize: "20px",
//       fontWeight: "700",
//     },
//     progressBar: {
//       width: "100%",
//       height: "10px",
//       backgroundColor: "#475569",
//       borderRadius: "9999px",
//       marginBottom: "16px",
//       overflow: "hidden",
//     },
//     progressFill: {
//       height: "100%",
//       borderRadius: "9999px",
//     },
//     subjectStats: {
//       display: "grid",
//       gridTemplateColumns: "repeat(3, 1fr)",
//       textAlign: "center",
//       fontSize: "14px",
//     },
//     statLabel: {
//       color: "#94a3b8",
//       marginBottom: "4px",
//     },
//     statValue: {
//       fontWeight: "500",
//     },
//     // Media query helper
//     mediaQuery: {
//       md: window.matchMedia("(min-width: 768px)").matches,
//       lg: window.matchMedia("(min-width: 1024px)").matches,
//     },
//   }

//   // Icons as SVG
//   const icons = {
//     chevronLeft: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={styles.backIcon}
//       >
//         <path d="m15 18-6-6 6-6" />
//       </svg>
//     ),
//     chevronRight: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="m9 18 6-6-6-6" />
//       </svg>
//     ),
//     user: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={styles.cardIcon}
//       >
//         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//       </svg>
//     ),
//     userCheck: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={styles.cardIcon}
//       >
//         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <polyline points="16 11 18 13 22 9" />
//       </svg>
//     ),
//     userX: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={styles.cardIcon}
//       >
//         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <line x1="17" x2="22" y1="8" y2="13" />
//         <line x1="22" x2="17" y1="8" y2="13" />
//       </svg>
//     ),
//   }

//   return (
//     <div style={styles.container}>
//       {/* Back to Dashboard Link */}
//       <div style={styles.backLink}>
//         {icons.chevronLeft}
//         Back to Dashboard
//       </div>

//       {/* Student Profile Header */}
//       <div style={styles.mainContainer}>
//         <div style={styles.mediaQuery.md ? styles.profileSectionMd : styles.profileSection}>
//           <div style={styles.avatar}>{student?.name?.[0] || "S"}</div>
//           <div style={styles.mediaQuery.md ? styles.profileInfoMd : styles.profileInfo}>
//             <h1 style={styles.studentName}>{student?.name || "Student Name"}</h1>
//             <p style={styles.studentDetails}>Roll No: {student?.rollno || "IT001"} • 5th Semester</p>
//           </div>
//         </div>

//         {/* Attendance Summary Cards */}
//         <div
//           style={{
//             ...styles.cardsGrid,
//             ...(styles.mediaQuery.md ? styles.cardsGridMd : {}),
//           }}
//         >
//           <div style={{ ...styles.card, ...styles.attendanceCard }}>
//             <div style={styles.cardHeader}>
//               {icons.user}
//               <h3 style={styles.cardTitle}>Attendance Rate</h3>
//             </div>
//             <p style={styles.cardSubtitle}>Overall semester attendance</p>
//             <p style={styles.cardValue}>{overallAttendance}%</p>
//           </div>

//           <div style={{ ...styles.card, ...styles.presentCard }}>
//             <div style={styles.cardHeader}>
//               {icons.userCheck}
//               <h3 style={styles.cardTitle}>Present Days</h3>
//             </div>
//             <p style={styles.cardSubtitle}>Total days present this semester</p>
//             <p style={styles.cardValue}>{presentDays} days</p>
//           </div>

//           <div style={{ ...styles.card, ...styles.absentCard }}>
//             <div style={styles.cardHeader}>
//               {icons.userX}
//               <h3 style={styles.cardTitle}>Absent Days</h3>
//             </div>
//             <p style={styles.cardSubtitle}>Total days absent this semester</p>
//             <p style={styles.cardValue}>{absentDays} days</p>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div
//           style={{
//             ...styles.mainGrid,
//             ...(styles.mediaQuery.lg ? styles.mainGridLg : {}),
//           }}
//         >
//           {/* Calendar Section */}
//           <div style={styles.sidebarCard}>
//             <div style={styles.cardSection}>
//               <div style={styles.flexBetween}>
//                 <h3 style={styles.sectionTitle}>Select Date</h3>
//                 <div style={styles.navButtons}>
//                   <button style={styles.navButton} onClick={() => navigateMonth(-1)}>
//                     {icons.chevronLeft}
//                   </button>
//                   <button style={styles.navButton} onClick={() => navigateMonth(1)}>
//                     {icons.chevronRight}
//                   </button>
//                 </div>
//               </div>

//               <h2 style={styles.monthTitle}>{monthFilter} 2025</h2>

//               <div style={styles.calendarGrid}>
//                 {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
//                   <div key={index} style={styles.calendarHeader}>
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               <div style={styles.calendarGrid}>
//                 {calendarDays.map((day, index) =>
//                   day ? (
//                     <button
//                       key={index}
//                       style={{
//                         ...styles.calendarDay,
//                         backgroundColor:
//                           day.status === "Present" ? "#4CAF50" : day.status === "Partial" ? "#FFC107" : "#334155",
//                         color: day.status === "Present" || day.status === "Absent" ? "#FFFFFF" : "#212121",
//                         border: day.date === dateFilter ? "2px solid #60a5fa" : "none",
//                       }}
//                       onClick={() => {
//                         setDateFilter(day.date)
//                         setViewMode("Daily")
//                       }}
//                     >
//                       {day.day}
//                     </button>
//                   ) : (
//                     <div key={index} style={{ width: "32px", height: "32px" }}></div>
//                   ),
//                 )}
//               </div>
//             </div>

//             <div style={styles.cardSectionNoBorder}>
//               <div style={styles.viewModeSection}>
//                 <h3 style={styles.legendTitle}>View Mode</h3>
//                 <div style={styles.viewModeButtons}>
//                   {["Daily", "Weekly", "Monthly"].map((mode) => (
//                     <button
//                       key={mode}
//                       style={{
//                         ...(viewMode === mode ? styles.viewModeButtonActive : styles.viewModeButtonInactive),
//                         ...styles.viewModeButton,
//                       }}
//                       onClick={() => setViewMode(mode)}
//                     >
//                       {mode}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <h3 style={styles.legendTitle}>Attendance Legend</h3>
//               <div>
//                 <div style={styles.legendItem}>
//                   <div style={{ ...styles.legendDot, backgroundColor: "#4CAF50" }}></div>
//                   <span style={styles.legendText}>Present</span>
//                 </div>
//                 <div style={styles.legendItem}>
//                   <div style={{ ...styles.legendDot, backgroundColor: "#FFC107" }}></div>
//                   <span style={styles.legendText}>Partial</span>
//                 </div>
//                 <div style={styles.legendItem}>
//                   <div style={{ ...styles.legendDot, backgroundColor: "#F44336" }}></div>
//                   <span style={styles.legendText}>Absent</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Attendance Display */}
//           <div style={styles.mainContent}>
//             <div style={styles.contentHeader}>
//               <h2 style={styles.contentTitle}>
//                 {viewMode === "Daily"
//                   ? formatDate(dateFilter)
//                   : viewMode === "Weekly"
//                     ? `Week of ${formatDate(filteredData[0]?.date)}`
//                     : `${monthFilter} 2025`}
//               </h2>
//             </div>

//             <div style={styles.contentBody}>
//               {viewMode === "Daily" && (
//                 <div style={{ overflowX: "auto" }}>
//                   <table style={styles.table}>
//                     <thead>
//                       <tr style={styles.tableHeader}>
//                         <th style={styles.tableHeaderCell}>Period</th>
//                         <th style={styles.tableHeaderCell}>Time</th>
//                         <th style={styles.tableHeaderCell}>Subject</th>
//                         <th style={styles.tableHeaderCell}>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {dailySchedule.map((period) => {
//                         const detail = filteredData.find((d) => d.period === period.period)
//                         const status = detail?.status || "Absent"
//                         const colors = getStatusColor(status)

//                         return (
//                           <tr key={period.period} style={styles.tableRow}>
//                             <td style={styles.tableCell}>{period.period}</td>
//                             <td style={styles.tableCellSmall}>{period.time}</td>
//                             <td style={{ ...styles.tableCell, fontWeight: 500 }}>{period.subject}</td>
//                             <td style={styles.tableCell}>
//                               <span
//                                 style={{
//                                   ...styles.statusBadge,
//                                   backgroundColor: colors.bg,
//                                   color: colors.text,
//                                 }}
//                               >
//                                 {status}
//                               </span>
//                             </td>
//                           </tr>
//                         )
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {viewMode === "Weekly" && (
//                 <div style={{ overflowX: "auto" }}>
//                   <table style={styles.weeklyTable}>
//                     <thead>
//                       <tr style={styles.weeklyTableHeader}>
//                         <th style={styles.weeklyTableHeaderCell}>Period</th>
//                         <th style={styles.weeklyTableHeaderCell}>Time</th>
//                         {filteredData.map((day, index) => (
//                           <th key={index} style={styles.weeklyTableHeaderCell}>
//                             <div style={styles.weeklyDayHeader}>
//                               <div style={styles.weeklyDayName}>{day.shortDay}</div>
//                               <div style={styles.weeklyDayNumber}>{day.dayNum}</div>
//                             </div>
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {dailySchedule.map((period) => (
//                         <tr key={period.period} style={styles.tableRow}>
//                           <td style={styles.weeklyTableCell}>{period.period}</td>
//                           <td style={{ ...styles.weeklyTableCell, fontSize: "12px", color: "#cbd5e1" }}>
//                             {period.time}
//                           </td>
//                           {filteredData.map((day, dayIndex) => {
//                             const periodDetail = day.periods?.find((p) => p.period === period.period)
//                             const status = periodDetail?.status || "Absent"
//                             const colors = getStatusColor(status)

//                             return (
//                               <td key={dayIndex} style={styles.weeklyTableCell}>
//                                 <div
//                                   style={{
//                                     ...styles.weeklySubjectCell,
//                                     backgroundColor: colors.lightBg,
//                                     color: colors.bg,
//                                   }}
//                                 >
//                                   <div style={styles.weeklySubjectName}>{period.subject}</div>
//                                   <div style={styles.weeklySubjectStatus}>{status}</div>
//                                 </div>
//                               </td>
//                             )
//                           })}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {viewMode === "Monthly" && (
//                 <div
//                   style={{
//                     ...styles.monthlyGrid,
//                     ...(styles.mediaQuery.md ? styles.monthlyGridMd : {}),
//                   }}
//                 >
//                   {filteredData.map((day, index) => {
//                     const colors = getStatusColor(day.status)
//                     return (
//                       <div
//                         key={index}
//                         style={{
//                           ...styles.monthlyDay,
//                           backgroundColor: colors.lightBg,
//                         }}
//                       >
//                         <div style={styles.monthlyDayHeader}>
//                           <span style={styles.monthlyDayTitle}>{day.day} May</span>
//                           <span
//                             style={{
//                               ...styles.monthlyDayStatus,
//                               backgroundColor: colors.bg,
//                               color: colors.text,
//                             }}
//                           >
//                             {day.status}
//                           </span>
//                         </div>
//                         <button
//                           style={styles.monthlyDayLink}
//                           onClick={() => {
//                             setDateFilter(day.date)
//                             setViewMode("Daily")
//                           }}
//                         >
//                           View details →
//                         </button>
//                       </div>
//                     )
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Subject-wise Attendance */}
//         <div style={{ ...styles.mainContent, marginTop: "32px" }}>
//           <div style={styles.contentHeader}>
//             <h2 style={styles.contentTitle}>Subject-wise Attendance</h2>
//           </div>

//           <div style={styles.contentBody}>
//             <div
//               style={{
//                 ...styles.subjectGrid,
//                 ...(styles.mediaQuery.md ? styles.subjectGridMd : {}),
//                 ...(styles.mediaQuery.lg ? styles.subjectGridLg : {}),
//               }}
//             >
//               {periodWiseAttendance.map((subject) => {
//                 const percentage = Number.parseInt(subject.percentage)
//                 let statusColor = "#F44336" // Red for low attendance

//                 if (percentage >= 75) {
//                   statusColor = "#4CAF50" // Green for good attendance
//                 } else if (percentage >= 50) {
//                   statusColor = "#FFC107" // Yellow for moderate attendance
//                 }

//                 return (
//                   <div key={subject.subject} style={styles.subjectCard}>
//                     <div style={styles.subjectHeader}>
//                       <h3 style={styles.subjectTitle}>{subject.subject}</h3>
//                       <span style={{ ...styles.subjectPercentage, color: statusColor }}>{subject.percentage}%</span>
//                     </div>

//                     <div style={styles.progressBar}>
//                       <div
//                         style={{
//                           ...styles.progressFill,
//                           width: `${subject.percentage}%`,
//                           backgroundColor: statusColor,
//                         }}
//                       ></div>
//                     </div>

//                     <div style={styles.subjectStats}>
//                       <div>
//                         <p style={styles.statLabel}>Present</p>
//                         <p style={styles.statValue}>{subject.presentDays}</p>
//                       </div>
//                       <div>
//                         <p style={styles.statLabel}>Partial</p>
//                         <p style={styles.statValue}>{subject.partialDays}</p>
//                       </div>
//                       <div>
//                         <p style={styles.statLabel}>Absent</p>
//                         <p style={styles.statValue}>{subject.absentDays}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StudentDetails


// without period changed crt code

// "use client"

// import { useEffect, useState, useMemo } from "react"
// import { useParams } from "react-router-dom"

// const StudentDetails = () => {
//   const { id } = useParams()
//   const [attendanceDetails, setAttendanceDetails] = useState([])
//   const [student, setStudent] = useState(null)
//   const [dateFilter, setDateFilter] = useState("2025-05-01") // Default to May 1, 2025
//   const [dayFilter, setDayFilter] = useState("")
//   const [monthFilter, setMonthFilter] = useState("May")
//   const [viewMode, setViewMode] = useState("Daily") // Daily, Weekly, Monthly

//   const dailySchedule = [
//     { period: 1, time: "08:40 - 09:40", subject: "DCN" },
//     { period: 2, time: "09:40 - 10:40", subject: "OS" },
//     { period: 3, time: "11:00 - 12:00", subject: "FSD" },
//     { period: 4, time: "12:00 - 13:00", subject: "CC" },
//     { period: 5, time: "13:40 - 14:30", subject: "ES" },
//     { period: 6, time: "14:30 - 15:20", subject: "OS" },
//     { period: 7, time: "15:20 - 16:10", subject: "MV" },
//   ]

//   // Helper functions
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(":").map(Number)
//     return hours * 60 + minutes
//   }

//   const getPeriodTimes = (timeRange) => {
//     const [start, end] = timeRange.split(" - ")
//     return { start: parseTime(start), end: parseTime(end) }
//   }

//   const dateToMinutes = (date) => {
//     return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60
//   }

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr)
//     return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
//   }

//   const getAttendanceStatus = (minutes) => {
//     if (minutes >= 40) return "Present"
//     if (minutes >= 20) return "Partial"
//     return "Absent"
//   }

//   const getDayOfWeek = (dateStr) => {
//     const date = new Date(dateStr)
//     return date.toLocaleDateString("en-US", { weekday: "long" })
//   }

//   // Fetch and process attendance data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/posts")
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
//         const fetchedData = await response.json()
//         const studentData = fetchedData.find((student) => student.id === id)

//         if (!studentData) {
//           setStudent(null)
//           setAttendanceDetails([])
//           return
//         }

//         setStudent(studentData)

//         if (studentData.entry_times && studentData.exit_times) {
//           const detailsMap = new Map()
//           const entryTimes = studentData.entry_times
//           const exitTimes = studentData.exit_times

//           for (let i = 0; i < entryTimes.length; i++) {
//             const entry = new Date(entryTimes[i].replace("Z", "+05:30"))
//             const exit = i < exitTimes.length ? new Date(exitTimes[i].replace("Z", "+05:30")) : null
//             if (!exit) continue

//             const entryDate = entry.toISOString().split("T")[0]
//             const entryMinutes = dateToMinutes(entry)
//             const exitMinutes = dateToMinutes(exit)

//             dailySchedule.forEach((period) => {
//               const { start, end } = getPeriodTimes(period.time)
//               if (period.period === 3 && Math.abs(entryMinutes - parseTime("10:40")) < 0.001) return

//               const overlapStart = Math.max(entryMinutes, start)
//               const overlapEnd = Math.min(exitMinutes, end)

//               if (
//                 overlapStart < overlapEnd ||
//                 (overlapStart === overlapEnd && period.period === 2 && entryDate === "2025-05-14")
//               ) {
//                 const minutesInside =
//                   period.period === 2 && entryDate === "2025-05-14" ? 0 : Math.ceil(overlapEnd - overlapStart)
//                 const key = `${entryDate}-${period.period}`
//                 const status = getAttendanceStatus(minutesInside)

//                 if (detailsMap.has(key)) {
//                   const existing = detailsMap.get(key)
//                   existing.minutes += minutesInside
//                   existing.status = getAttendanceStatus(existing.minutes)
//                 } else {
//                   detailsMap.set(key, {
//                     date: entryDate,
//                     period: period.period,
//                     subject: period.subject,
//                     time: period.time,
//                     minutes: minutesInside,
//                     status: status,
//                   })
//                 }
//               }
//             })
//           }

//           const details = Array.from(detailsMap.values())
//           setAttendanceDetails(details)
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error)
//         setAttendanceDetails([])
//       }
//     }

//     fetchData()
//   }, [id])

//   // Calculate daily attendance status
//   const dailyAttendance = useMemo(() => {
//     const groupedByDate = {}
//     attendanceDetails.forEach((detail) => {
//       if (!groupedByDate[detail.date]) groupedByDate[detail.date] = []
//       groupedByDate[detail.date].push(detail)
//     })

//     return Object.keys(groupedByDate).map((date) => {
//       const periods = groupedByDate[date]
//       const presentCount = periods.filter((p) => p.status === "Present").length
//       const partialCount = periods.filter((p) => p.status === "Partial").length
//       let status
//       if (presentCount > 4) status = "Present"
//       else if (presentCount + partialCount < 3) status = "Absent"
//       else status = "Partial"
//       return { date, periods, status }
//     })
//   }, [attendanceDetails])

//   // Calculate present and absent days
//   const { presentDays, absentDays } = useMemo(() => {
//     let present = 0,
//       absent = 0
//     dailyAttendance.forEach((day) => {
//       if (day.status === "Present" || day.status === "Partial") present++
//       else absent++
//     })
//     return { presentDays: present, absentDays: absent }
//   }, [dailyAttendance])

//   // Calculate overall attendance percentage
//   const overallAttendance = useMemo(() => {
//     const totalDays = presentDays + absentDays
//     return totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : 0
//   }, [presentDays, absentDays])

//   // Calculate period-wise attendance percentage
//   const periodWiseAttendance = useMemo(() => {
//     const periodStats = dailySchedule.map((period) => {
//       const periodDetails = attendanceDetails.filter((detail) => detail.period === period.period)
//       const totalDays = new Set(periodDetails.map((d) => d.date)).size
//       const presentDays = periodDetails.filter((d) => d.status === "Present").length
//       const partialDays = periodDetails.filter((d) => d.status === "Partial").length
//       const absentDays = totalDays - presentDays - partialDays
//       const percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(0) : 0
//       return {
//         ...period,
//         percentage,
//         presentDays,
//         partialDays,
//         absentDays,
//         totalDays,
//       }
//     })
//     return periodStats
//   }, [attendanceDetails])

//   // Generate calendar days for the selected month
//   const calendarDays = useMemo(() => {
//     const monthIndex = new Date(`2025-${monthFilter}-01`).getMonth()
//     const year = 2025
//     const firstDay = new Date(year, monthIndex, 1).getDay()
//     const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
//     const days = []

//     // Add empty slots for days before the 1st
//     for (let i = 0; i < firstDay; i++) {
//       days.push(null)
//     }

//     // Add days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       const dateStr = `${year}-${(monthIndex + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`
//       const dayAttendance = dailyAttendance.find((d) => d.date === dateStr)
//       days.push({ day: i, date: dateStr, status: dayAttendance ? dayAttendance.status : "Absent" })
//     }

//     return days
//   }, [monthFilter, dailyAttendance])

//   // Filter data based on view mode
//   const filteredData = useMemo(() => {
//     if (viewMode === "Daily") {
//       return dailyAttendance.find((d) => d.date === dateFilter)?.periods || []
//     } else if (viewMode === "Weekly") {
//       const selectedDate = new Date(dateFilter)
//       const startOfWeek = new Date(selectedDate)
//       startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()) // Start from Sunday
//       const weekDates = []
//       for (let i = 0; i < 7; i++) {
//         const date = new Date(startOfWeek)
//         date.setDate(startOfWeek.getDate() + i)
//         const dateStr = date.toISOString().split("T")[0]
//         const dayAttendance = dailyAttendance.find((d) => d.date === dateStr)
//         weekDates.push({
//           date: dateStr,
//           day: date.toLocaleDateString("en-US", { weekday: "long" }),
//           shortDay: date.toLocaleDateString("en-US", { weekday: "short" }),
//           dayNum: date.getDate(),
//           periods: dayAttendance ? dayAttendance.periods : [],
//         })
//       }
//       return weekDates
//     } else {
//       return calendarDays.filter((day) => day !== null) // For monthly view
//     }
//   }, [viewMode, dateFilter, dailyAttendance, calendarDays])

//   // Unique filter options
//   const uniqueDates = useMemo(() => [...new Set(attendanceDetails.map((d) => d.date))].sort(), [attendanceDetails])
//   const uniqueDays = useMemo(() => {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//     const presentDays = new Set(attendanceDetails.map((d) => new Date(d.date).getDay()))
//     return days.filter((_, i) => presentDays.has(i))
//   }, [attendanceDetails])
//   const uniqueMonths = useMemo(() => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ]
//     const presentMonths = new Set(attendanceDetails.map((d) => new Date(d.date).getMonth()))
//     return months.filter((_, i) => presentMonths.has(i))
//   }, [attendanceDetails])

//   // Helper for status colors
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Present":
//         return { bg: "#4CAF50", text: "#FFFFFF", lightBg: "rgba(76, 175, 80, 0.1)" }
//       case "Partial":
//         return { bg: "#FFC107", text: "#212121", lightBg: "rgba(255, 193, 7, 0.1)" }
//       case "Absent":
//         return { bg: "#F44336", text: "#FFFFFF", lightBg: "rgba(244, 67, 54, 0.1)" }
//       default:
//         return { bg: "#F44336", text: "#FFFFFF", lightBg: "rgba(244, 67, 54, 0.1)" }
//     }
//   }

//   // Navigate between months in the calendar
//   const navigateMonth = (direction) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ]
//     const currentIndex = months.indexOf(monthFilter)
//     let newIndex = currentIndex + direction

//     if (newIndex < 0) newIndex = 11
//     if (newIndex > 11) newIndex = 0

//     setMonthFilter(months[newIndex])
//     const newMonthNum = newIndex + 1
//     setDateFilter(`2025-${newMonthNum.toString().padStart(2, "0")}-01`)
//   }

//   // CSS Styles
//   const styles = {
//     container: {
//       minHeight: "100vh",
//       backgroundColor: "#0f172a",
//       color: "#ffffff",
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//     },
//     backLink: {
//       display: "flex",
//       alignItems: "center",
//       padding: "16px",
//       color: "#94a3b8",
//       textDecoration: "none",
//       cursor: "pointer",
//     },
//     backIcon: {
//       marginRight: "8px",
//     },
//     mainContainer: {
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "0 16px",
//     },
//     profileSection: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       marginBottom: "32px",
//     },
//     profileSectionMd: {
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "flex-start",
//       gap: "24px",
//       marginBottom: "32px",
//     },
//     avatar: {
//       width: "80px",
//       height: "80px",
//       borderRadius: "50%",
//       background: "linear-gradient(to right, #3b82f6, #4f46e5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "28px",
//       fontWeight: "bold",
//       color: "#ffffff",
//       flexShrink: 0,
//     },
//     profileInfo: {
//       textAlign: "center",
//     },
//     profileInfoMd: {
//       textAlign: "left",
//     },
//     studentName: {
//       fontSize: "30px",
//       fontWeight: "bold",
//       margin: "0 0 4px 0",
//     },
//     studentDetails: {
//       fontSize: "16px",
//       color: "#94a3b8",
//       margin: 0,
//     },
//     cardsGrid: {
//       display: "grid",
//       gridTemplateColumns: "1fr",
//       gap: "24px",
//       marginBottom: "32px",
//     },
//     cardsGridMd: {
//       gridTemplateColumns: "repeat(3, 1fr)",
//     },
//     card: {
//       padding: "24px",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     },
//     attendanceCard: {
//       background: "linear-gradient(to right, #2563eb, #3b82f6)",
//     },
//     presentCard: {
//       background: "linear-gradient(to right, #16a34a, #22c55e)",
//     },
//     absentCard: {
//       background: "linear-gradient(to right, #dc2626, #ef4444)",
//     },
//     cardHeader: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "16px",
//     },
//     cardIcon: {
//       marginRight: "8px",
//       width: "24px",
//       height: "24px",
//     },
//     cardTitle: {
//       fontSize: "18px",
//       fontWeight: "600",
//       margin: 0,
//     },
//     cardSubtitle: {
//       fontSize: "14px",
//       opacity: 0.8,
//       marginBottom: "8px",
//     },
//     cardValue: {
//       fontSize: "36px",
//       fontWeight: "bold",
//       margin: 0,
//     },
//     mainGrid: {
//       display: "grid",
//       gridTemplateColumns: "1fr",
//       gap: "24px",
//       marginBottom: "32px",
//     },
//     mainGridLg: {
//       gridTemplateColumns: "300px 1fr",
//     },
//     sidebarCard: {
//       backgroundColor: "#1e293b",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     cardSection: {
//       padding: "16px",
//       borderBottom: "1px solid #334155",
//     },
//     cardSectionNoBorder: {
//       padding: "16px",
//     },
//     flexBetween: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "16px",
//     },
//     sectionTitle: {
//       fontSize: "20px",
//       fontWeight: "600",
//       margin: 0,
//     },
//     monthTitle: {
//       fontSize: "18px",
//       fontWeight: "500",
//       marginBottom: "16px",
//     },
//     navButtons: {
//       display: "flex",
//       gap: "8px",
//     },
//     navButton: {
//       padding: "4px",
//       borderRadius: "50%",
//       backgroundColor: "transparent",
//       border: "none",
//       cursor: "pointer",
//       color: "#ffffff",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     calendarGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(7, 1fr)",
//       gap: "4px",
//       textAlign: "center",
//       marginBottom: "8px",
//     },
//     calendarHeader: {
//       fontSize: "12px",
//       fontWeight: "500",
//       color: "#94a3b8",
//     },
//     calendarDay: {
//       width: "32px",
//       height: "32px",
//       borderRadius: "50%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "14px",
//       fontWeight: "500",
//       cursor: "pointer",
//       border: "none",
//       margin: "0 auto",
//     },
//     viewModeSection: {
//       marginBottom: "24px",
//     },
//     viewModeButtons: {
//       display: "flex",
//       gap: "8px",
//       marginBottom: "24px",
//     },
//     viewModeButton: {
//       padding: "8px 16px",
//       borderRadius: "8px",
//       fontSize: "14px",
//       fontWeight: "500",
//       border: "none",
//       cursor: "pointer",
//       transition: "background-color 0.2s",
//     },
//     viewModeButtonActive: {
//       backgroundColor: "#3b82f6",
//       color: "#ffffff",
//     },
//     viewModeButtonInactive: {
//       backgroundColor: "#334155",
//       color: "#cbd5e1",
//     },
//     legendTitle: {
//       fontSize: "18px",
//       fontWeight: "600",
//       marginBottom: "16px",
//     },
//     legendItem: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "8px",
//     },
//     legendDot: {
//       width: "16px",
//       height: "16px",
//       borderRadius: "50%",
//       marginRight: "8px",
//     },
//     legendText: {
//       fontSize: "14px",
//     },
//     mainContent: {
//       backgroundColor: "#1e293b",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     contentHeader: {
//       padding: "16px",
//       borderBottom: "1px solid #334155",
//     },
//     contentTitle: {
//       fontSize: "20px",
//       fontWeight: "600",
//       margin: 0,
//     },
//     contentBody: {
//       padding: "16px",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//     },
//     tableHeader: {
//       backgroundColor: "#334155",
//       textAlign: "left",
//     },
//     tableHeaderCell: {
//       padding: "12px 16px",
//       fontSize: "14px",
//       fontWeight: "500",
//       color: "#94a3b8",
//     },
//     tableRow: {
//       borderBottom: "1px solid #334155",
//     },
//     tableCell: {
//       padding: "12px 16px",
//     },
//     tableCellSmall: {
//       padding: "12px 16px",
//       fontSize: "14px",
//       color: "#cbd5e1",
//     },
//     statusBadge: {
//       display: "inline-block",
//       padding: "4px 12px",
//       borderRadius: "9999px",
//       fontSize: "12px",
//       fontWeight: "500",
//     },
//     weeklyTable: {
//       width: "100%",
//       borderCollapse: "collapse",
//       overflowX: "auto",
//     },
//     weeklyTableHeader: {
//       backgroundColor: "#334155",
//     },
//     weeklyTableHeaderCell: {
//       padding: "8px",
//       fontSize: "14px",
//       fontWeight: "500",
//       color: "#94a3b8",
//       textAlign: "center",
//     },
//     weeklyTableCell: {
//       padding: "4px",
//       textAlign: "center",
//     },
//     weeklyDayHeader: {
//       textAlign: "center",
//     },
//     weeklyDayName: {
//       fontSize: "14px",
//     },
//     weeklyDayNumber: {
//       fontSize: "12px",
//     },
//     weeklySubjectCell: {
//       padding: "8px",
//       borderRadius: "4px",
//       fontSize: "12px",
//       fontWeight: "500",
//     },
//     weeklySubjectName: {
//       marginBottom: "4px",
//     },
//     weeklySubjectStatus: {
//       fontSize: "10px",
//     },
//     monthlyGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(1, 1fr)",
//       gap: "16px",
//     },
//     monthlyGridMd: {
//       gridTemplateColumns: "repeat(2, 1fr)",
//     },
//     monthlyDay: {
//       padding: "12px",
//       borderRadius: "8px",
//       border: "1px solid #334155",
//     },
//     monthlyDayHeader: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "8px",
//     },
//     monthlyDayTitle: {
//       fontWeight: "500",
//       margin: 0,
//     },
//     monthlyDayStatus: {
//       padding: "4px 8px",
//       borderRadius: "9999px",
//       fontSize: "12px",
//       fontWeight: "500",
//     },
//     monthlyDayLink: {
//       marginTop: "4px",
//       fontSize: "12px",
//       color: "#60a5fa",
//       textDecoration: "none",
//       cursor: "pointer",
//       textAlign: "left",
//       background: "none",
//       border: "none",
//       padding: 0,
//       display: "block",
//       width: "100%",
//     },
//     subjectGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(1, 1fr)",
//       gap: "16px",
//       marginTop: "32px",
//     },
//     subjectGridMd: {
//       gridTemplateColumns: "repeat(2, 1fr)",
//     },
//     subjectGridLg: {
//       gridTemplateColumns: "repeat(3, 1fr)",
//     },
//     subjectCard: {
//       backgroundColor: "#334155",
//       borderRadius: "8px",
//       padding: "16px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     },
//     subjectHeader: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "8px",
//     },
//     subjectTitle: {
//       fontSize: "18px",
//       fontWeight: "600",
//       margin: 0,
//     },
//     subjectPercentage: {
//       fontSize: "20px",
//       fontWeight: "700",
//     },
//     progressBar: {
//       width: "100%",
//       height: "10px",
//       backgroundColor: "#475569",
//       borderRadius: "9999px",
//       marginBottom: "16px",
//       overflow: "hidden",
//     },
//     progressFill: {
//       height: "100%",
//       borderRadius: "9999px",
//     },
//     subjectStats: {
//       display: "grid",
//       gridTemplateColumns: "repeat(3, 1fr)",
//       textAlign: "center",
//       fontSize: "14px",
//     },
//     statLabel: {
//       color: "#94a3b8",
//       marginBottom: "4px",
//     },
//     statValue: {
//       fontWeight: "500",
//     },
//     // Media query helper
//     mediaQuery: {
//       md: window.matchMedia("(min-width: 768px)").matches,
//       lg: window.matchMedia("(min-width: 1024px)").matches,
//     },
//   }

//   // Icons as SVG
//   const icons = {
//     chevronLeft: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={styles.backIcon}
//       >
//         <path d="m15 18-6-6 6-6" />
//       </svg>
//     ),
//     chevronRight: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="m9 18 6-6-6-6" />
//       </svg>
//     ),
//     user: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={styles.cardIcon}
//       >
//         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//       </svg>
//     ),
//     userCheck: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={styles.cardIcon}
//       >
//         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <polyline points="16 11 18 13 22 9" />
//       </svg>
//     ),
//     userX: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={styles.cardIcon}
//       >
//         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <line x1="17" x2="22" y1="8" y2="13" />
//         <line x1="22" x2="17" y1="8" y2="13" />
//       </svg>
//     ),
//   }

//   return (
//     <div style={styles.container}>
//       {/* Back to Dashboard Link */}
//       <div style={styles.backLink}>
//         {icons.chevronLeft}
//         Back to Dashboard
//       </div>

//       {/* Student Profile Header */}
//       <div style={styles.mainContainer}>
//         <div style={styles.mediaQuery.md ? styles.profileSectionMd : styles.profileSection}>
//           <div style={styles.avatar}>{student?.name?.[0] || "S"}</div>
//           <div style={styles.mediaQuery.md ? styles.profileInfoMd : styles.profileInfo}>
//             <h1 style={styles.studentName}>{student?.name || "Student Name"}</h1>
//             <p style={styles.studentDetails}>Roll No: {student?.rollno || "IT001"} • 5th Semester</p>
//           </div>
//         </div>

//         {/* Attendance Summary Cards */}
//         <div
//           style={{
//             ...styles.cardsGrid,
//             ...(styles.mediaQuery.md ? styles.cardsGridMd : {}),
//           }}
//         >
//           <div style={{ ...styles.card, ...styles.attendanceCard }}>
//             <div style={styles.cardHeader}>
//               {icons.user}
//               <h3 style={styles.cardTitle}>Attendance Rate</h3>
//             </div>
//             <p style={styles.cardSubtitle}>Overall semester attendance</p>
//             <p style={styles.cardValue}>{overallAttendance}%</p>
//           </div>

//           <div style={{ ...styles.card, ...styles.presentCard }}>
//             <div style={styles.cardHeader}>
//               {icons.userCheck}
//               <h3 style={styles.cardTitle}>Present Days</h3>
//             </div>
//             <p style={styles.cardSubtitle}>Total days present this semester</p>
//             <p style={styles.cardValue}>{presentDays} days</p>
//           </div>

//           <div style={{ ...styles.card, ...styles.absentCard }}>
//             <div style={styles.cardHeader}>
//               {icons.userX}
//               <h3 style={styles.cardTitle}>Absent Days</h3>
//             </div>
//             <p style={styles.cardSubtitle}>Total days absent this semester</p>
//             <p style={styles.cardValue}>{absentDays} days</p>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div
//           style={{
//             ...styles.mainGrid,
//             ...(styles.mediaQuery.lg ? styles.mainGridLg : {}),
//           }}
//         >
//           {/* Calendar Section */}
//           <div style={styles.sidebarCard}>
//             <div style={styles.cardSection}>
//               <div style={styles.flexBetween}>
//                 <h3 style={styles.sectionTitle}>Select Date</h3>
//                 <div style={styles.navButtons}>
//                   <button style={styles.navButton} onClick={() => navigateMonth(-1)}>
//                     {icons.chevronLeft}
//                   </button>
//                   <button style={styles.navButton} onClick={() => navigateMonth(1)}>
//                     {icons.chevronRight}
//                   </button>
//                 </div>
//               </div>

//               <h2 style={styles.monthTitle}>{monthFilter} 2025</h2>

//               <div style={styles.calendarGrid}>
//                 {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
//                   <div key={index} style={styles.calendarHeader}>
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               <div style={styles.calendarGrid}>
//                 {calendarDays.map((day, index) =>
//                   day ? (
//                     <button
//                       key={index}
//                       style={{
//                         ...styles.calendarDay,
//                         backgroundColor:
//                           day.status === "Present" ? "#4CAF50" : day.status === "Partial" ? "#FFC107" : "#334155",
//                         color: day.status === "Present" || day.status === "Absent" ? "#FFFFFF" : "#212121",
//                         border: day.date === dateFilter ? "2px solid #60a5fa" : "none",
//                       }}
//                       onClick={() => {
//                         setDateFilter(day.date)
//                         setViewMode("Daily")
//                       }}
//                     >
//                       {day.day}
//                     </button>
//                   ) : (
//                     <div key={index} style={{ width: "32px", height: "32px" }}></div>
//                   ),
//                 )}
//               </div>
//             </div>

//             <div style={styles.cardSectionNoBorder}>
//               <div style={styles.viewModeSection}>
//                 <h3 style={styles.legendTitle}>View Mode</h3>
//                 <div style={styles.viewModeButtons}>
//                   {["Daily", "Weekly", "Monthly"].map((mode) => (
//                     <button
//                       key={mode}
//                       style={{
//                         ...(viewMode === mode ? styles.viewModeButtonActive : styles.viewModeButtonInactive),
//                         ...styles.viewModeButton,
//                       }}
//                       onClick={() => setViewMode(mode)}
//                     >
//                       {mode}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <h3 style={styles.legendTitle}>Attendance Legend</h3>
//               <div>
//                 <div style={styles.legendItem}>
//                   <div style={{ ...styles.legendDot, backgroundColor: "#4CAF50" }}></div>
//                   <span style={styles.legendText}>Present</span>
//                 </div>
//                 <div style={styles.legendItem}>
//                   <div style={{ ...styles.legendDot, backgroundColor: "#FFC107" }}></div>
//                   <span style={styles.legendText}>Partial</span>
//                 </div>
//                 <div style={styles.legendItem}>
//                   <div style={{ ...styles.legendDot, backgroundColor: "#F44336" }}></div>
//                   <span style={styles.legendText}>Absent</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Attendance Display */}
//           <div style={styles.mainContent}>
//             <div style={styles.contentHeader}>
//               <h2 style={styles.contentTitle}>
//                 {viewMode === "Daily"
//                   ? formatDate(dateFilter)
//                   : viewMode === "Weekly"
//                     ? `Week of ${formatDate(filteredData[0]?.date)}`
//                     : `${monthFilter} 2025`}
//               </h2>
//             </div>

//             <div style={styles.contentBody}>
//               {viewMode === "Daily" && (
//                 <div style={{ overflowX: "auto" }}>
//                   <table style={styles.table}>
//                     <thead>
//                       <tr style={styles.tableHeader}>
//                         <th style={styles.tableHeaderCell}>Period</th>
//                         <th style={styles.tableHeaderCell}>Time</th>
//                         <th style={styles.tableHeaderCell}>Subject</th>
//                         <th style={styles.tableHeaderCell}>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {dailySchedule.map((period) => {
//                         const detail = filteredData.find((d) => d.period === period.period)
//                         const status = detail?.status || "Absent"
//                         const colors = getStatusColor(status)

//                         return (
//                           <tr key={period.period} style={styles.tableRow}>
//                             <td style={styles.tableCell}>{period.period}</td>
//                             <td style={styles.tableCellSmall}>{period.time}</td>
//                             <td style={{ ...styles.tableCell, fontWeight: 500 }}>{period.subject}</td>
//                             <td style={styles.tableCell}>
//                               <span
//                                 style={{
//                                   ...styles.statusBadge,
//                                   backgroundColor: colors.bg,
//                                   color: colors.text,
//                                 }}
//                               >
//                                 {status}
//                               </span>
//                             </td>
//                           </tr>
//                         )
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {viewMode === "Weekly" && (
//                 <div style={{ overflowX: "auto" }}>
//                   <table style={styles.weeklyTable}>
//                     <thead>
//                       <tr style={styles.weeklyTableHeader}>
//                         <th style={styles.weeklyTableHeaderCell}>Period</th>
//                         <th style={styles.weeklyTableHeaderCell}>Time</th>
//                         {filteredData.map((day, index) => (
//                           <th key={index} style={styles.weeklyTableHeaderCell}>
//                             <div style={styles.weeklyDayHeader}>
//                               <div style={styles.weeklyDayName}>{day.shortDay}</div>
//                               <div style={styles.weeklyDayNumber}>{day.dayNum}</div>
//                             </div>
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {dailySchedule.map((period) => (
//                         <tr key={period.period} style={styles.tableRow}>
//                           <td style={styles.weeklyTableCell}>{period.period}</td>
//                           <td style={{ ...styles.weeklyTableCell, fontSize: "12px", color: "#cbd5e1" }}>
//                             {period.time}
//                           </td>
//                           {filteredData.map((day, dayIndex) => {
//                             const periodDetail = day.periods?.find((p) => p.period === period.period)
//                             const status = periodDetail?.status || "Absent"
//                             const colors = getStatusColor(status)

//                             return (
//                               <td key={dayIndex} style={styles.weeklyTableCell}>
//                                 <div
//                                   style={{
//                                     ...styles.weeklySubjectCell,
//                                     backgroundColor: colors.lightBg,
//                                     color: colors.bg,
//                                   }}
//                                 >
//                                   <div style={styles.weeklySubjectName}>{period.subject}</div>
//                                   <div style={styles.weeklySubjectStatus}>{status}</div>
//                                 </div>
//                               </td>
//                             )
//                           })}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {viewMode === "Monthly" && (
//                 <div style={{ width: "100%", overflowX: "auto" }}>
//                   <table
//                     style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#0a0e25", color: "white" }}
//                   >
//                     <thead>
//                       <tr>
//                         <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
//                           Mon
//                         </th>
//                         <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
//                           Tue
//                         </th>
//                         <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
//                           Wed
//                         </th>
//                         <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
//                           Thu
//                         </th>
//                         <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
//                           Fri
//                         </th>
//                         <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
//                           Sat
//                         </th>
//                         <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
//                           Sun
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {(() => {
//                         // Generate calendar grid
//                         const monthIndex = new Date(`2025-${monthFilter}-01`).getMonth()
//                         const year = 2025
//                         const firstDay = new Date(year, monthIndex, 1).getDay()
//                         const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

//                         // Adjust for Monday as first day (0 = Sunday, 1 = Monday, etc.)
//                         const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1

//                         const rows = []
//                         let days = []

//                         // Add empty cells for days before the 1st
//                         for (let i = 0; i < firstDayAdjusted; i++) {
//                           days.push(<td key={`empty-${i}`}></td>)
//                         }

//                         // Add days of the month
//                         for (let day = 1; day <= daysInMonth; day++) {
//                           const dateStr = `${year}-${(monthIndex + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
//                           const dayAttendance = dailyAttendance.find((d) => d.date === dateStr)
//                           const status = dayAttendance ? dayAttendance.status : "Absent"

//                           // Determine background color based on status
//                           let bgColor
//                           if (status === "Present")
//                             bgColor = "#3b82f6" // Blue
//                           else if (status === "Partial")
//                             bgColor = "#fbbf24" // Yellow
//                           else if (status === "Absent") bgColor = "#ffffff" // White

//                           // Check if it's a Sunday (for holiday styling)
//                           const isHoliday = new Date(dateStr).getDay() === 0
//                           if (isHoliday) bgColor = "#e2e8f0" // Light gray for holidays

//                           days.push(
//                             <td key={day} style={{ padding: "8px", borderBottom: "1px solid #e2e8f0" }}>
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   flexDirection: "column",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                 }}
//                               >
//                                 <div style={{ marginBottom: "4px", fontSize: "14px" }}>{day}</div>
//                                 <button
//                                   onClick={() => {
//                                     setDateFilter(dateStr)
//                                     setViewMode("Daily")
//                                   }}
//                                   style={{
//                                     width: "40px",
//                                     height: "40px",
//                                     backgroundColor: bgColor,
//                                     border: dateStr === dateFilter ? "2px solid #3b82f6" : "none",
//                                     borderRadius: "4px",
//                                     cursor: "pointer",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     color: status === "Absent" && !isHoliday ? "#ef4444" : "#ffffff",
//                                   }}
//                                 >
//                                   {isHoliday && <span style={{ fontSize: "12px", color: "#64748b" }}>PH</span>}
//                                 </button>
//                               </div>
//                             </td>,
//                           )

//                           // Start a new row after every 7 days
//                           if ((firstDayAdjusted + day) % 7 === 0 || day === daysInMonth) {
//                             // If this is the last day and doesn't complete a row, add empty cells
//                             if (day === daysInMonth && (firstDayAdjusted + day) % 7 !== 0) {
//                               const remainingCells = 7 - ((firstDayAdjusted + day) % 7)
//                               for (let i = 0; i < remainingCells; i++) {
//                                 days.push(<td key={`empty-end-${i}`}></td>)
//                               }
//                             }

//                             rows.push(<tr key={rows.length}>{days}</tr>)
//                             days = []
//                           }
//                         }

//                         return rows
//                       })()}
//                     </tbody>
//                   </table>

//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       marginTop: "20px",
//                       gap: "16px",
//                       padding: "8px",
//                       backgroundColor: "#1e293b",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div
//                         style={{ width: "16px", height: "16px", backgroundColor: "#3b82f6", marginRight: "8px" }}
//                       ></div>
//                       <span style={{ fontSize: "14px" }}>Present</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div
//                         style={{ width: "16px", height: "16px", backgroundColor: "#fbbf24", marginRight: "8px" }}
//                       ></div>
//                       <span style={{ fontSize: "14px" }}>Partial</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div
//                         style={{
//                           width: "16px",
//                           height: "16px",
//                           backgroundColor: "#ffffff",
//                           marginRight: "8px",
//                           border: "1px solid #64748b",
//                         }}
//                       ></div>
//                       <span style={{ fontSize: "14px" }}>Absent</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div
//                         style={{ width: "16px", height: "16px", backgroundColor: "#e2e8f0", marginRight: "8px" }}
//                       ></div>
//                       <span style={{ fontSize: "14px" }}>Holiday</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Subject-wise Attendance */}
//         <div style={{ ...styles.mainContent, marginTop: "32px" }}>
//           <div style={styles.contentHeader}>
//             <h2 style={styles.contentTitle}>Subject-wise Attendance</h2>
//           </div>

//           <div style={styles.contentBody}>
//             <div
//               style={{
//                 ...styles.subjectGrid,
//                 ...(styles.mediaQuery.md ? styles.subjectGridMd : {}),
//                 ...(styles.mediaQuery.lg ? styles.subjectGridLg : {}),
//               }}
//             >
//               {periodWiseAttendance.map((subject) => {
//                 const percentage = Number.parseInt(subject.percentage)
//                 let statusColor = "#F44336" // Red for low attendance

//                 if (percentage >= 75) {
//                   statusColor = "#4CAF50" // Green for good attendance
//                 } else if (percentage >= 50) {
//                   statusColor = "#FFC107" // Yellow for moderate attendance
//                 }

//                 return (
//                   <div key={subject.subject} style={styles.subjectCard}>
//                     <div style={styles.subjectHeader}>
//                       <h3 style={styles.subjectTitle}>{subject.subject}</h3>
//                       <span style={{ ...styles.subjectPercentage, color: statusColor }}>{subject.percentage}%</span>
//                     </div>

//                     <div style={styles.progressBar}>
//                       <div
//                         style={{
//                           ...styles.progressFill,
//                           width: `${subject.percentage}%`,
//                           backgroundColor: statusColor,
//                         }}
//                       ></div>
//                     </div>

//                     <div style={styles.subjectStats}>
//                       <div>
//                         <p style={styles.statLabel}>Present</p>
//                         <p style={styles.statValue}>{subject.presentDays}</p>
//                       </div>
//                       <div>
//                         <p style={styles.statLabel}>Partial</p>
//                         <p style={styles.statValue}>{subject.partialDays}</p>
//                       </div>
//                       <div>
//                         <p style={styles.statLabel}>Absent</p>
//                         <p style={styles.statValue}>{subject.absentDays}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StudentDetails



// with period changed crt code


"use client"


import { useEffect, useState, useMemo } from "react"
import { useParams ,useNavigate} from "react-router-dom"

// Period Timings (consistent across all days)
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


// Weekly Schedule (without timings, as requested)
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

// const weeklySchedule = {
//   Monday: [
//     { period: 1, subject: "FST" },
//     { period: 2, subject: "P&S" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "CS" },
//     { period: 4, subject: "MPMC" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "EM1LAB" },
//     { period: 6, subject: "EM1LAB" },
//     { period: 7, subject: "EM1LAB" },
//   ],
//   Tuesday: [
//     { period: 1, subject: "CS" },
//     { period: 2, subject: "MPMC" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "M&I" },
//     { period: 4, subject: "FSD" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "P&S" },
//     { period: 6, subject: "PT" },
//     { period: 7, subject: "M&I" },
//   ],
//   Wednesday: [
//     { period: 1, subject: "P&S" },
//     { period: 2, subject: "PW" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "PW" },
//     { period: 4, subject: "EM1" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "LIB" },
//     { period: 6, subject: "FST" },
//     { period: 7, subject: "FST" },
//   ],
//   Thursday: [
//     { period: 1, subject: "EM1" },
//     { period: 2, subject: "PT" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "MPMCLAB" },
//     { period: 4, subject: "MPMCLAB" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "EM" },
//     { period: 6, subject: "CS" },
//     { period: 7, subject: "M&I" },
//   ],
//   Friday: [
//     { period: 1, subject: "M&I" },
//     { period: 2, subject: "P&S" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "CS" },
//     { period: 4, subject: "EM1" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "EM1LAB" },
//     { period: 6, subject: "EM1LAB" },
//     { period: 7, subject: "EM1LAB" },
//   ],
//   Saturday: [
//     { period: 1, subject: "FST" },
//     { period: 2, subject: "CS" },
//     { period: "Tea Break", subject: "Break" },
//     { period: 3, subject: "UHV" },
//     { period: 4, subject: "P&S" },
//     { period: "Lunch Break", subject: "Break" },
//     { period: 5, subject: "COE" },
//     { period: 6, subject: "COE" },
//     { period: 7, subject: "ACTIVITIES" },
//   ],
// };

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [student, setStudent] = useState(null);
  const [dateFilter, setDateFilter] = useState("2025-05-01"); // Default to May 1, 2025
  const [dayFilter, setDayFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("May");
  const [viewMode, setViewMode] = useState("Daily"); // Daily, Weekly, Monthly
 
  // Helper functions
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
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

  // Fetch and process attendance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const fetchedData = await response.json();
        const studentData = fetchedData.find((student) => student.id === id);

        if (!studentData) {
          setStudent(null);
          setAttendanceDetails([]);
          return;
        }

        setStudent(studentData);

        if (studentData.entry_times && studentData.exit_times) {
          const detailsMap = new Map();
          const entryTimes = studentData.entry_times;
          const exitTimes = studentData.exit_times;

          for (let i = 0; i < entryTimes.length; i++) {
            const entry = new Date(entryTimes[i].replace("Z", "+05:30"));
            const exit = i < exitTimes.length ? new Date(exitTimes[i].replace("Z", "+05:30")) : null;
            if (!exit) continue;

            const entryDate = entry.toISOString().split("T")[0];
            const dayOfWeek = getDayOfWeek(entryDate);
            const dailySchedule = weeklySchedule[dayOfWeek] || []; // Get schedule for the day

            const entryMinutes = dateToMinutes(entry);
            const exitMinutes = dateToMinutes(exit);

            dailySchedule.forEach((period) => {
              if (typeof period.period === "string") return; // Skip breaks
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

          const details = Array.from(detailsMap.values());
          setAttendanceDetails(details);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAttendanceDetails([]);
      }
    };

    fetchData();
  }, [id]);

  // Calculate daily attendance status
  const dailyAttendance = useMemo(() => {
    const groupedByDate = {};
    attendanceDetails.forEach((detail) => {
      if (!groupedByDate[detail.date]) groupedByDate[detail.date] = [];
      groupedByDate[detail.date].push(detail);
    });

    return Object.keys(groupedByDate).map((date) => {
      const periods = groupedByDate[date];
      const presentCount = periods.filter((p) => p.status === "Present").length;
      const partialCount = periods.filter((p) => p.status === "Partial").length;
      let status;
      if (presentCount > 4) status = "Present";
      else if (presentCount + partialCount < 3) status = "Absent";
      else status = "Partial";
      return { date, periods, status };
    });
  }, [attendanceDetails]);

  // Calculate present and absent days
  const { presentDays, absentDays } = useMemo(() => {
    let present = 0,
      absent = 0;
    dailyAttendance.forEach((day) => {
      if (day.status === "Present" || day.status === "Partial") present++;
      else absent++;
    });
    return { presentDays: present, absentDays: absent };
  }, [dailyAttendance]);

  // Calculate overall attendance percentage
  const overallAttendance = useMemo(() => {
    const totalDays = presentDays + absentDays;
    return totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
  }, [presentDays, absentDays]);

  // Calculate subject-wise attendance percentage (updated for weekly schedule)
  const subjectWiseAttendance = useMemo(() => {
    const subjectStats = {};
    
    // Initialize stats for each subject
    Object.values(weeklySchedule).flat().forEach((period) => {
      if (typeof period.period === "string") return; // Skip breaks
      const subject = period.subject;
      if (!subjectStats[subject]) {
        subjectStats[subject] = {
          subject,
          totalDays: 0,
          presentDays: 0,
          partialDays: 0,
          absentDays: 0,
        };
      }
    });

    // Calculate stats based on attendance details
    attendanceDetails.forEach((detail) => {
      const subject = detail.subject;
      if (!subjectStats[subject]) {
        subjectStats[subject] = {
          subject,
          totalDays: 0,
          presentDays: 0,
          partialDays: 0,
          absentDays: 0,
        };
      }
      subjectStats[subject].totalDays += 1;
      if (detail.status === "Present") subjectStats[subject].presentDays += 1;
      else if (detail.status === "Partial") subjectStats[subject].partialDays += 1;
      else subjectStats[subject].absentDays += 1;
    });

    // Calculate percentages
    return Object.values(subjectStats).map((stat) => {
      const percentage = stat.totalDays ? ((stat.presentDays / stat.totalDays) * 100).toFixed(0) : 0;
      return {
        ...stat,
        percentage,
      };
    });
  }, [attendanceDetails]);

  // Generate calendar days for the selected month
  const calendarDays = useMemo(() => {
    const monthIndex = new Date(`2025-${monthFilter}-01`).getMonth();
    const year = 2025;
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const days = [];

    // Add empty slots for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${(monthIndex + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      const dayAttendance = dailyAttendance.find((d) => d.date === dateStr);
      days.push({ day: i, date: dateStr, status: dayAttendance ? dayAttendance.status : "Absent" });
    }

    return days;
  }, [monthFilter, dailyAttendance]);

  // Filter data based on view mode
  const filteredData = useMemo(() => {
    if (viewMode === "Daily") {
      const dayOfWeek = getDayOfWeek(dateFilter);
      const dailySchedule = weeklySchedule[dayOfWeek] || [];
      const attendanceForDay = dailyAttendance.find((d) => d.date === dateFilter)?.periods || [];
      
      return dailySchedule.map((period) => {
        if (typeof period.period === "string") return period; // Keep breaks as is
        const detail = attendanceForDay.find((d) => d.period === period.period);
        return {
          ...period,
          time: periodTimings.find((p) => p.period === period.period)?.time,
          status: detail?.status || "Absent",
        };
      });
    } else if (viewMode === "Weekly") {
      const selectedDate = new Date(dateFilter);
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Start from Sunday
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];
        const dayOfWeek = getDayOfWeek(dateStr);
        const dailySchedule = weeklySchedule[dayOfWeek] || [];
        const dayAttendance = dailyAttendance.find((d) => d.date === dateStr);
        const periods = dailySchedule.map((period) => {
          if (typeof period.period === "string") return period;
          const detail = dayAttendance?.periods.find((p) => p.period === period.period);
          return {
            ...period,
            time: periodTimings.find((p) => p.period === period.period)?.time,
            status: detail?.status || "Absent",
          };
        });
        weekDates.push({
          date: dateStr,
          day: dayOfWeek,
          shortDay: date.toLocaleDateString("en-US", { weekday: "short" }),
          dayNum: date.getDate(),
          periods,
        });
      }
      return weekDates;
    } else {
      return calendarDays.filter((day) => day !== null); // For monthly view
    }
  }, [viewMode, dateFilter, dailyAttendance, calendarDays]);

  // Unique filter options
  const uniqueDates = useMemo(() => [...new Set(attendanceDetails.map((d) => d.date))].sort(), [attendanceDetails]);
  const uniqueDays = useMemo(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const presentDays = new Set(attendanceDetails.map((d) => new Date(d.date).getDay()));
    return days.filter((_, i) => presentDays.has(i));
  }, [attendanceDetails]);
  const uniqueMonths = useMemo(() => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const presentMonths = new Set(attendanceDetails.map((d) => new Date(d.date).getMonth()));
    return months.filter((_, i) => presentMonths.has(i));
  }, [attendanceDetails]);

  // Helper for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return { bg: "#4CAF50", text: "#FFFFFF", lightBg: "rgba(76, 175, 80, 0.1)" };
      case "Partial":
        return { bg: "#FFC107", text: "#212121", lightBg: "rgba(255, 193, 7, 0.1)" };
      case "Absent":
        return { bg: "#F44336", text: "#FFFFFF", lightBg: "rgba(244, 67, 54, 0.1)" };
      default:
        return { bg: "#F44336", text: "#FFFFFF", lightBg: "rgba(244, 67, 54, 0.1)" };
    }
  };

  // Navigate between months in the calendar
  const navigateMonth = (direction) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const currentIndex = months.indexOf(monthFilter);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = 11;
    if (newIndex > 11) newIndex = 0;

    setMonthFilter(months[newIndex]);
    const newMonthNum = newIndex + 1;
    setDateFilter(`2025-${newMonthNum.toString().padStart(2, "0")}-01`);
  };

  // CSS Styles (unchanged)
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#ffffff",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    backLink: {
      display: "flex",
      alignItems: "center",
      padding: "16px",
      color: "#94a3b8",
      textDecoration: "none",
      cursor: "pointer",
    },
    backIcon: {
      marginRight: "8px",
    },
    mainContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 16px",
    },
    profileSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "32px",
    },
    profileSectionMd: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "24px",
      marginBottom: "32px",
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "linear-gradient(to right, #3b82f6, #4f46e5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#ffffff",
      flexShrink: 0,
    },
    profileInfo: {
      textAlign: "center",
    },
    profileInfoMd: {
      textAlign: "left",
    },
    studentName: {
      fontSize: "30px",
      fontWeight: "bold",
      margin: "0 0 4px 0",
    },
    studentDetails: {
      fontSize: "16px",
      color: "#94a3b8",
      margin: 0,
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "24px",
      marginBottom: "32px",
    },
    cardsGridMd: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    card: {
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    attendanceCard: {
      background: "linear-gradient(to right, #2563eb, #3b82f6)",
    },
    presentCard: {
      background: "linear-gradient(to right, #16a34a, #22c55e)",
    },
    absentCard: {
      background: "linear-gradient(to right, #dc2626, #ef4444)",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
    },
    cardIcon: {
      marginRight: "8px",
      width: "24px",
      height: "24px",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "600",
      margin: 0,
    },
    cardSubtitle: {
      fontSize: "14px",
      opacity: 0.8,
      marginBottom: "8px",
    },
    cardValue: {
      fontSize: "36px",
      fontWeight: "bold",
      margin: 0,
    },
    mainGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "24px",
      marginBottom: "32px",
    },
    mainGridLg: {
      gridTemplateColumns: "300px 1fr",
    },
    sidebarCard: {
      backgroundColor: "#1e293b",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    cardSection: {
      padding: "16px",
      borderBottom: "1px solid #334155",
    },
    cardSectionNoBorder: {
      padding: "16px",
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      margin: 0,
    },
    monthTitle: {
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "16px",
    },
    navButtons: {
      display: "flex",
      gap: "8px",
    },
    navButton: {
      padding: "4px",
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    calendarGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "4px",
      textAlign: "center",
      marginBottom: "8px",
    },
    calendarHeader: {
      fontSize: "12px",
      fontWeight: "500",
      color: "#94a3b8",
    },
    calendarDay: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      border: "none",
      margin: "0 auto",
    },
    viewModeSection: {
      marginBottom: "24px",
    },
    viewModeButtons: {
      display: "flex",
      gap: "8px",
      marginBottom: "24px",
    },
    viewModeButton: {
      padding: "8px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    viewModeButtonActive: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
    },
    viewModeButtonInactive: {
      backgroundColor: "#334155",
      color: "#cbd5e1",
    },
    legendTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "16px",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
    },
    legendDot: {
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      marginRight: "8px",
    },
    legendText: {
      fontSize: "14px",
    },
    mainContent: {
      backgroundColor: "#1e293b",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    contentHeader: {
      padding: "16px",
      borderBottom: "1px solid #334155",
    },
    contentTitle: {
      fontSize: "20px",
      fontWeight: "600",
      margin: 0,
    },
    contentBody: {
      padding: "16px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#334155",
      textAlign: "left",
    },
    tableHeaderCell: {
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#94a3b8",
    },
    tableRow: {
      borderBottom: "1px solid #334155",
    },
    tableCell: {
      padding: "12px 16px",
    },
    tableCellSmall: {
      padding: "12px 16px",
      fontSize: "14px",
      color: "#cbd5e1",
    },
    statusBadge: {
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: "500",
    },
    weeklyTable: {
      width: "100%",
      borderCollapse: "collapse",
      overflowX: "auto",
    },
    weeklyTableHeader: {
      backgroundColor: "#334155",
    },
    weeklyTableHeaderCell: {
      padding: "8px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#94a3b8",
      textAlign: "center",
    },
    weeklyTableCell: {
      padding: "4px",
      textAlign: "center",
    },
    weeklyDayHeader: {
      textAlign: "center",
    },
    weeklyDayName: {
      fontSize: "14px",
    },
    weeklyDayNumber: {
      fontSize: "12px",
    },
    weeklySubjectCell: {
      padding: "8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
    },
    weeklySubjectName: {
      marginBottom: "4px",
    },
    weeklySubjectStatus: {
      fontSize: "10px",
    },
    monthlyGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "16px",
    },
    monthlyGridMd: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    monthlyDay: {
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #334155",
    },
    monthlyDayHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    monthlyDayTitle: {
      fontWeight: "500",
      margin: 0,
    },
    monthlyDayStatus: {
      padding: "4px 8px",
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: "500",
    },
    monthlyDayLink: {
      marginTop: "4px",
      fontSize: "12px",
      color: "#60a5fa",
      textDecoration: "none",
      cursor: "pointer",
      textAlign: "left",
      background: "none",
      border: "none",
      padding: 0,
      display: "block",
      width: "100%",
    },
    subjectGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "16px",
      marginTop: "32px",
    },
    subjectGridMd: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    subjectGridLg: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    subjectCard: {
      backgroundColor: "#334155",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    subjectHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    subjectTitle: {
      fontSize: "18px",
      fontWeight: "600",
      margin: 0,
    },
    subjectPercentage: {
      fontSize: "20px",
      fontWeight: "700",
    },
    progressBar: {
      width: "100%",
      height: "10px",
      backgroundColor: "#475569",
      borderRadius: "9999px",
      marginBottom: "16px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: "9999px",
    },
    subjectStats: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      textAlign: "center",
      fontSize: "14px",
    },
    statLabel: {
      color: "#94a3b8",
      marginBottom: "4px",
    },
    statValue: {
      fontWeight: "500",
    },
    mediaQuery: {
      md: window.matchMedia("(min-width: 768px)").matches,
      lg: window.matchMedia("(min-width: 1024px)").matches,
    },
  };

  // Icons as SVG (unchanged)
  const icons = {
    chevronLeft: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles.backIcon}
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    ),
    chevronRight: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    ),
    user: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles.cardIcon}
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    userCheck: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles.cardIcon}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
    userX: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles.cardIcon}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="17" x2="22" y1="8" y2="13" />
        <line x1="22" x2="17" y1="8" y2="13" />
      </svg>
    ),
  };

  return (
    <div style={styles.container}>
      {/* Back to Dashboard Link */}
      <div onClick={()=>navigate('/')}  style={styles.backLink}>
        {icons.chevronLeft}
        Back to Dashboard
      </div>

      {/* Student Profile Header */}
      <div style={styles.mainContainer}>
        <div style={styles.mediaQuery.md ? styles.profileSectionMd : styles.profileSection}>
          <div style={styles.avatar}>{student?.name?.[0] || "S"}</div>
          <div style={styles.mediaQuery.md ? styles.profileInfoMd : styles.profileInfo}>
            <h1 style={styles.studentName}>{student?.name || "Student Name"}</h1>
            <p style={styles.studentDetails}>Roll No: {student?.rollno || "IT001"} • 5th Semester</p>
          </div>
        </div>

        {/* Attendance Summary Cards */}
        <div
          style={{
            ...styles.cardsGrid,
            ...(styles.mediaQuery.md ? styles.cardsGridMd : {}),
          }}
        >
          <div style={{ ...styles.card, ...styles.attendanceCard }}>
            <div style={styles.cardHeader}>
              {icons.user}
              <h3 style={styles.cardTitle}>Attendance Rate</h3>
            </div>
            <p style={styles.cardSubtitle}>Overall semester attendance</p>
            <p style={styles.cardValue}>{overallAttendance}%</p>
          </div>

          <div style={{ ...styles.card, ...styles.presentCard }}>
            <div style={styles.cardHeader}>
              {icons.userCheck}
              <h3 style={styles.cardTitle}>Present Days</h3>
            </div>
            <p style={styles.cardSubtitle}>Total days present this semester</p>
            <p style={styles.cardValue}>{presentDays} days</p>
          </div>

          <div style={{ ...styles.card, ...styles.absentCard }}>
            <div style={styles.cardHeader}>
              {icons.userX}
              <h3 style={styles.cardTitle}>Absent Days</h3>
            </div>
            <p style={styles.cardSubtitle}>Total days absent this semester</p>
            <p style={styles.cardValue}>{absentDays} days</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            ...styles.mainGrid,
            ...(styles.mediaQuery.lg ? styles.mainGridLg : {}),
          }}
        >
          {/* Calendar Section */}
          <div style={styles.sidebarCard}>
            <div style={styles.cardSection}>
              <div style={styles.flexBetween}>
                <h3 style={styles.sectionTitle}>Select Date</h3>
                <div style={styles.navButtons}>
                  <button style={styles.navButton} onClick={() => navigateMonth(-1)}>
                    {icons.chevronLeft}
                  </button>
                  <button style={styles.navButton} onClick={() => navigateMonth(1)}>
                    {icons.chevronRight}
                  </button>
                </div>
              </div>

              <h2 style={styles.monthTitle}>{monthFilter} 2025</h2>

              <div style={styles.calendarGrid}>
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
                  <div key={index} style={styles.calendarHeader}>
                    {day}
                  </div>
                ))}
              </div>

              <div style={styles.calendarGrid}>
                {calendarDays.map((day, index) =>
                  day ? (
                    <button
                      key={index}
                      style={{
                        ...styles.calendarDay,
                        backgroundColor:
                          day.status === "Present" ? "#4CAF50" : day.status === "Partial" ? "#FFC107" : "#334155",
                        color: day.status === "Present" || day.status === "Absent" ? "#FFFFFF" : "#212121",
                        border: day.date === dateFilter ? "2px solid #60a5fa" : "none",
                      }}
                      onClick={() => {
                        setDateFilter(day.date);
                        setViewMode("Daily");
                      }}
                    >
                      {day.day}
                    </button>
                  ) : (
                    <div key={index} style={{ width: "32px", height: "32px" }}></div>
                  ),
                )}
              </div>
            </div>

            <div style={styles.cardSectionNoBorder}>
              <div style={styles.viewModeSection}>
                <h3 style={styles.legendTitle}>View Mode</h3>
                <div style={styles.viewModeButtons}>
                  {["Daily", "Weekly", "Monthly"].map((mode) => (
                    <button
                      key={mode}
                      style={{
                        ...(viewMode === mode ? styles.viewModeButtonActive : styles.viewModeButtonInactive),
                        ...styles.viewModeButton,
                      }}
                      onClick={() => setViewMode(mode)}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <h3 style={styles.legendTitle}>Attendance Legend</h3>
              <div>
                <div style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, backgroundColor: "#4CAF50" }}></div>
                  <span style={styles.legendText}>Present</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, backgroundColor: "#FFC107" }}></div>
                  <span style={styles.legendText}>Partial</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, backgroundColor: "#F44336" }}></div>
                  <span style={styles.legendText}>Absent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Attendance Display */}
          <div style={styles.mainContent}>
            <div style={styles.contentHeader}>
              <h2 style={styles.contentTitle}>
                {viewMode === "Daily"
                  ? formatDate(dateFilter)
                  : viewMode === "Weekly"
                    ? `Week of ${formatDate(filteredData[0]?.date)}`
                    : `${monthFilter} 2025`}
              </h2>
            </div>

            <div style={styles.contentBody}>
              {viewMode === "Daily" && (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeader}>
                        <th style={styles.tableHeaderCell}>Period</th>
                        <th style={styles.tableHeaderCell}>Time</th>
                        <th style={styles.tableHeaderCell}>Subject</th>
                        <th style={styles.tableHeaderCell}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((period) => {
                        if (typeof period.period === "string") return null; // Skip breaks
                        const status = period.status || "Absent";
                        const colors = getStatusColor(status);

                        return (
                          <tr key={period.period} style={styles.tableRow}>
                            <td style={styles.tableCell}>{period.period}</td>
                            <td style={styles.tableCellSmall}>{period.time}</td>
                            <td style={{ ...styles.tableCell, fontWeight: 500 }}>{period.subject}</td>
                            <td style={styles.tableCell}>
                              <span
                                style={{
                                  ...styles.statusBadge,
                                  backgroundColor: colors.bg,
                                  color: colors.text,
                                }}
                              >
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {viewMode === "Weekly" && (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.weeklyTable}>
                    <thead>
                      <tr style={styles.weeklyTableHeader}>
                        <th style={styles.weeklyTableHeaderCell}>Period</th>
                        <th style={styles.weeklyTableHeaderCell}>Time</th>
                        {filteredData.map((day, index) => (
                          <th key={index} style={styles.weeklyTableHeaderCell}>
                            <div style={styles.weeklyDayHeader}>
                              <div style={styles.weeklyDayName}>{day.shortDay}</div>
                              <div style={styles.weeklyDayNumber}>{day.dayNum}</div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {periodTimings.map((period) => {
                        if (typeof period.period === "string") return null; // Skip breaks
                        return (
                          <tr key={period.period} style={styles.tableRow}>
                            <td style={styles.weeklyTableCell}>{period.period}</td>
                            <td style={{ ...styles.weeklyTableCell, fontSize: "12px", color: "#cbd5e1" }}>
                              {period.time}
                            </td>
                            {filteredData.map((day, dayIndex) => {
                              const periodDetail = day.periods.find((p) => p.period === period.period);
                              const subject = periodDetail?.subject || "-";
                              const status = periodDetail?.status || "Absent";
                              const colors = getStatusColor(status);

                              return (
                                <td key={dayIndex} style={styles.weeklyTableCell}>
                                  <div
                                    style={{
                                      ...styles.weeklySubjectCell,
                                      backgroundColor: colors.lightBg,
                                      color: colors.bg,
                                    }}
                                  >
                                    <div style={styles.weeklySubjectName}>{subject}</div>
                                    <div style={styles.weeklySubjectStatus}>{status}</div>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {viewMode === "Monthly" && (
                <div style={{ width: "100%", overflowX: "auto" }}>
                  <table
                    style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#0a0e25", color: "white" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
                          Mon
                        </th>
                        <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
                          Tue
                        </th>
                        <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
                          Wed
                        </th>
                        <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
                          Thu
                        </th>
                        <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
                          Fri
                        </th>
                        <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
                          Sat
                        </th>
                        <th style={{ padding: "12px 8px", textAlign: "center", fontWeight: "500", color: "#64748b" }}>
                          Sun
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const monthIndex = new Date(`2025-${monthFilter}-01`).getMonth();
                        const year = 2025;
                        const firstDay = new Date(year, monthIndex, 1).getDay();
                        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

                        const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;

                        const rows = [];
                        let days = [];

                        for (let i = 0; i < firstDayAdjusted; i++) {
                          days.push(<td key={`empty-${i}`}></td>);
                        }

                        for (let day = 1; day <= daysInMonth; day++) {
                          const dateStr = `${year}-${(monthIndex + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                          const dayAttendance = dailyAttendance.find((d) => d.date === dateStr);
                          const status = dayAttendance ? dayAttendance.status : "Absent";

                          let bgColor;
                          if (status === "Present") bgColor = "#3b82f6";
                          else if (status === "Partial") bgColor = "#fbbf24";
                          else if (status === "Absent") bgColor = "#ffffff";

                          const isHoliday = new Date(dateStr).getDay() === 0;
                          if (isHoliday) bgColor = "#e2e8f0";

                          days.push(
                            <td key={day} style={{ padding: "8px", borderBottom: "1px solid #e2e8f0" }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <div style={{ marginBottom: "4px", fontSize: "14px" }}>{day}</div>
                                <button
                                  onClick={() => {
                                    setDateFilter(dateStr);
                                    setViewMode("Daily");
                                  }}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: bgColor,
                                    border: dateStr === dateFilter ? "2px solid #3b82f6" : "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: status === "Absent" && !isHoliday ? "#ef4444" : "#ffffff",
                                  }}
                                >
                                  {isHoliday && <span style={{ fontSize: "12px", color: "#64748b" }}>PH</span>}
                                </button>
                              </div>
                            </td>,
                          );

                          if ((firstDayAdjusted + day) % 7 === 0 || day === daysInMonth) {
                            if (day === daysInMonth && (firstDayAdjusted + day) % 7 !== 0) {
                              const remainingCells = 7 - ((firstDayAdjusted + day) % 7);
                              for (let i = 0; i < remainingCells; i++) {
                                days.push(<td key={`empty-end-${i}`}></td>);
                              }
                            }
                            rows.push(<tr key={rows.length}>{days}</tr>);
                            days = [];
                          }
                        }
                        return rows;
                      })()}
                    </tbody>
                  </table>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                      gap: "16px",
                      padding: "8px",
                      backgroundColor: "#1e293b",
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{ width: "16px", height: "16px", backgroundColor: "#3b82f6", marginRight: "8px" }}
                      ></div>
                      <span style={{ fontSize: "14px" }}>Present</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{ width: "16px", height: "16px", backgroundColor: "#fbbf24", marginRight: "8px" }}
                      ></div>
                      <span style={{ fontSize: "14px" }}>Partial</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "#ffffff",
                          marginRight: "8px",
                          border: "1px solid #64748b",
                        }}
                      ></div>
                      <span style={{ fontSize: "14px" }}>Absent</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{ width: "16px", height: "16px", backgroundColor: "#e2e8f0", marginRight: "8px" }}
                      ></div>
                      <span style={{ fontSize: "14px" }}>Holiday</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subject-wise Attendance */}
        <div style={{ ...styles.mainContent, marginTop: "32px" }}>
          <div style={styles.contentHeader}>
            <h2 style={styles.contentTitle}>Subject-wise Attendance</h2>
          </div>

          <div style={styles.contentBody}>
            <div
              style={{
                ...styles.subjectGrid,
                ...(styles.mediaQuery.md ? styles.subjectGridMd : {}),
                ...(styles.mediaQuery.lg ? styles.subjectGridLg : {}),
              }}
            >
              {subjectWiseAttendance.map((subject) => {
                const percentage = Number.parseInt(subject.percentage);
                let statusColor = "#F44336"; // Red for low attendance

                if (percentage >= 75) {
                  statusColor = "#4CAF50"; // Green for good attendance
                } else if (percentage >= 50) {
                  statusColor = "#FFC107"; // Yellow for moderate attendance
                }

                return (
                  <div key={subject.subject} style={styles.subjectCard}>
                    <div style={styles.subjectHeader}>
                      <h3 style={styles.subjectTitle}>{subject.subject}</h3>
                      <span style={{ ...styles.subjectPercentage, color: statusColor }}>{subject.percentage}%</span>
                    </div>

                    <div style={styles.progressBar}>
                      <div
                        style={{
                          ...styles.progressFill,
                          width: `${subject.percentage}%`,
                          backgroundColor: statusColor,
                        }}
                      ></div>
                    </div>

                    <div style={styles.subjectStats}>
                      <div>
                        <p style={styles.statLabel}>Present</p>
                        <p style={styles.statValue}>{subject.presentDays}</p>
                      </div>
                      <div>
                        <p style={styles.statLabel}>Partial</p>
                        <p style={styles.statValue}>{subject.partialDays}</p>
                      </div>
                      <div>
                        <p style={styles.statLabel}>Absent</p>
                        <p style={styles.statValue}>{subject.absentDays}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
