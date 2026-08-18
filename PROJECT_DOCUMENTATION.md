# CampusCare — Project Documentation

## 1. Project Overview

**CampusCare** is a full-stack campus complaint management system designed to provide a centralized platform for students to report and track campus-related issues.

Students can submit complaints related to facilities such as classrooms, laboratories, Wi-Fi, cleanliness, hostels, parking, electrical systems, and security. Administrators can view all submitted complaints, monitor their status and priority, and update them with appropriate remarks.

The project follows a MERN-based architecture with a React frontend, Node.js/Express backend, and MongoDB database.

---

## 2. Problem Statement

In a college environment, students may face different problems related to campus facilities and services. Traditional complaint systems may make it difficult to submit complaints, track their progress, and maintain a centralized record.

CampusCare addresses this problem by providing an online complaint management system where students can submit and track complaints while administrators can efficiently manage and resolve them.

---

## 3. Objectives

The main objectives of CampusCare are:

* To provide students with an easy way to submit campus complaints.
* To allow students to track their complaint status.
* To provide administrators with a centralized complaint management dashboard.
* To implement secure authentication and authorization.
* To allow administrators to update complaint status and priority.
* To allow administrators to provide remarks for students.
* To store complaint and user information in a centralized MongoDB database.
* To deploy the application for real-world accessibility.

---

## 4. User Roles

CampusCare provides two user roles.

### 4.1 Student

Students can:

* Register and login.
* Create complaints.
* View their complaints.
* View complaint details.
* Edit their complaints.
* Delete their complaints.
* Track complaint status.
* View administrator remarks.

### 4.2 Administrator

Administrators can:

* Login using an admin account.
* Access the admin dashboard.
* View all student complaints.
* View individual complaint details.
* Update complaint status.
* Update complaint priority.
* Add administrator remarks.
* Monitor complaint statistics.

---

## 5. Functional Requirements

### Authentication

* User registration
* User login
* User logout
* Authentication using JWT
* Protected routes
* Role-based authorization

### Complaint Management

* Create complaint
* Read complaint
* Update complaint
* Delete complaint
* Complaint status management
* Complaint priority management
* Administrator remarks

### Dashboard

The student dashboard displays:

* Total complaints
* Pending complaints
* In-progress complaints
* Resolved complaints

The admin dashboard displays:

* Total complaints
* Pending complaints
* In-progress complaints
* Resolved complaints
* High/Critical priority complaints
* Complete complaint listing

---

## 6. Non-Functional Requirements

### Security

* Passwords are hashed using bcrypt.
* Authentication uses JWT.
* Authentication credentials are handled using cookies.
* API routes are protected using authentication middleware.
* Administrative functionality is protected using role-based authorization.

### Performance

* REST APIs are used for communication between frontend and backend.
* MongoDB is used for efficient data storage and retrieval.
* React provides a responsive client-side interface.

### Maintainability

The backend follows a modular structure separating:

* Routes
* Controllers
* Services
* Middleware
* Database configuration
* Utility functions

---

## 7. Technology Stack

| Layer               | Technology          |
| ------------------- | ------------------- |
| Frontend            | React               |
| Frontend Build Tool | Vite                |
| Routing             | React Router        |
| HTTP Client         | Axios               |
| Backend             | Node.js             |
| Backend Framework   | Express.js          |
| Database            | MongoDB             |
| ODM                 | Mongoose            |
| Authentication      | JWT                 |
| Password Hashing    | bcrypt              |
| Middleware          | CORS, Cookie Parser |
| Deployment          | Render              |
| Database Hosting    | MongoDB Atlas       |
| Version Control     | Git & GitHub        |

---

## 8. System Architecture

```text
                    ┌───────────────────────┐
                    │     React Frontend    │
                    │                       │
                    │ Login / Register      │
                    │ Student Dashboard     │
                    │ Complaint Pages       │
                    │ Admin Dashboard       │
                    └───────────┬───────────┘
                                │
                                │ REST API
                                ▼
                    ┌───────────────────────┐
                    │    Express Backend    │
                    │                       │
                    │ Routes                │
                    │ Controllers           │
                    │ Services              │
                    │ Middleware            │
                    │ Authentication        │
                    │ Authorization         │
                    └───────────┬───────────┘
                                │
                                │ Mongoose
                                ▼
                    ┌───────────────────────┐
                    │       MongoDB         │
                    │                       │
                    │ Users                 │
                    │ Complaints            │
                    └───────────────────────┘
```

