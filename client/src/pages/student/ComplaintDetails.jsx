import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);

      const data = response.data.data;

      setComplaint(data);

      setForm({
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        location: data.location,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaint();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await api.patch(
        `/complaints/${id}`,
        form
      );

      setComplaint(response.data.data);
      setEditing(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update complaint"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/complaints/${id}`);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete complaint"
      );
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading complaint...</p>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="details-error">
        <h2>{error || "Complaint not found"}</h2>

        <button
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">

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

      <main className="details-container">

        <div className="details-heading">
          <div>
            <p className="welcome-label">
              Complaint Management
            </p>

            <h1>Complaint Details</h1>

            <p>
              View the current status and information
              about your complaint.
            </p>
          </div>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!editing ? (
          <div className="details-card">

            {/* Title + Status */}
            <div className="details-top">

              <div>
                <p className="complaint-category">
                  {complaint.category}
                </p>

                <h2>{complaint.title}</h2>
              </div>

              <span
                className={`badge ${
                  complaint.status?.toLowerCase() ===
                  "resolved"
                    ? "badge-success"
                    : complaint.status?.toLowerCase() ===
                      "in progress"
                    ? "badge-warning"
                    : "badge-pending"
                }`}
              >
                {complaint.status}
              </span>

            </div>

            <hr className="divider" />

            {/* Description */}
            <div className="detail-section">
              <h3>Description</h3>
              <p>{complaint.description}</p>
            </div>

            {/* Information */}
            <div className="detail-grid">

              <div className="detail-item">
                <span>Category</span>
                <strong>{complaint.category}</strong>
              </div>

              <div className="detail-item">
                <span>Priority</span>

                <strong>
                  <span
                    className={`badge ${
                      complaint.priority?.toLowerCase() ===
                      "critical"
                        ? "badge-danger"
                        : complaint.priority?.toLowerCase() ===
                          "high"
                        ? "badge-high"
                        : complaint.priority?.toLowerCase() ===
                          "medium"
                        ? "badge-warning"
                        : "badge-low"
                    }`}
                  >
                    {complaint.priority}
                  </span>
                </strong>
              </div>

              <div className="detail-item">
                <span>Location</span>
                <strong>📍 {complaint.location}</strong>
              </div>

              <div className="detail-item">
                <span>Status</span>
                <strong>{complaint.status}</strong>
              </div>

            </div>

            {/* Admin Remark */}
            {complaint.adminRemark && (
              <div className="admin-remark">
                <div className="remark-icon">💬</div>

                <div>
                  <h3>Admin Remark</h3>
                  <p>{complaint.adminRemark}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="details-actions">

              <button
                className="secondary-button"
                onClick={() => setEditing(true)}
              >
                Edit Complaint
              </button>

              <button
                className="delete-button"
                onClick={handleDelete}
              >
                Delete Complaint
              </button>

            </div>

          </div>
        ) : (
          <div className="details-card">

            <div className="edit-heading">
              <h2>Edit Complaint</h2>
              <p>
                Update the information below and save
                your changes.
              </p>
            </div>

            <form
              className="edit-form"
              onSubmit={handleUpdate}
            >

              <div className="form-group">
                <label htmlFor="title">
                  Complaint Title
                </label>

                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

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

              <div className="form-group">
                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setEditing(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>
        )}

      </main>
    </div>
  );
}

export default ComplaintDetails;