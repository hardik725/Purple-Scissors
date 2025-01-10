import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
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
    match: [/^\d{10}$/, "Please enter a valid phone number"], // Validates a 10-digit phone number
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
