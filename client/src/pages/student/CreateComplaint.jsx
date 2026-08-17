import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CreateComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Electrical",
    priority: "Low",
    location: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/complaints", form);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">

      {/* Header */}
      <header className="dashboard-header">
        <div className="brand">
          <div className="brand-icon">C</div>
          <span>CampusCare</span>
        </div>

        <button
          className="logout-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      <main className="form-container">

        <div className="form-heading">
          <p className="welcome-label">Campus Support</p>

          <h1>Submit a Complaint</h1>

          <p>
            Tell us about the issue and we'll make sure
            it reaches the right people.
          </p>
        </div>

        <div className="complaint-form-card">

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">
                Complaint Title
              </label>

              <input
                id="title"
                name="title"
                placeholder="e.g. Broken fan in classroom"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the problem in detail..."
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category + Priority */}
            <div className="form-row">

              <div className="form-group">
                <label htmlFor="category">
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Classroom</option>
                  <option>Laboratory</option>
                  <option>Wi-Fi</option>
                  <option>Hostel</option>
                  <option>Library</option>
                  <option>Canteen</option>
                  <option>Parking</option>
                  <option>Cleanliness</option>
                  <option>Security</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">
                  Priority
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                name="location"
                placeholder="e.g. Block A, Room 204"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Actions */}
            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Complaint"}
              </button>

            </div>

          </form>

        </div>

      </main>
    </div>
  );
}

export default CreateComplaint;