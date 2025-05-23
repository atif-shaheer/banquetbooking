const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bookingRoutes = require("./src/routes/bookingRoutes");
const menuRoutes = require("./src/routes/menuRoutes");
const menuCategoryRoutes = require("./src/routes/menuCategoryRoutes");
const connectDB = require("./src/db/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
connectDB();


// Use routes
app.use("/api", bookingRoutes);
app.use("/api", menuRoutes);
app.use("/api/categories", menuCategoryRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
