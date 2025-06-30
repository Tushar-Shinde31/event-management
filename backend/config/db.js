// db.js
// Handles connection to the MongoDB database using Mongoose.

const mongoose = require("mongoose");

// Connect to MongoDB using the connection string from environment variables
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB
    console.log("✅ MongoDB Connected");
  } catch (err) {
    // Log error and exit process if connection fails
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
