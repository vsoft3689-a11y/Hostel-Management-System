import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "../App.css";

const Navbar = () => {
  const { role, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🏨 HostelEase</Link>
      </div>

      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/rooms" onClick={() => setMenuOpen(false)}>Rooms</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
      </ul>

      <div className={`navbar-buttons ${menuOpen ? "active" : ""}`}>
        {token ? (
          <>
            {role === "ADMIN" ? (
              <Link
                to={"/admin"}
                className="btn register-btn"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to={"/users"}
                className="btn register-btn"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className="btn login-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn login-btn"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn register-btn"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
