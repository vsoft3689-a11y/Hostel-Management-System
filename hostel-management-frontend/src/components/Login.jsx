import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import API from "../api";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/users", { replace: true });
      }
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields!");
    try {
      const res = await API.post("/auth/login", { email, password });
      if (!res.data) return alert("Invalid credentials");
      login(res.data.token, res.data.role);

      // Get redirect path
      const redirectPath = sessionStorage.getItem("redirectAfterLogin");

      if (res.data.role === "USER") {
        if (redirectPath) {
          sessionStorage.removeItem("redirectAfterLogin");
          return navigate(redirectPath, { replace: true });
        } else {
          return navigate("/users", { replace: true }); 
        }
      } else if (res.data.role === "ADMIN") {
        return navigate("/admin", { replace: true });
      }

      alert("Logged in successfully!");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <br />
        <br />
        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
