import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Appointment from "./Components/Appointment/Appointment";
import ContactUs from "./Components/ContactUs/ContactUs";
import VerificationPage from "./Components/VerificationPage/VerificationPage";
import AdminPage from "./Components/AdminPage/AdminPage";
import HairPage from "./Components/HairPage/HairPage";
import MakeupPage from "./Components/MakeupPage/MakeupPage";
import ProductHome from "./Components/ProductHome/ProductHome";
import CompanyProduct from "./Components/CompanyProduct/CompanyProduct";
import FacePage from "./Components/FacePage/FacePage";
import Essentials from "./Components/Essentials/Essentials";
import AllCart from "./Components/AllCart/AllCart";
import AllWish from "./Components/AllWish/AllWish";

function App() {
  const [email, setEmail] = useState(""); // State to store the user's email
  const [userName, setUserName] = useState(""); // State to store the user's name

  // Function to handle login
  const handleLogin = (user) => {
    setEmail(user);
    localStorage.setItem("userEmail", user); // Save email to localStorage
    fetchUserName(user); // Fetch the user's name after login
  };

  // Function to handle logout
  const handleLogout = () => {
    setEmail(null);
    setUserName("");
    localStorage.removeItem("userEmail"); // Remove email from localStorage
  };

  // Function to fetch the user's name from the API
  const fetchUserName = async (userEmail) => {
    try {
      const response = await fetch("https://purple-scissors.onrender.com/user/getname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: userEmail }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setUserName(data); // Assuming the API response contains { name: "User's Name" }
    } catch (error) {
      console.error("Failed to fetch user name:", error);
    }
  };

  // Check if the user is already logged in
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserName(storedEmail);
    }
  }, []);

  return (
    <div className="h-screen">
      <Routes>
        {/* Redirect to admin page or dashboard based on email */}
        <Route
          path="/"
          element={
            email ? (
              email === "purple.scissors.org@gmail.com" ? (
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
              <Dashboard email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/appointment"
          element={
            email ? (
              <Appointment email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/contactus"
          element={
            email ? (
              <ContactUs email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/verify" element={<VerificationPage />} />
        <Route
          path="/adminpage"
          element={
            email === "purple.scissors.org@gmail.com" ? (
              <AdminPage email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/hairpage"
          element={
            email ? (
              <HairPage email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/facepage"
          element={
            email ? (
              <FacePage email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />        
        <Route
          path="/makeuppage"
          element={
            email ? (
              <MakeupPage email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/essentialspage"
          element={
            email ? (
              <Essentials email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/allcart"
          element={
            email ? (
              <AllCart email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />  
        <Route
          path="/allwish"
          element={
            email ? (
              <AllWish email={email} userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />                       
        <Route
        path="/product"
        element={
          email ? (
            <ProductHome email={email} userName={userName} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" />
          )
        }/>
      <Route
  path="/companyproduct/:company/:companyImage"
  element={
    email ? (
      <CompanyProduct email={email} userName={userName} onLogout={handleLogout} />
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
