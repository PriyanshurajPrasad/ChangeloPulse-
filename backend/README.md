# 🚀 Changelog & Product Updates Widget - Backend API

A production-ready, clean, modular, and interview-friendly **Express.js + MongoDB REST API** for managing product updates, announcements, release notes, and powering an embeddable changelog widget.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Tech Stack](#-tech-stack)
4. [Folder Structure](#-folder-structure)
5. [Installation & Setup](#-installation--setup)
6. [Environment Variables](#-environment-variables)
7. [Database Setup & Seeding](#-database-setup--seeding)
8. [Running the Application](#-running-the-application)
9. [Authentication & Security](#-authentication--security)
10. [API Documentation](#-api-documentation)
11. [Test Credentials](#-test-credentials)
12. [Error Handling & API Responses](#-error-handling--api-responses)
13. [Interview Explanation Guide](#-interview-explanation-guide)

---

## 📌 Project Overview
The **Changelog & Product Updates Widget API** allows product teams to publish, manage, and categorize feature releases, bug fixes, improvements, and product announcements.

It provides three main service layers:
1. **Admin Management System**: Protected endpoints for creating, editing, publishing, and archiving product updates.
2. **Public Changelog Feed**: A clean, paginated, searchable API designed for frontend changelog pages.
3. **Embeddable Widget API**: A fast, lightweight API delivering minimal payload items for embedded product widgets.

---

## ✨ Key Features
- **MVC Architecture**: Clear separation of concerns (Models, Views/Routes, Controllers).
- **JWT & HTTP-Only Cookies**: Dual authentication system supporting both browser cookies and Bearer headers.
- **Role-Based Access Control (RBAC)**: Enforced strict admin authorization for write/delete/publish routes.
- **Auto-Generated Unique Slugs**: SEO-friendly URL slugs generated dynamically with collision resolution.
- **Multi-Status Workflow**: Draft → Published → Archived lifecycle states for updates.
- **Search & Advanced Filtering**: MongoDB text-search across titles, tags, and content + filtering by category and version.
- **Fast Pagination**: Index-optimized paginated responses with metadata (`total`, `totalPages`, `page`, `limit`).
- **Input Validation**: Strict input parsing and validation using `express-validator`.
- **Security-First**: Integrated `helmet`, `cors`, `cookie-parser`, and `bcryptjs` password hashing.

---

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js (v4)
- **Database**: MongoDB with Mongoose ODM
- **Language**: JavaScript (CommonJS)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) + HTTP-Only cookies
- **Hashing**: `bcryptjs`
- **Validation**: `express-validator`
- **Security**: `helmet`, `cors`, `cookie-parser`
- **Logging**: `morgan`

---

## 📂 Folder Structure
```
backend/
├── config/
│   └── db.js                 # Database connection with graceful failure handling
├── controllers/
│   ├── authController.js     # User registration, login, logout, me
│   ├── userController.js     # User profile management and admin user view
│   ├── updateController.js   # CRUD & status transitions for product updates
│   ├── changelogController.js# Public feed controller
│   └── widgetController.js   # Lightweight widget payload controller
├── middleware/
│   ├── authMiddleware.js     # JWT validation (protect & optionalAuth)
│   ├── roleMiddleware.js     # Role verification (requireAdmin)
│   ├── errorMiddleware.js    # Global error handling middleware
│   ├── notFoundMiddleware.js # 404 handler
│   └── validateMiddleware.js # Request validator & ObjectId checker
├── models/
│   ├── User.js               # User schema with bcrypt pre-save hook & matchPassword
│   └── Update.js             # Product Update schema with indexes & slug management
├── routes/
│   ├── authRoutes.js         # /api/auth
│   ├── userRoutes.js         # /api/users
│   ├── updateRoutes.js       # /api/updates
│   ├── changelogRoutes.js    # /api/changelog
│   ├── widgetRoutes.js       # /api/widget
│   └── healthRoutes.js       # /api/health
├── utils/
│   ├── asyncHandler.js       # Wrapper to eliminate try/catch blocks
│   ├── generateToken.js      # JWT signing & cookie injection
│   └── slugify.js            # URL slug generation and collision handling
├── seed/
│   └── seed.js               # Seeding script for admin, users, and 10 realistic updates
├── postman/
│   └── changelog_api_postman_collection.json # Ready-to-import Postman collection
├── .env.example              # Template for environment configuration
├── .gitignore                # Git exclusions
├── package.json              # Scripts and dependencies
└── server.js                 # App initialization and server listener
```

---

## ⚙️ Installation & Setup

1. **Clone or Navigate to the Project Root**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

---

## 🔐 Environment Variables

Ensure your `.env` file contains the following key-value pairs:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/changelog_db
JWT_SECRET=super_secret_jwt_key_change_in_production_12345
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:5173
```

---

## 🗄 Database Setup & Seeding

Ensure MongoDB service is running locally or provide a valid MongoDB Atlas connection string in `MONGODB_URI`.

Run the database seed script to populate initial users and demo updates:
```bash
npm run seed
```

---

## 🚀 Running the Application

### Development Mode (with Nodemon live reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Server will start on `http://localhost:5000`.

---

## 🔑 Test Credentials

> [!IMPORTANT]
> The seed script automatically creates these development test credentials. They must be changed before deploying to production!

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `Admin@12345` | Full CRUD, Publish, Archive, Draft View |
| **Normal User** | `user@example.com` | `User@12345` | Public Changelog, Widget, Published Updates |
| **Normal User** | `jane@example.com` | `User@12345` | Public Changelog, Widget, Published Updates |

---

## 📡 API Documentation

### 1. Health Check
- `GET /api/health` - Check API server status (Public)

### 2. Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user (Public)
- `POST /api/auth/login` - Login user & obtain HTTP-only cookie / JWT token (Public)
- `POST /api/auth/logout` - Logout & clear JWT cookie (Protected)
- `GET  /api/auth/me` - Get current user profile (Protected)

### 3. Product Updates Management (`/api/updates`)
- `GET  /api/updates` - Get paginated updates (Public sees published; Admin sees all)
  - Query Params: `page`, `limit`, `category`, `status`, `search`, `version`, `sort` (`newest` | `oldest`)
- `GET  /api/updates/:id` - Get update details by ObjectId or Slug (Public sees published; Admin sees draft/archived)
- `POST /api/updates` - Create a new product update (Admin Only)
- `PUT  /api/updates/:id` - Edit product update & regenerate slug if title changes (Admin Only)
- `DELETE /api/updates/:id` - Delete product update (Admin Only)
- `PATCH /api/updates/:id/publish` - Set status to `published` and record `publishedAt` timestamp (Admin Only)
- `PATCH /api/updates/:id/archive` - Set status to `archived` (Admin Only)

### 4. Public Changelog API (`/api/changelog`)
- `GET /api/changelog` - Optimized for frontend changelog pages. Returns published updates only.
  - Query Params: `page`, `limit`, `category`, `search`, `sort`

### 5. Product Update Widget API (`/api/widget`)
- `GET /api/widget/updates` - Optimized lightweight API for embedded widgets.
  - Query Params: `limit` (default 5, max 20)

---

## 🧪 Error Handling & Response Format

### Success Response Format:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Error Response Format:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

---

## 🎤 Interview Explanation Guide

When presenting this project in an technical interview, highlight these key design points:

1. **Why CommonJS & Express MVC?**
   - Clean, standard, and easy to trace execution flow without transpile steps or complex decorators.

2. **How does Authentication & RBAC work?**
   - JWT tokens are stored in HTTP-Only, SameSite cookies to protect against XSS attacks.
   - The `protect` middleware extracts the token, verifies signatures, and attaches `req.user`.
   - The `requireAdmin` middleware inspects `req.user.role` to prevent unauthorized execution.

3. **How is the Widget API optimized?**
   - The `/api/widget/updates` endpoint uses Mongoose `.select()` and `.lean()` queries to bypass model overhead and return only light attributes required for UI rendering.

4. **How are Slugs and Search queries handled safely?**
   - Title changes trigger safe slug generation using custom regex filtering and collision suffixing.
   - Database queries leverage compound indexes (`status`, `category`, `publishedAt`) for optimal execution plan speeds.
