import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import ProductNavbar from '../ProductNavbar/ProductNavbar';
import Loader from '../Loader/Loader';

const OrderPage = ({ email, userName, onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [nord,setNord] = useState(0);
    const [nwish,setNwish] = useState(0);
    const [ncart,setNcart] = useState(0);

        useEffect(() => {
          const fetchNumbers = async () => {
            try {
              const response = await fetch("https://purple-scissors.onrender.com/user/allnum", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  Email: email,
                }),
              });
              if (!response.ok) {
                throw new Error('Failed to fetch orders');
              }
              const data = await response.json();
              setNord(data[0]);
              setNwish(data[1]);
              setNcart(data[2]);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchNumbers();
        }, []);
  // Fetch orders when the component mounts

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://purple-scissors.onrender.com/user/allorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data); // Assuming the response has an Orders array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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
      <ProductNavbar norder={nord} ncart={ncart} nwish={nwish}/>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Your Orders</h1>
        {orders == [] ? (
          <p className="text-xl text-gray-600">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={order.ImageUrl}
                    alt={order.Name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{order.Name}</h2>
                    <p className="text-lg text-gray-600">Price: ₹{order.Price}</p>
                    <p className="text-lg text-gray-600">Quantity: {order.Quantity}</p>
                    <p className="text-sm text-gray-500">Order Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;
