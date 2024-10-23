import React, { useState } from "react";

const SignInSignUp = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const togglePanel = () => {
    setRightPanelActive(!rightPanelActive);
  };

  const styles = {
    body: {
      height: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f6f5f7",
      fontFamily: "'Poppins', sans-serif",
      padding: "0 20px",
    },
    container: {
      position: "relative",
      width: "100%",
      maxWidth: "850px",
      height: "100%",
      maxHeight: "550px",
      backgroundColor: "#FFF",
      boxShadow: "25px 30px 55px #5557",
      borderRadius: "13px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
    },
    formContainer: {
      position: "absolute",
      width: "50%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      padding: "75px",
      transition: "all 1s ease-in-out",
      textAlign: "center",
    },
    signInContainer: {
      left: "0",
      zIndex: rightPanelActive ? 1 : 5,
      opacity: rightPanelActive ? 0 : 1,
      transform: rightPanelActive ? "translateX(-100%)" : "translateX(0)",
      transition: "all 0.8s ease-in-out",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    signUpContainer: {
      right: "0",
      zIndex: rightPanelActive ? 5 : 1,
      opacity: rightPanelActive ? 1 : 0,
      transform: rightPanelActive ? "translateX(0)" : "translateX(100%)",
      transition: "all 0.8s ease-in-out",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    h1: {
      color: "#141E30",
      fontSize: "30px",
      fontWeight: "500",
    },
    socialContainer: {
      margin: "20px 0px",
    },
    socialLink: {
      border: "1px solid #DDD",
      borderRadius: "50%",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0px 5px",
      height: "40px",
      width: "40px",
      color: "#141E30",
      textDecoration: "none",
      boxShadow: "none",
    },
    input: {
      width: "100%",
      padding: "8px 15px",
      backgroundColor: "#f3f3f3",
      border: "none",
      outline: "none",
      borderRadius: "20px",
      margin: "8px 0",
      textcolor: "#141E30",
    },
    select: {
      width: "100%",
      padding: "8px 15px",
      backgroundColor: "#f3f3f3",
      border: "none",
      outline: "none",
      borderRadius: "20px",
      margin: "8px 0",
      
    },
    forgot: {
      color: "#141E30",
      fontSize: "13px",
      textDecoration: "none",
    },
    button: {
      borderRadius: "20px",
      border: "1px solid #141E30",
      background: "#243B55",
      color: "#FFF",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "12px 45px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginTop: "17px",
      transition: "80ms ease-in",
    },
    overlayContainer: {
      position: "absolute",
      top: "0",
      left: rightPanelActive ? "0" : "50%",
      width: "50%",
      height: "100%",
      overflow: "hidden",
      transition: "transform 0.8s ease-in-out",
      zIndex: "9",
    },
    overlay: {
      position: "relative",
      background: "linear-gradient(to right, #141E30, #243B55)",
      color: "#FFF",
      height: "100%",
      width: "200%",
      transition: "transform 0.8s ease-in-out",
      transform: rightPanelActive ? "translateX(-50%)" : "translateX(0)",
    },
    overlayPanel: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0px 40px",
      textAlign: "center",
      height: "100%",
      width: "50%",
      transition: "transform 0.8s ease-in-out",
    },
    overlayLeft: {
      transform: rightPanelActive ? "translateX(0%)" : "translateX(2%)",
      left: "0",
    },
    overlayRight: {
      transform: rightPanelActive ? "translateX(2%)" : "translateX(0%)",
      right: "0",
    },
    overlayH1: {
      color: "#FFF",
      fontSize: "30px",
    },
    overlayP: {
      marginTop: "8px",
      marginBottom: "20px",
      fontSize: "16px",
    },
    overlayButton: {
      border: "1px solid",
      backgroundColor: "transparent",
      color: "#FFF",
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "16px",
      borderRadius: "20px",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Sign In Form */}
        <div style={{ ...styles.formContainer, ...styles.signInContainer }}>
          <form>
            <h1 style={styles.h1}>Sign In</h1>
            <div style={styles.socialContainer}>
              <a href="#" style={styles.socialLink}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" style={styles.socialLink}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" style={styles.socialLink}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <span>or use your email account</span>
            <input type="email" placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />
            <a href="#" className="forgot" style={styles.forgot}>
              Forgot your password?
            </a>
            <button style={styles.button}>Sign In</button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div style={{ ...styles.formContainer, ...styles.signUpContainer }}>
          <form>
            <h1 style={styles.h1}>Create Account</h1>
            <div style={styles.socialContainer}>
              <a href="#" style={styles.socialLink}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" style={styles.socialLink}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" style={styles.socialLink}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Username" style={styles.input} />
            <input type="email" placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />
            <input
              type="password"
              placeholder="Confirm Password"
              style={styles.input}
            />
            <select style={styles.select}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button style={styles.button}>Sign Up</button>
          </form>
        </div>

        {/* Overlay */}
        <div style={styles.overlayContainer}>
          <div style={styles.overlay}>
            <div style={{ ...styles.overlayPanel, ...styles.overlayRight }}>
              <h1 style={styles.overlayH1}>Already a member?</h1>
              <p style={styles.overlayP}>Sign in to keep bidding on your dream car.</p>
              <button style={styles.overlayButton} onClick={togglePanel}>
                Sign In
              </button>
            </div>
            <div style={{ ...styles.overlayPanel, ...styles.overlayLeft }}>
              <h1 style={styles.overlayH1}>First time here?</h1>
              <p style={styles.overlayP}>
                Sign up to join the auction and start bidding today!
              </p>
              <button style={styles.overlayButton} onClick={togglePanel}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
