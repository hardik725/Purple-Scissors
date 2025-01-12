import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Verification = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://purple-scissors.onrender.com/temp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Password: password,
            VerificationCode: verificationCode,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Verification Successful",
          text: "Your account has been verified. Please log in.",
          confirmButtonColor: "#6C63FF",
        }).then(() => {
          navigate("/"); // Redirect to login page
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Verification failed. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: errorData.message || "Invalid details. Please try again.",
          confirmButtonColor: "#FF6347",
        });
      }
    } catch (error) {
      console.error("Verification Error:", error);
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
    <div className="fixed inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Verify Your Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleVerification}>
          {/* Email */}
          <div className="mb-3 sm:mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Verification Code */}
          <div className="mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="Enter your verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 sm:py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300"
          >
            Verify Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
