import User from "../Model/User.js";

// Sign Up Function
export const signUp = async (req, res) => {
  const { name, email, password, age, place, phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // Note: Use hashing for passwords in production (e.g., bcrypt)
      age,
      place,
      phoneNumber,
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

// Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (in production, compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
