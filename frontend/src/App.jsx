import { useEffect, useState, useMemo } from "react";
import axios from "axios";

// Icons for UI elements
import { Search, Filter } from "lucide-react";

// Components for form input and display
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import "./styles/App.css";

const App = () => {
  // State for event data, UI filters, and loading indicator
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [loading, setLoading] = useState(false);

  // Fetch events from backend with query filters
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        params: {
          search: filters.search,
          category: filters.category,
        },
      });
      setEvents(res.data.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new event
  const addEvent = async (eventData) => {
    try {
      await axios.post("http://localhost:5000/api/events", eventData);
      fetchEvents(); // Refresh list after creation
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Add attendee to a specific event
  const addAttendee = async (eventId, attendeeData) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/attendees`, attendeeData);
      fetchEvents();
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  // Remove an attendee by index
  const deleteAttendee = async (eventId, index) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}/attendees/${index}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  // Trigger event fetch anytime filters change
  useEffect(() => {
    fetchEvents();
  }, [filters]);

  // Extract unique category list for future filtering
  const categories = useMemo(() => {
    const set = new Set();
    events.forEach(ev => {
      if (ev.category && ev.category.trim()) set.add(ev.category.trim());
    });
    return Array.from(set);
  }, [events]);

  // Sort events by descending date
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [events]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">🎉 Online Event Management System</h1>
        <p className="app-subtitle">Create, manage, and track your events with ease</p>
      </header>

      {/* Filter controls */}
      <div className="filters-container">
        <h3 className="filters-title">
          <Filter size={20} />
          Search Events
        </h3>
        <div className="filters-grid">
          <div className="form-group">
            <label className="form-label">
              <Search size={16} />
              Search Events
            </label>
            <input
              className="form-input"
              placeholder="Search by title or description..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Main form and event list */}
      <div className="main-content">
        <EventForm onSubmit={addEvent} />
        <EventList
          events={sortedEvents}
          onAddAttendee={addAttendee}
          onDeleteAttendee={deleteAttendee}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App;
