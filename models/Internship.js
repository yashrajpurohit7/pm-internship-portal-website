const mongoose = require("mongoose");

   const internshipSchema = new mongoose.Schema({
     title: { type: String, required: true },
     sector: { type: String, required: true },
     skills: [String],
     education: { type: String, required: true },
     location: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
   });

   module.exports = mongoose.model("Internship", internshipSchema);