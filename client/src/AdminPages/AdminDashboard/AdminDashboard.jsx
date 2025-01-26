import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = ({ email }) => {
  const [reviews, setReviews] = useState([]); // Correct initialization
  const [loading, setLoading] = useState(true); // Correct initialization
  const [ratingsFrequency, setRatingsFrequency] = useState([0, 0, 0, 0, 0]); // Initialize ratingsFrequency
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://purple-scissors.onrender.com/user/allorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);

        let revenue = 0;
        const productMap = new Map();

        // Calculate total revenue and product quantities
        data.forEach((order) => {
          const { Name, Quantity = 0, Price = 0 } = order;

          // Accumulate revenue
          revenue += Quantity * Price;

          // Accumulate quantities for top products
          if (productMap.has(Name)) {
            productMap.set(Name, productMap.get(Name) + Quantity);
          } else {
            productMap.set(Name, Quantity);
          }
        });

        // Set total revenue
        setTotalRevenue(revenue);

        // Get top 5 products by quantity
        const sortedProducts = Array.from(productMap.entries())
          .sort((a, b) => b[1] - a[1]) // Sort by quantity in descending order
          .slice(0, 5); // Get the top 5

        setTopProducts(sortedProducts);
        console.log(sortedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://purple-scissors.onrender.com/review/allreviews"
        );
        const data = await response.json(); // Extract JSON from the response
        setReviews(data || []); // Fallback to an empty array if data is undefined
        setLoading(false);
      } catch (err) {
        console.error("Failed to load reviews.", err);
        setReviews([]); // Ensure state is always an array
        setLoading(false);
      }
    };

    fetchReviews();
  }, [email]); // Dependency on email ensures it fetches data when email changes

  useEffect(() => {
    const calculateRatingFrequency = (reviews) => {
      const frequencies = [0, 0, 0, 0, 0]; // For 1 to 5 stars
      reviews.forEach((review) => {
        if (review.Rating >= 1 && review.Rating <= 5) {
          frequencies[review.Rating - 1] += 1; // Increment based on rating
        }
      });
      return frequencies;
    };

    // Only recalculate when reviews are updated
    const newRatingsFrequency = calculateRatingFrequency(reviews);
    setRatingsFrequency(newRatingsFrequency);
    console.log("Ratings Frequency:", newRatingsFrequency);
  }, [reviews]); // Dependency on reviews ensures this runs after reviews are updated

  // Prepare data for Chart.js
  const data = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Number of Ratings",
        data: ratingsFrequency,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Soft Pink
          "rgba(54, 162, 235, 0.8)", // Cool Blue
          "rgba(75, 192, 192, 0.8)", // Teal
          "rgba(255, 206, 86, 0.8)", // Warm Yellow
          "rgba(153, 102, 255, 0.8)", // Lavender
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Deep Pink
          "rgba(54, 162, 235, 1)", // Bold Blue
          "rgba(75, 192, 192, 1)", // Vibrant Teal
          "rgba(255, 206, 86, 1)", // Rich Yellow
          "rgba(153, 102, 255, 1)", // Deep Lavender
        ],
        borderWidth: 2, // Slightly thicker border for a cleaner look
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)", // Stronger hover effect
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to adapt to container size
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            family: "kugile",
            size: window.innerWidth < 768 ? 10 : 14, // Smaller font on mobile
          },
          padding: 10,
        },
      },
      title: {
        display: true,
        text: "Ratings Breakdown",
        font: {
          family: "kugile",
          size: window.innerWidth < 768 ? 14 : 18, // Adjust title size for smaller screens
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "kugile",
            size: window.innerWidth < 768 ? 10 : 12, // Smaller y-axis font for mobile
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: "kugile",
            size: window.innerWidth < 768 ? 8 : 12, // Smaller x-axis font for mobile
          },
        },
      },
    },
  };
  const topProductsData = {
    labels: topProducts.map(([name]) => name), // Keep product names as labels
    datasets: [
      {
        label: "Quantity Sold",
        data: topProducts.map(([_, quantity]) => quantity),
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)", // Teal
          "rgba(54, 162, 235, 0.8)", // Blue
          "rgba(255, 205, 86, 0.8)", // Yellow
          "rgba(153, 102, 255, 0.8)", // Purple
          "rgba(255, 99, 132, 0.8)", // Pink
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
    ],
  };
  
  const topProductsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disable default legend
      },
      title: {
        display: true,

        font: {
          family: "kugile",
          size: 18,
          weight: "bold",
        },
        color: "#204E4A",
        padding: { top: 10, bottom: 10 },
      },
      customLegend: {
        afterDraw(chart) {
          const { ctx, chartArea } = chart;
          const colors = chart.data.datasets[0].backgroundColor;
          const labels = chart.data.labels;
  
          // Start position for the custom legend
          const legendX = chartArea.left;
          const legendY = chartArea.bottom + 10;
  
          labels.forEach((label, index) => {
            // Draw the color box
            ctx.fillStyle = colors[index];
            ctx.fillRect(legendX + index * 120, legendY, 15, 15);
  
            // Draw the product name
            ctx.fillStyle = "#204E4A";
            ctx.font = "12px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(label, legendX + index * 120 + 20, legendY + 7.5);
          });
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
          color: "#204E4A",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Light gridlines
        },
      },
      x: {
        ticks: {
          display: false, // Hide x-axis labels
        },
        grid: {
          display: false, // No gridlines for x-axis
        },
      },
    },
    layout: {
      padding: {
        bottom: 50, // Add space for custom legend
      },
    },
  };
  

  if (loading) {
    return (
      <div className="text-center mt-12 text-lg font-bold">
        Loading Reviews...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-12 font-kugile">
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
          <p className="mt-4 text-3xl font-extrabold text-gray-900">₹{totalRevenue}</p>
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
  <h2 className="text-2xl font-bold text-[#204E4A] mb-6">Ratings Breakdown</h2>
  <div
    className="p-6 bg-white rounded-lg shadow-md"
    style={{
      height: window.innerWidth < 768 ? "300px" : "400px", // Longer height on mobile
    }}
  >
    <Bar data={data} options={options} />
  </div>
</section>
<section id="charts" className="mb-12">
  <h2 className="text-2xl font-bold text-[#204E4A] mb-6">
    Top Products
  </h2>
  <div
    className="p-6 bg-white rounded-lg shadow-md"
    style={{
      height: window.innerWidth < 768 ? "350px" : "450px", // Adjust height dynamically
    }}
  >
    <Bar data={topProductsData} options={topProductsOptions} />
  </div>
  <div className="mt-4">
  {topProducts.map(([name, _], index) => (
    <div key={index} className="flex items-center mb-2">
      {/* Color Box */}
      <div
        className={`w-6 h-6 rounded-sm mr-4`}
        style={{
          backgroundColor: [
            "rgba(75, 192, 192, 0.8)", // Teal
            "rgba(54, 162, 235, 0.8)", // Blue
            "rgba(255, 205, 86, 0.8)", // Yellow
            "rgba(153, 102, 255, 0.8)", // Purple
            "rgba(255, 99, 132, 0.8)", // Pink
          ][index % 5], // Cycle through colors
        }}
      ></div>
      {/* Product Name */}
      <div className="text-sm text-[#204E4A] font-medium">{name}</div>
    </div>
  ))}
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
