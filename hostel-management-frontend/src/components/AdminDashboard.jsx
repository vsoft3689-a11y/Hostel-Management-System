import { Link } from "react-router-dom";
import "../App.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-card">
        <h2 className="admin-title">Admin Dashboard</h2>
        <ul className="admin-menu">
          <li>
            <Link className="admin-link" to="/admin/hostel-info">
              <p style={{ fontSize: "50px" }}>🏣</p>
              <br />
              Manage Hostel
            </Link>
          </li>
          <li>
            <Link className="admin-link" to="/admin/rooms">
              <p style={{ fontSize: "50px" }}>🚪</p>
              <br />
              Manage Rooms
            </Link>
          </li>
          <li>
            <Link className="admin-link" to="/admin/users">
              <p style={{ fontSize: "50px" }}>👨🏻‍💼</p>
              <br />
              Manage Users
            </Link>
          </li>
          <li>
            <Link className="admin-link" to="/admin/bookings">
              <p style={{ fontSize: "50px" }}>📅</p>
              <br />
              Manage Bookings
            </Link>
          </li>
          <li>
            <Link className="admin-link" to="/admin/complaints">
              <p style={{ fontSize: "50px" }}>🧾</p>
              <br />
              Manage Complaints
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
