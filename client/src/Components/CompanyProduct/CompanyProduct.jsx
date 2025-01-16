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
  <Navbar email={email} userName={userName} onLogout={onLogout} />

  <div className="bg-company-banner shadow-md mb-8">
    <div className="container mx-auto flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <img
          src={companyImage}
          alt={`${company} logo`}
          className="w-60 h-40 object-contain mx-auto"
        />
        <p className="text-center text-gray-700 font-semibold mt-4">
          Your Trusted Partner for Professional Products
        </p>
      </div>
    </div>
  </div>

  <div className="container mx-auto px-4">
    {error ? (
      <div className="text-center text-red-600 bg-red-100 py-2 rounded">
        {error}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="relative bg-gradient-to-r from-blue-50 to-gray-50 rounded-t-lg">
              <img
                src={product.Images[0].url}
                alt={product.Name}
                className="w-full h-56 object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h2 className="font-medium text-gray-800 truncate">{product.Name}</h2>
              <p className="text-blue-600 text-lg font-bold mt-2">${product.Price}</p>
              <div className="mt-4 flex justify-between">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
                <button className="text-blue-600 hover:underline">Wishlist</button>
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
