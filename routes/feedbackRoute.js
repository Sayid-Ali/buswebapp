const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/send-feedback", async (req, res) => {
  try {
    // Get the form data from the request body
    const { name, email, message } = req.body;

    // Send the email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email, // your email address to send email from
        pass: process.env.pass, // your gmail account password
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: process.env.email, // Replace with your email address
      subject: "Feedback Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.sendStatus(200);
  } catch (error) {
    console.error("Failed to send email:", error);
    res.sendStatus(500);
  }
});
module.exports = router;
