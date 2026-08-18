# CampusCare 🏫

CampusCare is a full-stack campus complaint management system that allows students to submit and track campus complaints while administrators can manage, update, and resolve complaints through a dedicated admin dashboard.

The project is built using the MERN stack and includes authentication, role-based authorization, complaint CRUD operations, admin management, MongoDB integration, and deployment using Render.

---

## 🚀 Live Demo

### Frontend

[https://campuscare-j71v.onrender.com](https://campuscare-j71v.onrender.com)

### Backend API

[https://campuscare-api-43wl.onrender.com](https://campuscare-api-43wl.onrender.com)

---

## 📌 Problem Statement

Students often face issues related to classrooms, laboratories, Wi-Fi, cleanliness, hostels, parking, electrical systems, and other campus facilities.

A centralized system is needed where students can submit complaints and track their status while administrators can view and manage all complaints efficiently.

CampusCare provides a digital platform for managing this complete complaint workflow.

---

## 💡 Key Features

### 👨‍🎓 Student

* Register an account
* Login securely
* Submit complaints
* Select complaint category
* Set complaint priority
* Provide complaint location
* View submitted complaints
* View individual complaint details
* Edit complaints
* Delete complaints
* Track complaint status
* View administrator remarks

### 👨‍💼 Admin

* Login using an admin account
* Access the admin dashboard
* View all student complaints
* View complaint details
* Update complaint status
* Update complaint priority
* Add administrator remarks
* Monitor pending complaints
* Monitor complaints in progress
* Monitor resolved complaints
* Identify high and critical priority complaints

---

## 🔐 Authentication & Authorization

CampusCare uses JWT-based authentication.

The authentication flow is:

```text
User Login
    ↓
Validate Email & Password
    ↓
Generate JWT
    ↓
Store Authentication Token
    ↓
Authenticated API Requests
    ↓
Role-Based Access
```

The application supports two roles:

* `student`
* `admin`

Students can access and manage their own complaints.

Admins can access and manage all complaints.

Authentication is handled using cookies and Axios requests are configured to send credentials.

---

## 📋 Complaint Management

Students can create complaints with:

* Title
* Description
* Category
* Priority
* Location

Each complaint also contains:

* Student
* Status
* Admin Remark
* Creation timestamp

### Complaint Status

| Status      | Description                                         |
| ----------- | --------------------------------------------------- |
| Pending     | Complaint has been submitted and is awaiting action |
| In Progress | Administrator is working on the complaint           |
| Resolved    | Complaint has been resolved                         |

### Complaint Priority

| Priority | Description                                |
| -------- | ------------------------------------------ |
| Low      | Minor issue                                |
| Medium   | Normal issue                               |
| High     | Important issue requiring attention        |
| Critical | Urgent issue requiring immediate attention |

### Complaint Categories

* Electrical
* Plumbing
* Classroom
* Laboratory
* Wi-Fi
* Hostel
* Library
* Canteen
* Parking
* Cleanliness
* Security
* Others

---

## 🏗️ System Architecture

```text
┌──────────────────────────┐
│      React Frontend      │
│                          │
│ Login / Register         │
│ Student Dashboard        │
│ Complaint Management     │
│ Admin Dashboard          │
└────────────┬─────────────┘
             │
             │ REST API
             ▼
┌──────────────────────────┐
│     Express Backend      │
│                          │
│ Authentication           │
│ Authorization            │
│ Complaint APIs            │
│ Middleware               │
│ Error Handling           │
└────────────┬─────────────┘
             │
             │ Mongoose
             ▼
┌──────────────────────────┐
│        MongoDB           │
│                          │
│ Users                    │
│ Complaints               │
└──────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios
* Vite
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* cookie-parser
* CORS

### Deployment

* Render
* MongoDB Atlas

---

## 📂 Project Structure

```text
campuscare/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   └── AdminComplaintDetails.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   └── student/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── CreateComplaint.jsx
│   │   │       └── ComplaintDetails.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.service.js
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   └── complaint/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | `/api/v1/auth/register` | Register a new user    |
| POST   | `/api/v1/auth/login`    | Login                  |
| GET    | `/api/v1/auth/me`       | Get authenticated user |
| POST   | `/api/v1/auth/logout`   | Logout                 |

### Student Complaint APIs

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| POST   | `/api/v1/complaints`     | Create complaint         |
| GET    | `/api/v1/complaints`     | Get student's complaints |
| GET    | `/api/v1/complaints/:id` | Get complaint details    |
| PATCH  | `/api/v1/complaints/:id` | Update complaint         |
| DELETE | `/api/v1/complaints/:id` | Delete complaint         |

### Admin Complaint APIs

| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/api/v1/complaints/admin/all` | Get all complaints        |
| PATCH  | `/api/v1/complaints/admin/:id` | Update complaint as admin |

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/atsanchita/campuscare.git
cd campuscare
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🌐 Deployment

The project is deployed using Render.

### Frontend

[https://campuscare-j71v.onrender.com](https://campuscare-j71v.onrender.com)

### Backend

[https://campuscare-api-43wl.onrender.com](https://campuscare-api-43wl.onrender.com)

MongoDB Atlas is used as the cloud database.

The backend uses the `PORT` environment variable provided by the deployment platform.

---

## 🧪 Testing

The following functionality has been tested:

* User registration
* Student login
* Admin login
* Authentication
* Student dashboard
* Complaint creation
* Complaint viewing
* Complaint editing
* Complaint deletion
* Admin dashboard
* Admin complaint management
* Status updates
* Priority updates
* Admin remarks
* Frontend/backend communication
* Production deployment

---

## 🐛 Challenges & Debugging

### Admin Dashboard Authorization

Initially, the admin complaint management page returned an authorization error because student and admin complaint routes were using different authorization requirements.

The routes and authorization logic were corrected so that:

* Students can access their own complaints.
* Admins can access all complaints.
* Admins can update complaint status, priority, and remarks.

### Admin Login Redirect

The login page initially redirected every user to the student dashboard.

The login response was updated to check the authenticated user's role and redirect accordingly:

```text
Student → /dashboard
Admin   → /admin/dashboard
```

### Production Authentication

Authentication worked locally but required additional configuration for the deployed frontend and backend.

The frontend Axios instance uses:

```javascript
withCredentials: true
```

and the backend CORS configuration allows credential-based requests from the frontend.

### Render Deployment

The backend and frontend were deployed as separate Render services.

The frontend uses the Vite production build:

```bash
npm run build
```

and publishes the generated `dist` directory.

---

## 🔮 Future Improvements

* Complaint image attachments
* Cloudinary image uploads
* Email notifications
* Real-time complaint updates
* Complaint search and filtering
* Department-based complaint assignment
* Complaint history/timeline
* Advanced admin analytics
* Notification system
* AI-based complaint categorization
* Automatic priority suggestions

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience with:

* MERN stack development
* REST API development
* Express.js
* React
* MongoDB and Mongoose
* Authentication using JWT
* Cookie-based authentication
* Role-based authorization
* CRUD operations
* Middleware
* CORS
* Axios
* React Router
* Git and GitHub
* Production deployment
* Debugging full-stack applications

---

## 👩‍💻 Author

**Sanchita Warkad**

AI & ML Engineering Student

---

## ⭐ About the Project

CampusCare was developed as a full-stack portfolio project to understand how a real-world complaint management system can be designed, developed, secured, and deployed.
