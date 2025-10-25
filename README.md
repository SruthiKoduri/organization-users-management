# Organization & Users Management System

A full-stack web application for managing organizations and their users, built for Pragathi Campus Recruitment Task 2.

## 🚀 Features

- **Organization Management**: Create, read, update, and delete organizations
- **User Management**: Manage users associated with organizations
- **Responsive UI**: Modern interface built with React and Tailwind CSS
- **REST API**: RESTful backend API with Express.js
- **SQL Database**: SQLite database for persistent data storage

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Axios
- Vite

**Backend:**
- Node.js
- Express.js
- SQLite3

## 📦 Installation


The backend will run on `http://localhost:5000`

### Frontend Setup


The frontend will run on `http://localhost:3000`

## 🗄️ Database Schema

### Organizations Table
- id, name, email, phone, address, website, description, created_at, updated_at

### Users Table
- id, organization_id, first_name, last_name, email, phone, role, department, status, created_at, updated_at

## 🔌 API Endpoints

### Organizations
- `GET /api/organizations` - Get all organizations
- `GET /api/organizations/:id` - Get specific organization
- `POST /api/organizations` - Create organization
- `PUT /api/organizations/:id` - Update organization
- `DELETE /api/organizations/:id` - Delete organization

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 👨‍💻 Author

Created for Pragathi Campus Recruitment - October 2025
By K. D. P. V. SAI SRUTHI



### Backend Setup

