import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  Category: {
    type: String,
    required: true,
    unique: true,
  },
  Services: [
    {
      subCategory: {
        type: String,
        required: true,
      },
      services: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
