// eventRoutes.js
// Defines API routes for event-related operations and maps them to controller functions.

const express = require("express");
const router = express.Router();

const {
  addEvent,           // Controller to add a new event
  getAllEvents,       // Controller to get all events (with filters)
  addAttendee,        // Controller to add an attendee to an event
  deleteAttendee,     // Controller to delete an attendee from an event
  getStatsByCategory  // Controller to get event stats by category
} = require("../controllers/eventController");

// Route to create a new event
router.post("/", addEvent);
// Route to get all events (supports filters, search, pagination)
router.get("/", getAllEvents);
// Route to add an attendee to a specific event
router.post("/:id/attendees", addAttendee);
// Route to delete an attendee from a specific event by index
router.delete("/:id/attendees/:index", deleteAttendee);
// Route to get stats (count of events per category)
router.get("/stats/category", getStatsByCategory);

module.exports = router;
