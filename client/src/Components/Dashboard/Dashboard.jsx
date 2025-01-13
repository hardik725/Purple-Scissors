import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";

const Dashboard = ({ email, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !review || !rating) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Fields",
        text: "Please fill all fields before submitting.",
        confirmButtonColor: "#2FA79B",
      });
      return;
    }
  
    try {
      const response = await fetch("https://purple-scissors.onrender.com/review/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Review: review,
          Rating: rating,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your review has been submitted successfully.",
          confirmButtonColor: "#2FA79B",
        });
        setName("");
        setReview("");
        setRating("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: data.message || "Unable to submit your review. Please try again.",
          confirmButtonColor: "#2FA79B",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "An unexpected error occurred. Please try again later.",
        confirmButtonColor: "#2FA79B",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed -z-20"
      style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/18/13/10/female-1834381_1280.jpg')" }}
    >
      {/* Overlay for better readability */}
      <div className="bg-white bg-opacity-10 backdrop-blur-xl min-h-screen overflow-x-hidden">
        {/* Navbar */}
        <Navbar email={email} onLogout={onLogout} />
        
        {/* Horizontal Scrollable Menu */}
        <div className="flex justify-center px-2 py-6 z-20">
          <div
            className={`flex overflow-x-auto bg-purple-500 bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg w-full max-w-full p-1 justify-center`}
          >
            <div className={`flex items-center ${isMobile ? "gap-3" : "gap-5"}`}>
              {[ 
                { label: "Face", icon: "https://images.pexels.com/photos/5069412/pexels-photo-5069412.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { label: "Hair", icon: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { label: "Skin", icon: "https://images.pexels.com/photos/6724414/pexels-photo-6724414.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { label: "Nails", icon: "https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?auto=compress&cs=tinysrgb&w=600" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-16 h-16 md:w-[128px] md:h-[128px] rounded-full border-2 border-[#FFC2C2] shadow-md"
                  />
                  <p className="mt-2 text-xs md:text-sm font-medium text-white hover:text-[#D96161] transition-colors">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center px-2 py-6 bg-opacity-90 w-full max-w-full">
  <div className="w-full md:w-1/2 flex justify-center">
    <img
      src="https://images.pexels.com/photos/6724383/pexels-photo-6724383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Inner Beauty"
      className="rounded-md shadow-lg transform transition-all hover:scale-105 hover:rotate-1 duration-300 ease-in-out max-w-full"
    />
  </div>
  <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-10 text-center md:text-left">
    <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white hover:text-[#D96161] transition-colors duration-300 leading-tight">
      Timeless <span className="text-[#F28E8E]">Beauty</span> Unveiled
    </h1>
    <p className="text-[#E5E5E5] mt-6 text-base md:text-lg leading-relaxed font-serif">
      Step into a world of elegance and pampering at Purple Scissors, where beauty meets artistry. 
      From flawless hairstyles to radiant skin treatments, we bring out the best version of you. 
      Let your confidence bloom with every visit!
    </p>
    <button className="mt-8 bg-[#F28E8E] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#D96161] transition-all duration-300">
      Learn More
    </button>
  </div>
</section>


        {/* Services Section */}
        <section className="py-16 bg-[#F3F4F6] bg-opacity-0 backdrop-blur-md">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-serif font-bold text-black uppercase tracking-wide">Our Services</h2>
    <div className="mt-2 w-16 h-1 bg-black mx-auto rounded"></div>
  </div>
  <div className="flex flex-wrap justify-center gap-8">
    {[
      { label: "Skin Care Services", icon: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" },
      { label: "Hair Styling Services", icon: "https://cdn.pixabay.com/photo/2018/02/14/21/45/woman-3153999_1280.jpg" },
      { label: "Cosmetics Services", icon: "https://images.pexels.com/photos/5069401/pexels-photo-5069401.jpeg" },
      { label: "Make-Up Services", icon: "https://img.freepik.com/free-photo/team-bride-celebrating-before-wedding_23-2149329143.jpg?t=st=1736522338~exp=1736525938~hmac=023df7c8a0a861bc1b929f645c279ad4b967d271e10e0471c4b969c8ccefeeb7&w=740" },
    ].map((service, index) => (
      <div
        key={index}
        className="relative w-[280px] h-[400px] bg-white shadow-lg overflow-hidden rounded-xl transform hover:scale-105 transition-all duration-300"
      >
        <img
          src={service.icon}
          alt={service.label}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <h3 className="text-2xl font-bold uppercase">{service.label}</h3>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Testimonials Section */}
        <section className="py-16 bg-gradient-to-b from-[#fef9f9] to-[#f6f1f1]">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-display font-bold text-[#2A2A2A] tracking-wide">
      What Our Clients Say
    </h2>
    <p className="text-[#707070] mt-4 text-lg font-serif">
      Discover how our clients feel about their transformation journeys with us.
    </p>
  </div>
  <div className="flex flex-wrap justify-center gap-8 px-6">
    {[
      {
        name: "Sarah",
        feedback:
          "The service was amazing! My hair has never looked better. Highly recommend!",
        image:
          "https://i.mdel.net/i/db/2018/1/829928/829928-500w.jpg",
      },
      {
        name: "Emma",
        feedback:
          "I had a relaxing experience. The facial treatment left my skin glowing!",
        image:
          "https://c4.wallpaperflare.com/wallpaper/276/354/404/emma-roberts-wallpaper-preview.jpg",
      },
    ].map((testimonial, index) => (
      <div
        key={index}
        className="w-full md:w-1/3 text-center bg-white p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-105"
      >
        <div className="relative mb-6">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full mx-auto shadow-lg border-4 border-[#F28E8E]"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-[#F28E8E] bg-opacity-20 rounded-full">
            <span className="text-white font-bold text-sm tracking-wide">
              Loved it!
            </span>
          </div>
        </div>
        <p className="text-lg font-serif text-[#555] italic leading-relaxed">
          "{testimonial.feedback}"
        </p>
        <p className="mt-6 font-semibold text-[#333] text-xl">
          {testimonial.name}
        </p>
      </div>
    ))}
  </div>
</section>


{/* Write a Review Section */}
<section className="py-16 bg-gradient-to-r from-[#E8F6F3] via-[#D1EEE7] to-[#BDE4DD]">
  <div className="container mx-auto px-6 lg:px-20">
    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-display font-bold text-[#204E4A] tracking-wider">
        Share Your <span className="text-[#2FA79B]">Experience</span>
      </h2>
      <p className="mt-5 text-base md:text-lg text-[#4D7A74] font-serif max-w-2xl mx-auto">
        Help us grow by sharing your honest feedback. Your reviews help others
        and us to keep improving!
      </p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Image Section */}
      <div className="flex justify-center">
        <img
          src="https://images.pexels.com/photos/7755651/pexels-photo-7755651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Happy Customer"
          className="rounded-xl shadow-lg transform transition-all hover:scale-110 duration-500 ease-in-out"
        />
      </div>
      {/* Form Section */}
{/* Form Section */}
<div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
  <form className="space-y-6" onSubmit={handleSubmit}>
    {/* Input Fields */}
    <div className="space-y-4">
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Full Name"
        className="w-full p-4 bg-[#F3FDFB] border border-[#A8DAD5] rounded-xl focus:ring-4 focus:ring-[#84C8BF] focus:outline-none font-serif"
      />
    </div>
    <textarea
      id="review"
      value={review}
      onChange={(e) => setReview(e.target.value)}
      placeholder="Write your review here..."
      className="w-full p-4 bg-[#F3FDFB] border border-[#A8DAD5] rounded-xl focus:ring-4 focus:ring-[#84C8BF] focus:outline-none font-serif"
      rows="5"
      required
    ></textarea>
    {/* Rating Dropdown */}
    <div className="flex items-center gap-4">
      <label htmlFor="rating" className="font-serif text-lg text-[#204E4A]">
        Rating:
      </label>
      <select
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="p-4 bg-[#F3FDFB] border border-[#A8DAD5] rounded-xl focus:ring-4 focus:ring-[#84C8BF] focus:outline-none font-serif"
      >
        <option value="">Select a rating</option>
        {[...Array(5).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1} Star{num > 0 && "s"}
          </option>
        ))}
      </select>
    </div>
    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-[#84C8BF] to-[#2FA79B] text-white px-6 py-4 rounded-full text-lg font-bold shadow-md hover:opacity-90 transition-all duration-300"
    >
      Submit Review
    </button>
  </form>
</div>

    </div>
  </div>
</section>
      </div>
    </div>
  );
};

export default Dashboard;
