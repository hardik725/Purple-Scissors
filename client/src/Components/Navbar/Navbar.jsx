import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors, faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const Navbar = ({ email, userName, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pagewidth, setPageWidth] = useState(window.innerWidth);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const navbarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setPageWidth(window.innerWidth);
    };

    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    // Set initial navbar height and add resize listener
    updateNavbarHeight();
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", updateNavbarHeight);

    // Cleanup the event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="bg-transparent relative z-30" 
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 ml-6">
          <FontAwesomeIcon
            icon={faScissors}
            className="text-purple-400 text-5xl"
          />
          <Link to="/dashboard">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F8170] via-[#D9A687] to-[#B27B6E] text-4xl font-serif font-extrabold tracking-wider">
              Purple Scissors
            </span>
          </Link>
        </div>

        {/* Links Section */}
        {!isMobile ? (
          <ul className="hidden md:flex space-x-6 text-white text-lg font-bold font-kugile items-center">
  <li className="hover:underline cursor-pointer flex items-center">
    <Link to="/">Home</Link>
  </li>
  <li className="hover:underline cursor-pointer flex items-center">
    <Link to="/product">Products</Link>
  </li>
  <li className="hover:underline cursor-pointer flex items-center">
    <Link to="/appointment">Appointment</Link>
  </li>
  <li className="hover:underline cursor-pointer flex items-center">
    <Link to="/contactus">Contact Us</Link>
  </li>
  {email && (
    <button
      onClick={onLogout}
      className="bg-transparent text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition flex items-center"
    >
      Logout
    </button>
  )}
</ul>

        ) : (
          <div className="relative z-40">
            <button
              className="flex mr-6 items-center space-x-2 bg-gradient-to-r from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] text-white px-4 py-4 rounded-lg font-semibold shadow-lg hover:from-[#6B6ECF] hover:via-[#7D9BE0] hover:to-[#7ADAE1] transition"
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

            {/* Dropdown Container */}
            <div
              className={`absolute right-0 bg-gradient-to-b from-[#D7BBF5] to-[#C1E1DC] shadow-xl rounded-lg py-4 text-gray-800 transform transition-transform duration-300 ease-out ${
                isDropdownOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
              style={{
                width: `${pagewidth}px`,
                top: `${navbarHeight}px`, // Use the calculated navbar height
              }}
            >
              <ul className="flex flex-col divide-y divide-gray-300">
                <li className="group relative px-4 py-3 cursor-pointer rounded-t-lg transition duration-300 ease-in-out">
                  <Link to="/" className="flex items-center space-x-2">
                    <span>Home</span>
                  </Link>
                </li>
                <li className="group relative px-4 py-3 cursor-pointer transition duration-300 ease-in-out">
                  <Link to="/product" className="flex items-center space-x-2">
                    <span>Product</span>
                  </Link>
                </li>
                <li className="group relative px-4 py-3 cursor-pointer transition duration-300 ease-in-out">
                  <Link to="/appointment" className="flex items-center space-x-2">
                    <span>Appointment</span>
                  </Link>
                </li>
                <li className="group relative px-4 py-3 cursor-pointer transition duration-300 ease-in-out">
                  <Link to="/contactus" className="flex items-center space-x-2">
                    <span>Contact Us</span>
                  </Link>
                </li>
                {email && (
                  <li
                    onClick={onLogout}
                    className="group relative px-4 py-3 cursor-pointer rounded-b-lg transition duration-300 ease-in-out"
                  >
                    <span>Logout</span>
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
              <span className="hidden sm:block text-xl font-semibold text-white">
                Welcome, <b className="text-teal-600">{userName}</b>
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
