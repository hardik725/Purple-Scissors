// routes/appointmentRoutes.js
import express from "express";
import { getAvailableSlots,bookAppointment, findAppointment, allAppointments, deleteAppointments } from "../Controller/AppointmentController.js";

const router = express.Router();

// Route to fetch available slots
router.get("/available-slots", getAvailableSlots);

// Route to book an appointment
router.post("/book", bookAppointment);

// Router to get Appointments
router.get("/getappointment/:Email",findAppointment);

// Router to get all the appointments
router.get("/allappointments",allAppointments);

// Router to delete the booked appointments
router.post("/delete",deleteAppointments);

export default router;
