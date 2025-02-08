import { useState } from "react";

function ServicePopup({ selectedCategory, selectedServices }) {
  return (
    <div className="z-10">
      {/* Pop-up overlay and content */}
      <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50] w-full max-w-3xl rounded-xl shadow-xl p-6 max-h-[85vh] overflow-y-auto transform transition-all duration-300 scale-100">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 text-center tracking-wide mb-6 capitalize">
          {selectedCategory} Services
        </h2>

        {/* Services List */}
        {selectedServices.length > 0 ? (
          <div className="space-y-6">
            {selectedServices.map((subCategory, index) => (
              <div
                key={index}
                className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 tracking-wide">{subCategory.subCategory}</h3>

                {/* Individual Services */}
                {subCategory.services.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {subCategory.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm border border-gray-300 transition-all duration-300 hover:shadow-md"
                      >
                        <span className="font-medium text-gray-800 text-[14px]">{service.name}</span>
                        <span className="text-[14px] font-semibold text-gray-600">{service.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-gray-500 text-sm">No services available in this subcategory.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-600 text-center text-lg">No subcategories or services available.</p>
        )}        
      </div>
    </div>
    </div>
  );
}

export default ServicePopup;