---

## 9. Application Modules

### 9.1 Authentication Module

Responsible for:

* Registration
* Login
* Logout
* Retrieving authenticated user information
* JWT generation
* Password verification

Main routes:

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

---

### 9.2 Student Complaint Module

Responsible for complaint operations performed by students.

```text
POST   /api/v1/complaints
GET    /api/v1/complaints
GET    /api/v1/complaints/:id
PATCH  /api/v1/complaints/:id
DELETE /api/v1/complaints/:id
```

Students can only access complaints belonging to them.

---

### 9.3 Admin Complaint Module

Responsible for administrative complaint management.

```text
GET   /api/v1/complaints/admin/all
PATCH /api/v1/complaints/admin/:id
```

Administrators can view all complaints and update their status, priority, and remarks.

---

## 10. Complaint Workflow

```text
Student
   │
   ▼
Create Complaint
   │
   ▼
Pending
   │
   ▼
Admin Reviews Complaint
   │
   ▼
In Progress
   │
   ▼
Admin Resolves Issue
   │
   ▼
Resolved
```

---

## 11. Complaint Data

A complaint contains information such as:

| Field        | Purpose                          |
| ------------ | -------------------------------- |
| Title        | Short description of the issue   |
| Description  | Detailed explanation             |
| Category     | Type of campus issue             |
| Priority     | Importance of the complaint      |
| Location     | Location of the issue            |
| Status       | Current complaint state          |
| Student      | User who submitted the complaint |
| Admin Remark | Comment added by administrator   |
| Created At   | Complaint creation timestamp     |

---

## 12. Complaint Categories

The system currently supports:

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

## 13. Authentication Flow

```text
                     Login Request
                          │
                          ▼
                 Validate Credentials
                          │
                          ▼
                 Verify Password
                          │
                          ▼
                    Generate JWT
                          │
                          ▼
               Authentication Cookie
                          │
                          ▼
                Protected API Request
                          │
                          ▼
                 Authentication Middleware
                          │
                          ▼
                   Identify User
                          │
                          ▼
                  Role Authorization
```

The frontend Axios instance is configured to send credentials with requests.

---

## 14. Role-Based Authorization

The application distinguishes between students and administrators.

```text
                    Authenticated User
                           │
                    ┌──────┴──────┐
                    │             │
                 Student        Admin
                    │             │
                    ▼             ▼
              Own Complaints   All Complaints
                              + Management
```

This prevents students from accessing administrative functionality.

---

## 15. Frontend Pages

### Authentication

* Login
* Register

### Student

* Dashboard
* Create Complaint
* Complaint Details

### Admin

* Admin Dashboard
* Admin Complaint Details

---

## 16. Backend Structure

The backend follows a modular architecture.

```text
server/
└── src/
    ├── config/
    ├── middlewares/
    ├── modules/
    │   ├── auth/
    │   └── complaint/
    ├── utils/
    ├── app.js
    └── server.js
```

The application separates API routing, business logic, middleware, and database configuration to make the backend easier to maintain.

---

## 17. Frontend Structure

```text
client/
└── src/
    ├── components/
    ├── pages/
    │   ├── admin/
    │   ├── auth/
    │   └── student/
    ├── services/
    ├── App.jsx
    └── index.css
```

---

## 18. Database

MongoDB is used as the application's database.

MongoDB Atlas provides the cloud-hosted database used by the deployed backend.

The main application data consists of:

```text
Users
Complaints
```

Mongoose is used to define models and communicate with MongoDB.

---

## 19. API Summary

### Authentication

| Method | Endpoint                | Purpose          |
| ------ | ----------------------- | ---------------- |
| POST   | `/api/v1/auth/register` | Register user    |
| POST   | `/api/v1/auth/login`    | Login user       |
| GET    | `/api/v1/auth/me`       | Get current user |
| POST   | `/api/v1/auth/logout`   | Logout user      |

