import Product from "../Model/Product.js";

// Function to get products by category
export const getProductsByCategory = async (req, res) => {
  const { mainCategory} = req.query;
  try {
    const query = { "Category.main": mainCategory };

    const products = await Product.find(query);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get products by company name
export const getProductsByCompany = async (req, res) => {
  const { companyName } = req.query;
  try {
    const products = await Product.find({ Company: companyName });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get products by sub-category
export const getProductsBySubCategory = async (req, res) => {
  const { subCategory } = req.query;
  try {
    const products = await Product.find({ "Category.sub": subCategory });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};