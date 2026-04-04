#  Finance Dashboard Backend

A backend system for managing users, roles, and financial records with role-based access control and dashboard analytics.

---

##  Features

###  User & Role Management

* Create and manage users
* Assign roles (Admin, Analyst, Viewer)
* Activate / deactivate users
* Role-based access control (RBAC)

###  Financial Records

* Create, update, delete financial records
* Record types: income / expense
* Categories (Food, Health, Entertainment, etc.)
* Date-based entries
* Filter records by type, category, and date

###  Dashboard Analytics

* Total income & expenses
* Net balance
* Category-wise totals
* Monthly trends
* Recent activity

---

##  Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB + Mongoose
* JWT Authentication
* Express Validator

---

##  Project Structure

```
src/
 ├── controllers/     # Handles request & response
 ├── services/        # Business logic
 ├── repositories/    # Database operations
 ├── models/          # Mongoose schemas
 ├── routes/          # API routes
 ├── middlewares/     # Auth, validation, error handling
 ├── helpers/         # Validators & utilities
 ├── configs/         # DB connection
 ├── seeds/           # Seed scripts (roles, admin)
```

---

##  Authentication

* JWT-based authentication
* Token required for protected routes
* Middleware:

  * `verifyToken`
  * `authorize(permission)`

---

##  Installation

```bash
git clone https://github.com/Hephzibah7/Finance_DashBoard_System.git
cd backend
npm install
```

---

##  Environment Variables

Create a `.env` file:

```
PORT=9002
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
```

---

##  Running the App

```bash
npm run dev
```

---

##  Seed Data

```bash
npm run seed-roles
npm run seed-admin
```

---

##  API Endpoints

### Auth

* POST `/api/auth/login`

### Users

* POST `/api/user` → Create user (Admin only)
* DELETE `/api/user/:id`
* PATCH `/api/user/role/:role`
* PATCH `/api/user/status/:status`

### Records

* POST `/api/records`
* GET `/api/records`
* PATCH `/api/records/:id`
* DELETE `/api/records/:id`

### Dashboard

* GET `/api/dashboard`

---

##  Filtering Example

```
GET /api/records?type=expense&category=FOOD&startDate=2026-01-01&endDate=2026-04-01
```

---

##  Architecture

```
Controller → Service → Repository → Database
```

* Controllers: handle HTTP layer
* Services: business logic
* Repositories: DB queries
* Helpers: reusable utilities

---

##  Permissions

* CREATE_USER
* DELETE_USER
* CREATE_RECORD
* VIEW_RECORD
* UPDATE_RECORD
* DELETE_RECORD
* VIEW_DASHBOARD

---

##  Common Issues

* Ensure `.env` is configured correctly
* Amount must be stored as number (not string)
* Always run seed scripts before using roles

---

##  Future Improvements

* Pagination
* Graph APIs for frontend charts
* Caching (Redis)
* Audit logs
* Multi-user financial tracking

---

##  Author

Hephzibah Ranjan

---

##  License

This project is licensed under the MIT License.
