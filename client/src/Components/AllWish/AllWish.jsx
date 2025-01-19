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
  const [showInputIndex, setShowInputIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddClick = (index) => {
    setShowInputIndex(index); // Show the input field for the specific item
  };

  const handleConfirm = (product) => {
    handleAddToCart(product); // Pass the product object directly
    setShowInputIndex(null); // Hide the input field after confirming
  };
  

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

// here we have created a function to add to cart
  const handleAddToCart = async (product) => {
    const productData = {
      ProductName: product.Name,
      Price: product.Price,
      ImageUrl: product.ImageUrl,
    };
    const selectedQuantity = quantity || 1;
    console.log({...productData,Quantity: selectedQuantity});
    try {
      const response = await fetch(
        "https://purple-scissors.onrender.com/user/addcart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email: email,
            Product: { ...productData, Quantity: selectedQuantity },
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }else{
        setNcart(ncart+1);
        setQuantity(1);
        setShowInputIndex(null);
      }
  
      // SweetAlert2 Success Notification
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${product.Name} has been successfully added to your cart.`,
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
        text: "Error adding to cart: " + error.message,
        confirmButtonText: "OK",
      });
    }
  };

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
    <ProductNavbar norder={nord} ncart={ncart} nwish={nwish} />
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Your Wishlist
      </h1>
      {wishItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">
          Your wishlist is empty. Start exploring now!
        </p>
      ) : (
        <div className="space-y-6">
          {wishItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Product Details */}
              <div className="flex items-center space-x-4 w-full md:w-2/3">
                <img
                  src={item.ImageUrl}
                  alt={item.Name}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    {item.Name}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Price: ₹{item.Price}
                  </p>
                </div>
              </div>
              {/* Buttons Section */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-1/3 justify-end mt-4 md:mt-0">
                {showInputIndex === index ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-16 md:w-20 border rounded-lg px-2 py-1 text-gray-700"
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                      onClick={() => handleConfirm(item)}
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-[#97BE5A] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 mx-12"
                    onClick={() => handleAddClick(index)}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  className="bg-[#FC819E] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 mt-2 md:mt-0 mx-12"
                  onClick={() => handleRemoveFromWishlist(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
  
  );
};

export default AllWish;
