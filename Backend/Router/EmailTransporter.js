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
      const mailOptions = {
        from: process.env.EMAIL_USER, // Your email
        to: Email,                   // User's email address
        subject: `Appointment Confirmation`, // Custom subject
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f7f7f7;
                  margin: 0;
                  padding: 0;
                }
                .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                }
                .email-header {
                  background-color: #6b3f98;
                  color: #ffffff;
                  text-align: center;
                  padding: 20px;
                }
                .email-header img {
                  width: 80px;
                  height: auto;
                }
                .email-content {
                  padding: 30px;
                  text-align: left;
                  color: #333333;
                }
                .email-content h1 {
                  color: #6b3f98;
                }
                .appointment-details {
                  margin: 20px 0;
                  padding: 20px;
                  background-color: #f0f0f0;
                  border-radius: 8px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .appointment-details p {
                  margin: 8px 0;
                }
                .footer {
                  background-color: #6b3f98;
                  color: #ffffff;
                  text-align: center;
                  padding: 10px;
                }
                .footer p {
                  margin: 0;
                }
                .footer a {
                  color: #ffffff;
                  text-decoration: none;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="email-header">
                  <img src="https://static.vecteezy.com/system/resources/previews/054/267/527/non_2x/scissors-outline-slip-style-icon-vector.jpg" alt="Purple Scissors Logo">
                  <h2>Purple Scissors Salon</h2>
                </div>
  
                <div class="email-content">
                  <h1>Your Appointment is Confirmed!</h1>
                  <p>Dear <strong>${Name}</strong>,</p>
                  <p>Thank you for booking an appointment with us! We're excited to have you at Purple Scissors Salon. Here are your appointment details:</p>
                  
                  <div class="appointment-details">
                    <p><strong>Appointment Date:</strong> ${Date}</p>
                    <p><strong>Appointment Time:</strong> ${Time}</p>
                    <p><strong>Services Selected:</strong> ${Services.join(", ")}</p>
                  </div>
  
                  <p>If you have any questions or need to reschedule, feel free to reach out to us.</p>
                  <p>We look forward to seeing you soon!</p>
                </div>
  
                <div class="footer">
                  <p>Best regards,</p>
                  <p><strong>Purple Scissors Salon Team</strong></p>
                  <p><a href="mailto:support@purplescissors.com">Contact Us</a> | <a href="https://www.purplescissors.com">Visit Our Website</a></p>
                </div>
              </div>
            </body>
          </html>
        `,
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