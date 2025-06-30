// server.js
// Main entry point for the backend server. Sets up Express, connects to the database, and configures routes.

const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware for cross-origin requests
const dotenv = require("dotenv"); // Import dotenv to load environment variables
const connectDB = require("./config/db"); // Import database connection function
const eventRoutes = require("./routes/eventRoutes"); // Import event-related API routes

// Load environment variables from .env file
dotenv.config();
// Connect to MongoDB database
connectDB();

const app = express(); // Create Express app instance
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Mount event routes at /api/events
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000; // Use port from env or default to 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
