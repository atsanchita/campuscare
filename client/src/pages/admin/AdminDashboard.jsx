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

  if (loading) {
    return <h2>Loading admin dashboard...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <div>
          <h3>Total Complaints</h3>
          <p>{complaints.length}</p>
        </div>

        <div>
          <h3>Pending</h3>
          <p>{getCount("Pending")}</p>
        </div>

        <div>
          <h3>In Progress</h3>
          <p>{getCount("In Progress")}</p>
        </div>

        <div>
          <h3>Resolved</h3>
          <p>{getCount("Resolved")}</p>
        </div>

        <div>
          <h3>High / Critical</h3>
          <p>{getHighPriorityCount()}</p>
        </div>
      </div>

      <hr />

      <h2>All Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Complaint</th>
              <th>Student</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>

                <td>
                  {complaint.student?.name ||
                    complaint.student?.email ||
                    "Unknown"}
                </td>

                <td>{complaint.category}</td>

                <td>{complaint.priority}</td>

                <td>{complaint.status}</td>

                <td>
                  {new Date(
                    complaint.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/complaints/${complaint._id}`
                      )
                    }
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;