### Student Complaints

| Method | Endpoint                 | Purpose            |
| ------ | ------------------------ | ------------------ |
| POST   | `/api/v1/complaints`     | Create complaint   |
| GET    | `/api/v1/complaints`     | Get own complaints |
| GET    | `/api/v1/complaints/:id` | Get complaint      |
| PATCH  | `/api/v1/complaints/:id` | Update complaint   |
| DELETE | `/api/v1/complaints/:id` | Delete complaint   |

### Admin

| Method | Endpoint                       | Purpose            |
| ------ | ------------------------------ | ------------------ |
| GET    | `/api/v1/complaints/admin/all` | Get all complaints |
| PATCH  | `/api/v1/complaints/admin/:id` | Update complaint   |

---

## 20. Deployment

The application is deployed using Render.

### Frontend

```text
https://campuscare-j71v.onrender.com
```

### Backend

```text
https://campuscare-api-43wl.onrender.com
```

MongoDB Atlas is used for the production database.

The frontend and backend are deployed separately and communicate through REST APIs.

---

## 21. Testing

The following functionality was tested during development:

### Authentication

* Student registration
* Student login
* Admin login
* Authentication persistence
* Logout
* Protected API requests

### Student Functionality

* Dashboard loading
* Complaint creation
* Complaint viewing
* Complaint editing
* Complaint deletion
* Status viewing
* Priority viewing
* Admin remark viewing

### Admin Functionality

* Admin dashboard
* Viewing all complaints
* Opening complaint details
* Updating status
* Updating priority
* Adding admin remarks

### Deployment

* Frontend deployment
* Backend deployment
* MongoDB Atlas connection
* Frontend/backend communication
* Production authentication

---

## 22. Challenges Encountered

### Admin Authorization Error

The admin complaint management page initially returned:

```text
You are not authorized to access this complaint
```

The issue was caused by the complaint detail logic being designed for students, where the complaint owner was checked against the logged-in user.

The application was updated so that administrative complaint operations use the appropriate admin authorization flow.

---

### Admin Login Redirect

Initially, successful login always redirected users to:

```text
/dashboard
```

This caused administrators to be sent to the student dashboard.

The login flow was updated to check the user's role:

```text
student → /dashboard
admin   → /admin/dashboard
```

---

### Authentication Cookie Issues

Authentication required correct cookie and CORS configuration when moving from local development to production.

The frontend Axios client uses:

```javascript
withCredentials: true
```

and the backend CORS configuration allows credential-based requests from the frontend.

---

### Render Deployment

The frontend and backend were deployed as separate Render services.

The frontend required a production build using Vite and the generated `dist` directory was configured as the published frontend output.

---

## 23. Future Scope

The project can be extended with:

* Complaint image uploads
* Cloudinary integration
* Email notifications
* Real-time notifications
* Complaint search and filtering
* Department-based assignment
* Complaint history
* Advanced analytics
* Admin user management
* AI-based complaint categorization
* Automatic priority prediction
* Mobile application

---

## 24. Learning Outcomes

The project provided practical experience in:

* Full-stack MERN development
* REST API development
* React application development
* Express.js backend development
* MongoDB and Mongoose
* JWT authentication
* Cookie-based authentication
* Role-based authorization
* CRUD operations
* Middleware development
* CORS configuration
* Axios
* React Router
* Git and GitHub
* Cloud deployment
* Debugging production issues

---

## 25. Conclusion

CampusCare provides a centralized digital solution for managing campus complaints.

The project demonstrates the complete development lifecycle of a full-stack web application, including frontend development, backend API development, database integration, authentication, authorization, CRUD operations, debugging, version control, and deployment.

The system provides students with a simple way to report and track issues while giving administrators the tools required to manage complaints efficiently.

---

## 26. Author

**Sanchita Warkad**

AI & ML Engineering Student

**GitHub:** [https://github.com/atsanchita/campuscare](https://github.com/atsanchita/campuscare)

**Project:** CampusCare – Campus Complaint Management System
