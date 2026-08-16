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
    return <h2>Loading complaint...</h2>;
  }

  if (!complaint) {
    return <h2>{error || "Complaint not found"}</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <h1>Complaint Details</h1>

      {error && <p>{error}</p>}

      {!editing ? (
        <>
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
            <strong>Priority:</strong>{" "}
            {complaint.priority}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {complaint.location}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {complaint.status}
          </p>

          {complaint.adminRemark && (
            <p>
              <strong>Admin Remark:</strong>{" "}
              {complaint.adminRemark}
            </p>
          )}

          <button onClick={() => setEditing(true)}>
            Edit
          </button>

          <button onClick={handleDelete}>
            Delete
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <select
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

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default ComplaintDetails;