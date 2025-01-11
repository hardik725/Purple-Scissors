import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const ContactUs = ({ email, onLogout }) => {
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    fetch("https://purple-scissors.onrender.com/mail/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: emailInput,
        Message: message,
        Name: name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => setStatus("Error sending message. Please try later."));
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" 
         style={{ backgroundImage: "url('https://images.pexels.com/photos/9882401/pexels-photo-9882401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
      <div className="bg-white bg-opacity-5 backdrop-blur-sm min-h-screen">
        <Navbar email={email} onLogout={onLogout} />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center text-purple-700 mb-10">
            Contact Us
          </h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg"
          >
            <div className="grid gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  rows="6"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
              >
                Send Message
              </button>
            </div>
            {status && (
              <p className="mt-6 text-center text-gray-600 font-medium">{status}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
