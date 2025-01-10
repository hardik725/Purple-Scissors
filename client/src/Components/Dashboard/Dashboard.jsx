import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const Dashboard = ({ email, onLogout }) => {
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

  return (
    <div className="bg-gradient-to-b from-white to-[#FFFAF6] min-h-screen">
      {/* Navbar */}
      <Navbar email={email} onLogout={onLogout} />

      {/* Horizontal Scrollable Menu */}
      <div className={`grid ${isMobile ? "grid-cols-5 gap-1 px-2 py-4"  : "grid-cols-5 px-4 py-8"}  bg-[#FFFAF6] shadow-md justify-center`}>
        {[
          { label: "Face", icon: "https://images.pexels.com/photos/5069412/pexels-photo-5069412.jpeg?auto=compress&cs=tinysrgb&w=600" },
          { label: "Lips", icon: "https://images.pexels.com/photos/324655/pexels-photo-324655.jpeg?auto=compress&cs=tinysrgb&w=600" },
          { label: "Hair", icon: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600" },
          { label: "Skin", icon: "https://images.pexels.com/photos/6724414/pexels-photo-6724414.jpeg?auto=compress&cs=tinysrgb&w=600" },
          { label: "Nails", icon: "https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?auto=compress&cs=tinysrgb&w=600" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={item.icon}
              alt={item.label}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-purple-600 shadow-md"
            />
            <p className="mt-2 text-xs md:text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center md:flex-row px-4 md:px-8 py-12">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.pexels.com/photos/6724383/pexels-photo-6724383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Inner Beauty"
            className="rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300 ease-in-out"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6D6F6C] hover:text-[#4B4E49] transition-colors duration-300">
            Up to <span className="text-red-600">10 Hrs</span> of Bloom
          </h1>
          <p className="text-[#A6A89D] mt-4 text-sm md:text-lg leading-relaxed">
            100% weightless lipstick that lasts through the day while keeping your lips nourished and vibrant.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
