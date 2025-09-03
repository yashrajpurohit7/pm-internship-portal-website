const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ✅ Fix the path to auth.js (assuming middleware is under backend/functions/)
const auth = require("../functions/middleware/auth");
// If you move `middleware` directly under backend/, use: const auth = require("../middleware/auth");

// ---------------- REGISTER ----------------
router.post("/register", async (req, res) => {
  try {
    const { fullName, aadhaar, email, password, dob, gender, education, sector } = req.body;
    console.log("Register Attempt:", { fullName, aadhaar, email, dob, gender, education, sector });

    // Validate fields
    if (!fullName || !aadhaar || !email || !password || !dob || !gender || !education || !sector) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!/^\d{12}$/.test(aadhaar)) {
      return res.status(400).json({ message: "Aadhaar must be exactly 12 digits" });
    }

    // Check duplicates
    const existingUser = await User.findOne({ $or: [{ aadhaar }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Aadhaar or email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      aadhaar,
      email,
      password: hashedPassword,
      dob: new Date(dob),
      gender,
      education,
      sector,
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error. Please check logs or try again later." });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Add debugging logs to identify the issue
    console.log("Stored hashed password:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- RESUME ----------------
router.post("/resume", auth, async (req, res) => {
  try {
    const { sections } = req.body;
    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ message: "Sections are required" });
    }

    const userId = req.user.userId;
    await User.findByIdAndUpdate(userId, { resume: { sections } }, { new: true, runValidators: true });

    res.json({ success: true });
  } catch (error) {
    console.error("Resume Save Error:", error);
    res.status(500).json({ message: "Failed to save resume" });
  }
});

// ---------------- PROFILE ----------------
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;