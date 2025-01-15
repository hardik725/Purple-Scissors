import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const FacePage = ({ email, userName, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    {
      title: "Facials & Cleanups",
      image:
        "https://media.istockphoto.com/id/1393108496/photo/sensual-photo-of-beautiful-young-asian-woman-with-with-eyes-closed-applying-cotton-facial.jpg?s=612x612&w=0&k=20&c=5ZIDY_Pt7m9MBIcNEWJnGM7ckhKpvAtBOzKhqTlobl0=",
      services: [
        "Basic Cleanup (Oily, Dry, Combination Skin)",
        "Advanced D Tan Cleanup",
        "Bleach (Gold, Diamond, Oxy, Platinum)",
        "Gold Facial",
        "Diamond Facial",
        "Insta Glow Facial (Gold, Diamond, Silver)",
        "Chandan Facial",
        "Fruit Facial (Banana, Kiwi, Papaya, Grapes)",
        "Wine Facial",
        "Chocolate Facial",
        "Hydrating Glow Facial",
        "Brightening Facial",
        "Anti-Pollution Facial",
      ],
    },
    {
      title: "Skin Treatments",
      image:
        "https://images.pexels.com/photos/3738355/pexels-photo-3738355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      services: [
        "Face Pigmentation Treatment",
        "Acne Treatment",
        "Anti-Aging Treatment (Age Lock Therapy)",
        "Ozone Therapy",
        "Scalp & Skin Detox",
        "Collagen Boost Therapy",
        "Skin Tightening Treatment",
        "Dark Circle Reduction",
        "Skin Brightening Therapy",
        "Chemical Peels (Mild & Intense)",
      ],
    },
    {
      title: "Customized Services",
      image:
        "https://media.istockphoto.com/id/1202956145/photo/cheerful-girlfriends-with-face-masks-wearing-bathrobes-drinking-champagne.jpg?s=612x612&w=0&k=20&c=Bv1aYWi-B74IVxwrbIUXVQLwacb8qtXBmc6RW45bHdE=",
      services: [
        "Oily Skin Cleanup",
        "Dry Skin Cleanup",
        "Combination Skin Cleanup",
        "Customized Facials for Sensitive Skin",
        "Blackhead & Whitehead Removal",
        "Pore Refining Treatments",
        "Soothing Therapy for Irritated Skin",
        "Pre-Bridal & Bridal Custom Facials",
      ],
    },
    {
      title: "Premium & Branded Services",
      image:
        "https://as2.ftcdn.net/v2/jpg/09/45/49/19/1000_F_945491939_l6s62aubKJtJv4PD9NbvD7oVH2bRPKB8.jpg",
      services: [
        "Raga Facial",
        "Lotus Facial",
        "O3+ Therapy",
        "Shahnaz Gold Facial",
        "Jannot Facial",
        "Labell Anti-Aging Treatment",
        "Luxury Gold Facial",
        "Platinum Facial",
        "24K Gold Radiance Treatment",
        "Herbal & Organic Skin Care Facial",
        "O3+ Whitening Treatment",
      ],
    },
  ];
  

  if (!isMobile) {
    return (
      <div className="bg-[#EDEDFD] text-black font-kugile relative">
        {/* Navbar */}
        <Navbar email={email} userName={userName} onLogout={onLogout} />

        {/* Face Section Header */}
        <div className="bg-gradient-to-r from-gray-800 via-black to-gray-800 text-center text-6xl font-extrabold text-white p-8 shadow-lg flex justify-center items-center hover:border-gray-400 transition duration-300">
          Face Services
        </div>

        {/* Categories Section */}
        <div className="space-y-12 relative z-10 mt-2">
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

        {/* Call-to-Action Section */}
        <div className="mt-8 p-6 bg-gray-800 text-white text-center rounded-lg shadow-md">
          <h3 className="text-4xl font-bold mb-4">Explore Our Face Services!</h3>
          <p className="text-lg mb-6">
            Discover a wide range of services tailored to your skincare needs. Click below to learn more.
          </p>
          <button className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-100 text-black font-kugile">
        {/* Navbar */}
        <Navbar email={email} userName={userName} onLogout={onLogout} />

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 via-black to-gray-800 text-center text-6xl font-extrabold text-white p-8 shadow-lg flex justify-center items-center hover:border-gray-400 transition duration-300">
          Face Services
        </div>

        {/* Categories */}
        <div>
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="h-64 bg-cover bg-center flex justify-center items-center text-center"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <h2 className="text-3xl font-bold text-black tracking-wide uppercase bg-white opacity-75 p-1">
                  {category.title}
                </h2>
              </div>

              {/* Services */}
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

export default FacePage;
