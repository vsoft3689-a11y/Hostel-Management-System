import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import API from "../api";
import "../App.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }
    }
  }, [token, role, navigate]);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) {
      return alert("Please fill all fields!");
    }

    try {
      await API.post("/auth/register", { name, email, phone, password });
      alert("Registered successfully!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <input
          className="register-input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="register-input"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register-input"
          placeholder="Phone"
          type="number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="register-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        <br />
        <br />
        <p className="existing-user">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
