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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>CampusCare</h1>

      <h2>Welcome, {user?.name} 👋</h2>

      <button onClick={() => navigate("/complaints/new")}>
        + New Complaint
      </button>

      <h2>My Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints yet.</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint._id}>
  <h3>{complaint.title}</h3>

  <p>{complaint.description}</p>

  <p>
    <strong>Status:</strong> {complaint.status}
  </p>

  <p>
    <strong>Priority:</strong> {complaint.priority}
  </p>

  <button
    onClick={() =>
      navigate(`/complaints/${complaint._id}`)
    }
  >
    View Details
  </button>
</div>
        ))
      )}
    </div>
  );
}

export default Dashboard;