import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Appointment from "./Components/Appointment/Appointment";
import ContactUs from "./Components/ContactUs/ContactUs";
import VerificationPage from "./Components/VerificationPage/VerificationPage";
import AdminPage from "./Components/AdminPage/AdminPage";

function App() {
  const [email, setEmail] = useState(""); // State to store the user's email

  // Function to handle login
  const handleLogin = (user) => {
    setEmail(user);
  };

  // Function to handle logout
  const handleLogout = () => {
    setEmail(null);
    localStorage.removeItem("username"); // Remove from localStorage
  };

  return (
    <div className="h-screen">
      <Routes>
        {/* Redirect to admin page or dashboard based on email */}
        <Route
          path="/"
          element={
            email ? (
              email === "shammi.priyam.13@gmail.com" ? (
                <Navigate to="/adminpage" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Routes for logged-in users */}
        <Route
          path="/dashboard"
          element={
            email ? (
              <Dashboard email={email} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/appointment"
          element={
            email ? (
              <Appointment email={email} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/contactus"
          element={
            email ? (
              <ContactUs email={email} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/verify" element={<VerificationPage />} />
        <Route
          path="/adminpage"
          element={
            email === "shammi.priyam.13@gmail.com" ? (
              <AdminPage email={email} onLogout={handleLogout}/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
