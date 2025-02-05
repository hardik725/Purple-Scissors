import Product from "../Model/Product.js";

// Function to get products by category
export const getProductsByCategory = async (req, res) => {
  const { Category} = req.body;
  try {
    const query = { "Category.main": Category };

    const products = await Product.find(query);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get products by company name
export const getProductsByCompany = async (req, res) => {
  const { companyName } = req.body;
  try {
    const products = await Product.find({ Company: companyName });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get products by sub-category
export const getProductsBySubCategory = async (req, res) => {
  const { subCategory } = req.body;
  try {
    const products = await Product.find({ "Category.sub": subCategory });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all the products
export const getallproducts = async (req, res) => {
  try{
    const products = await Product.find();
    res.status(200).json({success: true, products});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};

// function designed to upload the new product in the data list

export const addproduct = async (req, res) => {
  try {
    const { Name, Price, Company, Category, Description, Stock, Images } = req.body;

    // Validate required fields
    if (!Name || !Price || !Company || !Category?.main || !Description || !Stock) {
      return res.status(400).json({ success: false, message: "Please fill all required fields." });
    }

    // Ensure Images is an array (or default to an empty array)
    const imageArray = Array.isArray(Images) ? Images : [];

    // Create new product
    const newProduct = new Product({
      Name,
      Price,
      Company,
      Category,
      Description,
      Stock,
      Images: imageArray, // Stores image URLs
    });

    await newProduct.save();

    res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};