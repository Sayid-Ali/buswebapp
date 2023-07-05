const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const PDFDocument = require("pdfkit");
const fs = require("fs");
// if the user existing

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }
    // for the non-register new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //bcrypt will Hash the  Password
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfullay",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }
    if (userExists.isBlocked) {
      return res.send({
        message: "Your account is blocked , please contact admin",
        success: false,
        data: null,
      });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!passwordMatch) {
      return res.send({
        message: "Incorrect password",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign({ userId: userExists._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    res.send({
      message: "logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// added code today 3/07/2023
// Get user profile
router.get("/profile/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update user profile
router.put("/profile/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
//above here
// Get user by Id
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "user fetched successfully ",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
// Here is the Admin users route
//Get all Users
router.post("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
//update User
router.post("/update-user-permissions", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      message: "User permission updated successfully",
      success: true,
      datanull,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
// Get user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Fetch the user profile using the authenticated user's ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
      new: true,
    }); // Update the user profile using the authenticated user's ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// All about the pdf
// Add the following route handler to your router
router.get("/generate-user-report", async (req, res) => {
  try {
    const users = await User.find({});

    // Create a new PDF document
    const doc = new PDFDocument();

    // Customize the PDF layout and content
    doc.fontSize(16).text("User Report", { align: "center" });
    doc.moveDown();

    doc
      .fontSize(14)
      .text(`Generated on: ${new Date().toLocaleString()}`, { align: "right" });
    doc.moveDown();

    doc.fontSize(12);
    users.forEach((user, index) => {
      const fullName = [user.firstName, user.middleName, user.lastName]
        .filter(Boolean)
        .join(" ");

      doc.text(`User ${index + 1}: ${fullName}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Status: ${user.isBlocked ? "Blocked" : "Active"}`);
      doc.text(`Role: ${user.isAdmin ? "Admin" : "User"}`);
      doc.moveDown();
    });

    // Stream the PDF document as the response
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error generating user report" });
  }
});
module.exports = router;
