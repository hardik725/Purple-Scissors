import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://purple-scissors.onrender.com/temp/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Age: age,
            Email: email,
            Name: name,
            Password: password,
            PhoneNumber: phoneNumber,
            Place: place,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Verification Required",
          text: "A verification code has been sent to your email. Please verify your account.",
          confirmButtonColor: "#6C63FF",
        }).then(() => {
          navigate("/verify"); // Redirect to verification page
          onClose(); // Close the sign-up modal
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Sign-up failed. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "Sign-up failed. Please try again.",
          confirmButtonColor: "#FF6347",
        });
      }
    } catch (error) {
      console.error("Sign-Up Error:", error);
      setError("Something went wrong. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#FF6347",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 transition-all duration-200 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp}>
          {/* Full Name */}
          <div className="mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email */}
          <div className="mb-3 sm:mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Password */}
          <div className="mb-3 sm:mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Age */}
          <div className="mb-3 sm:mb-4">
            <input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Place */}
          <div className="mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="Enter your place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3 sm:mb-4">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 sm:py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
