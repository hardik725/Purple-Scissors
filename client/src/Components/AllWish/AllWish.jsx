import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import ProductNavbar from '../ProductNavbar/ProductNavbar';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';

const AllWish = ({ email, userName, onLogout }) => {
  const [wishItems, setWishItems] = useState([]);
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

  // Fetch wishlist items when the component mounts
  const handleRemoveFromWishlist = async (product) => {
    try {
      const response = await fetch(
        "https://purple-scissors.onrender.com/user/removewish",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email: email, Name: product.Name }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to remove from Wishlist");
      }
  
      // Update cart count
      setNwish(nwish - 1);
  
      // Update cart items state
      setWishItems((prevItems) => prevItems.filter((item) => item.Name !== product.Name));
  
      // SweetAlert2 Success Notification
      Swal.fire({
        icon: "warning",
        title: "Removed from Wishlist",
        text: `${product.Name} has been removed from your Wishlist.`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      // SweetAlert2 Error Notification
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error removing from wishlist: " + error.message,
        confirmButtonText: "OK",
      });
    }
  };
  useEffect(() => {
    const fetchWishItems = async () => {
      try {
        const response = await fetch("https://purple-scissors.onrender.com/user/allwish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist items');
        }
        const data = await response.json();
        setWishItems(data); // Assuming the response is an array of wishlist items
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishItems();
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
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Your WishList</h1>
        {wishItems.length === 0 ? (
          <p className="text-xl text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-6">
            {wishItems.map((item, index) => (
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
                    <h2 className="text-xl font-semibold text-gray-800">{item.Name}</h2>
                    <p className="text-lg text-gray-600">Price: ₹{item.Price}</p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-200"
                  onClick={() => {handleRemoveFromWishlist(item)}}
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

export default AllWish;
