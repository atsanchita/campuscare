import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function AdminComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [adminRemark, setAdminRemark] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);

      const data = response.data.data;

      setComplaint(data);
      setStatus(data.status);
      setPriority(data.priority);
      setAdminRemark(data.adminRemark || "");
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.patch(
        `/complaints/admin/${id}`,
        {
          status,
          priority,
          adminRemark,
        }
      );

      setComplaint(response.data.data);
      setSuccess("Complaint updated successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update complaint"
      );
    } finally {
      setSaving(false);
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
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Admin Dashboard
        </button>
      </div>
    );
  }

  const getStatusClass = (value) => {
    switch (value?.toLowerCase()) {
      case "resolved":
        return "badge badge-success";
      case "in progress":
        return "badge badge-warning";
      default:
        return "badge badge-pending";
    }
  };

  const getPriorityClass = (value) => {
    switch (value?.toLowerCase()) {
      case "critical":
        return "badge badge-danger";
      case "high":
        return "badge badge-high";
      case "medium":
        return "badge badge-warning";
      default:
        return "badge badge-low";
    }
  };

  return (
    <div className="admin-details-page">

      {/* Header */}
      <header className="dashboard-header">

        <div className="brand">
          <div className="brand-icon">C</div>
          <span>CampusCare</span>
        </div>

        <div className="admin-header-right">

          <span className="admin-label">
            Administrator
          </span>

          <button
            className="logout-button"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>

        </div>

      </header>

      <main className="admin-details-container">

        {/* Heading */}
        <div className="details-heading">

          <p className="welcome-label">
            Complaint Management
          </p>

          <h1>Manage Complaint</h1>

          <p>
            Review the complaint and update its status,
            priority, or response.
          </p>

        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            ✓ {success}
          </div>
        )}

        <div className="admin-management-grid">

          {/* Complaint Information */}
          <section className="details-card">

            <div className="details-top">

              <div>
                <p className="complaint-category">
                  {complaint.category}
                </p>

                <h2>{complaint.title}</h2>
              </div>

              <span
                className={getStatusClass(
                  complaint.status
                )}
              >
                {complaint.status}
              </span>

            </div>

            <hr className="divider" />

            <div className="detail-section">
              <h3>Description</h3>

              <p>
                {complaint.description}
              </p>
            </div>

            <div className="detail-grid">

              <div className="detail-item">
                <span>Student</span>

                <strong>
                  {complaint.student?.name ||
                    complaint.student?.email ||
                    "Unknown"}
                </strong>
              </div>

              <div className="detail-item">
                <span>Category</span>

                <strong>
                  {complaint.category}
                </strong>
              </div>

              <div className="detail-item">
                <span>Location</span>

                <strong>
                  📍 {complaint.location}
                </strong>
              </div>

              <div className="detail-item">
                <span>Priority</span>

                <strong>
                  <span
                    className={getPriorityClass(
                      complaint.priority
                    )}
                  >
                    {complaint.priority}
                  </span>
                </strong>
              </div>

            </div>

            {complaint.adminRemark && (
              <div className="admin-remark">

                <div className="remark-icon">
                  💬
                </div>

                <div>
                  <h3>Current Admin Remark</h3>

                  <p>
                    {complaint.adminRemark}
                  </p>
                </div>

              </div>
            )}

          </section>

          {/* Management Panel */}
          <section className="management-card">

            <div className="management-heading">

              <div className="management-icon">
                ⚙
              </div>

              <div>
                <h2>Update Complaint</h2>

                <p>
                  Changes will be visible to the student.
                </p>
              </div>

            </div>

            <form
              className="admin-update-form"
              onSubmit={handleUpdate}
            >

              <div className="form-group">

                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>
                </select>

              </div>

              <div className="form-group">

                <label htmlFor="priority">
                  Priority
                </label>

                <select
                  id="priority"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                >
                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Critical">
                    Critical
                  </option>
                </select>

              </div>

              <div className="form-group">

                <label htmlFor="adminRemark">
                  Admin Remark
                </label>

                <textarea
                  id="adminRemark"
                  value={adminRemark}
                  onChange={(e) =>
                    setAdminRemark(e.target.value)
                  }
                  placeholder="Add a response or update for the student..."
                />

              </div>

              <button
                type="submit"
                className="primary-button update-button"
                disabled={saving}
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>

            </form>

          </section>

        </div>

        <button
          className="back-admin-button"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to All Complaints
        </button>

      </main>

    </div>
  );
}

export default AdminComplaintDetails;