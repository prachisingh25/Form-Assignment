import React, { useState, useEffect } from "react";
import "./styles.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import VendorDetails from "./components/VendorDetails";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupDetails, setSignupDetails] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("userSession", JSON.stringify({ isLoggedIn: true }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setIsLoggedIn(false);
  };

  const handleSignupComplete = (userDetails) => {
    setSignupDetails(userDetails);
    setIsSigningUp(false);
  };

  const toggleSignup = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="vendor">
          <VendorDetails onLogout={handleLogout} />
        </div>
      ) : isSigningUp ? (
        <div className="signup">
          <SignupForm onSignupComplete={handleSignupComplete} />
        </div>
      ) : (
        <div className="login">
          <LoginForm
            onLogin={handleLogin}
            toggleSignup={toggleSignup}
            prefillDetails={signupDetails}
            className="login-form"
          />
        </div>
      )}
    </div>
  );
}
