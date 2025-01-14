import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const MakeupPage = ({ email, userName, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const categories = [
    {
      title: "Bridal Makeup",
      image:
        "https://i.ibb.co/RPGxQQt/anushkasharma.jpg",
      services: ["Classic Bridal Look", "Airbrush Makeup", "HD Bridal Makeup", "Contemporary Bridal Styles"],
    },
    {
      title: "Party Makeup",
      image:
        "https://images.pexels.com/photos/3779002/pexels-photo-3779002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      services: ["Evening Glam Look", "Cocktail Party Makeup", "Themed Party Styles", "Custom Glitter Effects"],
    },
    {
      title: "Professional Makeup",
      image:
        "https://images.pexels.com/photos/6476061/pexels-photo-6476061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      services: ["Corporate Looks", "Photo Shoot Makeup", "Editorial Makeup", "Interview Ready Styles"],
    },
    {
      title: "Everyday Makeup",
      image:
        "https://images.pexels.com/photos/4753901/pexels-photo-4753901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      services: ["Subtle Day Look", "Natural Glow", "No-Makeup Makeup Look", "Minimalist Styles"],
    },
  ];

  if (!isMobile) {
    return (
      <div className="bg-[#FBEAEF] text-black font-kugile relative">
        <Navbar email={email} userName={userName} onLogout={onLogout} />

        <div className="bg-gradient-to-r from-pink-600 via-red-400 to-pink-600 text-center text-6xl font-extrabold text-white p-8 shadow-lg flex justify-center items-center hover:border-pink-400 transition duration-300">
          Makeup Section
        </div>

        <div className="space-y-12 relative z-10">
          {categories.map((category, index) => {
            const marginTop = category.services.length * 39;

            return (
              <div
                key={index}
                className="relative mx-auto w-11/12 lg:w-3/5"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "600px",
                  marginBottom: `${marginTop}px`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {category.title}
                  </h2>
                </div>

                <ul
                  className={`absolute w-11/12 md:w-1/2 bg-black bg-opacity-80 p-6 space-y-4 shadow-lg font-forum ${
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

        <div className="mt-8 p-6 bg-pink-600 text-white text-center rounded-lg shadow-md">
          <h3 className="text-4xl font-bold mb-4">Shine With Our Expertise!</h3>
          <p className="text-lg mb-6">
            Explore tailored services that bring out your best. Click below to book now.
          </p>
          <button className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-md hover:bg-yellow-300 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-100 text-black font-kugile">
        <Navbar email={email} userName={userName} onLogout={onLogout} />
        <div className="bg-gradient-to-r from-pink-600 via-red-400 to-pink-600 text-center text-6xl font-extrabold text-white p-8 shadow-lg flex justify-center items-center hover:border-pink-400 transition duration-300">
          Makeup Section
        </div>

        <div>
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              <div
                className="h-64 bg-cover bg-center flex justify-center items-center text-center"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <h2 className="text-3xl font-bold text-black tracking-wide uppercase bg-white opacity-65 p-1">
                  {category.title}
                </h2>
              </div>

              <ul className="p-6 bg-black text-white space-y-2 opacity-90 font-forum">
                {category.services.map((service, i) => (
                  <li
                    key={`${service.name}-${i}`}
                    className="flex justify-between text-sm"
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

export default MakeupPage;
