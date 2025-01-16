import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const CompanyProduct = ({ email, userName, onLogout }) => {
  const { company, companyImage } = useParams(); // Extract company name and image from URL params
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("popularity"); // Default sort
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://purple-scissors.onrender.com/product/company",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ companyName: company }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []); // Set initial filtered products
      } catch (err) {
        setError(err.message || "Failed to load products.");
      }
    };

    if (company) fetchProducts();
  }, [company]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    let sortedProducts = [...products];
    if (value === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.DiscountedPrice - b.DiscountedPrice);
    } else if (value === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.DiscountedPrice - a.DiscountedPrice);
    } else {
      sortedProducts = [...products]; // Default to original order (e.g., popularity)
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar email={email} userName={userName} onLogout={onLogout} />

      {/* Banner Section */}
      <div className="bg-white">
        <div className="container mx-auto flex justify-center w-2/3">
          <div className="bg-white rounded-xl p-6">
            <img
              src={companyImage}
              alt={`${company} logo`}
              className="w-1/2 h-auto object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Filter and Sort Section */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <button className="bg-gray-100 px-4 py-2 rounded">Filters</button>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-gray-100 px-4 py-2 rounded"
          >
            <option value="popularity">Sort By: Popularity</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        {error ? (
          <div className="text-center text-red-600 bg-red-100 py-2 rounded">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative bg-gradient-to-r from-blue-50 to-gray-50 rounded-t-lg">
  <img
    src={product.Images[0].url}
    alt={product.Name}
    className="w-full h-40 sm:h-56 object-contain p-2 sm:p-4"
  />
</div>


                {/* Product Info */}
                <div className="p-4">
                  <h2 className="font-medium text-gray-800 truncate">
                    {product.Name}
                  </h2>

                  {/* Price Section */}
                  <div className="mt-2">
                    <p className="text-gray-500">
                    ₹{product.Price}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-xs sm:text-md">
                      Add to Cart
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
