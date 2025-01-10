import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./Router/UserRouter.js";
import AppointmentRouter from "./Router/AppointmentRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user",UserRouter);

app.use("appointment",AppointmentRouter);

// Log MongoDB URI for debugging
console.log("MongoDB URI:", URI);

// Enable Mongoose debugging for detailed logs
mongoose.set('debug', true);

// MongoDB connection
mongoose.connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
    console.error("Error Details:", error);
  });

// Capture MongoDB connection errors
mongoose.connection.on('error', (error) => {
  console.error("MongoDB Connection Error (Event):", error.message);
});

// Log MongoDB disconnection events
mongoose.connection.on('disconnected', () => {
  console.log("MongoDB disconnected");
});

// Example route
app.get('/', (req, res) => {
  res.send('Bye World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
