import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";

const AllCart = ({email,userName, onLogout}) => {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <Navbar email={email} userName={userName} onLogout={onLogout} />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={item.ImageUrl} alt={item.ProductName} className="w-16 h-16 object-cover" />
                <div>
                  <h2 className="font-semibold">{item.ProductName}</h2>
                  <p>Price: ${item.Price}</p>
                  <p>Quantity: {item.Quantity}</p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default AllCart;
