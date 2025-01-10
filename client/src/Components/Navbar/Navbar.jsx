import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors, faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ email, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-[#E6E9F0] to-[#FFF5E5] shadow-lg relative z-20">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faScissors} className="text-[#6A737B] text-3xl" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F8170] via-[#D9A687] to-[#B27B6E] text-3xl font-semibold">
            Purple Scissors
          </span>
        </div>

        {/* Links Section */}
        {!isMobile ? (
          <ul className="hidden md:flex space-x-6 text-[#6A737B] text-lg font-medium">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Services</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            {email && (
              <button
                onClick={onLogout}
                className="bg-[#E6E9F0] text-[#6A737B] px-4 py-2 rounded-lg font-semibold hover:bg-[#F5F5F5] transition"
              >
                Logout
              </button>
            )}
          </ul>
        ) : (
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-[#E6E9F0] text-[#6A737B] px-4 py-2 rounded-lg font-semibold hover:bg-[#F5F5F5] transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FontAwesomeIcon icon={faBars} className="text-lg" />
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-sm transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <div
              className={`absolute right-0 mt-2 bg-white shadow-md rounded-lg py-2 text-[#6A737B] w-48 transform transition-transform duration-300 ease-out ${
                isDropdownOpen ? "translate-x-0 opacity-100 z-50" : "translate-x-full opacity-0"
              }`}
            >
              <ul>
                <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Home</li>
                <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Services</li>
                <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">About Us</li>
                <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Contact</li>
                {email && (
                  <li
                    onClick={onLogout}
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  >
                    Logout
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
