import TempUser from "../Model/TempUser.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import fetch from "node-fetch";

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider; "Gmail" is an example
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your email's app password
  },
});

export const createTempUser = async (req, res) => {
  const { Age, Email, Name, Password, PhoneNumber, Place } = req.body;

  try {
    // Generate a random verification code
    const VerificationCode = crypto.randomBytes(3).toString("hex").toUpperCase();
    const ageNumber = parseInt(Age, 10);

    // Create the TempUser
    const tempUser = new TempUser({
      Name: Name,
      Email: Email,
      Password: Password,
      Age: ageNumber,
      Place: Place,
      PhoneNumber: PhoneNumber,
      VerificationCode:VerificationCode
    });

    await tempUser.save();

    // Send the verification code to the user's email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: Email, // Recipient's email address
      subject: "Your Verification Code",
      text: `Hello ${Name},\n\nYour verification code is: ${VerificationCode}\n\nThis code is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res
          .status(500)
          .json({ message: "Failed to send verification email." });
      }
      console.log("Verification email sent:", info.response);
    });

    res.status(201).json({
      message: "Temporary user created. Verification code sent via email.",
      tempUserId: tempUser._id,
    });
  } catch (error) {
    console.error("Error creating TempUser:", error);
    res.status(500).json({ message: "Failed to create temporary user." });
  }
};

export const verifyTempUser = async (req, res) => {
    const { Email, VerificationCode, Password } = req.body;
  
    try {
      // Find the TempUser by email
      const tempUser = await TempUser.findOne({ Email });
  
      if (!tempUser) {
        return res.status(404).json({ message: "Temporary user not found." });
      }
  
      // Check if the verification code matches
      if (tempUser.VerificationCode !== VerificationCode) {
        return res.status(400).json({ message: "Invalid verification code." });
      }

      if(tempUser.Password !== Password){
        return res.status(400).json({ message: "Invalid Password." });
      }

      // Check for the Password also
  
      // Make a POST request to the external API to create the user
      const response = await fetch(
        "https://purple-scissors.onrender.com/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Age: tempUser.Age,
            Email: tempUser.Email,
            Name: tempUser.Name,
            Password: tempUser.Password,
            PhoneNumber: tempUser.PhoneNumber,
            Place: tempUser.Place,
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(500).json({
          message: "Failed to create user on the external service.",
          error: errorData,
        });
      }
  
      // Delete the TempUser after successful verification
      await TempUser.deleteOne({ _id: tempUser._id });
  
      res.status(200).json({ message: "User verified and created successfully." });
    } catch (error) {
      console.error("Error verifying TempUser:", error);
      res.status(500).json({ message: "Verification failed." });
    }
  };
  

