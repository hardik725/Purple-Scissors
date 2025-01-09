import React from "react";

const SignUp = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400"
              placeholder="Enter your age"
            />
          </div>

          {/* Place */}
          <div className="mb-4">
            <label
              htmlFor="place"
              className="block text-sm font-medium text-gray-700"
            >
              Place
            </label>
            <input
              type="text"
              id="place"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400"
              placeholder="Enter your place"
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-6">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400"
              placeholder="Enter your mobile number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
