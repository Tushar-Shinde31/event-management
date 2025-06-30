// AttendeeForm.jsx
// This component renders a form for adding a new attendee to an event. It validates input and calls the onSubmit prop with attendee data.

import { useState } from "react";
import { User, Mail, UserPlus } from "lucide-react";
import "../styles/AttendeeForm.css";

// AttendeeForm component: handles attendee input and validation
const AttendeeForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: "", email: "" }); // Form state
  const [errors, setErrors] = useState({}); // Validation errors
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes and clear errors as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(form); // Call parent handler with attendee data
      setForm({ name: "", email: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting attendee form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="attendee-form-container">
      {/* Form header with icon and title */}
      <div className="attendee-form-header">
        <UserPlus size={20} />
        Add New Attendee
      </div>

      {/* Attendee input form */}
      <form onSubmit={handleSubmit} className="attendee-form">
        {/* Name input */}
        <div className="attendee-form-group">
          <label className="attendee-form-label">
            <User size={14} />
            Full Name
          </label>
          <input
            className="attendee-form-input"
            name="name"
            placeholder="Enter attendee name..."
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="form-validation-error">
              <span>⚠</span>
              {errors.name}
            </div>
          )}
        </div>

        {/* Email input */}
        <div className="attendee-form-group">
          <label className="attendee-form-label">
            <Mail size={14} />
            Email Address
          </label>
          <input
            className="attendee-form-input"
            name="email"
            type="email"
            placeholder="Enter email address..."
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="form-validation-error">
              <span>⚠</span>
              {errors.email}
            </div>
          )}
        </div>

        {/* Submit button with loading state */}
        <button 
          type="submit" 
          className="attendee-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner"></div>
              Adding...
            </>
          ) : (
            <>
              <UserPlus size={16} />
              Add Attendee
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AttendeeForm;
