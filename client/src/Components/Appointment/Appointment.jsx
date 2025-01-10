import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const Appointment = ({ email, onLogout }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: email || "",
    phone: "",
    date: "",
    notes: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
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
      const response = await fetch(`https://purple-scissors.onrender.com/appointment/getappointment/${email}`);
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

  // Handle form submission for booking an appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, date } = formData;

    if (!email || !date || !selectedSlot) {
      setErrorMessage("Please provide all required fields, including a time slot.");
      return;
    }

    try {
      const response = await fetch("https://purple-scissors.onrender.com/appointment/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Date: date,
          Time: selectedSlot,
        }),
      });

      const data = await response.json();

      if (response.ok) {
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
    <>
      <Navbar email={email} onLogout={onLogout} />
      <section className="py-20 bg-gradient-to-r from-[#FDE2E4] via-[#FAD4D8] to-[#FFE2E2]">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-display font-extrabold text-[#4A4A4A] tracking-wide">
            Book Your <span className="text-[#D96161]">Appointment</span>
          </h2>
          <p className="mt-4 text-lg text-[#555] font-serif max-w-2xl mx-auto">
            Your journey to relaxation and rejuvenation begins here. Fill out the form below to secure your personalized session with us.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://images.pexels.com/photos/3993433/pexels-photo-3993433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Relaxation"
              className="rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:rotate-1 duration-300 ease-in-out"
            />
          </div>
          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Input Fields */}
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
                />
              </div>
              {availableSlots.length > 0 ? (
                <div>
                  <select
                    name="slot"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
                  >
                    <option value="">Select a Time Slot</option>
                    {availableSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="text-gray-500">No slots available for the selected date.</p>
              )}
              <textarea
                name="notes"
                placeholder="Additional Notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#F28E8E] focus:outline-none font-serif"
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
        <div className="mt-12 bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto">
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
