// "use client"

// import { useState } from "react"
// import { Link } from "react-router-dom"

// const Signup = () => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle signup logic here
//     console.log({ name, email, password })
//   }

//   // Styles
//   const styles = {
//     container: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       minHeight: "100vh",
//       backgroundColor: "#0a0e17",
//       fontFamily: "Arial, sans-serif",
//     },
//     formContainer: {
//       width: "100%",
//       maxWidth: "310px",
//       padding: "42px",
//       backgroundColor: "#111827",
//       borderRadius: "8px",
//       color: "white",
//        height:"470px"
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: "24px",
//     },
//     title: {
//       fontSize: "24px",
//       fontWeight: "bold",
//       marginBottom: "8px",
//     },
//     subtitle: {
//       fontSize: "14px",
//       color: "#9ca3af",
//       marginBottom: "24px",
//     },
//     form: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "20px",
//     },
//     formGroup: {
//       display: "flex",
//       flexDirection: "column",
//       marginBottom: "16px",
//     },
//     label: {
//       fontSize: "14px",
//       marginBottom: "8px",
//       fontWeight: "500",
//     },
//     input: {
//       width: "100%",
//       padding: "10px 12px",
//       backgroundColor: "#1e293b",
//       border: "1px solid #374151",
//       borderRadius: "4px",
//       color: "white",
//       fontSize: "14px",
//       outline: "none",
//     },
//     button: {
//       width: "100%",
//       padding: "10px",
//       backgroundColor: "#0ea5e9",
//       color: "white",
//       border: "none",
//       borderRadius: "4px",
//       fontSize: "14px",
//       fontWeight: "500",
//       cursor: "pointer",
//       marginTop: "8px",
//     },
//     footer: {
//       textAlign: "center",
//       fontSize: "14px",
//       color: "#9ca3af",
//       marginTop: "24px",
//     },
//     link: {
//       color: "#0ea5e9",
//       textDecoration: "none",
//     },
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <div style={styles.header}>
//           <h1 style={styles.title}>Create an account</h1>
//           <p style={styles.subtitle}>Enter your details below to create your account</p>
//         </div>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label htmlFor="name" style={styles.label}>
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               placeholder="John Doe"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="email" style={styles.label}>
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="rk@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="password" style={styles.label}>
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>

//           <button type="submit" style={styles.button}>
//             Sign up
//           </button>
//         </form>

//         <div style={styles.footer}>
//           Already have an account?{" "}
//           <Link to="/login" style={styles.link}>
//             Sign in
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup


"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(""); // For success/error messages
  const navigate = useNavigate(); // For redirecting after signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setMessage(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  // Styles
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#0a0e17",
      fontFamily: "Arial, sans-serif",
    },
    formContainer: {
      width: "100%",
      maxWidth: "310px",
      padding: "42px",
      backgroundColor: "#111827",
      borderRadius: "8px",
      color: "white",
      height: "470px",
      position: "relative", // For positioning the message
    },
    header: {
      textAlign: "center",
      marginBottom: "24px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#9ca3af",
      marginBottom: "24px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "16px",
    },
    label: {
      fontSize: "14px",
      marginBottom: "8px",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      backgroundColor: "#1e293b",
      border: "1px solid #374151",
      borderRadius: "4px",
      color: "white",
      fontSize: "14px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#0ea5e9",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "8px",
    },
    footer: {
      textAlign: "center",
      fontSize: "14px",
      color: "#9ca3af",
      marginTop: "24px",
    },
    link: {
      color: "#0ea5e9",
      textDecoration: "none",
    },
    message: {
      textAlign: "center",
      fontSize: "14px",
      color: message.includes("successful") ? "#22c55e" : "#ef4444", // Green for success, red for error
      marginTop: "16px",
      position: "absolute",
      bottom: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create an account</h1>
          <p style={styles.subtitle}>Enter your details below to create your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="rk@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign up
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Sign in
          </Link>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Signup;