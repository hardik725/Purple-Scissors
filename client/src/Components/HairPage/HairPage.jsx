import React from "react";
import { useState,useEffect } from "react";
import Navbar from "../Navbar/Navbar";


const HairPage = ({ email, onLogout }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
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
  const categories = [
    {
      title: "Haircuts & Styles",
      image:
        "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      services: [
        "Single Length Cut",
        "U Cut",
        "V Cut",
        "Layers",
        "Millennium Cut",
        "Full Laser Cut",
        "Graduation Cut",
        "Straight Style",
        "Curl Style",
        "Crimping",
        "Jura (Hair Bun)",
        "Custom Styling",
      ],
    },
    {
      title: "Hair Treatments",
      image:
        "https://as1.ftcdn.net/v2/jpg/09/66/01/90/1000_F_966019067_zc1ScIkFNADnvR5WU8WlauRCyWc9L20G.jpg",
      services: [
        "Hair Straightening",
        "Rebonding",
        "Smoothening",
        "Keratin Treatment",
        "Hair Botox",
        "Dandruff Treatment",
        "Hair Fall Treatment",
        "Protein Mask Therapy",
        "Scalp Detox Treatment",
      ],
    },
    {
      title: "Hair Coloring",
      image:
        "https://images.pexels.com/photos/20894394/pexels-photo-20894394/free-photo-of-hair-coloring-in-beauty-salon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      services: [
        "Global Coloring",
        "Partial Highlight",
        "Full Highlight",
        "Balayage",
        "Ombre",
        "Root Touch-Up",
        "Toner Application",
        "Customized Hair Shades",
      ],
    },
    {
      title: "Hair Spa & Care",
      image:
        "https://images.pexels.com/photos/7755680/pexels-photo-7755680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      services: [
        "Deep Conditioning",
        "Hot Oil Treatment",
        "Hair Spa",
        "Scalp Treatment",
        "Hydration Therapy",
        "Anti-Frizz Care",
        "Strengthening Hair Therapy",
      ],
    },
  ];
  if(!isMobile){
  return (
<div className="bg-[#EDEDFD] text-black font-kugile relative">
  {/* Navbar */}
  <Navbar email={email} onLogout={onLogout} />

  {/* Hair Section Header */}
  <div className="bg-gradient-to-r from-gray-800 via-black to-gray-800 text-center text-6xl font-extrabold text-white p-8 shadow-lg flex justify-center items-center hover:border-gray-400 transition duration-300">
    Hair Section
  </div>

  {/* Decorative Elements */}
  <div className="absolute inset-0 -z-10">
    {/* Add Gradient Decoration */}
    <div className="bg-gradient-to-br from-gray-300 via-white to-gray-200 w-full h-full opacity-30"></div>

    {/* Floating Shapes */}
    <div className="absolute top-10 left-10 w-20 h-20 bg-black rounded-full opacity-10 animate-bounce"></div>
    <div className="absolute bottom-20 right-20 w-16 h-16 bg-gray-700 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute top-40 left-60 w-14 h-14 bg-gray-800 rounded-lg opacity-10 animate-ping"></div>
  </div>

  {/* Categories Section */}
  <div className="space-y-12 relative z-10">
    {categories.map((category, index) => {
      // Calculate dynamic margin-top based on the number of services
      const marginTop = category.services.length * 39; // Adjust multiplier as needed

      return (
        <div
          key={index}
          className="relative mx-auto w-11/12 lg:w-3/5"
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
            marginBottom: `${marginTop}px`,
          }}
        >
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {category.title}
            </h2>
          </div>

          {/* Services List */}
          <ul
            className={`absolute w-11/12 md:w-1/2 bg-black bg-opacity-80 p-6 space-y-4 shadow-lg ${
              index % 2 === 0 ? "left-4" : "right-4"
            }`}
            style={{
              top: "60%",
              maxHeight: `${category.services.length * 55}px`,
            }}
          >
            {category.services.map((service, i) => (
              <li
                key={`${service}-${i}`}
                className="flex justify-between text-white text-lg border-b border-gray-500 pb-2"
              >
                <span>{service}</span>
                <span>Price TBD</span>
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>

  {/* Call-to-Action Section */}
  <div className="mt-8 p-6 bg-gray-800 text-white text-center rounded-lg shadow-md">
    <h3 className="text-4xl font-bold mb-4">Explore Our Top Services!</h3>
    <p className="text-lg mb-6">
      Discover a wide range of services tailored to your needs. Click below to
      learn more.
    </p>
    <button className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 transition duration-300">
      Learn More
    </button>
  </div>
</div>

  );
}else{
    return( 
        <div className="bg-gray-100 text-black font-kugile">
        {/* Navbar */}
        <Navbar email={email} onLogout={onLogout} />
        <div className="bg-gradient-to-r from-gray-800 via-black to-gray-800 text-center text-6xl font-extrabold text-white p-8 shadow-lg flex justify-center items-center hover:border-gray-400 transition duration-300">
    Hair Section
  </div>
  
        {/* Categories */}
        <div >
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg overflow-hidden "
            >
              {/* Background Image */}
              <div
                className="h-64 bg-cover bg-center flex justify-center items-center text-center"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                                <h2 className="text-3xl font-bold text-black tracking-wide uppercase bg-white opacity-65 p-1">
                  {category.title}
                </h2>
              </div>
  
              {/* Overlay with Title */}
  
              {/* Services */}
              <ul className="p-6 bg-black text-white space-y-4 opacity-70">
                {category.services.map((service, i) => (
                  <li
                    key={`${service.name}-${i}`}
                    className="flex justify-between text-lg"
                  >
                    <span>{service}</span>
                    <span>TBD</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
}
};

export default HairPage;
