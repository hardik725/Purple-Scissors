import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Dashboard = ({ email, userName, onLogout }) => {
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
      className="min-h-screen bg-cover bg-center bg-fixed -z-20 font-kugile"
      style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/18/13/10/female-1834381_1280.jpg')" }}
    >
      {/* Overlay for better readability */}
      <div className="bg-white bg-opacity-10 backdrop-blur-xl min-h-screen overflow-x-hidden">
      <section
  className="relative bg-cover bg-center w-full h-[600px] md:h-[700px]"
  style={{
    backgroundImage: `url('https://images.pexels.com/photos/6724383/pexels-photo-6724383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
  }}
>
  {/* Darker Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>

  {/* Background effect for text */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 z-0"></div>

  {/* Navbar */}
  <div className="relative z-20">
    <Navbar email={email} userName={userName} onLogout={onLogout} />
  </div>

  {/* Hero Content */}
  <div className="relative w-full md:w-1/2 ml-auto pl-4 pr-4 md:pl-10 text-center md:text-left z-10 pt-16 md:pt-20">
    <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white hover:text-[#9B59B6] transition-colors duration-300 leading-tight">
      <span className="bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] text-transparent bg-clip-text">
        Timeless Beauty
      </span>{" "}
      Unveiled
    </h1>
    <p className="text-[#E5E5E5] mt-6 text-[16px] md:text-2xl leading-relaxed shadow-lg md:mx-[80px] font-bodoni-italic">
  Step into a world of{" "}
  <span className="text-[#8E44AD] font-bold">elegance</span> and pampering
  at{" "}
  <span className="text-[#9B59B6] underline decoration-[#8E44AD]">
    Purple Scissors
  </span>
  , where <span className="italic text-[#9B59B6]">beauty</span> meets
  artistry. From flawless{" "}
  <span className="font-semibold text-[#8E44AD]">hairstyles</span> to
  radiant{" "}
  <span className="font-semibold text-[#9B59B6]">skin treatments</span>, we
  bring out the{" "}
  <span className="text-[#8E44AD] font-bold">best version</span> of you.
  Let your <span className="text-[#9B59B6] font-bold">confidence</span>{" "}
  bloom with every visit!
</p>

    <div className="flex justify-center">
    <Link to="/appointment">
      <button className="mt-8 bg-[#9B59B6] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-xl hover:bg-[#8E44AD] transition-all duration-300">
        Book an Appointment
      </button>
    </Link>
    </div>
  </div>
</section>



        {/* Services Section */}
        <section className="py-8 bg-[#F3F4F6] bg-opacity-0 backdrop-blur-md">
  <div className="text-center mb-10">
    <h2 className="text-4xl font-kugile font-bold text-black uppercase tracking-wide">Our Services</h2>
    <div className="mt-2 w-16 h-1 bg-black mx-auto rounded"></div>
  </div>
  <div className="flex flex-wrap justify-center gap-8">
  {[
    { label: "Body & Beauty Essentials", icon: "https://static.vecteezy.com/system/resources/previews/003/746/221/non_2x/female-hands-with-nail-file-vector.jpg", id: "essentialspage" },
    { label: "Hair Styling Services", icon: "https://static.vecteezy.com/system/resources/previews/024/653/219/large_2x/beautiful-art-nouveau-lady-with-nice-hair-and-flower-illustration-vector.jpg", id: "hairpage" },
    { label: "Facial Services", icon: "https://static.vecteezy.com/system/resources/previews/007/008/729/non_2x/a-professional-beautician-applying-the-clay-mask-to-the-client-s-face-concept-free-vector.jpg", id: "facepage" },
    { label: "Make-Up Services", icon: "https://static.vecteezy.com/system/resources/previews/052/255/383/non_2x/elegant-woman-with-bun-hairstyle-in-line-art-surrounded-by-pastel-leaves-and-abstract-shapes-evoking-a-feeling-of-peace-and-tranquility-free-vector.jpg", id: "makeuppage" },
  ].map((service, index) => (
    <Link 
      to={`/${service.id}`} 
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
    </Link>
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
