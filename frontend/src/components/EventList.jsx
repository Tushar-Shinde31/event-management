// EventList.jsx
// This component displays a list of events. It shows loading, empty, and populated states, and renders each event using the EventItem component.

import { Calendar, Users, Loader2 } from "lucide-react";
import EventItem from "./EventItem";
import "../styles/EventList.css";

// EventList component: displays all events or appropriate messages
const EventList = ({ events, onAddAttendee, onDeleteAttendee, loading }) => {
  // Show loading spinner if loading
  if (loading) {
    return (
      <div className="events-container">
        <div className="loading-events">
          <Loader2 size={20} className="loading-spinner" />
          Loading events...
        </div>
      </div>
    );
  }

  // Show message if there are no events
  if (!events.length) {
    return (
      <div className="events-container">
        <div className="no-events">
          <div className="no-events-icon">📅</div>
          <div className="no-events-text">No events found</div>
          <div className="no-events-subtext">
            Create your first event to get started!
          </div>
        </div>
      </div>
    );
  }

  // Render the list of events
  return (
    <div className="events-container">
      <div className="events-header">
        <h2 className="events-title">
          <Calendar size={24} />
          All Events
          <span className="events-count">{events.length}</span>
        </h2>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <EventItem
            key={event._id}
            event={event}
            onAddAttendee={onAddAttendee}
            onDeleteAttendee={onDeleteAttendee}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
