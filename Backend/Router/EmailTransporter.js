import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // Contact Form Route
  router.post('/contact', async (req, res) => {
    const { Email, Message, Name } = req.body;
  
    // Validate required fields
    if (!Name || !Email || !Message) {
      return res.status(400).json({ message: 'Please provide name, email, and message.' });
    }
  
    try {
      const mailOptions = {
        from: Email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Us Message from ${Name}`, // Custom subject
        text: `Name: ${Name}\nEmail: ${Email}\n\nMessage:\n${Message}`,
      };
  
      // Send email
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Something went wrong, please try again later.' });
    }
  });

  router.post('/book-appointment', async (req, res) => {
    const { Date, Email, Name, Time, Services } = req.body;
  
    // Validate required fields
    if (!Email || !Date || !Time || !Name || !Services || !Array.isArray(Services) || Services.length === 0) {
      return res.status(400).json({ message: 'Please provide all required information, including services.' });
    }
  
    try {
      // Save appointment details in the database
      const newAppointment = new Appointment({
        Name,
        Services,
        Date,
        Time,
        Email,
      });
  
      await newAppointment.save();
  
      const mailOptions = {
        from: process.env.EMAIL_USER, // Your email
        to: Email,                   // User's email address
        subject: `Appointment Confirmation`, // Custom subject
        text: `Dear ${Name},\n\nYour appointment has been successfully booked!\n\nDate: ${Date}\nTime: ${Time}\nServices: ${Services.join(", ")}\n\nThank you for booking with us! We look forward to your appointment.\n\nBest regards,\nYour Company Name`, // Message body
      };
  
      // Send the confirmation email to the user
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Appointment booked successfully, confirmation email sent!' });
    } catch (error) {
      console.error('Error booking appointment or sending email:', error);
      res.status(500).json({ message: 'Something went wrong, please try again later.' });
    }
  });
  

  export default router;