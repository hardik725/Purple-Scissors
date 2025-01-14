// Updated Navbar Component
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors, faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const Navbar = ({ email, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-transparent backdrop-blur-md shadow-lg relative z-30">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 ml-6">
          <FontAwesomeIcon
            icon={faScissors}
            className="text-purple-800 text-3xl"
          />
          <Link to="/dashboard">
<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F8170] via-[#D9A687] to-[#B27B6E] text-4xl font-serif font-extrabold tracking-wider">
  Purple Scissors
</span>
</Link>

        </div>

        {/* Links Section */}
        {!isMobile ? (
          <ul className="hidden md:flex space-x-6 text-[#cdd3d8] text-lg font-medium items-center">
            <li className="hover:underline cursor-pointer flex items-center">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline cursor-pointer flex items-center">Services</li>
            <li className="hover:underline cursor-pointer flex items-center">
            <Link to="/appointment">Appointment</Link>
            </li>
            <li className="hover:underline cursor-pointer flex items-center"><Link to="/contactus">Contact Us</Link></li>
            {email && (
              <button
                onClick={onLogout}
                className="bg-[#E6E9F0] text-[#6A737B] px-4 py-2 rounded-lg font-semibold hover:bg-[#F5F5F5] transition flex items-center"
              >
                Logout
              </button>
            )}
          </ul>
        ) : (
          <div className="relative z-40">
            <button
              className="flex mr-6 items-center space-x-2 bg-gradient-to-r from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:from-[#6B6ECF] hover:via-[#7D9BE0] hover:to-[#7ADAE1] transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-sm transition-transform ${
                  isDropdownOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            </button>
            <div
              className={`absolute top-[72px] right-0 mt-2 bg-gradient-to-b from-purple-700 to-gray-700 shadow-xl rounded-md py-4 text-white w-52 transform transition-transform duration-300 ease-out ${
                isDropdownOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
            >
              <ul className="flex flex-col">
                <li className="hover:bg-opacity-75 hover:bg-[#1D4ED8] px-4 py-3 cursor-pointer rounded-t-xl transition">
                <Link to="/">Home</Link>
                </li>
                <li className="hover:bg-opacity-75 hover:bg-[#1D4ED8] px-4 py-3 cursor-pointer transition">
                  Services
                </li>
                <li className="hover:bg-opacity-75 hover:bg-[#1D4ED8] px-4 py-3 cursor-pointer transition">
                <Link to="/appointment">Appointment</Link>
                </li>
                <li className="hover:bg-opacity-75 hover:bg-[#1D4ED8] px-4 py-3 cursor-pointer transition">
                <Link to="/contactus">Contact Us</Link>
                </li>
                {email && (
                  <li
                    onClick={onLogout}
                    className="hover:bg-opacity-75 hover:bg-[#1D4ED8] px-4 py-3 cursor-pointer rounded-b-xl transition"
                  >
                    Logout
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* User Section */}
        {!isMobile && (
          <div className="flex items-center space-x-4">
            {email ? (
              <span className="text-[#6A737B] hidden sm:block">
                Welcome, <b>{email}</b>
              </span>
            ) : (
              <button className="bg-[#E6E9F0] text-[#6A737B] px-4 py-2 rounded-lg font-semibold hover:bg-[#F5F5F5] transition">
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
