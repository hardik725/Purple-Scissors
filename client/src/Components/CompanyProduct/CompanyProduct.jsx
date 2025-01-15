import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const CompanyProduct = ({ email, userName, onLogout }) => {
  const { company, companyImage } = useParams(); // Extract the company name and image from URL params
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://purple-scissors.onrender.com/product/company", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyName: company }), // Send company name in the request body
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products || []); // Assuming data.products contains the products array
      } catch (err) {
        setError(err.message || "Failed to load products.");
      }
    };

    if (company) fetchProducts();
  }, [company]);

  return (
<div className="bg-gray-50 min-h-screen">
  {/* Navbar */}
  <Navbar email={email} userName={userName} onLogout={onLogout} />

  {/* Company Logo */}
  <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 py-10 shadow-md">
  <div className="container mx-auto flex justify-center">
    <div className="bg-white shadow-lg rounded-lg p-6">
      <img
        src={companyImage}
        alt={`${company} logo`}
        className="w-80 h-40 object-contain mx-auto"
      />
      <p className="text-center text-gray-600 text-sm font-medium mt-4">
        Your Trusted Partner for Professional Products
      </p>
    </div>
  </div>
</div>

  {/* Products Section */}
  <div className="container mx-auto px-4 mt-8">
    {error ? (
      <p className="text-red-500 text-center">{error}</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-blue-100 via-white to-blue-50">
              <img
                src={product.Images[0].url} // Update with the actual product image URL field
                alt={product.Name}
                className="w-full h-56 object-contain p-4"
              />
            </div>
            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-700 truncate">
                {product.Name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Price: <span className="text-blue-600 font-bold">${product.Price}</span>
              </p>
              {/* Add to Cart & Wishlist Buttons */}
              <div className="mt-4 flex justify-between items-center">
                <button className="bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button className="text-blue-600 text-sm hover:underline">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default CompanyProduct;
