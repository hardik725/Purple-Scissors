import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-12">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#204E4A]">Admin Dashboard</h1>
      </header>

      <section id="quick-stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-700">Total Customers</h3>
          <p className="mt-4 text-3xl font-extrabold text-gray-900">1,024</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-700">Monthly Revenue</h3>
          <p className="mt-4 text-3xl font-extrabold text-gray-900">$8,450</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-700">Gift Cards Sold</h3>
          <p className="mt-4 text-3xl font-extrabold text-gray-900">45</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-700">Employee Utilization</h3>
          <p className="mt-4 text-3xl font-extrabold text-gray-900">85%</p>
        </div>
      </section>

      <section id="charts" className="mb-12">
        <h2 className="text-2xl font-bold text-[#204E4A] mb-6">Revenue & Popular Services</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Monthly Revenue Trend</h3>
            <p>Chart placeholder...</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Most Popular Services</h3>
            <p>Chart placeholder...</p>
          </div>
        </div>
      </section>

      <section id="top-customers" className="mb-12">
        <h2 className="text-2xl font-bold text-[#204E4A] mb-6">Top Customers</h2>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-700 font-bold">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Visits</th>
                <th className="py-2 px-4">Spent</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">Jane Doe</td>
                <td className="py-2 px-4">12</td>
                <td className="py-2 px-4">$1,200</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">John Smith</td>
                <td className="py-2 px-4">10</td>
                <td className="py-2 px-4">$950</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="inventory" className="mb-12">
        <h2 className="text-2xl font-bold text-[#204E4A] mb-6">Inventory Overview</h2>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p>Track product stock levels and reorder alerts...</p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
