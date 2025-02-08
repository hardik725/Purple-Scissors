import { useState, useEffect } from "react";

const AddServiceForm = ({ hairservice, faceservice, makeupservice, essentialservice }) => {
  const [formData, setFormData] = useState({
    Category: "",
    subCategory: "",
    name: "",
    price: "",
  });

  const serviceMap = {
    Hair: hairservice,
    Face: faceservice,
    MakeUp: makeupservice,
    Essentials: essentialservice,
  };

  useEffect(() => {
    if (formData.Category) {
      const selectedServices = serviceMap[formData.Category] || [];
      if (selectedServices.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          subCategory: selectedServices[0].subCategory,
        }));
      }
    }
  }, [formData.Category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://purple-scissors.onrender.com/service/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Service added successfully");
      } else {
        alert(data.message || "Error adding service");
      }
    } catch (error) {
      alert("Server error");
    }
    setFormData({ Category: "", subCategory: "", name: "", price: "" });
  };

  return (
    <div className="p-6 bg-[#FAF3E0] shadow-lg rounded-xl border border-[#D8A47F] max-w-lg mx-auto">
      <h3 className="text-lg font-semibold text-[#5E3B3B] mb-5 border-b pb-2">✨ Add New Service</h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-[16px]">
        <div>
          <label className="block text-[#8C5E58] font-medium mb-1">Category</label>
          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-[#FFD8BE] text-[#5E3B3B] focus:ring focus:ring-[#D8A47F] outline-none transition-all"
            required
          >
            <option value="">Select Category</option>
            <option value="Hair">Hair Services</option>
            <option value="Face">Face Services</option>
            <option value="MakeUp">Makeup Services</option>
            <option value="Essentials">Essential Services</option>
          </select>
        </div>
        <div>
          <label className="block text-[#8C5E58] font-medium mb-1">SubCategory</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-[#FFB7A5] text-[#5E3B3B] focus:ring focus:ring-[#D8A47F] outline-none transition-all"
            required
          >
            <option value="">Select SubCategory</option>
            {(serviceMap[formData.Category] || []).map((service, index) => (
              <option key={index} value={service.subCategory}>
                {service.subCategory}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[#8C5E58] font-medium mb-1">Service Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-[#FFB7A5] text-[#5E3B3B] focus:ring focus:ring-[#D8A47F] outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-[#8C5E58] font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-[#FFB7A5] text-[#5E3B3B] focus:ring focus:ring-[#D8A47F] outline-none transition-all"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#8C5E58] text-white font-semibold rounded-lg hover:bg-[#5E3B3B] transition-all shadow-md"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServiceForm;
