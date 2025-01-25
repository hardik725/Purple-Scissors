import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { Link } from 'react-router';
import ProductNavbar from '../ProductNavbar/ProductNavbar';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const ProductHome = ({ email, userName, onLogout }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nord,setNord] = useState(0);
  const [nwish,setNwish] = useState(0);
  const [ncart,setNcart] = useState(0);
  const [heroImages,setHeroImages] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    setHeroImages(isMobile ? mobilepic : deskpic); // Set initial images based on screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]); // Re-run effect if `isMobile` changes

  const deskpic = [
    "https://beautypalace.s3.amazonaws.com/images/Beauty-Palace/bpkertainwebbanner.jpg",
    "https://beautypalace.s3.amazonaws.com/images/Beauty-Palace/bpwebskintreatmentbanner.jpg"
  ];
  const mobilepic = [
    "https://beautypalace.s3.amazonaws.com/images/Beauty-Palace/bpmobilebannerkertaintreatment_1.jpg",
    "https://beautypalace.s3.amazonaws.com/images/Beauty-Palace/luxliss_.jpg"
  ]
    useEffect(() => {
      const fetchNumbers = async () => {
        try {
          const response = await fetch("https://purple-scissors.onrender.com/user/allnum", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: email,
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const data = await response.json();
          setNord(data[0]);
          setNwish(data[1]);
          setNcart(data[2]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchNumbers();
    }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change every 5000ms (5 seconds)

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [heroImages.length]);

  return (
    <div className="salon-homepage bg-white">
      {/* Navbar */}
      <div className='bg-black'>
      <Navbar email={email} userName={userName} onLogout={onLogout} />
      </div>
      <ProductNavbar norder={nord} ncart={ncart} nwish={nwish}/>

      {/* Category Section */}
      <section className="categories pt-6 bg-black">
      <div className="text-center mb-4">
  <h2 className="relative text-4xl font-kugile text-white inline-block after:content-[''] after:block after:w-3/4 after:h-[2px] after:bg-purple-800 after:mx-auto after:mt-2
  
  ">
    Categories
  </h2>
</div>

  
<div className="py-8 font-kugile bg-center bg-cover backdrop-blur-2xl"
  style={{
    backgroundImage:
      'url(https://img.freepik.com/free-photo/floral-beauty-concept_23-2147817695.jpg?t=st=1737795804~exp=1737799404~hmac=fdf4159a9dc79a8f7517d5a6d0383522c328716d0795ae88b1ea84fa0ea3a2b5&w=900)',
  }}
>
  <Swiper
    slidesPerView={2}
    spaceBetween={20}
    breakpoints={{
      768: {
        slidesPerView: 4, // Show 4 categories for larger screens
      },
    }}
    loop={true} // Enables infinite looping
    autoplay={{
      delay: 0, // Delay between slides
      disableOnInteraction: false, // Keeps autoplay running even after interaction
    }}
    speed={2000} // Adjust the speed of transition
    modules={[Autoplay]} // Include Autoplay module
    className="px-4 sm:px-6 lg:px-8"
  >
    {[
      {
        name: "Hair Care",
        imageUrl: "https://images.pexels.com/photos/8467976/pexels-photo-8467976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        name: "Skin Care",
        imageUrl: "https://img.freepik.com/premium-photo/copy-space-organic-cosmetics_926199-3790091.jpg?uid=R156822350&ga=GA1.1.1729476715.1720013001&semt=ais_incoming",
      },
      {
        name: "Face Care",
        imageUrl:
          "https://media.istockphoto.com/id/1400306506/photo/spa-natural-organic-cosmetics-packaging-design-set-of-transparent-glass-bottles-moisturizer.jpg?s=612x612&w=0&k=20&c=H0JF_ehdwFYTK2uJUrM-Ztf7r-DEa23jnpKboCA6L9c=",
      },
      {
        name: "Make Up",
        imageUrl:
          "https://media.istockphoto.com/id/487770577/photo/makeup-set-on-table-front-view.jpg?s=612x612&w=0&k=20&c=IS_ZuHCF3N66jhDMwt2s7J_PGWABlpv2ISEAwpJ4JKU=",
      },
    ].map((category, index) => (
      <SwiperSlide key={index}>
        <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative group">
          <div
            className="category-image h-48 sm:h-56 md:h-64 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('${category.imageUrl}')`,
            }}
          >
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center border-2 border-purple-300 shadow-md">
          <h3 className="text-white text-[22px]  md:text-3xl font-bold">
            {category.name}
          </h3>
        </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

</section>


      {/* Sliding Offers Section */}
      <section className="offers-section relative bg-gray-100 mx-[1px]">
      <div
        className="hero-image w-full h-auto bg-cover bg-center rounded-lg shadow-md transition-transform duration-500"
        style={{
          backgroundImage: `url(${heroImages[currentImageIndex]})`,
          aspectRatio: isMobile ? '3/2' : '32/9', // Helps maintain the aspect ratio
        }}
      ></div>
    </section>



      {/* Top Categories Section */}
      <div
  className="bg-center bg-cover bg-no-repeat min-h-screen backdrop-blur-2xl"
  style={{
    backgroundImage:
      'url(https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
  }}
>
      <section className="top-categories  py-8 bg-inherit">
  <div className="text-center mb-8 sm:mb-12">
    <h2 className="relative text-3xl sm:text-4xl font-kugile text-white inline-block 
        after:content-[''] after:block after:w-3/4 after:h-[2px] after:bg-purple-600 
        after:mx-auto after:mt-2">
      Top Products
    </h2>
  </div>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 max-w-5xl mx-auto">
    {[
      { name: "Shampoo", image: "https://images.pexels.com/photos/18186006/pexels-photo-18186006/free-photo-of-containers-of-herbal-shampoo-standing-on-a-table.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
      { name: "Conditioners", image: "https://images.pexels.com/photos/7428103/pexels-photo-7428103.jpeg?cs=srgb&dl=pexels-cottonbro-7428103.jpg&fm=jpg" },
      { name: "Serums", image: "https://www.arata.in/cdn/shop/files/intensive-hair-growth-serum-30ml-422.webp?v=1732633264" },
      { name: "Hair Tools", image: "https://media.istockphoto.com/id/911459410/photo/clippers-hair-clippers-hair-scissors-haircut-accessories.jpg?s=612x612&w=0&k=20&c=8EzVSwJWqOxoZAOH7_OVIhsJyfDo7x1_CqlLwA47SQs=" },
    ].map((category, index) => (
      <div
        key={index}
        className="category-card bg-white border-2 border-purple-300 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-1 text-center">
          <h3 className="text-sm font-medium text-gray-800">{category.name}</h3>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Companies Section */}
      <section className="companies-section bg-inherit py-8 ">
  <div className="text-center mb-8">
    <h2 className="relative text-3xl sm:text-4xl font-kugile text-white inline-block
        after:content-[''] after:block after:w-3/4 after:h-[2px] after:bg-indigo-600 
        after:mx-auto after:mt-2">
      Featured Brands
    </h2>
  </div>

  <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 px-2 sm:px-8 max-w-6xl mx-auto">
    {[
      { name: "Raaga", image: "https://i.ibb.co/P18d5rT/Screenshot-2025-01-15-031844.png" },
      { name: "Lakme", image: "https://i.pinimg.com/736x/55/90/0b/55900beeff90476e34df8f7303a060e3.jpg" },
      { name: "Jeannot", image: "https://media.licdn.com/dms/image/v2/C4D0BAQF7gCNqsydsBA/company-logo_200_200/company-logo_200_200/0/1642568688292/jeannotceuticals_logo?e=2147483647&v=beta&t=94KAZceQfOd3DmNXD9N23FL4go_HCxLedwQgaxUjxgI" },
      { name: "VLCC", image: "https://images.seeklogo.com/logo-png/52/2/vlcc-personal-care-logo-png_seeklogo-521769.png?v=1958556243998270512" },
      { name: "Matrix", image: "https://e7.pngegg.com/pngimages/119/404/png-clipart-hair-matrix-logo-brand-font-product-matrix-logo-text-logo.png" },
    ].map((brand, index) => (
      <Link
        key={index}
        to={`/companyproduct/${brand.name}/${encodeURIComponent(brand.image)}`}
        className="company-card bg-white border-2 border-indigo-300 shadow-md rounded-lg p-2 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      >
        <img
          src={brand.image}
          alt={brand.name}
          className="w-24 sm:w-36 object-contain mb-2"
        />
      </Link>
    ))}
  </div>
</section>
</div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        © 2025 Salon Products | All Rights Reserved
      </footer>
    </div>
  );
};

export default ProductHome;
