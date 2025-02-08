import { useState } from "react";

const AddServiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Handle form submission
    setFormData({ category: "", subCategory: "", name: "", price: "" }); // Reset form
  };

  return (
    <div className="p-5 bg-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Service</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-black font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            required
          />
        </div>

        {/* SubCategory */}
        <div>
          <label className="block text-black font-medium">SubCategory</label>
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-black font-medium">Service Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-black font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServiceForm;
