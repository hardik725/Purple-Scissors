import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300">
      <div className="relative w-24 h-24">
        {/* Rotating circle with animation */}
        <div className="absolute inset-0 border-4 border-t-4 border-pink-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-t-4 border-purple-500 rounded-full animate-spin-reverse"></div>

        {/* Salon Logo in the center */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/054/267/527/non_2x/scissors-outline-slip-style-icon-vector.jpg"
          alt="Salon Logo"
          className="absolute inset-0 m-auto w-12 h-12 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loader;
