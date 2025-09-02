const mongoose = require("mongoose");
   const dotenv = require("dotenv");
   const Internship = require("./models/Internship");
   const User = require("./models/User");
   const bcrypt = require("bcryptjs");

   dotenv.config();

   mongoose.connect(process.env.MONGO_URI)
     .then(async () => {
       console.log("MongoDB Atlas connected for seeding");

       await Internship.deleteMany({});
       await User.deleteMany({});

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

       const users = [
         {
           aadhaar: "123456789012",
           fullName: "John Doe",
           email: "john@example.com",
           dob: new Date("2000-01-01"),
           gender: "Male",
           education: "BTech",
           skills: ["Programming", "Web Development"],
           hobbies: ["Reading", "Sports"],
           certificates: { tenth: "tenth.pdf", intermediate: "intermediate.pdf", degree: "degree.pdf" },
           hasCertificates: true,
           sector: "IT",
           activities: "Hackathons",
           password: await bcrypt.hash("password123", 10),
         },
       ];

       await Internship.insertMany(internships);
       await User.insertMany(users);

       console.log("Database seeded successfully");
       mongoose.connection.close();
     })
     .catch(err => {
       console.error("Seeding error:", err);
       mongoose.connection.close();
     });