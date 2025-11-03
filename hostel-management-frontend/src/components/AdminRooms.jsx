import { useState, useEffect } from "react";
import API from "../api";
import "../App.css";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [roomNo, setRoomNo] = useState("");
  const [roomImage, setRoomImage] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [type, setType] = useState("");
  const [floor, setFloor] = useState("");
  const [fee, setFee] = useState(0);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editRoomNo, setEditRoomNo] = useState("");
  const [editRoomImage, setEditRoomImage] = useState("");
  const [editRoomType, setEditRoomType] = useState("");
  const [editRoomFloor, setEditRoomFloor] = useState("");
  const [editCapacity, setEditCapacity] = useState(1);
  const [editFee, setEditFee] = useState(0);

  const fetchRooms = async () => {
    const res = await API.get("/rooms");
    setRooms(res.data);
  console.log(res.data)

  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const addRoom = async () => {
    if (!roomNo || fee <= 0 || capacity <= 0)
      return alert("Please fill valid details");
    await API.post("/rooms/add", {
      roomNo,
      capacity,
      feePerMonth: fee,
      occupied: 0,
      type,
      floor,
      roomImage,
      status: "available",
    });
    fetchRooms();
    setRoomNo("");
    setCapacity(1);
    setRoomImage("");
    setType("");
    setFloor("");
    setFee(0);
  };

  const deleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await API.delete(`/rooms/delete/${id}`);
      fetchRooms();
    }
  };

  const startEdit = (room) => {
    setEditingRoomId(room.id);
    setEditRoomNo(room.roomNo);
    setEditCapacity(room.capacity);
    setEditFee(room.feePerMonth);
    setEditRoomType(room.type);
    setEditRoomImage(room.roomImage);
    setEditRoomFloor(room.floor);
  };

  const cancelEdit = () => {
    setEditingRoomId(null);
  };

  const saveEdit = async (id) => {
    if (!editRoomNo || editCapacity <= 0 || editFee <= 0)
      return alert("Enter valid details");
    await API.put(`/rooms/update/${id}`, {
      roomNo: editRoomNo,
      capacity: editCapacity,
      feePerMonth: editFee,
      type: editRoomType,
      floor: editRoomFloor,
      roomImage:editRoomImage
    });
    setEditingRoomId(null);
    fetchRooms();
  };

  return (
    <div className="adminrooms-container">
      <div className="adminrooms-card">
        <h2 className="adminrooms-title">Manage Rooms</h2>

        <div className="adminrooms-form">
          <div className="adminrooms-left">
          <label htmlFor="">Room No </label>
            <input
              placeholder="Room No"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              className="adminrooms-input"
            />

            <label htmlFor=""> Room Image URL </label>
            <input
              type="text"
              placeholder="Room Image"
              value={roomImage}
              onChange={(e) => setRoomImage(e.target.value)}
              className="adminrooms-input"
            />
            
            <label htmlFor=""> Capacity </label>
            <input
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="adminrooms-input"
            />

          </div>

          <div className="adminrooms-right">
            <label htmlFor=""> Floor Type </label>
            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="adminrooms-input"
            >
              <option value="select">Select</option>
              <option value="ground-floor">Ground Floor</option>
              <option value="first-floor">First Floor</option>
              <option value="second-floor">Second Floor</option>
              <option value="third-floor">Third Floor</option>
            </select>

            <label htmlFor=""> Room Type </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="adminrooms-input"
            >
              <option value="select">Select</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
            </select>
        
            <label htmlFor=""> Fee </label>
            <input
              type="number"
              placeholder="Fee (per month)"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="adminrooms-input"
            />

          </div>
        </div> <br />
            <button onClick={addRoom} className="adminrooms-button">
              ➕ Add Room
            </button>

        <h3 className="adminrooms-subtitle">Room List</h3>

        <div className="adminrooms-table-container">
          {rooms.length === 0 ? (
            <p className="no-data">No rooms available</p>
          ) : (
            <table className="adminrooms-table">
              <thead>
                <tr>
                  <th>Room Image</th>
                  <th>Room No</th>
                  <th>Room Type</th>
                  <th>Floor</th>
                  <th>Capacity</th>
                  <th>Occupied</th>
                  <th>Fee (₹/month)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.id}>
                    {editingRoomId === r.id ? (
                      <>
                        <td>
                          <input
                            value={editRoomImage}
                            onChange={(e) => setEditRoomImage(e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            value={editRoomNo}
                            onChange={(e) => setEditRoomNo(e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <select
                            name="type"
                            value={editRoomType}
                            onChange={(e) => setEditRoomType(e.target.value)}
                            className="adminrooms-input"
                          >
                            <option value="select">Select</option>
                            <option value="single">Single</option>
                            <option value="double">Double</option>
                          </select>
                        </td>
                        <td>
                          <select
                            name="floor"
                            value={editRoomFloor}
                            onChange={(e) => setEditRoomFloor(e.target.value)}
                            className="adminrooms-input"
                          >
                            <option value="select">Select</option>
                            <option value="ground-floor">Ground Floor</option>
                            <option value="first-floor">First Floor</option>
                            <option value="second-floor">Second Floor</option>
                            <option value="third-floor">Third Floor</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editCapacity}
                            onChange={(e) => setEditCapacity(e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>{r.occupied}</td>
                        <td>
                          <input
                            type="number"
                            value={editFee}
                            onChange={(e) => setEditFee(e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <button
                            className="adminrooms-button save-btn"
                            onClick={() => saveEdit(r.id)}
                          >
                            💾 Save
                          </button>
                          <br />
                          <br />
                          <button
                            className="delete-btn cancel-btn"
                            onClick={cancelEdit}
                          >
                            ❌ Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td><img src={r.roomImage} alt="Image" width={100}/></td>
                        <td>{r.roomNo}</td>
                        <td>{r.type}</td>
                        <td>{r.floor}</td>
                        <td>{r.capacity}</td>
                        <td>{r.occupied}</td>
                        <td>₹{r.feePerMonth}</td>
                        <td className="room-actions">
                          <button
                            className="adminrooms-button"
                            onClick={() => startEdit(r)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteRoom(r.id)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
