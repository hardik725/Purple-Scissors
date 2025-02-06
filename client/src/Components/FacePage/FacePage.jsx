import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";

const FacePage = ({ email, userName, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

        useEffect(() => {
          const getData = async () => {
            try {
              const response = await fetch("https://purple-scissors.onrender.com/service/get", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ Category: "Face" }),
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
      title: "Facials & Cleanups",
      image:
        "https://media.istockphoto.com/id/1393108496/photo/sensual-photo-of-beautiful-young-asian-woman-with-with-eyes-closed-applying-cotton-facial.jpg?s=612x612&w=0&k=20&c=5ZIDY_Pt7m9MBIcNEWJnGM7ckhKpvAtBOzKhqTlobl0=",
    },
    {
      title: "Skin Treatments",
      image:
        "https://images.pexels.com/photos/3738355/pexels-photo-3738355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Customized Services",
      image:
        "https://media.istockphoto.com/id/1202956145/photo/cheerful-girlfriends-with-face-masks-wearing-bathrobes-drinking-champagne.jpg?s=612x612&w=0&k=20&c=Bv1aYWi-B74IVxwrbIUXVQLwacb8qtXBmc6RW45bHdE=",
    },
    {
      title: "Premium & Branded Services",
      image:
        "https://as2.ftcdn.net/v2/jpg/09/45/49/19/1000_F_945491939_l6s62aubKJtJv4PD9NbvD7oVH2bRPKB8.jpg",
    },
  ];
  
  if(categoryData.length === 0){
    return <Loader/>
  }

  if (!isMobile) {
    return (
      <div className="bg-[#EDEDFD] text-black font-kugile relative">
        {/* Navbar */}
        <div className="bg-black">
        <Navbar email={email} userName={userName} onLogout={onLogout} />
        </div>
        {/* Face Section Header */}
        <div
  className="relative flex items-center p-8"
  style={{
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/053/394/041/non_2x/a-set-of-flat-illustrations-in-a-simple-style-woman-dressed-in-towel-are-engaged-in-cosmetic-procedures-face-masks-and-patches-self-care-and-self-love-concept-vector.jpg')`,
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
      Face Care & Beauty
    </h1>
    <p className="mt-4 text-lg lg:text-xl text-gray-700 leading-relaxed">
    "Glow is the essence of beauty—let your face radiate."
    </p>
    <p className="mt-2 text-lg lg:text-xl text-gray-700 leading-relaxed">
    "Enhancing your natural beauty, one face at a time."
    </p>
  </div>
</div>

        {/* Categories Section */}
        <div className="space-y-12 relative z-10 mt-2">
          {categoryData.map((category, index) => {
            const marginTop = category.services.length * 39;

            return (
              <div
                key={index}
                className="relative mx-auto w-11/12 lg:w-3/5"
                style={{
                  backgroundImage: `url(${categories[index].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "500px",
                  marginBottom: `${marginTop}px`,
                }}
              >
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {category.subCategory}
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
                      <span>{service.name}</span>
                      <span>{service.price}</span>
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
      <div className="bg-black text-black font-kugile">
        {/* Navbar */}
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
    <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
      Face Care & Beauty
    </h1>
    <p className="mt-4 text-base text-gray-700 sm:text-lg">
    "Glow is the essence of beauty—let your face radiate."
    </p>
    <p className="mt-2 text-base text-gray-700 sm:text-lg">
    "Enhancing your natural beauty, one face at a time."
    </p>
  </div>
</div>

        {/* Categories */}
        <div>
          {categoryData.map((category, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="h-64 bg-cover bg-center flex justify-center items-center text-center"
                style={{ backgroundImage: `url(${categories[index].image})` }}
              >
                <h2 className="text-3xl font-bold text-black tracking-wide uppercase bg-white opacity-75 p-1">
                  {category.subCategory}
                </h2>
              </div>

              {/* Services */}
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

export default FacePage;
