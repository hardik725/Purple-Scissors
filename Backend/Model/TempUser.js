import mongoose from "mongoose";

const TempUserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensures no duplicate email addresses
  },
  Password: {
    type: String,
    required: true,
    minlength: 4,
  },
  Age: {
    type: Number,
    required: true,
    min: 0, // Ensures age cannot be negative
  },
  Place: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: false,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  VerificationCode: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Automatically deletes the document after 5 minutes
  },
});

// Create and export the TempUser model
const TempUser = mongoose.model("TempUser", TempUserSchema);

export default TempUser;
