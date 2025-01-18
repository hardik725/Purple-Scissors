import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart, faBoxOpen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const ProductNavbar = () => {
  return (
    <div className="bg-pink-100 text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        {/* Search */}
        <div className="flex items-center w-full sm:max-w-md">
          <FontAwesomeIcon icon={faSearch} className="text-pink-500 mr-2" />
          <input
            type="text"
            placeholder="Search products"
            className="bg-pink-50 text-gray-800 text-sm placeholder-pink-400 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:ring-pink-300"
          />
        </div>

        {/* Links */}
        <div className="flex justify-between sm:justify-start space-x-6 sm:space-x-8">
          {/* Orders */}
          <div className="flex items-center space-x-2 cursor-pointer hover:text-pink-600">
            <FontAwesomeIcon icon={faBoxOpen} className="text-gray-700 text-xl" />
            <span className="hidden sm:inline-block text-sm">Orders</span>
          </div>

          {/* Wishlist */}
          <Link to="/allwish">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-pink-600">
            <FontAwesomeIcon icon={faHeart} className="text-gray-700 text-xl" />
            <span className="hidden sm:inline-block text-sm">Wishlist</span>
          </div>
          </Link>

          {/* Cart */}
          <Link to="/allcart">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-pink-600">
            <FontAwesomeIcon icon={faShoppingCart} className="text-gray-700 text-xl" />
            <span className="hidden sm:inline-block text-sm">Cart</span>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductNavbar;
