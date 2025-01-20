import React from "react";
import { useState,useEffect } from "react";
import Navbar from "../Navbar/Navbar";


const HairPage = ({ email, userName, onLogout }) => {
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
  <div className="bg-black">
  <Navbar email={email} userName={userName} onLogout={onLogout} />
  </div>
  {/* Hair Section Header */}
  <div
  className="relative flex items-center p-8"
  style={{
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/052/255/396/non_2x/three-female-fashion-models-with-different-hairstyles-and-make-up-are-posing-in-profile-showcasing-beauty-and-style-trends-free-vector.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '500px', // Increased height for better design
  }}
>
  <div className="absolute inset-0 bg-white bg-opacity-40"></div> {/* Semi-transparent overlay */}
  
  <div className="relative w-full lg:w-1/2 text-left p-6 lg:pl-16">
    <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800">
      Hair Care & Beauty
    </h1>
    <p className="mt-4 text-lg lg:text-xl text-gray-700 leading-relaxed">
      "Invest in your hair, it’s the crown you never take off."
    </p>
    <p className="mt-2 text-lg lg:text-xl text-gray-700 leading-relaxed">
      "Good hair speaks louder than words."
    </p>
  </div>
</div>



  {/* Decorative Background */}
  <div className="absolute inset-0 -z-10">
    {/* Blurred Background Image */}
    <div
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/comb-scissor-set-copy-space_23-2148352909.jpg?t=st=1736844747~exp=1736848347~hmac=67689b97a28bdc208b55da1ed22915abc9dde6429c6c616052a62b544dd3e80b&w=1380')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(8px)",
        opacity: "0.7",
      }}
      className="w-full h-full"
    ></div>

    {/* Floating Shapes */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-gray-400 rounded-full opacity-20"></div>
    <div className="absolute bottom-16 right-16 w-24 h-24 bg-gray-500 rounded-full opacity-30"></div>
    <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-gray-300 rounded-lg rotate-12 opacity-10"></div>
  </div>

  {/* Categories Section */}
  <div className="space-y-12 relative z-10 mt-2">
    {categories.map((category, index) => {
      // Calculate dynamic margin-top based on the number of services
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
        <div className="bg-black">
        <Navbar email={email} userName={userName} onLogout={onLogout} />
        </div>
        <div
  className="relative flex flex-col items-center justify-center p-6"
  style={{
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/052/255/396/non_2x/three-female-fashion-models-with-different-hairstyles-and-make-up-are-posing-in-profile-showcasing-beauty-and-style-trends-free-vector.jpg')`,
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
    <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
      Hair Care & Beauty
    </h1>
    <p className="mt-4 text-base text-gray-700 sm:text-lg">
    "Invest in your hair, it’s the crown you never take off."
    </p>
    <p className="mt-2 text-base text-gray-700 sm:text-lg">
    "Good hair speaks louder than words."
    </p>
  </div>
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

export default HairPage;
