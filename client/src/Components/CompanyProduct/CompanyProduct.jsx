import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const CompanyProduct = ({ email, userName, onLogout }) => {
  const { company, companyImage } = useParams(); // Extract company name and image from URL params
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("popularity"); // Default sort
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState({}); // Manage product quantities

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

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity,
    }));
  };

  const handleAddToCart = async (product) => {
    const productData = {
      ProductName: product.Name,
      Price: product.Price,
      ImageUrl: product.Images[0]?.url,
    };
    const selectedQuantity = quantity[product._id] || 1; // Default to 1 if no quantity is selected

    try {
      const response = await fetch("https://purple-scissors.onrender.com/user/addcart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Product: { ...productData, Quantity: selectedQuantity },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
      alert("Product added to cart");
    } catch (error) {
      alert("Error adding to cart: " + error.message);
    }
  };

  const handleAddToWishlist = async (product) => {
    const productData = {
      Name: product.Name,
      Price: product.Price,
      ImageUrl: product.Images[0]?.url,
    };

    try {
      const response = await fetch("https://purple-scissors.onrender.com/user/addwish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Product: productData }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }
      alert("Product added to wishlist");
    } catch (error) {
      alert("Error adding to wishlist: " + error.message);
    }
  };

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

      <div className="bg-slate-800">
        <div className="container mx-auto flex justify-center w-2/3">
          <div className="bg-white rounded-sm m-1">
            <img
              src={companyImage}
              alt={`${company} logo`}
              className="w-1/2 h-auto object-contain mx-auto"
            />
          </div>
        </div>
      </div>

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
                <div className="relative bg-gradient-to-r from-blue-50 to-gray-50 rounded-t-lg">
                  <img
                    src={product.Images[0].url}
                    alt={product.Name}
                    className="w-full h-40 sm:h-56 object-contain p-2 sm:p-4"
                  />
                </div>

                <div className="p-2">
                  <h2 className="font-semibold text-gray-800 truncate">
                    {product.Name}
                  </h2>
                  <p className="text-lg font-semibold text-gray-600">
                    ₹{product.Price}
                  </p>

                  <div className="mt-2 flex items-center space-x-2">
                    <label className="text-sm text-gray-700">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity[product._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product._id, parseInt(e.target.value))
                      }
                      className="w-12 border rounded px-2 py-1 text-sm"
                    />
                  </div>

                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 text-xs sm:text-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="w-full bg-pink-500 text-white py-2 px-2 rounded-md hover:bg-pink-700 transition-colors duration-300 text-xs sm:text-sm"
                    >
                      Add to Wishlist
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
