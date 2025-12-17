// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log({ email, password, rememberMe });
//   };

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
//       padding: "43px",
//       backgroundColor: "#111827",
//       borderRadius: "8px",
//       color: "white",
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
//     passwordHeader: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "8px",
//     },
//     forgotPassword: {
//       fontSize: "14px",
//       color: "#0ea5e9",
//       textDecoration: "none",
//     },
//     checkboxContainer: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "16px",
//     },
//     checkbox: {
//       marginRight: "8px",
//       accentColor: "#0ea5e9",
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
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <div style={styles.header}>
//           <h1 style={styles.title}>Sign in</h1>
//           <p style={styles.subtitle}>Enter your credentials to access your account</p>
//         </div>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label htmlFor="email" style={styles.label}>
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="john@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <div style={styles.passwordHeader}>
//               <label htmlFor="password" style={styles.label}>
//                 Password
//               </label>
//               <a href="#" style={styles.forgotPassword}>
//                 Forgot password?
//               </a>
//             </div>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>

//           <div style={styles.checkboxContainer}>
//             <input
//               id="remember-me"
//               type="checkbox"
//               checked={rememberMe}
//               onChange={(e) => setRememberMe(e.target.checked)}
//               style={styles.checkbox}
//             />
//             <label htmlFor="remember-me" style={styles.label}>
//               Remember me
//             </label>
//           </div>

//           <button type="submit" style={styles.button}>
//             Sign in
//           </button>
//         </form>

//         <div style={styles.footer}>
//           Don't have an account?{" "}
//           <Link to="/signup" style={styles.link}>
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    console.log('Submitting login with:', { email, password }); // Debug log

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Response data:', data); // Debug log

      if (response.ok) {
        setMessage("Login successful! Redirecting to dashboard...");
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('userEmail');
        }
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
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
      padding: "43px",
      backgroundColor: "#111827",
      borderRadius: "8px",
      color: "white",
      position: "relative",
      minHeight: "450px",
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
    passwordHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    forgotPassword: {
      fontSize: "14px",
      color: "#0ea5e9",
      textDecoration: "none",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
    },
    checkbox: {
      marginRight: "8px",
      accentColor: "#0ea5e9",
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
      color: message.includes("successful") ? "#22c55e" : "#ef4444",
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
          <h1 style={styles.title}>Sign in</h1>
          <p style={styles.subtitle}>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <div style={styles.passwordHeader}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <a href="#" style={styles.forgotPassword}>
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.checkboxContainer}>
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={styles.checkbox}
            />
            <label htmlFor="remember-me" style={styles.label}>
              Remember me
            </label>
          </div>

          <button type="submit" style={styles.button}>
            Sign in
          </button>
        </form>

        <div style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;