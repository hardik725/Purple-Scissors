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
      Name,
      Email,
      Password, // Note: Use hashing for passwords in production (e.g., bcrypt)
      Age: ageNumber, // Store age as a number
      Place,
      PhoneNumber,
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
