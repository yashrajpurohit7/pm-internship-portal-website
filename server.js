const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection error:", err));

// Import routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
