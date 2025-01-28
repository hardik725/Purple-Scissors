import React, { useState,useEffect } from "react";
import SignUp from "../SignUp/SignUp";
import Swal from "sweetalert2"; // Import SweetAlert2
import GradientText from "../Animations/GradientText";

const Login = ({ onLogin }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
    
        // Add event listener for window resize
        window.addEventListener("resize", handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://purple-scissors.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: email, Password: password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Trigger success alert
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${email}!`,
          icon: "success", // SweetAlert2 inbuilt success icon
          showConfirmButton: false, // Remove the "Go to Dashboard" button
          timer: 1500, // Auto-close the alert after 1.5 seconds
          timerProgressBar: true, // Show a progress bar for the timer
        }).then(() => {
          // Redirect to the dashboard after the timer
          onLogin(email); // Pass the username to the parent component
          navigate("/dashboard");
        });
      }
       else {
        console.error("Login Failed");
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred while trying to log in.");
    } finally {
      setLoading(false);
    }
  };

  if(!isMobile){

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center px-4 font-kugile"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="flex flex-col md:flex-row w-full sm:max-w-sm md:max-w-4xl lg:max-w-6xl bg-gradient-to-r from-purple-700 via-pink-500 to-red-400 bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden sm:p-6 md:transform md:scale-95 md:hover:scale-100 md:transition-all md:duration-300 md:ease-in-out">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-white p-4 md:p-8">
          <img
            src="https://static.vecteezy.com/system/resources/previews/054/267/527/non_2x/scissors-outline-slip-style-icon-vector.jpg"
            alt="Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-40 md:h-40 mb-4 md:mb-6"
          />
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-center tracking-wider">
            Welcome to Purple Scissors!
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-2 md:mt-4 text-center font-light">
            "We’ll style while you smile!"
          </p>
        </div>
        <div className="flex-grow w-full md:w-1/2 bg-white bg-opacity-90 p-4 sm:p-6 md:p-10 rounded-b-3xl md:rounded-r-3xl">
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 md:mb-8">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4 sm:mb-5 md:mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full mt-2 p-2 sm:p-3 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 sm:mb-6 md:mb-8">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-2 sm:p-3 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-sm sm:text-base text-gray-600 mt-4 sm:mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => setIsSignUpOpen(true)}
              className="text-pink-500 font-medium hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
          <div className="mt-4 sm:mt-6 md:mt-8 text-center text-sm text-gray-500">
            <p>Forgot your password?</p>
            <a
              href="/reset-password"
              className="text-purple-500 font-medium hover:underline"
            >
              Reset it here
            </a>
          </div>
        </div>
      </div>
      {isSignUpOpen && <SignUp onClose={() => setIsSignUpOpen(false)} />}
    </div>
  );
}else{
  return(
<div
  className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-700 via-pink-500 to-red-400 px-6 "
  style={{
    backgroundImage:
      "url('https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-xl w-full max-w-sm">
  <div className="flex flex-col items-center mb-6 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 rounded-lg p-5 shadow-md max-w-sm mx-auto">
  <div className="bg-white p-2 rounded-full shadow-md mb-4">
    <img
      src="https://static.vecteezy.com/system/resources/previews/054/267/527/non_2x/scissors-outline-slip-style-icon-vector.jpg"
      alt="Logo"
      className="w-16 h-16"
    />
  </div>
  <h1 className="text-xl font-kugile font-bold text-gray-700 text-center">
    Welcome to <span className="text-purple-700">Purple Scissors!</span>
  </h1>
  {/* <p className="text-sm font-elegant text-gray-500 mt-2 text-center italic">
    "We’ll style while you smile!"
  </p> */}
</div>

<GradientText
      colors={["#a855f7", "#ec4899"]} // Matches Tailwind's purple-500 and pink-500
      animationSpeed={3}
      showBorder={false}
      className="text-lg font-semibold font-kugile text-center mb-6"
    >
      Login to Your Account
    </GradientText>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-xs font-medium font-kugile text-gray-700"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full mt-2 p-3 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-200 placeholder-gray-400"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-xs font-medium font-kugile text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 text-xs p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-200 placeholder-gray-400"
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold font-kugile shadow-md hover:scale-105 transition-transform duration-300"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
    <p className="text-center text-sm text-gray-600 mt-4">
      Don’t have an account?{" "}
      <span
        onClick={() => setIsSignUpOpen(true)}
        className="text-pink-500 font-medium hover:underline cursor-pointer"
      >
        Sign Up
      </span>
    </p>
    <div className="mt-4 text-center text-sm text-gray-500">
      <p>Forgot your password?</p>
      <a
        href="/reset-password"
        className="text-purple-500 font-medium hover:underline"
      >
        Reset it here
      </a>
    </div>
  </div>
  {isSignUpOpen && <SignUp onClose={() => setIsSignUpOpen(false)} />}
</div>


  );
}
};

export default Login;
