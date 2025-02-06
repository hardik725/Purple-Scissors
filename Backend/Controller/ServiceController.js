import Service from "../Model/Service.js"; // Adjust path accordingly

export const addService = async (req, res) => {
  try {
    const { Category, name, price } = req.body;

    let serviceCategory = await Service.findOne({ Category });

    if (serviceCategory) {
      // If category exists, update the Services array
      serviceCategory.Services.push({ name, price });
      await serviceCategory.save();
    } else {
      // If category does not exist, create a new category with the service
      serviceCategory = new Service({
        Category,
        Services: [{ name, price }],
      });
      await serviceCategory.save();
    }

    res.status(200).json({ message: "Service added successfully", serviceCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getServicesByCategory = async (req, res) => {
  try {
    const { Category } = req.body;
    const serviceCategory = await Service.findOne({ Category });

    if (!serviceCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ services: serviceCategory.Services });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
