import React from "react";

const Dashboard = ({ email, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 text-white flex flex-col">
      {/* Header */}
      <header className="p-4 bg-purple-800 shadow-md flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide mb-2 md:mb-0 text-center md:text-left">
          Salon Dashboard
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-center">
          <p className="text-sm md:text-lg font-medium">
            Welcome, <span className="font-semibold">{email || "Guest"}!</span>
          </p>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all mt-2 md:mt-0"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards */}
          {[
            {
              title: "Appointments",
              description: "View and manage your upcoming appointments with ease.",
              button: "Manage Appointments",
            },
            {
              title: "Staff",
              description: "View and assign tasks to your professional staff.",
              button: "View Staff",
            },
            {
              title: "Inventory",
              description: "Keep track of your salon products and supplies.",
              button: "Check Inventory",
            },
            {
              title: "Customer Feedback",
              description: "Read and respond to reviews and suggestions from your customers.",
              button: "View Feedback",
            },
            {
              title: "Promotions",
              description: "Create and promote exciting offers for your customers.",
              button: "Manage Promotions",
            },
            {
              title: "Analytics",
              description: "Get insights into your salon's performance and growth.",
              button: "View Analytics",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition-all flex flex-col"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4">{card.title}</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {card.description}
              </p>
              <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-all self-start">
                {card.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-purple-800 text-center">
        <p className="text-xs md:text-sm font-medium">
          &copy; {new Date().getFullYear()} Your Salon. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
