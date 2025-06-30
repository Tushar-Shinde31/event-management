// EventItem.jsx
// This component displays a single event card, including its details, attendees, and actions to add or remove attendees.

import { useState } from "react";
import { 
  MapPin, 
  Calendar, 
  Tag, 
  Users, 
  Plus, 
  X, 
  User, 
  Mail,
  Trash2
} from "lucide-react";
import AttendeeForm from "./AttendeeForm";
import "../styles/EventItem.css";

// EventItem component: displays a single event and its attendees
const EventItem = ({ event, onAddAttendee, onDeleteAttendee }) => {
  const [showForm, setShowForm] = useState(false); // Toggle attendee form

  return (
    <div className="event-card">
      {/* Event header with title and category */}
      <div className="event-header">
        <h3 className="event-title">{event.title}</h3>
        <span className="event-category">{event.category}</span>
      </div>

      {/* Event description (if present) */}
      {event.description && (
        <p className="event-description">{event.description}</p>
      )}

      {/* Event details: location, date, category */}
      <div className="event-details">
        <div className="event-detail">
          <MapPin size={16} className="event-detail-icon" />
          <span>{event.location || "Location TBD"}</span>
        </div>
        <div className="event-detail">
          <Calendar size={16} className="event-detail-icon" />
          <span>{new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="event-detail">
          <Tag size={16} className="event-detail-icon" />
          <span>{event.category}</span>
        </div>
      </div>

      {/* Button to show/hide attendee form */}
      <div className="event-actions">
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`action-button ${showForm ? 'secondary-button' : 'primary-button'}`}
        >
          {showForm ? (
            <>
              <X size={16} />
              Cancel
            </>
          ) : (
            <>
              <Plus size={16} />
              Add Attendee
            </>
          )}
        </button>
      </div>

      {/* Attendee form (shown when showForm is true) */}
      {showForm && (
        <AttendeeForm
          onSubmit={(data) => {
            onAddAttendee(event._id, data);
            setShowForm(false);
          }}
        />
      )}

      {/* Attendees section */}
      <div className="attendees-section">
        <div className="attendees-header">
          <Users size={20} />
          Attendees
          <span className="attendees-count">{event.attendees.length}</span>
        </div>

        {/* Show message if no attendees */}
        {event.attendees.length === 0 ? (
          <div className="no-attendees">
            <User size={24} />
            <p>No attendees yet. Be the first to join!</p>
          </div>
        ) : (
          <ul className="attendees-list">
            {event.attendees.map((attendee, idx) => (
              <li key={idx} className="attendee-item">
                <div className="attendee-info">
                  <div className="attendee-name">
                    <User size={14} />
                    {attendee.name}
                  </div>
                  <div className="attendee-email">
                    <Mail size={12} />
                    {attendee.email}
                  </div>
                </div>
                <button 
                  onClick={() => onDeleteAttendee(event._id, idx)}
                  className="delete-button"
                  title="Remove attendee"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventItem;
