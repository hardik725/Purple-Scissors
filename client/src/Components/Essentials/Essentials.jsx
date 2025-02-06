import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";

const Essentials = ({ email, userName, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

        useEffect(() => {
          const getData = async () => {
            try {
              const response = await fetch("https://purple-scissors.onrender.com/service/get", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ Category: "Essentials" }),
              });
        
              if (!response.ok) {
                throw new Error("Failed to post category");
              }
        
              const data = await response.json();
              setCategoryData(data.services);
            } catch (error) {
              console.error("Error posting category:", error);
            }
          };
        
          getData();
        }, []);

  const categories = [
    {
      title: "Nail Care",
      image: "https://img.freepik.com/free-photo/woman-doing-manicure-client-close-up_23-2148697076.jpg?t=st=1736960428~exp=1736964028~hmac=c14eef6ff560097272deb78decba1464ebe8c5403e88bfc41afc9aecbe94ab47&w=1380",
    },
    {
      title: "Threading & Waxing",
      image: "https://media.istockphoto.com/id/603912306/photo/master-in-the-cabin-removes-facial-hair-strand.jpg?s=612x612&w=0&k=20&c=FdMxBRQyZNn98Cvc7Okg_dmujvsrmBHbBzr3XluzT_8=",
    },
    {
      title: "Body Grooming",
      image: "https://media.istockphoto.com/id/1372281793/photo/woman-body-and-face-skin-care-cosmetics-women-shoulder-hand-massage-beauty-model-with-armpit.jpg?s=612x612&w=0&k=20&c=FFN6kJ6yBxggSxcOKWMRJVtWADL98W0HCbnHiYuC3-M=",
    },
    {
      title: "Spa & Relaxation",
      image: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  if(categoryData.length === 0){
    return <Loader/>;
  }

  if (!isMobile) {
    return (
      <div className="bg-white text-black font-kugile relative">

<div className="bg-black">
  <Navbar email={email} userName={userName} onLogout={onLogout} />
  </div>
  {/* Hair Section Header */}
  <div
  className="relative flex items-center p-8"
  style={{
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/049/851/257/non_2x/nail-master-make-manicure-for-female-client-vector.jpg')`,
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
      Essential Services
    </h1>
    <p className="mt-4 text-lg lg:text-xl text-gray-700 leading-relaxed">
    "Indulge in self-care—where nails, skin, and body rejuvenate."
    </p>
    <p className="mt-2 text-lg lg:text-xl text-gray-700 leading-relaxed">
    "Pampering you from head to toe, because you deserve it."
    </p>
  </div>
</div>
        <div className="space-y-12 relative z-10 mt-2">
          {categoryData.map((category, index) => {
            const marginTop = category.services.length * 31;

            return (
              <div
                key={index}
                className="relative mx-auto w-11/12 lg:w-3/5"
                style={{
                  backgroundImage: `url(${categories[index].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "600px",
                  marginBottom: `${marginTop}px`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {category.subCategory}
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
                      <span>{service.name}</span>
                      <span>{service.price}</span>
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
      <div className="bg-black text-black font-kugile">
        <div className="bg-black">
        <Navbar email={email} userName={userName} onLogout={onLogout} />
        </div>
        <div
  className="relative flex flex-col items-center justify-center p-6"
  style={{
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/049/851/257/non_2x/nail-master-make-manicure-for-female-client-vector.jpg')`,
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
      Essential Services
    </h1>
    <p className="mt-4 text-base text-gray-700 sm:text-lg">
    "Indulge in self-care—where nails, skin, and body rejuvenate."
    </p>
    <p className="mt-2 text-base text-gray-700 sm:text-lg">
    "Pampering you from head to toe, because you deserve it."
    </p>
  </div>
</div>

        <div>
          {categoryData.map((category, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              <div
                className="h-64 bg-cover bg-center flex justify-center items-center text-center"
                style={{ backgroundImage: `url(${categories[index].image})` }}
              >
                <h2 className="text-3xl font-bold text-black tracking-wide uppercase bg-white opacity-65 p-1">
                  {category.subCategory}
                </h2>
              </div>

              <ul className="p-6 bg-black text-white space-y-2 opacity-90 font-forum">
                {category.services.map((service, i) => (
                  <li
                    key={`${service.name}-${i}`}
                    className="flex justify-between text-sm"
                  >
                    <span>{service.name}</span>
                    <span>{service.price}</span>
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
