import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import ProductNavbar from '../ProductNavbar/ProductNavbar';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AllCart = ({ email, userName, onLogout }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nord,setNord] = useState(0);
  const [nwish,setNwish] = useState(0);
  const [ncart,setNcart] = useState(0);


  // Fetch cart items when the component mounts
  const navigate = useNavigate();

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

  const handleorder = async () => {
    try {
      const response = await fetch(
        "https://purple-scissors.onrender.com/user/addorder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email: email,
            Products: cartItems,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to place the order");
      }else{
        setNord(nord+cartItems.length);
        setNcart(0);
        setCartItems([]);
      }
  
      // SweetAlert2 Success Notification
      Swal.fire({
        icon: "success",
        title: "🎉 Order Confirmed!",
        html: `
          <p>Your order has been successfully placed! 🎁</p>
          <p class="text-sm text-gray-500">We’re preparing your items for shipping.</p>
        `,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/1452/1452135.png",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Order Confirmed",
        showConfirmButton: true,
        confirmButtonText: "View Orders",
        showCancelButton: true,
        cancelButtonText: "Continue Shopping",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Navigating to orders page...");
          navigate("/orderpage");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Continue shopping action
          console.log("User chose to continue shopping.");
        }
      });
  
      // Optionally, clear the cart or perform additional actions after ordering
    } catch (error) {
      // SweetAlert2 Error Notification
      Swal.fire({
        icon: "error",
        title: "⚠️ Order Failed",
        html: `
          <p>Something went wrong while placing your order.</p>
          <p class="text-sm text-gray-500">${error.message}</p>
        `,
        showConfirmButton: true,
        confirmButtonText: "Retry",
      });
    }
  };
  const handleRemoveFromCart = async (product) => {
    try {
      const response = await fetch(
        "https://purple-scissors.onrender.com/user/removecart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email: email, Name: product.ProductName }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to remove from cart");
      }
  
      // Update cart count
      setNcart(ncart - 1);
  
      // Update cart items state
      setCartItems((prevItems) => prevItems.filter((item) => item.ProductName !== product.ProductName));
  
      // SweetAlert2 Success Notification
      Swal.fire({
        icon: "warning",
        title: "Removed from Cart",
        text: `${product.ProductName} has been removed from your Cart.`,
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
        text: "Error removing from cart: " + error.message,
        confirmButtonText: "OK",
      });
    }
  };
  
  
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
  <div className='bg-black'>
  <Navbar email={email} userName={userName} onLogout={onLogout} />
  </div>
  <ProductNavbar norder={nord} ncart={ncart} nwish={nwish} />
  <div className="container mx-auto p-4 md:p-8">
    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 text-center">
      Your Cart
    </h1>
    {cartItems.length === 0 ? (
      <p className="text-lg text-gray-600 text-center">
        Your cart is empty. Add some products!
      </p>
    ) : (
      <>
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Product Details */}
              <div className="flex items-center space-x-4 w-full md:w-2/3">
                <img
                  src={item.ImageUrl}
                  alt={item.ProductName}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    {item.ProductName}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Price: ₹{item.Price}
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    Quantity: {item.Quantity}
                  </p>
                </div>
              </div>
              {/* Buttons Section */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-1/3 justify-end mt-4 md:mt-0">
                <button
                  className="bg-[#FC819E] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 mt-2 md:mt-0 mx-12"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total and Order Section */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
          {/* Total Cost */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Total Cost:</h2>
            <p className="text-2xl font-extrabold text-blue-600">
              ₹{cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0)}
            </p>
          </div>
          {/* Order Now Button */}
          <button
            className="bg-[#59D5E0] text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 text-lg font-semibold"
            onClick={handleorder}
          >
            Order Now
          </button>
        </div>
      </>
    )}
  </div>
</>

  );
};

export default AllCart;
