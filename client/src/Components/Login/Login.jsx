import React, { useState } from "react";
import SignUp from "../SignUp/SignUp";

const Login = ({ onLogin }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        onLogin(email); // Pass the username to the parent component
        navigate("/dashboard");
      } else {
        console.error("Login Failed");
      }
    } catch (err) {
      setError("An error occurred while trying to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full sm:max-w-sm md:max-w-4xl lg:max-w-6xl bg-gradient-to-r from-purple-700 via-pink-500 to-red-400 bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden sm:p-6 md:transform md:scale-95 md:hover:scale-100 md:transition-all md:duration-300 md:ease-in-out">
        {/* Logo Section */}
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

        {/* Login Section */}
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
};

export default Login;
