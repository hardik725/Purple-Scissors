import React from "react";

const Dashboard = ({ email, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 text-white flex flex-col">
      {/* Header */}
      <header className="p-6 bg-purple-800 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide">Salon Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-lg font-medium">
            Welcome, <span className="font-semibold">{email || "Guest"}!</span>
          </p>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Appointment Management */}
          <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4">Appointments</h2>
            <p className="text-gray-600 mb-4">
              View and manage your upcoming appointments with ease.
            </p>
            <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-all">
              Manage Appointments
            </button>
          </div>

          {/* Staff Management */}
          <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4">Staff</h2>
            <p className="text-gray-600 mb-4">
              View and assign tasks to your professional staff.
            </p>
            <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition-all">
              View Staff
            </button>
          </div>

          {/* Inventory Management */}
          <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4">Inventory</h2>
            <p className="text-gray-600 mb-4">
              Keep track of your salon products and supplies.
            </p>
            <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-all">
              Check Inventory
            </button>
          </div>

          {/* Customer Feedback */}
          <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4">Customer Feedback</h2>
            <p className="text-gray-600 mb-4">
              Read and respond to reviews and suggestions from your customers.
            </p>
            <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition-all">
              View Feedback
            </button>
          </div>

          {/* Promotions and Offers */}
          <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4">Promotions</h2>
            <p className="text-gray-600 mb-4">
              Create and promote exciting offers for your customers.
            </p>
            <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-all">
              Manage Promotions
            </button>
          </div>

          {/* Reports and Analytics */}
          <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p className="text-gray-600 mb-4">
              Get insights into your salon's performance and growth.
            </p>
            <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition-all">
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 bg-purple-800 text-center">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} Your Salon. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
