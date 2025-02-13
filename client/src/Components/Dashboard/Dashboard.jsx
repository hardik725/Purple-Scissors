import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import Loader from "../Loader/Loader";
import ShinyText from "../Animations/ShinyText";
import SplitText from "../Animations/SplitText";

const Dashboard = ({ email, userName, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://purple-scissors.onrender.com/review/allreviews"
        );
        const data = await response.json();
        setReviews(data); // Set fetched reviews
        setLoading(false); // Indicate loading completion
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, [email]);

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
  
  if(!reviews){
    return (<div><Loader/></div>);
  }else{
  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center bg-fixed -z-20 font-kugile"
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
  <div className="relative w-full md:w-1/2 ml-auto md:pl-10  text-center md:text-left z-10 pt-16 md:pt-20">
<h1 className="text-4xl md:text-5xl font-display font-extrabold text-white hover:text-[#9B59B6] transition-colors duration-300 leading-tight text-center">
<div className="text-[#9B59B6] mb-3 md:mb-5"> 
<SplitText
  text="Timeless Beauty"
  className="text-4xl md:text-5xl font-display font-bold tracking-wide w-full text-center"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
/>
</div>


  {" "}Unveiled
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
    <button
      className="mt-8 relative overflow-hidden bg-gradient-to-r from-[#9B59B6] via-[#8E44AD] to-[#9B59B6] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-xl hover:bg-[#8E44AD] transition-all duration-300"
    >
      <span className="relative z-10">Book an Appointment</span>
      <span className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-50 w-full h-full transform translate-x-[-150%] rotate-45 pointer-events-none shine-effect"></span>
    </button>
  </Link>
</div>



  </div>
</section>



        {/* Services Section */}
        <section
  className={`py-8 bg-opacity-50 backdrop-blur-sm ${
    isMobile
      ? "bg-gradient-radial from-[#B369D8] via-black to-black"
      : "bg-gradient-to-tr from-[#B369D8] via-black to-black"
  }`}
>
<div className="text-center mb-10">
      <h2 className="relative text-4xl font-kugile font-bold uppercase tracking-wide">
        <ShinyText text="Our Services" speed={3} className="inline-block" />
        {/* Underline */}
        <span className="block mt-2 w-24 h-[2px] bg-white mx-auto"></span>
      </h2>
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
        <section className="py-10 bg-gradient-to-b from-[#fef9f9] to-[#f6f1f1]">
      <div className="text-center mb-12">
      <div className="text-center mb-10">
    <SplitText
      text="What Our Clients Say"
      className="text-4xl font-display font-bold text-[#2A2A2A] tracking-wide"
      delay={150}
      animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
      animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
      easing="easeOutCubic"
      threshold={0.2}
      rootMargin="-50px"
    />
  </div>
        <p className="text-[#707070] mt-4 text-lg font-serif">
          Discover how our clients feel about their transformation journeys with
          us.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-lg text-gray-500">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            768: {
              slidesPerView: 2, // Show 2 reviews for devices wider than 768px
            },
          }}
          loop={reviews.length >= 3} // Enable loop only if there are at least 3 reviews
          autoplay={{
            delay: 0, // No delay, continuous movement
            disableOnInteraction: true, // Prevent user interaction from pausing autoplay
          }}
          speed={3000} // Adjust speed of continuous motion
          allowTouchMove={false} // Disable user swiping/interaction
          modules={[Autoplay]} // Include Autoplay module
          className="px-6"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="text-center bg-white p-6 m-2 rounded-2xl shadow-xl transition-transform transform hover:scale-105 h-[302px]">
                <div className="relative mb-6">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
                    alt={review.name}
                    className="w-20 h-20 rounded-full mx-auto shadow-lg border-4 border-[#F28E8E]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-[#F28E8E] bg-opacity-20 rounded-full">
                    <span className="text-white font-bold text-sm tracking-wide">
                      Loved it!
                    </span>
                  </div>
                </div>
                <p className="text-lg font-serif text-[#555] italic leading-relaxed">
                  "{review.Review}"
                </p>
                <div className="flex justify-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        i < review.Rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-6 font-semibold text-[#333] text-xl">
                  {review.Name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center text-lg text-gray-500">No reviews available</div>
      )}
    </section>

