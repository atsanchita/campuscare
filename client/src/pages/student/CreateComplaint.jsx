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
    <div>
      <h1>New Complaint</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Complaint title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Describe the issue"
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
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>

      <button onClick={() => navigate("/dashboard")}>
        Cancel
      </button>
    </div>
  );
}

export default CreateComplaint;