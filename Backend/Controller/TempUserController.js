import TempUser from "../Model/TempUser.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import fetch from "node-fetch";



export const createTempUser = async (req, res) => {
    const { Age, Email, Name, Password, PhoneNumber, Place } = req.body;
  
    try {
      // Generate a random verification code
      const VerificationCode = crypto.randomBytes(3).toString("hex").toUpperCase();
      const ageNumber = parseInt(Age, 10);
  
      // Create the TempUser
      const tempUser = new TempUser({
        Name,
        Email,
        Password,
        Age: ageNumber,
        Place,
        PhoneNumber,
        VerificationCode,
      });
  
      await tempUser.save();
  
      // Configure the email transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      try {
        // Send the verification code to the user's email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: Email,
          subject: "Your Verification Code",
          text: `Hello ${Name}, your verification code is: ${VerificationCode}`,
        });
  
        res.status(201).json({
          message: "Temporary user created. Verification code sent via email.",
          tempUserId: tempUser._id,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        return res.status(500).json({ message: "Failed to send verification email." });
      }
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
  

