// Event.js
// Defines the Mongoose schemas for Event and Attendee, and exports the Event model.

const mongoose = require("mongoose");

// Schema for an attendee of an event
const attendeeSchema = new mongoose.Schema({
  name: String, // Attendee's name
  email: String, // Attendee's email address
  registeredAt: {
    type: Date,
    default: Date.now // Timestamp when attendee registered
  }
});

// Schema for an event
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // Event title is required
  },
  description: String, // Optional event description
  category: String,    // Optional event category
  location: String,    // Optional event location
  date: {
    type: Date,
    required: true // Event date is required
  },
  attendees: [attendeeSchema], // Array of attendees (embedded documents)
  createdAt: {
    type: Date,
    default: Date.now // Timestamp when event was created
  }
});

// Export the Event model based on eventSchema
module.exports = mongoose.model("Event", eventSchema);
