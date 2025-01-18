import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import ProductNavbar from '../ProductNavbar/ProductNavbar';
import Loader from '../Loader/Loader';

const AllCart = ({ email, userName, onLogout }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("https://purple-scissors.onrender.com/user/allcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data); // Assuming the response is an array of cart items
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Render loading state or error message if needed
  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div className="text-center text-red-600 bg-red-100 py-2 rounded">{error}</div>;
  }

  return (
    <>
      <Navbar email={email} userName={userName} onLogout={onLogout} />
      <ProductNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.ImageUrl}
                    alt={item.ProductName}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.ProductName}</h2>
                    <p className="text-lg text-gray-600">Price: ₹{item.Price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.Quantity}</p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-200"
                  onClick={() => {/* Add remove functionality */}}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllCart;
