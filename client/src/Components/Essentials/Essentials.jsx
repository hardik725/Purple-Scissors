import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const Essentials = ({ email, userName, onLogout }) => {
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
      title: "Nail Care",
      image: "https://img.freepik.com/free-photo/woman-doing-manicure-client-close-up_23-2148697076.jpg?t=st=1736960428~exp=1736964028~hmac=c14eef6ff560097272deb78decba1464ebe8c5403e88bfc41afc9aecbe94ab47&w=1380",
      services: [
        "Manicure & Pedicure",
        "Gel Nails",
        "Nail Art",
        "Cuticle Care",
        "Acrylic Nail Extensions",
        "Nail Strengthening Treatments",
        "French Manicure",
      ],
    },
    {
      title: "Threading & Waxing",
      image: "https://media.istockphoto.com/id/603912306/photo/master-in-the-cabin-removes-facial-hair-strand.jpg?s=612x612&w=0&k=20&c=FdMxBRQyZNn98Cvc7Okg_dmujvsrmBHbBzr3XluzT_8=",
      services: [
        "Eyebrow Threading",
        "Full Face Threading",
        "Body Waxing",
        "Sensitive Skin Waxing",
        "Brazilian Wax",
        "Underarm Waxing",
        "Leg & Arm Waxing",
      ],
    },
    {
      title: "Body Grooming",
      image: "https://media.istockphoto.com/id/1372281793/photo/woman-body-and-face-skin-care-cosmetics-women-shoulder-hand-massage-beauty-model-with-armpit.jpg?s=612x612&w=0&k=20&c=FFN6kJ6yBxggSxcOKWMRJVtWADL98W0HCbnHiYuC3-M=",
      services: [
        "Body Polishing",
        "Exfoliation Treatments",
        "Hair Removal Services",
        "Back Scrubs",
        "Skin Hydration Treatments",
        "Scalp Treatments",
        "Collagen Boosting Therapy",
      ],
    },
    {
      title: "Spa & Relaxation",
      image: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      services: [
        "Body Massage",
        "Aromatherapy",
        "Detox Treatments",
        "Foot Spa",
        "Hot Stone Therapy",
        "Deep Tissue Massage",
        "Reflexology",
      ],
    },
  ];
  

  if (!isMobile) {
    return (
      <div className="bg-white text-black font-kugile relative">
        <Navbar email={email} userName={userName} onLogout={onLogout} />

        <div className="bg-gradient-to-r from-purple-300 via-gray-400 to-gray-300 text-center text-6xl font-extrabold text-black p-8 shadow-lg flex justify-center items-center hover:border-gray-500 transition duration-300">
  Essentials Section
</div>


        <div className="space-y-12 relative z-10 mt-2">
          {categories.map((category, index) => {
            const marginTop = category.services.length * 31;

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

        <div className="mt-8 p-6 bg-green-600 text-white text-center rounded-lg shadow-md">
          <h3 className="text-4xl font-bold mb-4">Relax & Rejuvenate!</h3>
          <p className="text-lg mb-6">
            Discover our personalized grooming services. Click below to book now.
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
        <div className="bg-gradient-to-r from-purple-300 via-gray-400 to-gray-300 text-center text-6xl font-extrabold text-white p-8 shadow-lg flex justify-center items-center hover:border-green-400 transition duration-300">
          Essentials Section
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

export default Essentials;
