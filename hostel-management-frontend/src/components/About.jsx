import { useState, useEffect } from "react";
import API from "../api";
import "../App.css";

export default function About() {
  const [foodMenu, setFoodMenu] = useState([]);
  const [hostelTimings, setHostelTimings] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    // Fetch Food Menu
    API.get("/hostel-info/food")
      .then(res => setFoodMenu(res.data))
      .catch(err => console.log(err));

    // Fetch Hostel Timings
    API.get("/hostel-info/timings")
      .then(res => setHostelTimings(res.data))
      .catch(err => console.log(err));

    // Fetch Facilities
    API.get("/hostel-info/facilities")
      .then(res => setFacilities(res.data))
      .catch(err => console.log(err));

    // Fetch Rules
    API.get("/hostel-info/rules")
      .then(res => setRules(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Our Hostel</h1>

        {/* Food Menu */}
        <section className="about-section">
          <h2>Food Menu</h2>
          {foodMenu.length > 0 ? (
            <table className="food-table">
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Menu</th>
                  <th>Timings</th>
                </tr>
              </thead>
              <tbody>
                {foodMenu.map((item) => (
                  <tr key={item.id}>
                    <td>{item.meal}</td>
                    <td>{item.menu}</td>
                    <td>{item.timings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No food menu available.</p>
          )}
        </section>

        {/* Hostel Timings */}
        <section className="about-section">
          <h2>Hostel Timings</h2>
          {hostelTimings.length > 0 ? (
            <ul>
              {hostelTimings.map((item) => (
                <li key={item.id}>{item.data}</li>
              ))}
            </ul>
          ) : (
            <p>No timing information available.</p>
          )}
        </section>

        {/* Facilities */}
        <section className="about-section">
          <h2>Facilities</h2>
          {facilities.length > 0 ? (
            <ul>
              {facilities.map((item) => (
                <li key={item.id}>{item.data}</li>
              ))}
            </ul>
          ) : (
            <p>No facilities information available.</p>
          )}
        </section>

        {/* Rules & Guidelines */}
        <section className="about-section">
          <h2>Rules & Guidelines</h2>
          {rules.length > 0 ? (
            <ul>
              {rules.map((item) => (
                <li key={item.id}>{item.data}</li>
              ))}
            </ul>
          ) : (
            <p>No rules defined yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}

// export default function About() {
//   return (
//     <div className="about-page">
//     <div className="about-container">
//       <h1 className="about-title">About Our Hostel</h1>

//       <section className="about-section">
//         <h2>Overview</h2>
//         <p>
//           Welcome to our modern HostelEase Management System! Our hostel provides a
//           safe and comfortable living environment for students. We manage all
//           aspects including room allocation, bookings, complaints, and more to
//           make your stay hassle-free.
//         </p>
//       </section>

//       <section className="about-section">
//         <h2>Food Menu</h2>
//         <p>We provide nutritious meals to keep our students healthy and energized.</p>
//         <table className="food-table">
//           <thead>
//             <tr>
//               <th>Meal</th>
//               <th>Menu</th>
//               <th>Timings</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Breakfast</td>
//               <td>Eggs, Toast, Oats, Fruits, Milk</td>
//               <td>7:30 AM - 9:00 AM</td>
//             </tr>
//             <tr>
//               <td>Lunch</td>
//               <td>Rice, Dal, Vegetables, Salad, Curd</td>
//               <td>12:30 PM - 2:00 PM</td>
//             </tr>
//             <tr>
//               <td>Snacks</td>
//               <td>Tea/Coffee, Biscuits, Sandwich</td>
//               <td>4:00 PM - 5:00 PM</td>
//             </tr>
//             <tr>
//               <td>Dinner</td>
//               <td>Rice/Chapati, Dal, Vegetables, Salad</td>
//               <td>7:30 PM - 9:00 PM</td>
//             </tr>
//           </tbody>
//         </table>
//       </section>

//       <section className="about-section">
//         <h2>Hostel Timings</h2>
//         <ul>
//           <li>Check-in: 6:00 AM onwards</li>
//           <li>Check-out: 10:00 AM</li>
//           <li>Visiting hours for guests: 9:00 AM - 8:00 PM</li>
//           <li>Curfew for students: 11:00 PM</li>
//         </ul>
//       </section>

//       <section className="about-section">
//         <h2>Facilities</h2>
//         <ul>
//           <li>Wi-Fi enabled rooms and common areas</li>
//           <li>24/7 security and CCTV surveillance</li>
//           <li>Clean and hygienic washrooms</li>
//           <li>Laundry services available</li>
//           <li>Study rooms and recreation area</li>
//         </ul>
//       </section>

//       <section className="about-section">
//         <h2>Rules & Guidelines</h2>
//         <ul>
//           <li>Maintain cleanliness in rooms and common areas</li>
//           <li>No smoking or alcohol inside the hostel</li>
//           <li>Respect fellow students and staff</li>
//           <li>Report any issues or complaints via the portal</li>
//           <li>Follow hostel timings strictly</li>
//         </ul>
//       </section>
//     </div>
//     </div>
//   );
// }
