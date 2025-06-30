// EventForm.jsx
// This component renders a form for creating a new event. It collects event details and calls the onSubmit prop with the form data.

import { useState } from "react";
import { Plus, Calendar, MapPin, Tag, FileText, User } from "lucide-react";
import "../styles/EventForm.css";

// EventForm component: handles the creation of new events
const EventForm = ({ onSubmit }) => {
  // Local state for form fields
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  // Handle input changes for all fields
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(form); // Call parent handler with form data
      setForm({
        title: "",
        description: "",
        category: "",
        location: "",
        date: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="event-form-container">
      {/* Form header with icon and title */}
      <div className="event-form-header">
        <Plus size={24} />
        <h2 className="event-form-title">Create New Event</h2>
      </div>

      {/* Event creation form */}
      <form onSubmit={handleSubmit} className="event-form">
        {/* Event title input */}
        <div className="form-group">
          <label className="form-label">
            <User size={16} />
            Event Title
          </label>
          <input
            className="form-input"
            name="title"
            placeholder="Enter event title..."
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Event description textarea */}
        <div className="form-group">
          <label className="form-label">
            <FileText size={16} />
            Description
          </label>
          <textarea
            className="form-input form-textarea"
            name="description"
            placeholder="Describe your event..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Category and location inputs in a row */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              <Tag size={16} />
              Category
            </label>
            <input
              className="form-input"
              name="category"
              placeholder="e.g., Conference, Workshop..."
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={16} />
              Location
            </label>
            <input
              className="form-input"
              name="location"
              placeholder="Event location..."
              value={form.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Event date input */}
        <div className="form-group">
          <label className="form-label">
            <Calendar size={16} />
            Event Date
          </label>
          <input
            className="form-input"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button with loading state */}
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner"></div>
              Creating Event...
            </>
          ) : (
            <>
              <Plus size={18} />
              Create Event
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
