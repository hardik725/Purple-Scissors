// routes/appointmentRoutes.js
import express from "express";
import { getAvailableSlots,bookAppointment, findAppointment } from "../Controller/AppointmentController.js";

const router = express.Router();

// Route to fetch available slots
router.get("/available-slots", getAvailableSlots);

// Route to book an appointment
router.post("/book", bookAppointment);

// Router to get Appointments
router.get("/getappointment/:Email",findAppointment);

export default router;
