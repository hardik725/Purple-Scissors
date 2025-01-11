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
    const { email, message, name } = req.body;
  
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message.' });
    }
  
    try {
      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Us Message from ${name}`, // Custom subject
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      };
  
      // Send email
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Something went wrong, please try again later.' });
    }
  });
  

  export default router;