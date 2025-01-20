import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const Appointment = ({ email,userName, onLogout }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: email || "",
    phone: "",
    date: "",
    notes: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedServices, setSelectedServices] = useState([]); // State for selected services
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userAppointments, setUserAppointments] = useState([]);
  
  // Fetch available slots based on the selected date
  const fetchAvailableSlots = async (date) => {
    try {
      const response = await fetch(
        `https://purple-scissors.onrender.com/appointment/available-slots?Date=${date}`
      );
      const data = await response.json();
      if (response.ok) {
        setAvailableSlots(data.availableSlots || []);
        setErrorMessage("");
      } else {
        setAvailableSlots([]);
        setErrorMessage(data.error || "No available slots for the selected date.");
      }
    } catch (error) {
      setAvailableSlots([]);
      setErrorMessage("Error fetching available slots. Please try again.");
    }
  };
  
  // Fetch user's booked appointments
  const fetchUserAppointments = async () => {
    try {
      const response = await fetch(
        `https://purple-scissors.onrender.com/appointment/getappointment/${email}`
      );
      const data = await response.json();
      if (response.ok) {
        setUserAppointments(data.alldata || []);
      } else {
        setErrorMessage(data.error || "Error fetching user appointments.");
      }
    } catch (error) {
      setErrorMessage("Error fetching user appointments. Please try again.");
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    if (name === "date") {
      fetchAvailableSlots(value); // Fetch slots when the date changes
    }
  };
  
  // Handle service selection
  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service) // Remove service if already selected
        : [...prev, service] // Add service if not selected
    );
  };
  
  // Handle form submission for booking an appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, date } = formData;
    console.log(formData.name,email,date,selectedSlot,selectedServices);
  
    if (!email || !date || !selectedSlot || selectedServices.length === 0) {
      setErrorMessage("Please provide all required fields, including a time slot and services.");
      return;
    }
  
    try {
      const response = await fetch("https://purple-scissors.onrender.com/appointment/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: email,
          Date: date,
          Time: selectedSlot,
          Services: selectedServices, // Add selected services
        }),
      });
  
      const emailresponse = await fetch(
        "https://purple-scissors.onrender.com/mail/book-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email:email,
            Name:formData.name,
            Date:date,
            Services:selectedServices,
            Time:selectedSlot,
          }),
        }
      );
  
      const data = await response.json();
      const emaildata = await emailresponse.json();
      if (response.ok && emaildata.message === "Appointment booked successfully, confirmation email sent!") {
        setSuccessMessage("Appointment booked successfully!");
        setErrorMessage("");
        fetchUserAppointments(); // Refresh appointments after booking
        setFormData({
          name: "",
          email: email || "",
          phone: "",
          date: "",
          notes: "",
        });
        setSelectedSlot("");
        setAvailableSlots([]);
        setSelectedServices([]); // Reset services selection
      } else {
        setErrorMessage(data.error || "Error booking appointment.");
      }
    } catch (error) {
      setErrorMessage("Error booking appointment. Please try again.");
    }
  };
  
  useEffect(() => {
    if (email) {
      fetchUserAppointments(); // Fetch appointments on component mount if email exists
    }
  }, [email]);
  

  return (
<><div className="bg-black">
  <Navbar email={email} userName={userName} onLogout={onLogout} />
  </div>
  <section className="py-2 md:py-10 bg-gradient-to-r from-[#FDE2E4] via-[#FAD4D8] to-[#FFE2E2]">
    <div className="text-center mb-4 md:mb-8">
      <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#4A4A4A] tracking-wide">
        Book Your <span className="text-[#D96161]">Appointment</span>
      </h2>
      <p className="mt-2 md:mt-4 text-md sm:text-lg text-[#555] font-serif max-w-2xl mx-auto">
        Your journey to relaxation and rejuvenation begins here. Fill out the form below to secure your personalized session with us.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12 px-4 sm:px-8">
  {/* Image Section */}
  <div className="w-full sm:w-1/2 flex justify-center mb-6 sm:mb-0">
    <img
      src="https://images.pexels.com/photos/3993433/pexels-photo-3993433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Relaxation"
      className="rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:rotate-1 duration-300 ease-in-out"
    />
  </div>
  {/* Form Section */}
  <div className="w-full sm:w-1/2 bg-white p-6 sm:p-10 rounded-md shadow-2xl">
    {/* Services Section */}
    <div className="mb-4 sm:mb-6">
      <h5 className="text-md font-medium text-gray-800 mb-2 sm:mb-3">Select Services:</h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {["Hair", "Face", "Makeup", "Nails", "Grooming"].map((service, index) => (
          <button
            key={index}
            type="button"
            className={`p-2 text-sm rounded-lg font-medium transition-all duration-300 border border-pink-300 ${
              selectedServices.includes(service)
                ? "border-purple-500 bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-purple-700"
            }`}
            onClick={() =>
              setSelectedServices((prev) =>
                prev.includes(service)
                  ? prev.filter((s) => s !== service)
                  : [...prev, service]
              )
            }
          >
            {service}
          </button>
        ))}
      </div>
    </div>
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Input Fields */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
        />
      </div>
      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
      <DatePicker
        selected={formData.date ? new Date(formData.date) : null}
        onChange={(date) => {
          const formattedDate = date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
          handleChange({ target: { name: "date", value: formattedDate } });
        }}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
        placeholderText="Select a date"
      />
      {availableSlots.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-purple-700 mb-4">Available Slots</h4>
          {/* Slots Section */}
          <div>
            <h5 className="text-md font-medium text-gray-800 mb-3">Morning Slots</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {availableSlots
                .filter((slot) => slot.includes("AM"))
                .map((slot, index) => (
                  <button
                    key={`morning-${index}`}
                    type="button"
                    className={`p-3 text-sm rounded-lg font-medium transition-all duration-300 border border-pink-300 ${
                      selectedSlot === slot
                        ? "border-purple-500 bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-purple-700"
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
            </div>

            <h5 className="text-md font-medium text-gray-800 mb-3">Evening Slots</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {availableSlots
                .filter((slot) => slot.includes("PM"))
                .map((slot, index) => (
                  <button
                    key={`evening-${index}`}
                    type="button"
                    className={`p-3 text-sm rounded-lg font-medium transition-all duration-300 border border-pink-300 ${
                      selectedSlot === slot
                        ? "border-purple-500 bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-purple-700"
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
      <textarea
        name="notes"
        placeholder="Additional Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
        rows="4"
      ></textarea>
      {/* Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#F28E8E] to-[#D96161] text-white px-6 py-4 rounded-full text-lg font-bold shadow-lg hover:opacity-90 transition-all duration-300"
      >
        Confirm Appointment
      </button>
    </form>
    {successMessage && (
      <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
    )}
    {errorMessage && (
      <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
    )}
  </div>
</div>

    {/* User's Appointments */}
    <div className="mt-12 bg-white p-10 rounded-2xl shadow-xl max-w-4xl md:mx-auto mx-2">
      <h3 className="text-3xl font-bold mb-6 text-[#4A4A4A]">Your Appointments</h3>
      {userAppointments.length > 0 ? (
        <ul className="space-y-4">
          {userAppointments.map((appointment, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 border border-gray-300 rounded-lg font-serif"
            >
              <p><strong>Date:</strong> {appointment.Date}</p>
              <p><strong>Time:</strong> {appointment.Time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You have no booked appointments yet.</p>
      )}
    </div>
  </section>
</>

  );
};

export default Appointment;
