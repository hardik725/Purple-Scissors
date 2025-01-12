import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
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
  Review: {
    type: String,
    required: true,
    minlength: 4,
  },
  Rating: {
    type: Number,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the TempUser model
const Review = mongoose.model("Review", ReviewSchema);

export default Review;
