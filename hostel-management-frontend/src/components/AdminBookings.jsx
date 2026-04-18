import { useState, useEffect } from "react";
import API from "../api";
import "../App.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/admin/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const approveBooking = async (id) => {
    await API.post(`/admin/bookings/approve/${id}`);
    fetchBookings();
  };

  return (
    <div className="adminbookings-container">
      <div className="adminbookings-card">
        <h2 className="adminbookings-title">Manage Bookings</h2>

        {bookings.length === 0 ? (
          <p className="no-data">No bookings available</p>
        ) : (
          <div className="table-responsive">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Room No</th>
                  <th>Type</th>
                  <th>Floor</th>
                  <th>Fee</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, index) => (
                  <tr key={b.id}>
                    <td>{index + 1}</td>
                    <td>{b.user?.name}</td>
                    <td>{b.room?.roomNo}</td>
                    <td>{b.room?.type}</td>
                    <td>{b.room?.floor}</td>
                    <td>₹{b.room?.feePerMonth}</td>
                    <td>
                      <span
                        className={
                          b.status === "approved"
                            ? "status-approved"
                            : "status-pending"
                        }
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          b.paymentStatus === "paid"
                            ? "status-paid"
                            : "status-unpaid"
                        }
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td>
                      {b.status === "pending" && b.status ? (
                        <button
                          className="approve-btn"
                          onClick={() => approveBooking(b.id)}
                        >
                          Approve
                        </button>
                      ) : <p style={{textAlign:"center"}}>-</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
