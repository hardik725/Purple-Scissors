import User from "../Model/User.js";

// Sign Up Function
export const signUp = async (req, res) => {
  const { Age,Email,Name,Password,PhoneNumber,Place } = req.body;

  // Validate required fields
  if (!Name || !Email || !Password || !Age || !Place || !PhoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log({
    Age,Email,Name,Password,PhoneNumber,Place,
  });
  // Ensure Age is a number
  const ageNumber = parseInt(Age, 10);
  if (isNaN(ageNumber) || ageNumber <= 0) {
    return res.status(400).json({ message: "Age must be a valid number" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      Name:Name,
      Email:Email,
      Password:Password, // Note: Use hashing for passwords in production (e.g., bcrypt)
      Age: ageNumber, // Store age as a number
      Place:Place,
      PhoneNumber:PhoneNumber,
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Sign Up Error:", error);
    return res.status(500).json({ message: "Error signing up", error: error.message });
  }
};


// Login Function
export const login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (in production, compare hashed passwords)
    if (user.Password !== Password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const username = async (req,res) => {
  const {Email} = req.body;

  try{
    const user = await User.findOne({Email});
    if(user){
      res.status(200).json(user.Name);
    }
  }catch(error){
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// here the backend for market place is there like order wishlist and cart adding and removing
//
//
// add to cart wishlist and ordr 
// Add item to Cart
export const addToCart = async (req, res) => {
  const { Email, Product } = req.body;

  try {
    const user = await User.findById(Email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Cart.push(Product); // Add product to Cart
    await user.save();
    return res.status(201).json({ message: "Product added to cart", user });
  } catch (error) {
    console.error("Error adding to cart", error);
    return res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

// Add item to Orders
export const addToOrders = async (req, res) => {
  const { Email, Product } = req.body;

  try {
    const user = await User.findById(Email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Orders.push(Product); // Add product to Orders
    await user.save();
    return res.status(201).json({ message: "Product added to orders", user });
  } catch (error) {
    console.error("Error adding to orders", error);
    return res.status(500).json({ message: "Error adding to orders", error: error.message });
  }
};

// Add item to Wishlist
export const addToWishlist = async (req, res) => {
  const { Email, Product } = req.body;

  try {
    const user = await User.findById(Email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Wishlist.push(Product); // Add product to Wishlist
    await user.save();
    return res.status(201).json({ message: "Product added to wishlist", user });
  } catch (error) {
    console.error("Error adding to wishlist", error);
    return res.status(500).json({ message: "Error adding to wishlist", error: error.message });
  }
};

// NOW FROM HERE REMOVING FROM CART WISHLIST IS THERE 

// Remove item from Cart
export const removeFromCart = async (req, res) => {
  const { Email, ProductId } = req.body;

  try {
    const user = await User.findById(Email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Cart.pull({ _id: ProductId }); // Remove product from Cart
    await user.save();
    return res.status(200).json({ message: "Product removed from cart", user });
  } catch (error) {
    console.error("Error removing from cart", error);
    return res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
};

// Remove item from Orders
export const removeFromOrders = async (req, res) => {
  const { Email, ProductId } = req.body;

  try {
    const user = await User.findById(Email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Orders.pull({ _id: ProductId }); // Remove product from Orders
    await user.save();
    return res.status(200).json({ message: "Product removed from orders", user });
  } catch (error) {
    console.error("Error removing from orders", error);
    return res.status(500).json({ message: "Error removing from orders", error: error.message });
  }
};

// Remove item from Wishlist
export const removeFromWishlist = async (req, res) => {
  const { Email, ProductId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Wishlist.pull({ _id: ProductId }); // Remove product from Wishlist
    await user.save();
    return res.status(200).json({ message: "Product removed from wishlist", user });
  } catch (error) {
    console.error("Error removing from wishlist", error);
    return res.status(500).json({ message: "Error removing from wishlist", error: error.message });
  }
};

