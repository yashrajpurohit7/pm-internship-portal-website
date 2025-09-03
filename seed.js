const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Internship = require("./models/Internship");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Atlas connected for seeding");

    // Clear existing data
    await Internship.deleteMany({});
    await User.deleteMany({});

    // Seed internships
    const internships = [
      {
        title: "Software Development Internship",
        sector: "IT",
        skills: ["Programming", "Web Development"],
        education: "BTech",
        location: "Urban",
      },
      {
        title: "Agricultural Research Internship",
        sector: "Agriculture",
        skills: ["Farming", "Research"],
        education: "BSc",
        location: "Rural",
      },
      {
        title: "Healthcare Assistant Internship",
        sector: "Healthcare",
        skills: ["Nursing", "Healthcare"],
        education: "Diploma",
        location: "Any",
      },
    ];

    // Seed users with correct password hash for Test@123
    const users = [
      {
        aadhaar: "999988887777",   // dummy aadhaar
        fullName: "Test User",
        email: "testuser@example.com",
        dob: new Date("2001-01-01"),
        gender: "Male",
        education: "BTech",
        skills: ["Programming", "Problem Solving"],
        hobbies: ["Coding", "Reading"],
        certificates: { tenth: "tenth.pdf", intermediate: "intermediate.pdf", degree: "degree.pdf" },
        hasCertificates: true,
        sector: "IT",
        activities: "Demo Hackathon",
        password: await bcrypt.hash("Test@123", 10),   // Updated to hash Test@123
      },
    ];

    // Insert data
    await Internship.insertMany(internships);
    await User.insertMany(users);

    console.log("Database seeded successfully ✅");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  });