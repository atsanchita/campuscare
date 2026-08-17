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

      const response = await api.patch(
        `/complaints/admin/${id}`,
        {
          status,
          priority,
          adminRemark,
        }
      );

      setComplaint(response.data.data);
      alert("Complaint updated successfully");
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
    return <h2>Loading complaint...</h2>;
  }

  if (!complaint) {
    return <h2>{error || "Complaint not found"}</h2>;
  }

  return (
    <div>
      <button
        onClick={() => navigate("/admin/dashboard")}
      >
        ← Back to Admin Dashboard
      </button>

      <h1>Manage Complaint</h1>

      {error && <p>{error}</p>}

      <div>
        <h2>{complaint.title}</h2>

        <p>
          <strong>Description:</strong>{" "}
          {complaint.description}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {complaint.category}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {complaint.location}
        </p>

        <p>
          <strong>Student:</strong>{" "}
          {complaint.student?.name ||
            complaint.student?.email ||
            "Unknown"}
        </p>
      </div>

      <hr />

      <form onSubmit={handleUpdate}>
        <div>
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label>Admin Remark</label>

          <textarea
            value={adminRemark}
            onChange={(e) =>
              setAdminRemark(e.target.value)
            }
            placeholder="Add a remark for the student..."
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Complaint"}
        </button>
      </form>
    </div>
  );
}

export default AdminComplaintDetails;