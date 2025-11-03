import { useState, useEffect, useContext } from "react";
import API from "../api";
import "../App.css";
import { AuthContext } from "./AuthContext";

export default function ComplaintForm() {
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);
  // const userId = localStorage.getItem("userId");
  const { token, role } = useContext(AuthContext);
  const userId = token;

  // Fetch complaints for current user
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data.filter((c) => c.user.id ===parseInt(userId)));
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert("Please enter a complaint description!");
      return;
    }

    try {
      await API.post("/complaints", {
        user: { id: userId },
        description,
      });

      alert("Complaint submitted!");
      setDescription("");
      fetchComplaints(); // Refresh table after submission
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div className="complaint-container">
      <div className="complaint-card">
        <h2 className="complaint-title">Submit Complaint</h2>
        <textarea
          className="complaint-textarea"
          placeholder="Enter your complaint here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="complaint-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Complaints Table */}
      <div className="complaint-table-container">
        <h2 className="complaint-title">My Complaints</h2>
        <table className="complaint-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Status</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td
                  className="no-data"
                  colSpan="4"
                  style={{ textAlign: "center" }}
                >
                  No complaints submitted.
                </td>
              </tr>
            ) : (
              complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.description}</td>
                  <td>{c.status}</td>
                  <td>{c.dateSubmitted}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
