import React, { useState,useEffect } from "react";
import AdminDashboard from "../../AdminPages/AdminDashboard/AdminDashboard";
import CustomerReviews from "../../AdminPages/CustomerReviews/CustomerReviews";
import ManageAppointments from "../../AdminPages/ManageAppointments/ManageAppointments";
import ServiceSection from "../../AdminPages/ServiceSection/ServiceSection";
import Inventory from "../../AdminPages/Inventory/Inventory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const AdminPage = ({email,userName,onLogout}) => {
  const [activeSection, setActiveSection] = useState("dashboard"); // State to track the active section
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allreviews,setAllReviews] = useState([]);
  

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

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard email={email}/>;
      case "appointments":
        return <ManageAppointments />;
      case "reviews":
        return <CustomerReviews />;
      case "services":
        return <ServiceSection/>;
      case "inventory":
        return <div><Inventory/></div>;
      case "settings":
        return <div>Settings Component Placeholder</div>;
      default:
        return <AdminDashboard />;
    }
  };
  if(!isMobile){
  return (
    <div style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/5128267/pexels-photo-5128267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }} 
    className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-teal-500 to-[#204E4A]">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-[#204E4A] text-white shadow-lg flex flex-col p-6 transition-all duration-300 ease-in-out transform hover:w-1/5 backdrop-blur-md opacity-65">
        <div className="p-6 text-center">
          <div className="flex justify-center">
        <img
              src="https://static.vecteezy.com/system/resources/previews/054/267/527/non_2x/scissors-outline-slip-style-icon-vector.jpg"
              alt="Purple Scissors Logo"
              className="h-12 w-12 mr-2 rounded-md"
            />
            </div>
          <h1 className="text-3xl font-bold text-[#FFFCF9]">Purple Scissors</h1>
          <p className="mt-2 text-lg text-[#E0F7FA]">Welcome, Shammi</p>
        </div>
        <nav className="mt-6 flex-1">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`block w-full px-6 py-2 text-left hover:bg-[#2FA79B] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeSection === "dashboard" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("appointments")}
                className={`block w-full px-6 py-2 text-left hover:bg-[#2FA79B] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeSection === "appointments" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Manage Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("services")}
                className={`block w-full px-6 py-2 text-left hover:bg-[#2FA79B] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeSection === "services" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("reviews")}
                className={`block w-full px-6 py-2 text-left hover:bg-[#2FA79B] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeSection === "reviews" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Reviews
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("inventory")}
                className={`block w-full px-6 py-2 text-left hover:bg-[#2FA79B] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeSection === "team" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Inventory
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("settings")}
                className={`block w-full px-6 py-2 text-left hover:bg-[#2FA79B] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeSection === "settings" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
        <button onClick={onLogout} 
        className="mt-auto w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition-all duration-300">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 bg-gray-50 bg-opacity-80 backdrop-blur-lg"
      >
        {renderContent()}
      </main>
    </div>
  );
}else{
  return(
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#204E4A]/70 text-white shadow-lg transform transition-transform duration-300 backdrop-blur-md z-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-[#FFFCF9]">Salon Admin</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => {
                  setActiveSection("dashboard");
                  setIsSidebarOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left hover:bg-[#2FA79B] rounded-md ${
                  activeSection === "dashboard" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("appointments");
                  setIsSidebarOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left hover:bg-[#2FA79B] rounded-md ${
                  activeSection === "appointments" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Manage Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("services");
                  setIsSidebarOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left hover:bg-[#2FA79B] rounded-md ${
                  activeSection === "services" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("reviews");
                  setIsSidebarOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left hover:bg-[#2FA79B] rounded-md ${
                  activeSection === "reviews" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Reviews
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("inventory");
                  setIsSidebarOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left hover:bg-[#2FA79B] rounded-md ${
                  activeSection === "inventory" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Inventory
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection("settings");
                  setIsSidebarOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left hover:bg-[#2FA79B] rounded-md ${
                  activeSection === "settings" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
        <button onClick={onLogout} 
        className="mt-6 w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between px-4 py-2 bg-[#204E4A]/70 text-white backdrop-blur-md">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
          <div className="flex items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/054/267/527/non_2x/scissors-outline-slip-style-icon-vector.jpg"
              alt="Purple Scissors Logo"
              className="h-8 w-8 mr-2"
            />
            <h1 className="text-lg font-semibold">Purple Scissors</h1>
          </div>
        </header>

        {/* Content Area */}
        <main className="">{renderContent()}</main>
      </div>
    </div>
  );
}
};

export default AdminPage;
