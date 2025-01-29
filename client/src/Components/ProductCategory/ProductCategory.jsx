import React, { useEffect, useState, useRef , useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProductNavbar from "../ProductNavbar/ProductNavbar";
import Swal from "sweetalert2";


const ProductCategory = ({ email,userName,onLogout }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [productStatus, setProductStatus] = useState({});
    const [nord,setNord] = useState(0);
    const [nwish,setNwish] = useState(0);
    const [ncart,setNcart] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const navbarRef = useRef(null);
    const productNavbarRef = useRef(null);
    const categoryRef = useRef(null);
  
    useEffect(() => {
      const updateHeight = () => {
        if (navbarRef.current && productNavbarRef.current) {
          const categoryHeight = categoryRef.current.offsetHeight || 0;
          const navbarHeight = navbarRef.current.offsetHeight || 0;
          const productNavbarHeight = productNavbarRef.current.offsetHeight || 0;
          const totalHeight = navbarHeight + productNavbarHeight + categoryHeight;
          
          console.log("Navbar Height:", navbarHeight);
          console.log("ProductNavbar Height:", productNavbarHeight);
          console.log("CategoryHeight:", categoryHeight);
          console.log("Total Header Height:", totalHeight);
          
          setHeaderHeight(totalHeight);
        }
      };
  
      updateHeight();
  
      // Listen for window resize to adjust height dynamically
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }, []);

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
            "https://purple-scissors.onrender.com/product/category",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ Category: category }),
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
    
          const data = await response.json();
          const productsArray = data.products || [];
    
          // Group products by subcategory
          const groupedProducts = productsArray.reduce((acc, product) => {
            const subCategory = product.Category.sub || "Other"; // Default to "Other" if no subcategory
            if (!acc[subCategory]) {
              acc[subCategory] = [];
            }
            acc[subCategory].push(product);
            return acc;
          }, {});
    
          setProducts(groupedProducts);
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

    if (category) fetchProducts();
    if (email) fetchWishlist();
  }, [category, email]);

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
<div className="min-h-screen bg-center bg-cover bg-no-repeat bg-fixed">
      <div className="fixed top-0 right-0 left-0 z-10">
        <div className="bg-black" ref={navbarRef}>
          <Navbar email={email} userName={userName} onLogout={onLogout} />
        </div>
        <div ref={productNavbarRef}>
          <ProductNavbar norder={nord} ncart={ncart} nwish={nwish} />
        </div>

        <div className="bg-center bg-cover" ref={categoryRef}
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/4004461/pexels-photo-4004461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
          }}>
          <div className="container mx-auto flex justify-center w-2/3">
            <div className="bg-white rounded-sm m-4 p-8">
              <p className="text-center text-5xl">{category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Dynamic Margin */}
      <div className="bg-cover bg-no-repeat bg-center bg-fixed py-5" style={{ marginTop: `${headerHeight}px` , backgroundImage: 'url(https://images.unsplash.com/photo-1635776062043-223faf322554?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww)'}}>
        <div className="container mx-auto px-4">

        {error ? (
          <div className="text-center text-red-600 bg-red-100 py-2 rounded">
            {error}
          </div>
        ) : (
          <div>
{Object.entries(products).map(([subCategory, productList]) => (
  <div key={subCategory} className="mb-8">
    {/* Section Divider */}
    <div className="relative flex items-center justify-center mb-6">
    <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t-[4px] from-purple-500 via-pink-500 to-rose-400"></div>
  </div>

  {/* Subcategory Heading */}
  <div className="relative font-kugile px-4 py-3 bg-gradient-to-r from-[#FAD0C4] to-[#FFD1FF] shadow-lg flex items-center justify-center border-2 border-[#93419a]">
    <h2 className="text-xl sm:text-2xl font-bold text-[#5A2D82] uppercase tracking-wider text-center">
      {subCategory}
    </h2>
  </div>

    </div>

    {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productList.map((product) => (
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
  </div>
))}

          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ProductCategory;
