import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProductNavbar from "../ProductNavbar/ProductNavbar";
import Swal from "sweetalert2";


const CompanyProduct = ({ email,userName,onLogout }) => {
  const { company,companyImage } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [productStatus, setProductStatus] = useState({});
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
        setFilteredProducts(data.products || []);
      } catch (err) {
        setError(err.message || "Failed to load products.");
      }
    };

    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          "https://purple-scissors.onrender.com/user/allwish",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: email }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        const wishlistProducts = data || [];
        console.log(wishlistProducts);

        const statusMap = wishlistProducts.reduce((map, item) => {
          map[item.Name] = true;
          return map;
        }, {});

        setProductStatus(statusMap);
      } catch (err) {
        setError(err.message || "Failed to load wishlist.");
      }
    };

    if (company) fetchProducts();
    if (email) fetchWishlist();
  }, [company, email]);

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
    const selectedQuantity = quantity[product._id] || 1;
  
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
  
  const handleAddToWishlist = async (product) => {
    const productData = {
      Name: product.Name,
      Price: product.Price,
      ImageUrl: product.Images[0]?.url,
    };
  
    try {
      const response = await fetch(
        "https://purple-scissors.onrender.com/user/addwish",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email: email, Product: productData }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }else{
        setNwish(nwish+1);
      }
  
      setProductStatus((prevStatus) => ({
        ...prevStatus,
        [product.Name]: true,
      }));
  
      // SweetAlert2 Success Notification
      Swal.fire({
        icon: "info",
        title: "Added to Wishlist!",
        text: `${product.Name} has been added to your wishlist.`,
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
        text: "Error adding to wishlist: " + error.message,
        confirmButtonText: "OK",
      });
    }
  };
  
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
        throw new Error("Failed to remove from wishlist");
      }else{
        setNwish(nwish-1);
      }
  
      setProductStatus((prevStatus) => ({
        ...prevStatus,
        [product.Name]: false,
      }));
  
      // SweetAlert2 Success Notification
      Swal.fire({
        icon: "warning",
        title: "Removed from Wishlist",
        text: `${product.Name} has been removed from your wishlist.`,
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-black">
      <Navbar email={email} userName={userName} onLogout={onLogout} />
      </div>
      <ProductNavbar norder={nord} ncart={ncart} nwish={nwish}/>

      <div className="bg-center bg-cover"
      style={{backgroundImage: 
        'url(https://images.pexels.com/photos/4004461/pexels-photo-4004461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}>
        <div className="container mx-auto flex justify-center w-2/3">
          <div className="bg-white rounded-sm m-4">
            <img
              src={companyImage}
              alt={`${company} logo`}
              className="w-1/2 h-auto object-contain mx-auto"
            />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <button className="bg-gray-100 px-4 py-2 rounded">Filters</button>
        </div>

        {error ? (
          <div className="text-center text-red-600 bg-red-100 py-2 rounded">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 relative border-2 border-[#B1C29E]"
              >
                {/* Wishlist Button */}
                <button
                  className="absolute top-1 right-1 rounded-full p-2 z-30 transition-transform transform hover:scale-110"
                  onClick={() =>
                    productStatus[product.Name]
                      ? handleRemoveFromWishlist(product)
                      : handleAddToWishlist(product)
                  }
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`h-6 w-6 transition-all duration-300 ${
                      productStatus[product.Name] ? 'text-red-500 scale-125' : 'text-gray-300'
                    }`}
                  />
                </button>

                <div className="relative bg-gradient-to-r from-blue-50 to-gray-50 rounded-t-lg">
                  <img
                    src={product.Images[0].url}
                    alt={product.Name}
                    className="w-full h-40 sm:h-56 object-contain p-2 sm:p-4"
                  />
                </div>

                <div className="p-2">
                  <h2 className="font-semibold text-gray-800 truncate">{product.Name}</h2>
                  <p className="text-lg font-semibold text-gray-600">₹{product.Price}</p>

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
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 text-xs sm:text-sm transform hover:scale-105"
                    >
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
    </div>
  );
};

export default CompanyProduct;
