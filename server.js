const express = require("express");
   const mongoose = require("mongoose");
   const cors = require("cors");
   const dotenv = require("dotenv");
   const path = require("path");
   const apiRoutes = require("./routes/api");

   dotenv.config();
   const app = express();

   app.use(cors());
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use("/uploads", express.static(path.join(__dirname, "../Uploads")));

   mongoose.connect(process.env.MONGO_URI)
     .then(() => console.log("MongoDB Atlas connected"))
     .catch(err => console.error("MongoDB Atlas connection error:", err));

   app.use("/api", apiRoutes);

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));