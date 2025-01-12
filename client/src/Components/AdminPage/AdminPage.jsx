import React, { useState } from "react";
import AdminDashboard from "../../AdminPages/AdminDashboard/AdminDashboard";
import CustomerReviews from "../../AdminPages/CustomerReviews/CustomerReviews";
import ManageAppointments from "../../AdminPages/ManageAppointments/ManageAppointments";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // State to track the active section

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "appointments":
        return <ManageAppointments />;
      case "reviews":
        return <CustomerReviews />;
      case "services":
        return <div>Services Management Component Placeholder</div>;
      case "team":
        return <div>Team Management Component Placeholder</div>;
      case "settings":
        return <div>Settings Component Placeholder</div>;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-teal-500 to-[#204E4A]">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-[#204E4A] text-white shadow-lg flex flex-col p-6 transition-all duration-300 ease-in-out transform hover:w-1/5">
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold text-[#FFFCF9]">Salon Admin</h1>
          <p className="mt-2 text-lg text-[#E0F7FA]">Welcome, User</p>
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
                onClick={() => setActiveSection("team")}
                className={`block w-full px-6 py-2 text-left hover:bg-[#2FA79B] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeSection === "team" ? "bg-[#2FA79B]" : ""
                }`}
              >
                Team
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
        <button className="mt-auto w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition-all duration-300">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-6 lg:p-12 bg-gray-50 bg-opacity-80 backdrop-blur-lg"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5128267/pexels-photo-5128267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPage;
