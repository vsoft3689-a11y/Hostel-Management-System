import { useState } from "react";
import "../App.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    alert("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page">
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Hostel Info</h2>
          <p><strong>Address:</strong>HostelEase, Hyderabad, India</p>
          <p><strong>Phone:</strong> +91 1234567890</p>
          <p><strong>Email:</strong> hostelease@example.com</p>
          <p><strong>Office Hours:</strong> Mon - Fri, 9 AM - 6 PM</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    </div>
  );
}
