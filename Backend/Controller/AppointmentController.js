import Appointment from "../Model/Appointment.js";

// Fetch available time slots for a given date
export const getAvailableSlots = async (req, res) => {
  const { Date } = req.query;

  try {
    // Define the full list of possible time slots
    const allSlots = [
      "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
      "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    ];

    // Find booked slots for the given date
    const bookedAppointments = await Appointment.find({ Date });
    const bookedSlots = bookedAppointments.map((appointment) => appointment.Time);

    // Calculate available slots
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    res.status(200).json({ availableSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching available slots." });
  }
};

// Book an appointment
export const bookAppointment = async (req, res) => {
  const { Date, Time, Email } = req.body;

  try {
    // Check if the slot is already booked
    const existingAppointment = await Appointment.findOne({ Date, Time });
    if (existingAppointment) {
      return res.status(400).json({ error: "This time slot is already booked." });
    }

    // Create a new appointment
    const newAppointment = new Appointment({ Date, Time, Email });
    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while booking the appointment." });
  }
};

export const findAppointment = async (req, res) => {
  const { Email } = req.params;

  try {
    // Fetch appointments based on the email
    const appointments = await Appointment.find({ Email });

    // Map and return the Date and Time of each appointment
    const alldata = appointments.map((appointment) => ({
      Date: appointment.Date,
      Time: appointment.Time,
    }));

    res.status(200).json({ alldata });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "An error occurred while fetching appointments." });
  }
};

export const allAppointments = async (req,res) => {
  try{
  const appointments = await Appointment.find();
  res.status(200).json({appointments});
  }catch(error){
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
