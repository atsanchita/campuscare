import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadComplaints = async () => {
    try {
      setLoading(true);

      const response = await api.get("/complaints/admin/all");

      setComplaints(response.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const getCount = (status) => {
    return complaints.filter(
      (complaint) => complaint.status === status
    ).length;
  };

  const getHighPriorityCount = () => {
    return complaints.filter(
      (complaint) =>
        complaint.priority === "High" ||
        complaint.priority === "Critical"
    ).length;
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "badge badge-success";
      case "in progress":
        return "badge badge-warning";
      default:
        return "badge badge-pending";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
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

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-error">
        <h2>{error}</h2>
        <button onClick={loadComplaints}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">

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

      <main className="dashboard-container">

        {/* Welcome */}
        <section className="welcome-section">
          <div>
            <p className="welcome-label">
              Administration
            </p>

            <h1>Admin Dashboard</h1>

            <p>
              Monitor and manage campus complaints
              from one place.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="stats-grid admin-stats">

          <div className="stat-card">
            <div className="stat-icon blue">📋</div>

            <div>
              <p>Total Complaints</p>
              <h2>{complaints.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⏳</div>

            <div>
              <p>Pending</p>
              <h2>{getCount("Pending")}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">🔄</div>

            <div>
              <p>In Progress</p>
              <h2>{getCount("In Progress")}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>

            <div>
              <p>Resolved</p>
              <h2>{getCount("Resolved")}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">!</div>

            <div>
              <p>High / Critical</p>
              <h2>{getHighPriorityCount()}</h2>
            </div>
          </div>

        </section>

        {/* Complaints */}
        <section className="admin-complaints-section">

          <div className="section-heading">
            <div>
              <h2>All Complaints</h2>
              <p>
                Review and manage complaints submitted
                by students.
              </p>
            </div>

            <span className="complaint-count">
              {complaints.length} total
            </span>
          </div>

          {complaints.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>

              <h3>No complaints found</h3>

              <p>
                There are currently no complaints
                submitted by students.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Complaint</th>
                    <th>Student</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint._id}>

                      <td>
                        <div className="admin-complaint-title">
                          <strong>
                            {complaint.title}
                          </strong>

                          <span>
                            {complaint.description}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="student-cell">
                          <div className="student-avatar">
                            {(complaint.student?.name ||
                              complaint.student?.email ||
                              "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <span>
                            {complaint.student?.name ||
                              complaint.student?.email ||
                              "Unknown"}
                          </span>
                        </div>
                      </td>

                      <td>
                        {complaint.category}
                      </td>

                      <td>
                        <span
                          className={getPriorityClass(
                            complaint.priority
                          )}
                        >
                          {complaint.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            complaint.status
                          )}
                        >
                          {complaint.status}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          complaint.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          className="manage-button"
                          onClick={() =>
                            navigate(
                              `/admin/complaints/${complaint._id}`
                            )
                          }
                        >
                          Manage →
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;