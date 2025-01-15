import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { Link } from 'react-router';

const ProductHome = ({ email, userName, onLogout }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://beautypalace.s3.amazonaws.com/images/Beauty-Palace/bpkertainwebbanner.jpg",
    "https://beautypalace.s3.amazonaws.com/images/Beauty-Palace/bpwebskintreatmentbanner.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change every 5000ms (5 seconds)

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [heroImages.length]);

  return (
    <div className="salon-homepage bg-white">
      {/* Navbar */}
      <Navbar email={email} userName={userName} onLogout={onLogout} />

      {/* Category Section */}
      <section className="categories bg-gray-200 py-6">
      <div className="text-center mb-4">
  <h2 className="relative text-4xl font-kugile text-black inline-block after:content-[''] after:block after:w-3/4 after:h-[2px] after:bg-black after:mx-auto after:mt-2">
    Categories
  </h2>
</div>

  
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6">
    {[
      { name: "Hair Care", imageUrl: "https://images.pexels.com/photos/8467976/pexels-photo-8467976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      { name: "Skin Care", imageUrl: "https://images.pexels.com/photos/8467976/pexels-photo-8467976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      { name: "Face Care", imageUrl: "https://media.istockphoto.com/id/1400306506/photo/spa-natural-organic-cosmetics-packaging-design-set-of-transparent-glass-bottles-moisturizer.jpg?s=612x612&w=0&k=20&c=H0JF_ehdwFYTK2uJUrM-Ztf7r-DEa23jnpKboCA6L9c=" },
      { name: "Make Up", imageUrl: "https://media.istockphoto.com/id/487770577/photo/makeup-set-on-table-front-view.jpg?s=612x612&w=0&k=20&c=IS_ZuHCF3N66jhDMwt2s7J_PGWABlpv2ISEAwpJ4JKU=" }
    ].map((category, index) => (
      <div
        key={index}
        className="category-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 relative"
      >
        <div
          className="category-image h-32 bg-cover bg-center relative"
          style={{
            backgroundImage: `url('${category.imageUrl}')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h3 className="text-black font-lora text-lg bg-white opacity-75 w-full text-center">{category.name}</h3> {/* Apply Lora font */}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Sliding Offers Section */}
      <section className="offers-section relative bg-gray-100">
      <div
        className="hero-image w-full h-auto bg-cover bg-center rounded-lg shadow-md transition-transform duration-500"
        style={{
          backgroundImage: `url(${heroImages[currentImageIndex]})`,
          aspectRatio: '32/9', // Helps maintain the aspect ratio
        }}
      ></div>
    </section>



      {/* Top Categories Section */}
      <section className="top-categories bg-gray-100 py-6">
      <div className="text-center mb-8">
    <h2 className="relative text-3xl sm:text-4xl font-kugile text-black inline-block 
        after:content-[''] after:block after:w-3/4 after:h-[2px] after:bg-black 
        after:mx-auto after:mt-2">
      Top Products
    </h2>
  </div>

  <div className="grid grid-cols-4 gap-2 px-2 sm:px-4 max-w-4xl mx-auto">
    {[
      { name: "Shampoo", image: "https://images.pexels.com/photos/18186006/pexels-photo-18186006/free-photo-of-containers-of-herbal-shampoo-standing-on-a-table.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
      { name: "Conditioners", image: "https://images.pexels.com/photos/7428103/pexels-photo-7428103.jpeg?cs=srgb&dl=pexels-cottonbro-7428103.jpg&fm=jpg" },
      { name: "Serums", image: "https://www.arata.in/cdn/shop/files/intensive-hair-growth-serum-30ml-422.webp?v=1732633264" },
      { name: "Hair Tools", image: "https://media.istockphoto.com/id/911459410/photo/clippers-hair-clippers-hair-scissors-haircut-accessories.jpg?s=612x612&w=0&k=20&c=8EzVSwJWqOxoZAOH7_OVIhsJyfDo7x1_CqlLwA47SQs=" },
    ].map((category, index) => (
      <div
        key={index}
        className="category-card bg-white shadow-sm rounded-md overflow-hidden 
                   transform transition-transform hover:scale-105"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-16 object-cover"
        />
        <div className="p-1 text-center">
          <h3 className="text-xs font-medium text-gray-800">{category.name}</h3>
        </div>
      </div>
    ))}
  </div>
</section>



      {/* Companies Section */}
      <section className="companies-section bg-gray-100 py-8">
  <div className="text-center mb-8">
    <h2 className="relative text-3xl sm:text-4xl font-kugile text-black inline-block 
        after:content-[''] after:block after:w-3/4 after:h-[2px] after:bg-black 
        after:mx-auto after:mt-2">
      Featured Brands
    </h2>
  </div>

  <div className="grid grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-8 max-w-5xl mx-auto justify-center">
    {[
      { name: "Raaga", image: "https://i.ibb.co/P18d5rT/Screenshot-2025-01-15-031844.png" },
      { name: "Lakme", image: "https://i.pinimg.com/736x/55/90/0b/55900beeff90476e34df8f7303a060e3.jpg" },
      { name: "Jeannot", image: "https://media.licdn.com/dms/image/v2/C4D0BAQF7gCNqsydsBA/company-logo_200_200/company-logo_200_200/0/1642568688292/jeannotceuticals_logo?e=2147483647&v=beta&t=94KAZceQfOd3DmNXD9N23FL4go_HCxLedwQgaxUjxgI" },
      { name: "VLCC", image: "https://images.seeklogo.com/logo-png/52/2/vlcc-personal-care-logo-png_seeklogo-521769.png?v=1958556243998270512" },
      { name: "Matrix", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..." },
    ].map((brand, index) => (
      <Link
      key={index}
      to={`/companyproduct/${brand.name}/${encodeURIComponent(brand.image)}`}
      className="company-card bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center 
                 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={brand.image}
        alt={brand.name}
        className="w-20 sm:w-32 object-contain mb-4"
      />
    </Link>
    ))}
  </div>
</section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        © 2025 Salon Products | All Rights Reserved
      </footer>
    </div>
  );
};

export default ProductHome;
