import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import ServicePopup from "../ServicePopup/ServicePopup";// Importing the ServicePopup component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ServiceSection = () => {
  const [hairService, setHairService] = useState([]);
  const [makeupService, setMakeUpService] = useState([]);
  const [faceService, setFaceService] = useState([]);
  const [essentialService, setEssentialService] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const [totalAppointments, setTotalAppointments] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [topService, setTopService] = useState("");
  const [topCustomer, setTopCustomer] = useState("");

  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility

  const apiCategories = [
    { key: "Hair", setter: setHairService },
    { key: "MakeUp", setter: setMakeUpService },
    { key: "Face", setter: setFaceService },
    { key: "Essentials", setter: setEssentialService },
  ];

  const fetchData = async (category, setter) => {
    try {
      const response = await fetch("https://purple-scissors.onrender.com/service/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Category: category }),
      });

      if (!response.ok) throw new Error(`Failed to fetch ${category} services`);

      const data = await response.json();
      setter(data.services);
    } catch (error) {
      console.error(`Error fetching ${category} services:`, error);
    }
  };

  useEffect(() => {
    apiCategories.forEach(({ key, setter }) => fetchData(key, setter));
    
    fetch("https://purple-scissors.onrender.com/appointment/allappointments")
      .then((response) => response.json())
      .then((data) => {
        const appointments = data.appointments || [];
        setTotalAppointments(appointments.length);

        // Get today's date
        const todayDate = new Date().toISOString().split("T")[0];
        const todayAppointments = appointments.filter((appointment) => appointment.Date === todayDate);
        setTodayAppointments(todayAppointments.length);

        // Find most booked service
        const serviceFrequency = appointments.reduce((acc, { Services }) => {
          Services.forEach((service) => {
            acc[service] = (acc[service] || 0) + 1;
          });
          return acc;
        }, {});

        const topService = Object.entries(serviceFrequency)
          .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
        setTopService(topService);

        // Find most frequent customer
        const customerVisits = appointments.reduce((acc, { Name }) => {
          acc[Name] = (acc[Name] || 0) + 1;
          return acc;
        }, {});

        const topCustomer = Object.entries(customerVisits)
          .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
        setTopCustomer(topCustomer);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleClick = (category) => {
    switch (category) {
      case "Hair":
        setSelectedServices(hairService);
        break;
      case "MakeUp":
        setSelectedServices(makeupService);
        break;
      case "Face":
        setSelectedServices(faceService);
        break;
      case "Essentials":
        setSelectedServices(essentialService);
        break;
      default:
        setSelectedServices([]);
    }
    setSelectedCategory(category);
    setShowPopup(true);  // Show the popup when a category is clicked
  };

  if(hairService.length === 0 || faceService.length === 0 || makeupService.length === 0 || essentialService.length === 0){
    return <Loader />;
  }

  return (
    <div className="min-h-screen w-full font-kugile text-xl flex flex-col items-center text-white text-center bg-gradient-radial from-[#B369D8] via-black to-black px-4 py-12">
      <h1 className="text-3xl md:text-4xl mb-6 font-bold mt-4">Our Services</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mb-10">
        {[ 
          { title: "Total Appointments", value: totalAppointments },
          { title: "Today's Appointments", value: todayAppointments },
          { title: "Top Service", value: topService },
          { title: "Top Customer", value: topCustomer },
        ].map(({ title, value }, index) => (
          <div
            key={index}
            className="p-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-white text-lg font-semibold flex flex-col items-center justify-center h-28 transition-transform duration-300 hover:scale-105 hover:bg-white/20"
          >
            <span className="text-gray-300 text-sm">{title}</span>
            <span className="text-xl font-extrabold mt-2">{value}</span>
          </div>
        ))}
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl">
        {[
          { name: "Hair",  img: "https://static.vecteezy.com/system/resources/previews/019/525/232/non_2x/cartoon-flat-style-drawing-cute-young-woman-barber-with-hair-dryer-and-scissors-ready-to-service-client-hairstylist-or-hair-style-beauty-concept-success-business-graphic-design-illustration-vector.jpg" },
          { name: "MakeUp", img: "https://static.vecteezy.com/system/resources/previews/023/848/889/non_2x/care-beautiful-makeup-depilation-concept-young-woman-uses-the-services-of-makeup-artist-in-beauty-salon-teenage-girl-loves-to-take-care-of-appearance-eyebrow-correction-flat-simple-vector.jpg" },
          { name: "Face", img: "https://static.vecteezy.com/system/resources/previews/054/529/022/non_2x/logo-for-the-beauty-industry-or-facial-massage-highlighting-natural-beauty-a-minimalist-female-face-with-golden-leaves-symbolizes-elegance-wellness-and-care-vector.jpg" },
          { name: "Essentials", img: "https://static.vecteezy.com/system/resources/previews/013/215/182/non_2x/closeup-of-woman-get-pedicure-in-salon-female-client-care-about-hygiene-and-look-of-toe-nails-beauty-concept-illustration-free-vector.jpg" },
        ].map(({ name, img }) => (
          <div
            key={name}
            className="w-full h-32 sm:h-36 flex items-center justify-center rounded-2xl cursor-pointer text-lg sm:text-xl font-semibold text-white shadow-lg relative overflow-hidden bg-cover bg-center transition-all duration-300 hover:scale-105"
            style={{ backgroundImage: `url(${img})` }}
            onClick={() => handleClick(name)}
          >
            {/* Overlay to improve text readability */}
            <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

            {/* Text */}
            <span className="relative z-10">{name}</span>
          </div>
        ))}
      </div>

      {/* Popup Component */}
      {showPopup && (
  <div className="fixed inset-0 flex justify-center z-50 bg-black bg-opacity-80">
    <div className="bg-white shadow-2xl relative w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
      {/* Close button on top-right */}
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-0 right-0 bg-red-600 text-white text-lg p-3 transition-all duration-300 hover:bg-red-700 focus:outline-none z-20"
        style={{ borderRadius: "0px 0px 0px 10px" }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <ServicePopup
        selectedCategory={selectedCategory}
        selectedServices={selectedServices}
      />
    </div>
  </div>
)}


    </div>
  );
};

export default ServiceSection;
