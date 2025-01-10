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
<div
  className="min-h-screen bg-cover bg-center bg-fixed -z-20"
  style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/18/13/10/female-1834381_1280.jpg')" }}
>
  {/* Overlay for better readability */}
  <div className="bg-white bg-opacity-10 backdrop-blur-xl min-h-screen overflow-x-hidden">
    {/* Navbar */}
    <Navbar email={email} onLogout={onLogout} />
    {/* Horizontal Scrollable Menu */}
    <div className="flex justify-center px-4 py-6 z-20">
      <div
        className={`flex overflow-x-auto bg-purple-500 bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg w-full max-w-full p-2 ${isMobile ? "" : "justify-center"}`}
      >
        <div className={`flex items-center ${isMobile ? "gap-1" : "gap-3"}`}>
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
                className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-[#FFC2C2] shadow-md"
              />
              <p className="mt-2 text-xs md:text-sm font-medium text-white hover:text-[#D96161] transition-colors">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Hero Section */}
    <section className="flex flex-col md:flex-row items-center justify-center px-4 py-6 bg-opacity-90 w-full max-w-full">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://images.pexels.com/photos/6724383/pexels-photo-6724383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Inner Beauty"
          className="rounded-xl shadow-lg transform transition-all hover:scale-105 hover:rotate-1 duration-300 ease-in-out max-w-[90%]"
        />
      </div>
      <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white hover:text-[#D96161] transition-colors duration-300 leading-tight">
          Up to <span className="text-[#F28E8E]">10 Hrs</span> of Bloom
        </h1>
        <p className="text-[#E5E5E5] mt-6 text-base md:text-lg leading-relaxed">
          Experience 100% weightless lipstick that lasts all day while keeping your lips nourished, vibrant, and irresistible. Make every moment bloom with confidence.
        </p>
        <button className="mt-8 bg-[#F28E8E] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#D96161] transition-all duration-300">
          Learn More
        </button>
      </div>
    </section>
  </div>
</div>



  );
};

export default Dashboard;
