import React from "react";

const ProductSection = ({ categories }) => {
  return (
    <div className="bg-gray-100 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Explore Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Background Image */}
            <div
              className="h-60 bg-cover bg-center"
              style={{
                backgroundImage: `url(${category.image})`,
              }}
            ></div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white text-black px-4 py-2 font-semibold rounded-lg hover:bg-gray-200">
                Shop Now
              </button>
            </div>

            {/* Category Details */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {category.title}
              </h2>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
