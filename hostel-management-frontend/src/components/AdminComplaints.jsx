import { useEffect, useState } from "react";
import API from "../api";
import "../App.css";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const resolveComplaint = async (id) => {
    await API.put(`/complaints/resolve/${id}`);
    fetchComplaints();
  };

  return (
    <div className="admincomplaints-container">
      <div className="admincomplaints-card">
        <h2 className="admincomplaints-title">Manage Complaints</h2>

        {complaints.length === 0 ? (
          <p className="no-data">No complaints available</p>
        ) : (
          <div className="table-responsive">
            <table className="complaint-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.user?.name}</td>
                    <td>{c.description}</td>
                    <td>
                      <span
                        className={
                          c.status === "resolved"
                            ? "status-resolved"
                            : "status-pending"
                        }
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>
                      {c.status === "pending" && (
                        <button
                          className="resolve-btn"
                          onClick={() => resolveComplaint(c.id)}
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
