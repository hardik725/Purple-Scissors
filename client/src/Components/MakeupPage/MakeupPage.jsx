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
        "https://media.istockphoto.com/id/1174369498/photo/an-important-part-of-her-culture.jpg?s=612x612&w=0&k=20&c=pcRZSo9txn1brW0wcVYTey8i6H223DtO8KgKDlBqkcc=",
      services: [
        "Classic Bridal Look",
        "Airbrush Makeup",
        "HD Bridal Makeup",
        "Contemporary Bridal Styles",
        "Traditional Bridal Look",
        "Reception Bridal Makeup",
        "Engagement Ceremony Look",
        "Pre-Bridal Skincare & Makeup Packages",
      ],
    },
    {
      title: "Party Makeup",
      image:
        "https://media.istockphoto.com/id/964839486/photo/nice-rich-independent-confident-successful-luxury-sexy-girl-holding-hat-on-her-head-with-hands.jpg?s=612x612&w=0&k=20&c=O_ikrZq3YgPLt_lRXtLdVa52TjkcVbyBST6OeOx40xA=",
      services: [
        "Evening Glam Look",
        "Cocktail Party Makeup",
        "Themed Party Styles",
        "Custom Glitter Effects",
        "Festive Makeup",
        "Matte Finish Party Look",
        "Glow & Shimmer Makeup",
        "Prom Makeup Styles",
      ],
    },
    {
      title: "Professional Makeup",
      image:
        "https://media.istockphoto.com/id/687244776/photo/makeup-artist-applying-eyeshadow-on-a-girl.jpg?s=612x612&w=0&k=20&c=QkFL3oe-poYi4p1ZaboIOVie_ycRz0fTJG9Ex5LpNoQ=",
      services: [
        "Corporate Looks",
        "Photo Shoot Makeup",
        "Editorial Makeup",
        "Interview Ready Styles",
        "Portfolio Shoot Makeup",
        "Stage & Performance Makeup",
        "TV/Camera Ready Makeup",
        "Custom Professional Looks",
      ],
    },
    {
      title: "Everyday Makeup",
      image:
        "https://img.freepik.com/free-photo/young-woman-applying-compact-powder-with-makeup-brush_23-2148161319.jpg?t=st=1736958825~exp=1736962425~hmac=ed0dd8c53d5ab378a5a929447ecca47ce34e979bbc36fe02be8892ff3f263272&w=1380",
      services: [
        "Subtle Day Look",
        "Natural Glow",
        "No-Makeup Makeup Look",
        "Minimalist Styles",
        "Light Contouring & Highlighting",
        "Casual Party Ready Look",
        "Quick 10-Minute Makeup",
        "Fresh & Dewy Everyday Look",
      ],
    },
  ];
  

  if (!isMobile) {
    return (
      <div className="bg-[#FBEAEF] text-black font-kugile relative">
        <div className="bg-black">
        <Navbar email={email} userName={userName} onLogout={onLogout} />
        </div>
        {/* Face Section Header */}
        <div
  className="relative flex items-center p-8"
  style={{
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/016/733/342/non_2x/big-set-of-elements-and-icons-for-beauty-salon-black-and-white-cosmetics-silhouettes-set-nail-polish-beautiful-woman-face-eyelash-extension-makeup-hairdressing-illustrations-vector.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '500px', // Increased height for better design
  }}
>
  <div className="absolute inset-0 bg-white bg-opacity-40"></div> {/* Semi-transparent overlay */}
  
  <div className="relative w-full lg:w-1/2 text-left p-6 lg:pl-16 text-pink-700">
    <h1 className="text-4xl lg:text-6xl font-extrabold">
      Make Up Services
    </h1>
    <p className="mt-4 text-lg lg:text-xl text-pink-600 leading-relaxed">
    "Where beauty meets artistry—your perfect makeup awaits."
    </p>
    <p className="mt-2 text-lg lg:text-xl text-pink-600 leading-relaxed">
    "Transforming your look, one brushstroke at a time."
    </p>
  </div>
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
      <div className="bg-black text-black font-kugile">
        <div className="bg-black">
        <Navbar email={email} userName={userName} onLogout={onLogout} />
        </div>
        <div
  className="relative flex flex-col items-center justify-center p-6"
  style={{
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/053/394/041/non_2x/a-set-of-flat-illustrations-in-a-simple-style-woman-dressed-in-towel-are-engaged-in-cosmetic-procedures-face-masks-and-patches-self-care-and-self-love-concept-vector.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '450px', // Adjusted for mobile-friendly height
  }}
>
  {/* Semi-transparent overlay */}
  <div className="absolute inset-0 bg-white bg-opacity-80"></div>

  {/* Content Section */}
  <div className="relative text-center max-w-xs sm:max-w-md">
    <h1 className="text-3xl font-extrabold text-pink-800 sm:text-4xl">
      Make Up Services
    </h1>
    <p className="mt-4 text-base text-pink-700 sm:text-lg">
    "Where beauty meets artistry—your perfect makeup awaits."
    </p>
    <p className="mt-2 text-base text-pink-700 sm:text-lg">
    "Transforming your look, one brushstroke at a time."
    </p>
  </div>
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
