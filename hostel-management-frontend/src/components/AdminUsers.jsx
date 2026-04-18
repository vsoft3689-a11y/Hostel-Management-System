import { useEffect, useState } from "react";
import API from "../api";
import "../App.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      const users = res.data.filter((n) => n.role !== "ADMIN");
      setUsers(users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="adminusers-container">
      <div className="adminusers-card">
        <h2 className="adminusers-title">Manage Users</h2>

        <div className="adminusers-list">
          {users.length === 0 ? (
            <p className="no-data">No users found</p>
          ) : (
            <div className="adminusers-table-container">
              <table className="adminusers-table">
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Email</th>
                    {/* <th>Role</th> */}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.email}>
                      {/* <td>{u.id}</td> */}
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      {/* <td>
                        <span className={`role-badge ${u.role}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
