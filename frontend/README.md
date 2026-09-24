# 🎨 Changelog & Product Updates Widget - Frontend

A production-ready, clean, responsive, and modern **React.js + Vite + Tailwind CSS** frontend application for the Changelog & Product Updates Widget platform.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Folder Structure](#-folder-structure)
4. [Installation & Setup](#-installation--setup)
5. [Environment Variables](#-environment-variables)
6. [Available Scripts](#-available-scripts)
7. [Backend Integration](#-backend-integration)
8. [Routing & Navigation](#-routing--navigation)
9. [Key Features & Components](#-key-features--components)
10. [Authentication & Security](#-authentication--security)
11. [Troubleshooting](#-troubleshooting)

---

## 📌 Project Overview
The **Changelog & Product Updates Widget Frontend** provides:
- **Public Product Changelog**: Filterable, searchable timeline feed for showcasing feature releases, bug fixes, improvements, and announcements.
- **Embeddable Product Update Widget**: Lightweight "What's New" popover and card widgets consuming live backend data.
- **Admin Control Panel**: Comprehensive dashboard to manage updates, publish draft releases, archive legacy updates, edit details, and delete entries.
- **Dark/Light Theme**: Built-in dark mode toggle with persistent local preferences.

---

## 🛠 Tech Stack
- **Framework**: React.js (v18) + Vite
- **Styling**: Tailwind CSS + PostCSS + Autoprefixer
- **Routing**: `react-router-dom` (v6)
- **HTTP Client**: `axios` (configured with `withCredentials: true`)
- **Icons**: `lucide-react`
- **Language**: JavaScript (ES Modules, NO TypeScript)

---

## 📂 Folder Structure
```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/               # Branding assets & images
│   ├── components/
│   │   ├── common/           # CategoryBadge, StatusBadge, Skeleton, Modal, EmptyState, ThemeToggle
│   │   ├── layout/           # Navbar, Footer, PublicLayout, AdminLayout
│   │   ├── changelog/        # UpdateCard, CategoryFilter, SearchBar, Pagination
│   │   ├── widget/           # UpdateWidget, WidgetPopover
│   │   └── admin/            # StatsCard, DeleteConfirmModal, UpdateForm
│   ├── context/
│   │   ├── AuthContext.jsx   # Global user state & JWT authentication status
│   │   ├── ThemeContext.jsx  # Dark/Light mode theme state
│   │   └── ToastContext.jsx  # Global toast notification queue
│   ├── hooks/
│   │   └── useDebounce.js    # Search debouncing hook (300ms)
│   ├── pages/
│   │   ├── public/           # LandingPage, ChangelogPage, UpdateDetailPage
│   │   ├── auth/             # LoginPage, RegisterPage
│   │   ├── admin/            # AdminDashboard, ManageUpdates, CreateUpdatePage, EditUpdatePage
│   │   └── error/            # NotFoundPage (404), UnauthorizedPage (403)
│   ├── routes/
│   │   ├── ProtectedRoute.jsx# Auth route guard
│   │   ├── AdminRoute.jsx    # Admin role route guard
│   │   └── AppRoutes.jsx     # Route definitions
│   ├── services/
│   │   ├── api.js            # Axios client instance & interceptors
│   │   ├── authService.js    # Auth endpoints API service
│   │   ├── updateService.js  # Updates & Changelog endpoints API service
│   │   └── widgetService.js  # Widget endpoints API service
│   ├── App.jsx               # App container with Providers
│   ├── main.jsx              # React DOM entry point
│   └── index.css             # Tailwind CSS directives & scrollbar styles
├── .env.example              # Environment variables template
├── .env                      # Local environment variables
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration & proxy settings
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Scripts & dependencies
└── README.md                 # Project documentation
```

---

## ⚙️ Installation & Setup

1. **Navigate to the `frontend/` directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

---

## 🔐 Environment Variables (`.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Available Scripts

### Run Development Server:
```bash
npm run dev
```
Starts Vite dev server on `http://localhost:5173`.

### Build for Production:
```bash
npm run build
```
Generates production build bundle in `dist/`.

### Preview Production Build:
```bash
npm run preview
```

---

## 🔗 Backend Integration & APIs Used

The frontend integrates directly with the Express backend running on `http://localhost:5000/api`:

- **Auth Services**:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/logout`
  - `GET  /api/auth/me`
- **Changelog & Updates**:
  - `GET  /api/changelog` (Public published feed with pagination, category filter & search)
  - `GET  /api/widget/updates` (Lightweight stream for embedded widgets)
  - `GET  /api/updates` (Admin view of all statuses)
  - `POST /api/updates` (Admin creation)
  - `PUT  /api/updates/:id` (Admin edit)
  - `PATCH /api/updates/:id/publish` (Admin publish transition)
  - `PATCH /api/updates/:id/archive` (Admin archive transition)
  - `DELETE /api/updates/:id` (Admin removal)

---

## 🌐 Routing & Navigation

| Path | Access | Page Component |
| :--- | :--- | :--- |
| `/` | Public | Landing Page |
| `/changelog` | Public | Public Changelog Feed |
| `/changelog/:slug` | Public | Update Article Detail |
| `/login` | Public | Sign In Form |
| `/register` | Public | Registration Form |
| `/admin` | Admin Only | Admin Overview Dashboard |
| `/admin/updates` | Admin Only | Manage Updates Data Table |
| `/admin/updates/new` | Admin Only | Create Update Form Page |
| `/admin/updates/:id/edit` | Admin Only | Edit Update Form Page |
| `/unauthorized` | Public | 403 Access Forbidden Page |
| `*` | Public | 404 Not Found Page |
