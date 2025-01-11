import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./Router/UserRouter.js";
import AppointmentRouter from "./Router/AppointmentRouter.js";
import EmailTransporter from "./Router/EmailTransporter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

// Check if URI is defined
if (!URI) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", UserRouter);
app.use("/appointment", AppointmentRouter);
app.use("/mail",EmailTransporter);

// Example route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// MongoDB connection
(async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
})();

// Log MongoDB disconnection events
mongoose.connection.on('disconnected', () => {
  console.log("MongoDB disconnected");
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log("Closing MongoDB connection...");
  await mongoose.connection.close();
  console.log("MongoDB connection closed. Exiting process.");
  process.exit(0);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
