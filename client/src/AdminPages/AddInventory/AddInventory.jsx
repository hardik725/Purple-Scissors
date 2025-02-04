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
      formData.append('upload_preset', 'your_upload_preset');
      formData.append('cloud_name', 'your_cloud_name');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
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
      const response = await fetch('/api/products', {
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
    <div className="w-[16rem] sm:max-w-[50rem] mx-auto p-4 sm:p-6 rounded-xl shadow-md bg-white">
      <h2 className="text-center text-gray-800 text-xl font-semibold pb-4">
        Add Product to Inventory
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          name="Name"
          value={productData.Name}
          onChange={handleChange}
          required
          placeholder="Product Name"
          className="p-2 rounded-md border border-gray-300 text-sm w-full"
        />
        <input
          type="number"
          name="Price"
          value={productData.Price}
          onChange={handleChange}
          required
          placeholder="Price"
          className="p-2 rounded-md border border-gray-300 text-sm w-full"
        />
        <input
          type="text"
          name="Company"
          value={productData.Company}
          onChange={handleChange}
          required
          placeholder="Company"
          className="p-2 rounded-md border border-gray-300 text-sm w-full"
        />
        <input
          type="text"
          name="main"
          value={productData.Category.main}
          onChange={handleCategoryChange}
          required
          placeholder="Main Category"
          className="p-2 rounded-md border border-gray-300 text-sm w-full"
        />
        <input
          type="text"
          name="sub"
          value={productData.Category.sub}
          onChange={handleCategoryChange}
          placeholder="Subcategory (Optional)"
          className="p-2 rounded-md border border-gray-300 text-sm w-full"
        />
        <textarea
          name="Description"
          value={productData.Description}
          onChange={handleChange}
          required
          placeholder="Description"
          className="p-2 rounded-md border border-gray-300 text-sm w-full h-20"
        />
        <input
          type="number"
          name="Stock"
          value={productData.Stock}
          onChange={handleChange}
          required
          placeholder="Stock"
          className="p-2 rounded-md border border-gray-300 text-sm w-full"
        />
        <input
          type="file"
          name="Images"
          accept="image/*"
          onChange={handleImageUpload}
          multiple
          className="p-2 rounded-md border border-gray-300 text-sm w-full"
        />
        <div className="flex gap-2 flex-wrap mt-2">
          {productData.Images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt="Uploaded"
              className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
          ))}
        </div>
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-md cursor-pointer text-lg hover:bg-blue-600 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddInventory;
