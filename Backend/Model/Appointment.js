import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  Date: { type: String, required: true },
  Time: { type: String, required: true },
  Email: { type: String, required: true }, // User email or identifier
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
