# Task Management Dashboard

A modern, full-stack task management application built with React, TypeScript, Redux Toolkit, Node, Express, and Prisma ORM with PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## ✨ Features

### Task Management

- ✅ Create, read, update, and delete tasks
- ✅ Task status tracking (To Do, In Progress, Done)
- ✅ Priority levels (Low, Medium, High)
- ✅ Task assignment to team members
- ✅ Rich task descriptions

### User Interface

- 🎨 Modern, responsive design with Tailwind CSS
- 🔍 Real-time search and filtering
- 📊 Visual dashboard with task statistics
- 🎯 Intuitive card-based layout
- 💫 Smooth animations and transitions
- 📱 Mobile-friendly interface

### Advanced Features

- 🔄 Redux state management with persistence
- 💾 Local storage caching for offline support
- 🎭 Form validation with Zod and React Hook Form
- 🚀 Optimized performance with React Compiler
- 🔐 User authentication with bcrypt
- 🎨 Custom UI components with Lucide icons

## 🛠 Tech Stack

### Frontend

- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.2
- **State Management**: Redux Toolkit 2.10.1
- **Styling**: Tailwind CSS 4.1.17
- **Form Handling**: React Hook Form 7.66.0 + Zod 4.1.12
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.553.0
- **Routing**: React Router DOM 7.9.5

### Backend

- **Runtime**: Node.js with Express 5.1.0
- **Language**: TypeScript 5.9.3
- **ORM**: Prisma 6.19.0
- **Database**: PostgreSQL
- **Authentication**: bcrypt 6.0.0
- **CORS**: cors 2.8.5

### Development Tools

- **Linting**: ESLint 9.39.1
- **Type Checking**: TypeScript
- **Hot Reload**: Nodemon (backend), Vite HMR (frontend)
- **React Compiler**: babel-plugin-react-compiler 19.1.0-rc.3

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── api.controller.ts    # Request handlers
│   │   │   └── api.routes.ts        # API route definitions
│   │   ├── index.ts                 # Express app entry point
│   │   └── prisma.ts                # Prisma client instance
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── migrations/              # Database migrations
│   ├── .env                         # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── prisma.config.ts
│
└── frontend/
    ├── src/
    │   ├── components/              # React components
    │   │   ├── FilterBar.tsx        # Task filtering UI
    │   │   ├── TaskBoard.tsx        # Main task board view
    │   │   ├── TaskCard.tsx         # Individual task card
    │   │   ├── TaskColumn.tsx       # Task column component
    │   │   └── TaskDialog.tsx       # Task create/edit modal
    │   ├── features/
    │   │   └── tasks/
    │   │       ├── api.ts           # API client functions
    │   │       ├── taskSlice.ts     # Redux slice
    │   │       └── types.ts         # Task type definitions
    │   ├── store/
    │   │   └── store.ts             # Redux store configuration
    │   ├── App.tsx                  # Root component
    │   ├── main.tsx                 # Application entry point
    │   └── index.css                # Global styles
    ├── public/
    ├── .env                         # Environment variables
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── eslint.config.js
```

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: v13.0 or higher
- **Git**: For version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-dashboard
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Database connection string
DATABASE_URL="postgresql://username:password@localhost:5432/taskdb?schema=public"

# Server port
PORT=3005
```

**Database URL Format:**

```
postgresql://[user]:[password]@[host]:[port]/[database]?schema=public
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
# API base URL
VITE_API_URL=http://localhost:3005/api
```

### Database Setup

1. **Create PostgreSQL Database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE taskdb;

# Exit psql
\q
```

2. **Run Prisma Migrations:**

```bash
cd backend
npm run prisma:migrate
```

3. **Generate Prisma Client:**

```bash
npm run prisma:generate
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Server runs on `http://localhost:3005`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Application runs on `http://localhost:5173`

### Production Mode

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Documentation

### Base URL

```
http://localhost:3005/api
```

### Endpoints

#### User Authentication

**Register/Login User**

```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### Task Management

**Get All Tasks**

```http
GET /api/tasks?userId=1
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "status": "in-progress",
    "priority": "high",
    "assignee": "John Doe",
    "userId": 1,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

**Create Task**

```http
POST /api/add/task
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "assignee": "Jane Smith",
  "userId": 1
}
```

**Update Task**

```http
PUT /api/update/task/:id
Content-Type: application/json

{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "done",
  "priority": "low",
  "assignee": "John Doe"
}
```

**Delete Task**

```http
DELETE /api/delete/task/:id
```

**Response:** `204 No Content`

### Status Codes

| Code | Description                 |
| ---- | --------------------------- |
| 200  | Success                     |
| 201  | Created                     |
| 204  | No Content (Delete success) |
| 400  | Bad Request                 |
| 401  | Unauthorized                |
| 404  | Not Found                   |
| 500  | Internal Server Error       |

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues and questions:

- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting section

---
