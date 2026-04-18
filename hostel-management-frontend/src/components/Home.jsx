import { useNavigate } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Home() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">🏢 HostelEase Management System</h1>
          <p className="hero-subtitle">
            Simplify hostel operations with digital booking, payments, and room
            management.
          </p>
          <div className="hero-buttons">
            {token ? (
              <button className="btn btn-register" onClick={()=>  navigate("/rooms")}>Explore</button>
            ) : (
              <>
                <button
                className="btn btn-login"
                onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-register"
                  onClick={() => navigate("/register")}
                  >
                  Register
                </button>
                  </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About the System</h2>
        <p>
          The Hostel Management System is designed to automate hostel operations
          such as room allocation, student registration, booking approval,
          payments, and complaint management. It provides an intuitive interface
          for both admins and students to ensure efficient management.
        </p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
           <div className="feature-card">
            <h3>📈 Dashboard Overview</h3>
            <p>
              Quick view of total rooms, bookings, and active complaints at a
              glance.
            </p>
          </div>
          {/* <div className="feature-card">
            <h3>🧑‍💼 Role-based Access</h3>
            <p>Separate dashboards for Admins and Students with secure login access.</p>
          </div> */}
          <div className="feature-card">
            <h3>🏢 Room Management</h3>
            <p>
              Admins can add, update, and monitor room capacity and
              availability.
            </p>
          </div>
          {/* <div className="feature-card">
            <h3>💳 Online Payment</h3>
            <p>Students can pay room fees after admin approval, tracked digitally.</p>
          </div> */}
          <div className="feature-card">
            <h3>📋 Booking Management</h3>
            <p>
              Streamlined room booking with real-time status updates and
              approvals.
            </p>
          </div>
          <div className="feature-card">
            <h3>🧾 Complaint Handling</h3>
            <p>
              Students can raise complaints, and admins can track and resolve
              them easily.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
