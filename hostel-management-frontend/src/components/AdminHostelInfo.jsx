import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../api";

export default function AdminHostelInfo() {
  const [type, setType] = useState("food");
  const [meal, setMeal] = useState("");
  const [menu, setMenu] = useState("");
  const [timings, setTimings] = useState("");
  const [data, setData] = useState("");
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    API.get(`hostel-info/${type}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchItems();
    // Clear inputs when type changes
    setMeal("");
    setMenu("");
    setTimings("");
    setData("");
  }, [type]);

  const handleAdd = () => {
    let payload = { type };
    if (type === "food") {
      payload.meal = meal;
      payload.menu = menu;
      payload.timings = timings;
    } else {
      payload.data = data;
    }

    API.post("/hostel-info/add", payload)
      .then((res) => {
        alert("Added successfully!");
        setMeal("");
        setMenu("");
        setTimings("");
        setData("");
        fetchItems();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    API.delete(`/hostel-info/delete/${id}`)
      .then(() => fetchItems())
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-hostel">
      <div className="admin-hostel-info">
        <h2>Manage Hostel Info</h2>

        <div>
          <label>Category:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="food">Food Menu</option>
            <option value="timings">Hostel Timings</option>
            <option value="facilities">Facilities</option>
            <option value="rules">Rules & Guidelines</option>
          </select>
        </div>

        {type === "food" ? (
          <>
            <div>
              <label>Meal:</label>
              <select value={meal} onChange={(e) => setMeal(e.target.value)}>
                <option value="">Select Meal</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snacks">Snacks</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div>
              <label>Menu Items:</label>
              <input
                type="text"
                placeholder="Eggs, Toast, Oats..."
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
              />
            </div>
            <div>
              <label>Timings:</label>
              <input
                type="text"
                placeholder="7:30 AM - 9:00 AM"
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
              />
            </div>
          </>
        ) : (
          <div>
            <label>Content:</label>
            <input
              type="text"
              placeholder="Enter data here"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
        )}

        <button onClick={handleAdd}>Add</button>
        <h3 className="existing-title">Existing Items</h3>
        <ul className="existing-list">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className="existing-item">
                <span className="item-text">
                  {type === "food"
                    ? `${item.meal} - ${item.menu} (${item.timings})`
                    : item.data}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="no-items">No items found for this category.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
