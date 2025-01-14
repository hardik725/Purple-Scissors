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
    <div className="bg-white text-black">
      {/* Navbar */}
      <Navbar email={email} onLogout={onLogout} />

      {/* Categories */}
      <div className="space-y-12">
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
                style={{ top: "60%", maxHeight: `${category.services.length*55}px` }}
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
    </div>
  );
}else{
    return( 
        <div className="bg-gray-100 text-black font-kugile">
        {/* Navbar */}
        <Navbar email={email} onLogout={onLogout} />
  
        {/* Categories */}
        <div className=" py-4">
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
