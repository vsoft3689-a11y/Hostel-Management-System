import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import AdminHostelInfo from "./components/AdminHostelInfo";
import AdminRooms from "./components/AdminRooms";
import AdminUsers from "./components/AdminUsers";
import AdminBookings from "./components/AdminBookings";
import AdminComplaints from "./components/AdminComplaints";
import UserDashboard from "./components/UserDashboard";
import UserProfile from "./components/UserProfile";
import UserBookings from "./components/UserBookings";
import RoomList from "./components/RoomList";
import BookingForm from "./components/BookingForm";
import ComplaintForm from "./components/ComplaintForm";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/hostel-info" element={<AdminHostelInfo />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />

        {/* User */}
        <Route path="/users" element={<UserDashboard />} />
        <Route path="/users/profile" element={<UserProfile />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/users/book/:id" element={<BookingForm />} />
        <Route path="/users/complaint" element={<ComplaintForm />} />
        <Route path="/users/bookings" element={<UserBookings />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
