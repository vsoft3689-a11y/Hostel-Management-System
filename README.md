# 🏠 HostelEase Management System

## 1. Abstract
The **Hostel Management System (HMS)** is a full-stack web application designed to streamline hostel operations. It enables **Users** to register, book rooms, make payments, and submit complaints, while **admins** manage rooms, bookings, payments, and handle complaints.  
Built using **React.js (frontend)**, **Spring Boot (backend)**, and **MySQL (database)**, the system offers a secure, user-friendly, and scalable solution for hostel administration.

---

## 2. Features
- 🔐 Role-Based Access (Admin / User)
- 🏢 Room Management (Add, Edit, Delete Rooms – Admin only)
- 🧾 Booking Management (Users can book rooms, Admins approve)
- 💳 Payment Workflow (Users pay after approval)
- 📋 Complaint System (Users raise issues, Admin resolves)
- 📊 Dashboards for both Admin and Users
- 🕒 Hostel Information Management (Food Menu, Timings, Facilities, Rules)

---

## 3. Modules Overview

### 🧑‍💼 Admin Module
- Login securely using admin credentials.
- Add, update, and delete hostel rooms.
- Approve or reject User booking requests.
- View payments and update booking status.
- Manage food menu, hostel timings, facilities, and rules dynamically.
- View and resolve User complaints.

### 🎓 User Module
- Register and log in using personal credentials.
- View available rooms and apply for booking.
- Pay hostel fees after approval.
- Submit and track complaints.
- View food menu, hostel timings, facilities, and rules.

---

## 4. Workflow Diagram
**1️⃣ User Registration → 2️⃣ Login → 3️⃣ View Rooms → 4️⃣ Apply for Booking → 5️⃣ Admin Approval → 6️⃣ Payment → 7️⃣ Room Allotted**

- Admin adds hostel details and manages rooms.
- User requests room → Admin reviews → If approved, User pays.
- Booking becomes active, and the room occupancy updates automatically.
- User can view hostel info and raise complaints.
- Admin monitors and resolves complaints.

---

## 5. Technologies Used
| Layer | Technology |
|--------|-------------|
| Frontend | React.js, React Router, Axios |
| Backend | Spring Boot, Spring Data JPA, Spring Security |
| Database | MySQL |
| Build Tools | Maven, npm |
| Language | Java, JavaScript |
| Styling | CSS, Bootstrap / Tailwind |
| API Testing | Postman |

---

## 6. Project Structure

```
📦 Hostel-Management-System
├── backend/
│   ├── src/main/java/com/hostel/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   └── application.properties
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── UserDashboard.js
│   │   │   ├── About.js
│   │   │   ├── AdminHostelInfo.js
│   │   └── components/
│   │       ├── Navbar.js
│   │       └── Footer.js
│   └── App.js
```

---

## 7. Setup Instructions

### 🧰 Backend (Spring Boot)
#### Prerequisites:
- Java 17+
- Maven
- MySQL

#### Steps:
```bash
git clone https://github.com/your-repo/hostel-management-system.git
cd backend
```

**Configure `application.properties`:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hostel_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

**Run the backend:**
```bash
mvn spring-boot:run
```

---

### 💻 Frontend (React.js)
#### Prerequisites:
- Node.js 18+
- npm

#### Steps:
```bash
cd frontend
npm install
npm start
```
App runs on [http://localhost:3000](http://localhost:3000)

---

## 8. API Endpoints

| Function | Method | Endpoint |
|-----------|---------|-----------|
| Register User | POST | `/api/auth/register` |
| Login | POST | `/api/auth/login` |
| Get All Rooms | GET | `/api/rooms` |
| Add Room | POST | `/api/admin/rooms/add` |
| Book Room | POST | `/api/bookings/add` |
| Approve Booking | PUT | `/api/admin/bookings/approve/{id}` |
| Payment Update | PUT | `/api/bookings/payment/{id}` |
| Add Hostel Info | POST | `/api/admin/hostel-info/add` |
| Get Hostel Info | GET | `/api/hostel-info/{type}` |
| Delete Hostel Info | DELETE | `/api/admin/hostel-info/delete/{id}` |

---

## 9. Output Screenshots

| Feature | Screenshot |
|----------|-------------|
| Landing Page | ![Home Page](screenshots/home.png) |
| Admin Dashboard | ![Admin Dashboard](screenshots/admin-dashboard.png) |
| User Dashboard | ![User Dashboard](screenshots/User-dashboard.png) |
| Room Booking Page | ![Booking Page](screenshots/booking.png) |
| Payment Page | ![Payment](screenshots/payment.png) |
| Complaints Page | ![Complaints](screenshots/complaints.png) |
| Hostel Info Page | ![Hostel Info](screenshots/hostel-info.png) |


---

## 10. Future Enhancements
- Integrate real online payment gateway (Razorpay/Stripe).
- Implement JWT Authentication for enhanced security.
- Add email notifications for booking updates.
- Include image gallery for hostel rooms.
- Add admin analytics dashboard (charts, stats).

---

## 11. Conclusion
The **Hostel Management System** provides a comprehensive, efficient, and user-friendly solution for hostel administration. It minimizes manual work, enhances transparency, and improves the experience for both administrators and Users.
