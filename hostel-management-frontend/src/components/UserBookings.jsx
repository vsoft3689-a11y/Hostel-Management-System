import { useEffect, useState } from "react";
import API from "../api";
import "../App.css";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/bookings/my");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const payBooking = async (id) => {
    await API.put(`/bookings/pay/${id}`);
    alert("Payment successful!");
    fetchBookings();
  };

  return (
    <div className="userbookings-page">
      <div className="userbookings-container">
        <h2 className="userbookings-title">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="no-data">No bookings found</p>
        ) : (
          <table className="userbookings-table">
            <thead>
              <tr>
                <th>Room No</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.room.roomNo}</td>
                  <td>{b.startDate}</td>
                  <td>{b.endDate}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        b.status === "approved"
                          ? "approved"
                          : b.status === "pending"
                            ? "pending"
                            : "rejected"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`payment-badge ${
                        b.paymentStatus === "paid" ? "paid" : "unpaid"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {b.status === "approved" && b.paymentStatus === "unpaid" ? (
                      <button
                        className="pay-btn"
                        onClick={() => payBooking(b.id)}
                      >
                        💳 Pay Now
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
