import React, { useEffect, useState } from 'react';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    console.log("All the products are:", products);
  }, [products]);

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

  return (
<div className="min-h-screen bg-gray-50 p-8">
  <h1 className="text-3xl md:text-5xl font-extrabold text-center text-[#204E4A] mb-8 font-kugile">
    Product Inventory
  </h1>
  
  {error && (
    <div className="bg-red-500 text-white text-center p-4 mb-6 rounded-lg shadow-md">
      <p>{error}</p>
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
          <div className="space-y-6 ">
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
