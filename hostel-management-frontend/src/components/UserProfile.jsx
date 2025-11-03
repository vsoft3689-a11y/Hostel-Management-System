import { useContext, useEffect, useState } from "react";
import API from "../api";
import "../App.css";
import { AuthContext } from "./AuthContext";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { token, role } = useContext(AuthContext);
  const userId = token;
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/profile/${userId}`);
      console.log(res.data);
      setUser(res.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // if (loading) {
  //   return <p className="loading">Loading profile...</p>;
  // }

  if (!user) {
    return <p className="error">No user data available.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-section">
          <h3>Personal Information</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
