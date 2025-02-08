import { useState } from "react";

function ServicePopup({ selectedCategory, selectedServices }) {
  return (
    <div className="z-10">
      {/* Pop-up overlay and content */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
        <div className="bg-white w-full max-w-3xl shadow-lg p-6 transform transition-all duration-500 ease-in-out translate-y-0 opacity-100 overflow-y-auto max-h-screen">
          <h2 className="text-2xl font-semibold text-center mb-4">{selectedCategory} Services</h2>

          {selectedServices.length > 0 ? (
            <div className="space-y-6">
              {selectedServices.map((subCategory, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">{subCategory.subCategory}</h3>

                  {subCategory.services.length > 0 ? (
                    <div className="mt-4 space-y-3">
                      {subCategory.services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          <span className="font-medium text-gray-800">{service.name}</span>
                          <span className="text-sm text-gray-600">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-gray-600 text-sm">No services available in this subcategory.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">No subcategories or services available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicePopup;
