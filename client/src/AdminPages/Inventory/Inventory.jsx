import React, { useEffect, useState } from 'react';
import AddInventory from '../AddInventory/AddInventory';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Loader from '../../Components/Loader/Loader';


const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const speeds = [2000, 2500, 3000, 3500, 4000];

  useEffect(() => {
    fetch('https://purple-scissors.onrender.com/product/allproducts')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError("An error occurred while fetching products.");
      });
  }, []);

  const categorizeByCompany = () => {
    if (!Array.isArray(products)) return {}; 
    return products.reduce((acc, product) => {
      const { Company } = product;
      if (!acc[Company]) {
        acc[Company] = [];
      }
      acc[Company].push(product);
      return acc;
    }, {});
  };

  const categorizeByCategory = () => {
    if (!Array.isArray(products)) return {}; 
    return products.reduce((acc, product) => {
      const { Category } = product;
      if (!acc[Category.main]) {
        acc[Category.main] = [];
      }
      acc[Category.main].push(product);
      return acc;
    }, {});
  };

  const companyCategories = categorizeByCompany();
  const categoryCategories = categorizeByCategory();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  if (products.length === 0) {
    return <Loader />;
  } else {
  

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center text-[#204E4A] mb-4 mt-4 font-kugile">
        Product Inventory
      </h1>

      {error && (
        <div className="bg-red-500 text-white text-center p-4 mb-6 rounded-lg shadow-md">
          <p>{error}</p>
        </div>
      )}

<div className="flex flex-col items-center">
      {/* Product Section with Image and Button */}
      <div className="flex items-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-4">
        {/* Image Section */}
        <div className="w-1/2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/139/999/non_2x/vector-illustration-of-skin-care-products.jpg"
            alt="Product Placeholder"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        {/* Button Section */}
        <div className="w-1/2 flex justify-center">
          <button
            onClick={toggleModal}
            className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center pt-8 z-50 bg-black bg-opacity-80">
          <div className="bg-white rounded-lg shadow-2xl relative w-[90%] max-w-xl p-2 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-0 right-0 bg-red-600 text-white text-lg p-3 transition-all duration-300 hover:bg-red-700 focus:outline-none"
              style={{ borderRadius: "0px 0px 0px 10px" }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* Modal Content */}
            <AddInventory />
          </div>
        </div>
      )}
    </div>
    <section>
  <h2 className="text-2xl md:text-4xl font-bold font-kugile text-[#204E4A] mb-3 text-center underline">
    Products by Company
  </h2>

  <div className="grid grid-cols-1 gap-8">
    {Object.keys(companyCategories).map((company, index) => (
      <div
        key={company}
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 relative border-2 border-[#B1C29E]"
      >
        <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-[#204E4A] to-[#6D7F7D] text-center p-2 rounded-lg">
          {company}
        </h3>
        <Swiper
          slidesPerView={2}
          spaceBetween={15}
          breakpoints={{
            768: {
              slidesPerView: 5,
            },
          }}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={speeds[index % speeds.length]} // Rotate speed varies per slider
          modules={[Autoplay]}
          className="px-4 "
        >
          {companyCategories[company].map((product) => (
            <SwiperSlide key={product._id}>
              <div>
                <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative group">
                  <div
                    className="category-image h-[10rem] sm:h-[12rem] bg-cover bg-center relative"
                    style={{ backgroundImage: `url('${product.Images[0].url}')` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center border-2 border-purple-300 shadow-md text-center font-kugile flex-col">
                      <h3 className="text-white text-[10px] md:text-lg font-bold">
                        {product.Name}
                      </h3>
                      <h3 className="text-white text-[12px] md:text-lg font-bold">
                        ₹{product.Price}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ))}
  </div>
</section>


    <section>
    <h2 className="text-2xl md:text-4xl font-bold font-kugile text-[#204E4A] mb-3 text-center underline mt-4">
  Products by Categories
</h2>

      <div className="grid grid-cols-1 gap-8">
        {Object.keys(categoryCategories).map((category, index) => (
          <div
            key={category}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 relative border-2 border-[#B1C29E]"
          >
            <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-[#204E4A] to-[#6D7F7D] text-center p-2 rounded-lg">
              {category}
            </h3>
            <Swiper
              slidesPerView={2}
              spaceBetween={15}
              breakpoints={{
                768: {
                  slidesPerView: 5,
                },
              }}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={speeds[index % speeds.length]} // Rotate speed varies per slider
              modules={[Autoplay]}
              className="px-4"
            >
              {categoryCategories[category].map((product) => (
                <SwiperSlide key={product._id}>
                  <div>
                    <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative group">
                      <div
                        className="category-image h-[10rem] md:h-[12rem] bg-cover bg-center relative"
                        style={{ backgroundImage: `url('${product.Images[0].url}')` }}
                      >
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center border-2 border-purple-300 shadow-md text-center font-kugile flex-col">
          <h3 className="text-white text-[10px]  md:text-lg font-bold">
            {product.Name}
          </h3>
          <h3 className="text-white text-[12px]  md:text-lg font-bold">
          ₹{product.Price}
          </h3>
        </div>                        
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
};

export default Inventory;
