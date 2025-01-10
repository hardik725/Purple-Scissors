import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard"; // Example of another component using the email
import Appointment from "./Components/Appointment/Appointment";

function App() {
  const [email, setEmail] = useState(""); // State to store the user's email


    // Function to handle login
    const handleLogin = (user) => {
      setEmail(user);
    };
  
    // Function to handle logout
    const handleLogout = () => {
      setEmail(null);
      localStorage.removeItem('username'); // Remove from localStorage
    };

  return (
    <div className="h-screen">
      <Routes>
        {/* Pass setEmail to the Login component */}
        <Route path="/" element={email ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />

        {/* Pass the email to other components */}
        <Route path="/dashboard" element={email ? <Dashboard email={email} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/appointment" element={email ? <Appointment email={email} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
