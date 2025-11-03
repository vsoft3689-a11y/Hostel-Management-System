import { Link } from "react-router-dom";
import "../App.css";

export default function UserDashboard() {
  return (
    <div className="user-dashboard">
      <div className="user-card">
        <h2 className="user-title">User Dashboard</h2>
        <ul className="user-menu">
          <li>
            <Link className="user-link" to="/users/profile">
              <p style={{ fontSize: "50px" }}>👤</p>
              <br />
              My Profile
            </Link>
          </li>
          <li>
            <Link className="user-link" to="/rooms">
              <p style={{ fontSize: "50px" }}>🚪</p>
              <br />
              View Rooms
            </Link>
          </li>
          <li>
            <Link className="user-link" to="/users/bookings">
              <p style={{ fontSize: "50px" }}>💳</p>
              <br />
              My Bookings / Pay
            </Link>
          </li>
          <li>
            <Link className="user-link" to="/users/complaint">
              <p style={{ fontSize: "50px" }}>🧾</p>
              <br />
              Submit Complaint
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
