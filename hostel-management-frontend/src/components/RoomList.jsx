import { useContext, useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { AuthContext } from "./AuthContext";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    if (!token) return;
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    try {
      API.get("/rooms").then((res) => {
        setRooms(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleBook = (id) => {
    if (!token) {
      sessionStorage.setItem("redirectAfterLogin", `/users/book/${id}`);
      alert("Please login to book a room.");
      navigate("/login", { replace: true }); // use replace to avoid login page in history
      return;
    }
    navigate(`/users/book/${id}`);
  };

  return (
    <div className="roomlist-container">
      <h2 className="roomlist-title">Available Rooms</h2>
      <div className="roomlist-grid">
        {rooms.length === 0 ? (
          <p className="no-data">No rooms available</p>
        ) : (
          rooms.map((r) => {
            const booking = bookings.find((b) => b.room.id === r.id);

            return (
              <div key={r.id} className="room-card">
                <div style={{ textAlign: "center" }}>
                  <img
                    src={r.roomImage}
                    alt="Room"
                    width={"150px"}
                    style={{ borderRadius: "5px" }}
                  />
                </div>
                <br />
                <p>
                  <strong>Room No:</strong>
                  <span style={{ textTransform: "capitalize" }}>
                    {" "}
                    {r.roomNo}
                  </span>
                </p>
                <p>
                  <strong>Room Type:</strong>
                  <span style={{ textTransform: "capitalize" }}> {r.type}</span>
                </p>
                <p>
                  <strong>Floor:</strong>
                  <span style={{ textTransform: "capitalize" }}>
                    {" "}
                    {r.floor}
                  </span>
                </p>
                <p>
                  <strong>Capacity:</strong>
                  <span> {r.capacity}</span>
                </p>
                <p>
                  <strong>Occupied:</strong>
                  <span> {r.occupied}</span>
                </p>
                <p>
                  <strong>Fee:</strong>
                  <span style={{ fontWeight: "bolder" }}>
                    {" "}
                    ₹{r.feePerMonth}
                  </span>
                </p>
                <p>
                  <strong>Status: </strong>
                  <span
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "5px",
                      fontStyle: "italic",
                      textTransform: "capitalize",
                      backgroundColor: "#aedacbff",
                    }}
                  >
                    {r.status}
                  </span>
                </p>
                {/* Show buttons only if user is not admin */}
                {role !== "ADMIN" && (
                  <>
                    {booking ? (
                      // Already booked
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          disabled
                          style={{
                            width: "150px",
                            border: 0,
                            background:
                              booking.paymentStatus === "unpaid"
                                ? "orange"
                                : "gray",
                            opacity: 0.7,
                            cursor: "not-allowed",
                          }}
                          className="book-btn"
                        >
                          {booking.paymentStatus === "unpaid"
                            ? "Pending Payment"
                            : "Already Booked"}
                        </button>

                        <Link
                          to={`/users/bookings`}
                          className="book-btn"
                          style={{ textAlign: "center" }}
                        >
                          View
                        </Link>
                      </div>
                    ) : r.status !== "full" ? (
                      // Available to book
                      // <Link to={`/users/book/${r.id}`} className="book-btn">
                      //   Book Now
                      // </Link>
                      <button
                        onClick={() => handleBook(r.id)}
                        className="book-btn"
                      >
                        Book Now
                      </button>
                    ) : (
                      // Full room
                      <button
                        disabled
                        style={{
                          width: "150px",
                          border: 0,
                          background: "red",
                          opacity: 0.6,
                          cursor: "not-allowed",
                        }}
                        className="book-btn"
                      >
                        Full
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
