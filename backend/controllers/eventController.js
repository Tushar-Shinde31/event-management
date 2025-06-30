// eventController.js
// Contains controller functions for handling event-related API requests.

const Event = require("../models/Event"); // Import the Event model

// Add a new event to the database
exports.addEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body); // Create a new event with request body data
    res.status(201).json(event); // Respond with the created event
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle validation or creation errors
  }
};

// Get all events, with optional filters, pagination, and search
exports.getAllEvents = async (req, res) => {
  try {
    // Extract query parameters for filtering and pagination
    const { category, search, minDate, maxDate, minAttendees, page = 1, limit = 5 } = req.query;

    const query = {};

    // Filter by category (case-insensitive)
    if (category) query.category = category.toLowerCase();
    // Search by event title (case-insensitive, partial match)
    if (search) query.title = { $regex: search, $options: "i" };
    // Filter by date range
    if (minDate || maxDate)
      query.date = {
        ...(minDate && { $gte: new Date(minDate) }),
        ...(maxDate && { $lte: new Date(maxDate) })
      };
    // Filter events with at least one attendee
    if (minAttendees) query["attendees.0"] = { $exists: true };

    // Pagination: skip and limit
    const skip = (page - 1) * limit;

    // Get total count and paginated events
    const total = await Event.countDocuments(query);
    const events = await Event.find(query).sort({ date: 1 }).skip(skip).limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: events
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add an attendee to a specific event
exports.addAttendee = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id); // Find event by ID
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.attendees.push(req.body); // Add attendee to event's attendees array
    await event.save(); // Save changes
    res.json(event); // Respond with updated event
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an attendee from an event by index
exports.deleteAttendee = async (req, res) => {
  const { id, index } = req.params;
  try {
    const event = await Event.findById(id); // Find event by ID
    if (!event || !event.attendees[index])
      return res.status(404).json({ message: "Attendee not found" });

    event.attendees.splice(index, 1); // Remove attendee at given index
    await event.save(); // Save changes
    res.json(event); // Respond with updated event
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get aggregation stats: count of events per category
exports.getStatsByCategory = async (req, res) => {
  try {
    const stats = await Event.aggregate([
      {
        $group: {
          _id: { $toLower: "$category" }, // Group by category (case-insensitive)
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 } // Sort by count descending
      }
    ]);
    res.json(stats); // Respond with stats array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
