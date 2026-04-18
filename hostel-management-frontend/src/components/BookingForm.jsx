import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import API from "../api";
import "../App.css";
import { AuthContext } from "./AuthContext";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [duration, setDuration] = useState(1);
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // if (!token) {
    //   sessionStorage.setItem("redirectAfterLogin", `/users/book/${id}`);
    //   alert("Please login to book a room.");
    //   navigate("/login", { replace: true }); // use replace to avoid login page in history
    // }else if (!id) {
    //   alert("Invalid room ID");
    //   navigate("/rooms");
    // }else {
      sessionStorage.removeItem("redirectAfterLogin");
    // }
  }, [token, id, navigate]);

  // Fetch room details
  useEffect(() => {
    API.get(`/rooms/${id}`).then((res) => {
      setRoom(res.data);
      setAmount(res.data.feePerMonth);
    });
  }, [id]);

  // Compute end date safely
  useEffect(() => {
    if (!startDate) return; // if undefined or empty, skip

    const parsedDate = new Date(startDate);
    if (isNaN(parsedDate.getTime())) return; // invalid date → skip

    const end = new Date(parsedDate);
    end.setMonth(parsedDate.getMonth() + parseInt(duration));

    // Safe check before converting to ISO
    if (!isNaN(end.getTime())) {
      setEndDate(end.toISOString().split("T")[0]);
    }
  }, [startDate, duration]);

  // Update amount whenever duration or room changes
  useEffect(() => {
    if (room) setAmount(room.feePerMonth * duration);
  }, [room, duration]);

  const handleBook = async () => {
    // if (!id) {
    //   sessionStorage.setItem("redirectAfterLogin", `/users/book/${id}`);
    //   alert("Please login to book a room.");
    //   navigate("/login", { replace: true }); // use replace to avoid login page in history
    //   return;
    // }

    if (!duration || duration <= 0) return alert("Select valid duration");
    if (!startDate || !endDate) return alert("Invalid start or end date");

    await API.post("/bookings/apply", {
      room: { id: room.id },
      amount,
      duration,
      startDate,
      endDate,
    });

    alert("Booking request sent! Waiting for admin approval.");
    navigate("/rooms");
  };

  if (!room) return <p>Loading room details...</p>;

  return (
    <div className="bookingform-page">
      <div className="bookingform-container">
        <h2>Confirm Booking</h2>
        <div className="booking-details">
          <p style={{ textAlign: "center" }}>
            <img
              src={room.roomImage}
              alt="Room"
              width={250}
              style={{ borderRadius: "5px" }}
            />
          </p>
          <p>
            <strong>Room No:</strong> {room.roomNo}
          </p>
          <p>
            <strong>Capacity:</strong> {room.capacity}
          </p>
          <p>
            <strong>Occupied:</strong> {room.occupied}
          </p>
          <p>
            <strong>Fee per Month:</strong> ₹{room.feePerMonth}
          </p>
        </div>

        <div className="booking-form">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>Booking Duration (months):</label>
          {/* <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          /> */}
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value={1}>1 month</option>
            <option value={2}>2 months</option>
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
          </select>

          {endDate && (
            <p>
              <strong>End Date:</strong> {endDate}
            </p>
          )}
          <p>
            <strong>Total Amount:</strong> ₹{amount}
          </p>

          <button className="apply-btn" onClick={handleBook}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
