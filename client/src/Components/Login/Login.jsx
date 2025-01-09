import React, { useState } from "react";
import SignUp from "../SignUp/SignUp";

const Login = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://purple-scissors.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        // Perform further actions like saving tokens or redirecting
      } else {
        setError(data.message || "Invalid login credentials.");
      }
    } catch (err) {
      setError("An error occurred while trying to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      {/* Main Container */}
      <div className="flex w-full max-w-6xl bg-gradient-to-r from-purple-700 via-pink-500 to-red-400 bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden transform scale-95 hover:scale-100 transition-all duration-300 ease-in-out">
        {/* Logo Section */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 text-white p-8">
          <img
            src="https://static.vecteezy.com/system/resources/previews/054/267/527/non_2x/scissors-outline-slip-style-icon-vector.jpg"
            alt="Logo"
            className="w-40 h-40 mb-6"
          />
          <h1 className="text-4xl font-extrabold text-center tracking-wider">
            Welcome to Purple Scissors!
          </h1>
          <p className="text-lg mt-4 text-center font-light">
            "We’ll style while you smile!"
          </p>
        </div>

        {/* Login Section */}
        <div className="flex-grow w-full md:w-1/2 bg-white bg-opacity-90 p-10 rounded-r-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-8">
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
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => setIsSignUpOpen(true)}
              className="text-pink-500 font-medium hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
          <div className="mt-8 text-center text-sm text-gray-500">
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