<section className="relative w-full bg-gradient-radial-next shadow-lg ">
  {/* Background Section */}
  <div
    className="w-full h-[300px] md:h-[500px] bg-cover bg-center relative overflow-hidden"
    style={{
      backgroundImage:
        "url('https://img.freepik.com/premium-photo/cosmetic-products_551707-6705.jpg?uid=R156822350&ga=GA1.1.1729476715.1720013001&semt=ais_hybrid')",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 md:px-10">
      <h1 className="text-3xl md:text-5xl font-bold leading-tight">
        Welcome to Your Ultimate Shopping Destination
      </h1>
      <p className="mt-3 text-sm md:text-lg text-gray-200">
        Discover categories tailored to your style and premium brands you'll
        love.
      </p>
    </div>
  </div>

  {/* Separation line to create distinction */}
  <div className="relative w-full h-[3px] bg-gradient-to-r from-[#B5CFB7] via-[#B0E0C2] to-[#9BDB9C]"></div>

  {/* Categories Section */}
  <div className="grid grid-cols-3 gap-2 md:gap-6 px-4 md:px-10 mt-2">
    {[{ name: "Hair Care", imageUrl: "https://images.pexels.com/photos/8467976/pexels-photo-8467976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      { name: "Skin Care", imageUrl: "https://img.freepik.com/premium-photo/copy-space-organic-cosmetics_926199-3790091.jpg?uid=R156822350&ga=GA1.1.1729476715.1720013001&semt=ais_incoming" },
      { name: "Make Up", imageUrl: "https://media.istockphoto.com/id/487770577/photo/makeup-set-on-table-front-view.jpg?s=612x612&w=0&k=20&c=IS_ZuHCF3N66jhDMwt2s7J_PGWABlpv2ISEAwpJ4JKU=" }].map((category, index) => (
      <div
        key={index}
        className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      >
        <div
          className="h-[150px] md:h-[220px] bg-cover bg-center"
          style={{ backgroundImage: `url('${category.imageUrl}')` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <h3 className="text-white text-sm  md:text-2xl font-bold">
            {category.name}
          </h3>
        </div>
      </div>
    ))}
  </div>

  {/* Premium Brands Section */}
  <div className="grid grid-cols-3 gap-2 md:gap-6 px-4 sm:px-8 max-w-5xl mx-auto mt-2 pb-2">
    {[{ name: "Lakme", image: "https://i.pinimg.com/736x/55/90/0b/55900beeff90476e34df8f7303a060e3.jpg" },
      { name: "Jeannot", image: "https://media.licdn.com/dms/image/v2/C4D0BAQF7gCNqsydsBA/company-logo_200_200/company-logo_200_200/0/1642568688292/jeannotceuticals_logo?e=2147483647&v=beta&t=94KAZceQfOd3DmNXD9N23FL4go_HCxLedwQgaxUjxgI" },
      { name: "VLCC", image: "https://images.seeklogo.com/logo-png/52/2/vlcc-personal-care-logo-png_seeklogo-521769.png?v=1958556243998270512" },
    ].map((brand, index) => (
      <div
        key={index}
        className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      >
        <div
          className="h-[150px] md:h-[220px] w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${brand.image}')` }}
        ></div>
      </div>
    ))}
  </div>
  <div className="mt-6 flex justify-center pb-5">
  <Link to="/product">
  <button className="relative px-6 py-4 md:py-5 bg-gradient-to-r from-black to-gray-700 text-white font-bold text-sm md:text-lg rounded-full shadow-md hover:shadow-lg hover:from-black hover:to-gray-600 transition-all duration-300 overflow-hidden">
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-xl transform -translate-x-full animate-horizontal-shine"></span>
    <span className="relative">Explore More</span>
  </button>
</Link>

  </div>
</section>

{/* Write a Review Section */}
<section className="py-16 bg-gradient-green-purple shadow-lg">
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
    </>
  );
}
};

export default Dashboard;
