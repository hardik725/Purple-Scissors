import React, { useEffect, useState } from 'react';
import AddInventory from '../AddInventory/AddInventory';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center text-[#204E4A] mb-8 font-kugile">
        Product Inventory
      </h1>

      {error && (
        <div className="bg-red-500 text-white text-center p-4 mb-6 rounded-lg shadow-md">
          <p>{error}</p>
        </div>
      )}

      <button
        onClick={toggleModal}
        className="bg-teal-500 text-white p-3 rounded-lg mb-6 hover:bg-teal-600 transition-colors"
      >
        Add Product
      </button>

      {isModalOpen && (
  <div className="fixed inset-0 flex justify-center z-50 bg-black bg-opacity-40">
    <div 
      className="bg-white rounded-lg shadow-2xl relative w-[90%] max-w-xl p-2 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
      style={{ top: window.scrollY + '60px' }}
    >
      
      {/* Close Button Positioned at the Top-Left Corner */}
      <button 
        onClick={toggleModal}
        className="absolute top-0 right-0 bg-red-600 text-white text-lg p-3 transition-all duration-300 hover:bg-red-700 focus:outline-none"
        style={{ borderRadius: "0px 0px 0px 10px" }} // Rounds bottom-right corner only
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>


      {/* Content */}
      <AddInventory />

    </div>
  </div>
)}





      <section>
        <h2 className="text-2xl md:text-4xl font-bold font-kugile text-[#204E4A] mb-6">
          Products by Company
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(companyCategories).map((company) => (
            <div key={company} className="product-card p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 relative border-2 border-[#B1C29E]">
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-[#204E4A] to-[#6D7F7D] text-center p-2 rounded-lg">
                {company}
              </h3>
              <div className="space-y-6">
                {companyCategories[company].map((product) => (
                  <div key={product._id} className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300 ease-in-out">
                    <img
                      src={product.Images[0].url}
                      alt={product.Name}
                      className="h-24 w-24 object-cover rounded-md border-2 border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-lg text-[#204E4A]">{product.Name}</p>
                      <p className="text-lg text-teal-500 font-semibold">₹{product.Price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-4xl font-bold font-kugile text-[#204E4A] mb-6">
          Products by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(categoryCategories).map((category) => (
            <div key={category} className="product-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 relative border-2 border-[#B1C29E]">
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-[#204E4A] to-[#6D7F7D] text-center p-2 rounded-lg">
                {category}
              </h3>
              <div className="space-y-6">
                {categoryCategories[category].map((product) => (
                  <div key={product._id} className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300 ease-in-out">
                    <img
                      src={product.Images[0].url}
                      alt={product.Name}
                      className="h-24 w-24 object-cover rounded-md border-2 border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-lg text-[#204E4A]">{product.Name}</p>
                      <p className="text-lg text-teal-500 font-semibold">₹{product.Price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inventory;
