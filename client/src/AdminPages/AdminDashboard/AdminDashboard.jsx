import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import LineChart from "../LineChart/LineChart";
import CountUp from "react-countup"
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
  const [revenueData, setRevenueData] = useState({ labels: [], data: [] });
  const [appointmentData, setAppointmentData] = useState({ labels: [], data: []});
  const [topProducts, setTopProducts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [topServices, setTopServices] = useState([]);
  const [topService, setTopService] = useState("");
  const [todayappointment, setTodayAppointment] = useState([]);
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
  ];

  const getAppointment = (time) => {
    return todayappointment.find((appt) => appt.Time === time);
  };

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
        const dailyRevenue = new Map();
  
        // Get last 15 days' revenue
        const today = new Date();
        for (let i = 14; i >= 0; i--) {
          const date = new Date();
          date.setDate(today.getDate() - i);
          const dateString = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
          dailyRevenue.set(dateString, 0);
        }
  
        // Calculate total revenue and update daily revenue
        data.forEach(({ OrderDate, Quantity = 0, Price = 0, Name }) => {
          revenue += Quantity * Price;
  
          // Convert OrderDate to YYYY-MM-DD format
          const orderDate = new Date(OrderDate).toISOString().split("T")[0];
  
          // Update revenue for that date if it falls within the last 15 days
          if (dailyRevenue.has(orderDate)) {
            dailyRevenue.set(orderDate, dailyRevenue.get(orderDate) + Quantity * Price);
          }
  
          // Track top-selling products
          if (productMap.has(Name)) {
            productMap.set(Name, productMap.get(Name) + Quantity);
          } else {
            productMap.set(Name, Quantity);
          }
        });
  
        // Set revenue data for the chart
        setRevenueData({
          labels: Array.from(dailyRevenue.keys()),  // Dates
          data: Array.from(dailyRevenue.values()),  // Revenue per day
        });
  
        // Set total revenue
        setTotalRevenue(revenue);
  
        // Get top 5 products by quantity
        const sortedProducts = Array.from(productMap.entries())
          .sort((a, b) => b[1] - a[1]) // Sort by quantity in descending order
          .slice(0, 5); // Get the top 5
  
        setTopProducts(sortedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  
  

  useEffect(() => {
    console.log("Total revenue for last 15 days:", revenueData);
  }, [revenueData]);

  useEffect(() => {
    fetch("https://purple-scissors.onrender.com/appointment/allappointments")
      .then((response) => response.json())
      .then((data) => {
        const appointments = data.appointments || [];
  
        // Get today's date in YYYY-MM-DD format
        const todayDate = new Date().toISOString().split("T")[0];
  
        // Get last 15 days' dates (formatted as strings)
        const dailyAppointment = new Map();
        const today = new Date();
        for (let i = 14; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateString = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
          dailyAppointment.set(dateString, 0);
        }
  
        // Count appointments per day (use the string `Date` field)
        appointments.forEach(({ Date }) => {
          if (dailyAppointment.has(Date)) {
            dailyAppointment.set(Date, (dailyAppointment.get(Date) || 0) + 1);
          }
        });
  
        setAppointmentData({
          labels: Array.from(dailyAppointment.keys()), // Dates
          data: Array.from(dailyAppointment.values()), // Appointments per day
        });
  
        // Filter today's appointments (direct string comparison)
        const todayAppointments = appointments.filter(
          (appointment) => appointment.Date === todayDate
        );
  
        setTodayAppointment(todayAppointments);
        console.log("Today Appointments:", todayAppointments);
  
        // Group appointments by customer name
        const customerVisits = appointments.reduce((acc, { Name }) => {
          acc[Name] = (acc[Name] || 0) + 1; // Count visits
          return acc;
        }, {});
  
        // Convert to an array and sort by visit count
        const topCustomers = Object.entries(customerVisits)
          .map(([Name, visits]) => ({ Name, visits }))
          .sort((a, b) => b.visits - a.visits) // Sort by visits
          .slice(0, 4); // Get top 4 customers
  
        // Calculate service frequency
        const serviceFrequency = appointments.reduce((acc, { Services }) => {
          Services.forEach((service) => {
            acc[service] = (acc[service] || 0) + 1;
          });
          return acc;
        }, {});
  
        // Convert to an array and sort by frequency
        const topServices = Object.entries(serviceFrequency)
          .map(([service, frequency]) => ({ service, frequency }))
          .sort((a, b) => b.frequency - a.frequency)
          .slice(0, 4);
  
        setTopServices(topServices);
        setTopService(topServices[0]?.service || "");
  
        // Set customers and total appointments
        setAppointments(topCustomers);
        setTotalCustomers(appointments.length);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);
  
  

  useEffect(() => {
    console.log("Today Appointments (after state update):", todayappointment);
  }, [todayappointment]);  

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
  

  if (!reviews && !orders && !topProducts && !appointments) {
    return (
      <div className="text-center mt-12 text-lg font-bold">
        Loading Reviews...
      </div>
    );
  }

  return (
    <>
    <section
  id="admin-dashboard"
  className="bg-cover bg-center"
  style={{
    backgroundImage:
      'url(https://images.unsplash.com/photo-1508898578281-774ac4893c0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhY2tncm91bmQlMjBncmFkaWVudHxlbnwwfHwwfHx8MA%3D%3D)',
  }}
>
  <header className="mb-4 md:mb-8 pt-3 md:pt-6">
    <h1 className="text-2xl md:text-4xl  font-bold text-white text-center bg-transparent font-kugile ">Admin Dashboard</h1>
  </header>

  <section
  id="quick-stats"
  className="flex flex-wrap justify-between md:gap-6 mb-2 w-full mx-1"
>
  {/* Total Customers */}
  <div></div>
  <div
    className="p-1 md:p-6 bg-white bg-opacity-75 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-1/5"
    style={{
      height: "0",
      paddingBottom: "20%", // To ensure the box remains square
      backgroundImage:
        "url('https://static.vecteezy.com/system/resources/previews/008/332/005/non_2x/hair-stylist-concept-free-vector.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>

  {/* Monthly Revenue */}
  <div
    className="p-1 md:p-6 bg-white bg-opacity-75 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-1/5"
    style={{
      height: "0",
      paddingBottom: "20%", // To ensure the box remains square
      backgroundImage:
        "url('https://static.vecteezy.com/system/resources/previews/006/591/168/non_2x/tablet-smartphone-screen-with-charts-return-on-investment-of-growth-and-fall-of-stocks-successful-investment-strategy-business-concept-capital-increase-revenue-growth-free-vector.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>

  {/* Total Reviews */}
  <div
    className="p-1 md:p-6 bg-white bg-opacity-75 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-1/5"
    style={{
      height: "0",
      paddingBottom: "20%", // To ensure the box remains square
      backgroundImage:
        "url('https://static.vecteezy.com/system/resources/previews/010/925/376/non_2x/user-feedback-and-website-rating-customer-feedback-review-website-non-commercial-product-evaluation-rating-service-sharing-experience-flat-design-modern-illustration-vector.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>

  {/* Popular Services */}
  <div
    className="p-1 md:p-6 bg-white bg-opacity-75 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-1/5"
    style={{
      height: "0",
      paddingBottom: "20%", // To ensure the box remains square
      backgroundImage:
        "url('https://static.vecteezy.com/system/resources/previews/017/381/310/non_2x/woman-applies-a-white-moisturizing-mask-vector.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
  </div>
  <div></div>
</section>

<section
  id="quick-stats" // from here on we will give data
  className="flex flex-wrap justify-between md:gap-6 mb-8 md:mb-12 w-full mx-1"
>
  {/* Total Customers */}
  <div></div>
  <div
    className="md:p-4 bg-transparent rounded-lg shadow-lg w-1/5"
  >
    <p className="text-[18px] md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg text-center">
  <CountUp end={totalCustomers} duration={2} />
</p>

  </div>

  {/* Monthly Revenue */}
  <div
    className="md:p-4 bg-transparent rounded-lg shadow-lg w-1/5"
  >
    <p className="text-[18px] md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg text-center">
    ₹<CountUp end={totalRevenue} duration={2} />
</p>
  </div>

  {/* Total number of review */}
  <div
    className="md:p-4 bg-transparent rounded-lg shadow-lg w-1/5"
  >
    <p className="text-[18px] md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg text-center">
    <CountUp end={reviews.length} duration={2} />
</p>
  </div>

  {/* Employee Utilization */}
  <div
    className="md:p-4 bg-transparent rounded-lg shadow-lg  w-1/5"
  >
    <p className="text-[18px] md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg text-center">
    {topService}
</p>    
  </div>
  <div></div>
</section>



  <section id="charts" className="pb-6 p-3">
    <div
      className="p-6 bg-white bg-opacity-90 rounded-md shadow-md"
      style={{
        height: window.innerWidth < 768 ? "300px" : "400px", // Adjust height dynamically
      }}
    >
      <Bar data={data} options={options} />
    </div>
  </section>

</section>
<div className="flex flex-col md:flex-row">
  {/* Appointment Section - Leftmost on Desktop */}
  <div className="p-6 bg-gradient-to-br from-purple-500 to-black shadow-xl border border-gray-700 max-w-4xl mx-auto w-full md:w-1/2">
    <h2 className="text-4xl font-bold text-center text-pink-300 mb-6 font-bodoni tracking-wide">
      Today's Appointments
    </h2>

    <div className="relative grid grid-cols-3 md:grid-cols-5 gap-4">
      {/* Time Column */}
      <div className="col-span-1 flex flex-col justify-center font-parisienne text-lg text-pink-200">
        {timeSlots.map((time, index) => (
          <div key={index} className="py-3 text-center md:text-right">
            {time}
          </div>
        ))}
      </div>

      {/* Appointments Column */}
      <div className="col-span-2 md:col-span-4 relative flex flex-col items-center">
        {timeSlots.slice(0, 9).map((time, index) => {
          const appointment = getAppointment(time);
          return (
            <div
              key={index}
              className={`
                absolute flex flex-col justify-center items-center w-full md:w-2/3 transform -translate-y-1/2
                rounded-xl p-3 text-sm md:text-base font-semibold transition-all duration-300 text-center shadow-lg
                font-poppins
                ${
                  appointment
                    ? "border-4 border-pink-500 bg-purple-700 shadow-lg text-white"
                    : "border-4 border-gray-500 bg-gray-800 text-gray-300"
                }
              `}
              style={{ top: `${index * 10.5 + 8}%` }}
            >
              <span className="italic">{appointment ? appointment.Services.join(", ") : "Vacant"}</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  <div className="w-full md:w-1/2 flex flex-col"><LineChart labels={revenueData.labels} data={revenueData.data} component={"revenue"}/>
  <LineChart labels={appointmentData.labels} data={appointmentData.data} component={"customer"}/></div>
</div>





    <div className="min-h-screen bg-gray-100 p-6 lg:p-12 font-kugile">

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
    

<section
  id="top-insights"
  className="mb-6 bg-center bg-cover bg-opacity-90"
  style={{
    backgroundImage: window.innerWidth < 640
      ? 'url(https://img.freepik.com/free-photo/smiling-female-owner-hairdresser-salon-showing-ok-hand-sign_329181-1954.jpg?t=st=1737985244~exp=1737988844~hmac=76e082644bcb47765838126443df0d029b91ce4f07867e7335fda3530506615d&w=740)'
      : 'url(https://img.freepik.com/free-photo/woman-laughing-pointing_1139-520.jpg?t=st=1737984536~exp=1737988136~hmac=5420488e2fa0f6dcb18f4f360684017bf8fb03263f4b440e4932d74372fd3377&w=1380)',
  }}
>
  <h2 className="text-2xl md:text-3xl font-extrabold text-center text-teal-700 md:mb-4 p-2 md:p-4">
    Top Insights
  </h2>

  {/* Responsive container */}
  <div className="p-4 md:p-6 rounded-lg shadow-lg">
    <div className="flex flex-col lg:flex-row flex-wrap gap-4 md:gap-8 justify-between items-stretch">
      {/* Top Customers */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-3 md:p-4 bg-opacity-30">
        <h3 className="text-lg md:text-2xl font-bold text-center text-teal-700 mb-3 md:mb-4">
          Top Customers
        </h3>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left rounded-sm overflow-hidden text-sm md:text-base">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-2 px-3 md:py-4 md:px-6 font-semibold">Name</th>
                  <th className="py-2 px-3 md:py-4 md:px-6 font-semibold">Visits</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((customer, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? 'bg-green-50' : 'bg-white'
                    } hover:bg-green-100`}
                  >
                    <td className="py-2 px-3 md:py-4 md:px-6 text-gray-800 font-medium">
                      {customer.Name}
                    </td>
                    <td className="py-2 px-3 md:py-4 md:px-6 text-gray-800 font-medium">
                      {customer.visits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-700 font-semibold">
            No appointments data available.
          </p>
        )}
      </div>

      {/* Top Services */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-3 md:p-4 bg-opacity-30">
        <h3 className="text-lg md:text-2xl font-bold text-center text-pink-600 mb-3 md:mb-4">
          Top Services
        </h3>
        {topServices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left rounded-sm overflow-hidden text-sm md:text-base">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-2 px-3 md:py-4 md:px-6 font-semibold">Service</th>
                  <th className="py-2 px-3 md:py-4 md:px-6 font-semibold">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {topServices.map((service, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? 'bg-pink-50' : 'bg-white'
                    } hover:bg-pink-100`}
                  >
                    <td className="py-2 px-3 md:py-4 md:px-6 text-gray-800 font-medium">
                      {service.service}
                    </td>
                    <td className="py-2 px-3 md:py-4 md:px-6 text-gray-800 font-medium">
                      {service.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-700 font-semibold">
            No services data available.
          </p>
        )}
      </div>
    </div>
  </div>
</section>
    </div>
    </>
  );
};

export default AdminDashboard;
