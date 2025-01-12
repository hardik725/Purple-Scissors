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

// Function to send a cancellation email
const sendCancellationEmail = async (email, date, time, reason) => {
  try {
    // Create a transporter for sending emails using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this based on your email provider
      auth: {
        user: process.env.EMAIL_USER,  // Your email address
        pass: process.env.EMAIL_PASS,   // Your email password or app-specific password
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Cancellation Confirmation',
      text: `Dear user,\n\nYour appointment scheduled for ${date} at ${time} has been cancelled.\n\nReason for cancellation: ${reason}\n\nIf this was a mistake, please contact us as soon as possible.\n\nBest regards,\nPurple Scissors Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Cancellation email sent');
  } catch (error) {
    console.error('Error sending cancellation email:', error);
  }
};

// Delete multiple appointments and send email notifications with reasons
export const deleteAppointments = async (req, res) => {
  const { appointments } = req.body;  // Get the array of appointment objects from the request body

  if (!appointments || appointments.length === 0) {
    return res.status(400).json({ error: "Please provide the appointments to cancel." });
  }

  try {
    for (let appointmentDetails of appointments) {
      const { Date, Time, Reason } = appointmentDetails;

      if (!Reason) {
        return res.status(400).json({ error: "Please provide a reason for cancellation for all appointments." });
      }

      // Find the appointment by Date and Time
      const appointment = await Appointment.findOne({ Date, Time });

      if (!appointment) {
        console.log(`Appointment not found for Date: ${Date}, Time: ${Time}`);
        continue; // Skip this appointment if not found
      }

      // Extract user email, date, time, and ID
      const { Email, _id, Date: appointmentDate, Time: appointmentTime } = appointment;

      // Delete the appointment from the database using the _id
      await Appointment.findByIdAndDelete(_id);

      // Send the cancellation email
      await sendCancellationEmail(Email, appointmentDate, appointmentTime, Reason);

      console.log(`Appointment for ${appointmentDate} at ${appointmentTime} deleted and email sent.`);
    }

    res.status(200).json({ message: 'Appointments deleted and emails sent successfully.' });
  } catch (error) {
    console.error('Error deleting appointments:', error);
    res.status(500).json({ error: 'An error occurred while deleting the appointments.' });
  }
};
