import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Company: {
      type: String,
      required: true,
    },
    Category: {
      main: {
        type: String,
        required: true,
      },
      sub: {
        type: String,
        required: false, // Optional in case some categories don't have subcategories
      },
    },
    Description: {
      type: String,
      required: true,
    },
    Stock: {
      type: Number,
      required: true,
      default: 0,
    },
    Images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Product = mongoose.model("Product", ProductSchema);
  
  export default Product;
  