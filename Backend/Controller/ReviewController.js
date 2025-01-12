import Review from "../Model/Review.js";
import nodemailer from "nodemailer";

export const postReview = async (req, res) => {
  try {
    const { Email, Name, Rating, Review: reviewText } = req.body;

    // Validate request body
    if (!Name || !Email || !reviewText || !Rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the review
    const newReview = new Review({ Name, Email, Review: reviewText, Rating });
    await newReview.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass: process.env.EMAIL_PASS, // Replace with your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Review Submitted Successfully",
      text: `Hello ${Name},\n\nThank you for your review!\n\nRating: ${Rating}\nReview: ${reviewText}\n\nWe appreciate your feedback.\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: "Review submitted and email sent successfully!" });
  } catch (error) {
    console.error("Error posting review:", error);
    return res.status(500).json({ message: "An error occurred while posting the review." });
  }
};

// Get All Reviews
export const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
};
