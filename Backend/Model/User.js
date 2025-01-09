import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  age: {
    type: Number,
    required: true,
    min: 0, // Ensures age cannot be negative
  },
  place: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
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
