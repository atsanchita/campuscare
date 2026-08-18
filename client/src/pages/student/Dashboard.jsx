import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const userResponse = await api.get("/auth/me");
      const complaintsResponse = await api.get("/complaints");

      setUser(userResponse.data.data);
      setComplaints(complaintsResponse.data.data);
    } catch (error) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    navigate("/login");
  } catch (error) {
    console.error("Logout failed", error);
  }
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

  const resolvedCount = complaints.filter(
    (complaint) =>
      complaint.status?.toLowerCase() === "resolved"
  ).length;

  const pendingCount = complaints.filter(
    (complaint) =>
      complaint.status?.toLowerCase() === "pending"
  ).length;

  const inProgressCount = complaints.filter(
    (complaint) =>
      complaint.status?.toLowerCase() === "in progress"
  ).length;

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <div className="brand">
            <div className="brand-icon">C</div>
            <span>CampusCare</span>
          </div>
        </div>

<button
  className="logout-button"
  onClick={handleLogout}
>
  Logout
</button>
      </header>

      <main className="dashboard-container">

        {/* Welcome */}
        <section className="welcome-section">
          <div>
            <p className="welcome-label">Student Dashboard</p>

            <h1>
              Welcome {user?.name} 👋
            </h1>

            <p>
              Track and manage your campus complaints in one place.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/complaints/new")}
          >
            + New Complaint
          </button>
        </section>

        {/* Statistics */}
        <section className="stats-grid">

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
              <h2>{pendingCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">🔄</div>
            <div>
              <p>In Progress</p>
              <h2>{inProgressCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <p>Resolved</p>
              <h2>{resolvedCount}</h2>
            </div>
          </div>

        </section>

        {/* Complaints */}
        <section className="complaints-section">

          <div className="section-heading">
            <div>
              <h2>My Complaints</h2>
              <p>
                View and manage the complaints you've submitted.
              </p>
            </div>
          </div>

          {complaints.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>

              <h3>No complaints yet</h3>

              <p>
                You haven't submitted any complaints.
                Create your first one to get started.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  navigate("/complaints/new")
                }
              >
                Create Complaint
              </button>
            </div>
          ) : (
            <div className="complaints-grid">

              {complaints.map((complaint) => (
                <div
                  className="complaint-card"
                  key={complaint._id}
                >

                  <div className="complaint-card-top">

                    <div>
                      <p className="complaint-category">
                        {complaint.category}
                      </p>

                      <h3>{complaint.title}</h3>
                    </div>

                    <span
                      className={getStatusClass(
                        complaint.status
                      )}
                    >
                      {complaint.status}
                    </span>

                  </div>

                  <p className="complaint-description">
                    {complaint.description}
                  </p>

                  <div className="complaint-meta">

                    <span>
                      📍 {complaint.location}
                    </span>

                    <span
                      className={getPriorityClass(
                        complaint.priority
                      )}
                    >
                      {complaint.priority}
                    </span>

                  </div>

                  <div className="complaint-card-footer">

                    <button
                      className="secondary-button"
                      onClick={() =>
                        navigate(
                          `/complaints/${complaint._id}`
                        )
                      }
                    >
                      View Details →
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default Dashboard;