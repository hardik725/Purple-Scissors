import React, { useState, useCallback } from 'react';

const AddInventory = () => {
  const [productData, setProductData] = useState({
    Name: '',
    Price: '',
    Company: '',
    Category: { main: '', sub: '' },
    Description: '',
    Stock: '',
    Images: [],
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCategoryChange = useCallback((e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      Category: { ...prev.Category, [name]: value },
    }));
  }, []);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadedImages = [...productData.Images];

    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'product_name');
      formData.append('cloud_name', 'dl9jsm6cl');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dl9jsm6cl/image/upload',
          { method: 'POST', body: formData }
        );

        const data = await response.json();
        if (data.secure_url) {
          uploadedImages.push({ url: data.secure_url });
        }
      } catch (error) {
        console.error('Image Upload Error:', error);
        alert('Failed to upload some images.');
      }
    }

    setProductData((prev) => ({ ...prev, Images: uploadedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.Name || !productData.Price || !productData.Company) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch('https://purple-scissors.onrender.com/product/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product added successfully');
        setProductData({
          Name: '',
          Price: '',
          Company: '',
          Category: { main: '', sub: '' },
          Description: '',
          Stock: '',
          Images: [],
        });
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Product Submission Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
<div className="mx-auto p-3 sm:p-6 rounded-xl shadow-lg bg-[#f6ebff] w-full max-w-lg sm:max-w-2xl border border-[#d4a5ff]">
  <h2 className="text-center text-purple-800 text-2xl font-semibold pb-3 font-poppins">
    Add Product
  </h2>
  
  <form onSubmit={handleSubmit} className="flex flex-col space-y-2 w-full items-center">
    <input
      type="text"
      name="Name"
      value={productData.Name}
      onChange={handleChange}
      required
      placeholder="Product Name"
      className="p-3 rounded-lg border border-[#b076ff] text-gray-700 bg-white w-full focus:ring-2 focus:ring-purple-500"
    />
    
    <input
      type="number"
      name="Price"
      value={productData.Price}
      onChange={handleChange}
      required
      placeholder="Price"
      className="p-3 rounded-lg border border-[#b076ff] text-gray-700 bg-white w-full focus:ring-2 focus:ring-purple-500"
    />
    
    {/* Company Dropdown */}
    <input
      type="text"
      name="Company"
      value={productData.Company}
      onChange={handleChange}
      required
      placeholder="Company"
      list="company-options"
      className="p-3 rounded-lg border border-[#b076ff] text-gray-700 bg-white w-full focus:ring-2 focus:ring-purple-500"
    />
    <datalist id="company-options">
      <option value="Jeannot" />
      <option value="Raaga" />
      <option value="VLCC" />
      <option value="Lakme" />
      <option value="Matrix" />
      <option value="MAC" />
    </datalist>

    {/* Category Dropdown */}
    <input
      type="text"
      name="main"
      value={productData.Category.main}
      onChange={handleCategoryChange}
      required
      placeholder="Main Category"
      list="category-options"
      className="p-3 rounded-lg border border-[#b076ff] text-gray-700 bg-white w-full focus:ring-2 focus:ring-purple-500"
    />
    <datalist id="category-options">
      <option value="Hair" />
      <option value="Skin" />
      <option value="Face" />
      <option value="Makeup" />
    </datalist>

    <input
      type="text"
      name="sub"
      value={productData.Category.sub}
      onChange={handleCategoryChange}
      placeholder="Subcategory (Optional)"
      className="p-3 rounded-lg border border-[#b076ff] text-gray-700 bg-white w-full focus:ring-2 focus:ring-purple-500"
    />
    
    <textarea
      name="Description"
      value={productData.Description}
      onChange={handleChange}
      required
      placeholder="Description"
      className="p-3 rounded-lg border border-[#b076ff] text-gray-700 bg-white w-full h-28 focus:ring-2 focus:ring-purple-500"
    />
    
    <input
      type="number"
      name="Stock"
      value={productData.Stock}
      onChange={handleChange}
      required
      placeholder="Stock"
      className="p-3 rounded-lg border border-[#b076ff] text-gray-700 bg-white w-full focus:ring-2 focus:ring-purple-500"
    />
    
    <input
      type="file"
      name="Images"
      accept="image/*"
      onChange={handleImageUpload}
      multiple
      className="p-3 rounded-lg border border-[#b076ff] text-gray-700 bg-white w-full focus:ring-2 focus:ring-purple-500"
    />
    
    {/* Image Preview Grid */}
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2 w-full">
      {productData.Images.map((img, index) => (
        <img
          key={index}
          src={img.url}
          alt="Uploaded"
          className="w-16 h-16 object-cover rounded-lg border border-[#b076ff]"
        />
      ))}
    </div>

    <button
      type="submit"
      className="p-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg cursor-pointer text-lg hover:shadow-md hover:from-purple-600 hover:to-pink-500 transition-all w-full sm:w-auto"
    >
      Add Product
    </button>
  </form>
</div>

  );
};

export default AddInventory;
