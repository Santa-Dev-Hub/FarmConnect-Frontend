# 🚜 FarmConnect

FarmConnect is a full-stack web application connecting farmers to workers, equipment, and advertisements in the agriculture ecosystem. It consists of:

- ⚙️ **Backend:** Node.js + Express + PostgreSQL REST API deployed on Railway.
- 🌐 **Frontend:** React.js web app deployed on Vercel.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠 Technologies](#-technologies)
- [⚡ Setup & Installation](#-setup--installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [🔑 Environment Variables](#-environment-variables)
- [🗄 Database Schema](#-database-schema)
- [🚀 Deployment](#-deployment)
- [🎯 Usage](#-usage)
- [🛠 Troubleshooting](#-troubleshooting)
- [📜 License](#-license)

---

## ✨ Features

- 👩‍🌾 User registration and authentication (farmers, workers, and companies)
- 📋 Posting and browsing jobs and worker availabilities
- 🚜 Equipment rental and bookings
- 🤝 Matching workers to jobs
- 📢 Advertisement campaigns targeted by user roles

---

## 🛠 Technologies

- **Backend:** Node.js, Express, PostgreSQL, JWT, bcrypt
- **Frontend:** React.js, Axios, React Router
- **Deployment:** Railway (backend + database), Vercel (frontend)

---

## ⚡ Setup & Installation

### Backend Setup

1. Clone the repo and navigate to backend folder:
   
git clone <repo-url>
cd backend

2. Install dependencies:
 npm install

3. Create `.env` file with:
4. PORT=5000
DATABASE_URL=postgresql://postgres:<password>@<host>:<port>/<database>
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
TZ=Asia/Kolkata # Optional: fix timezone errors
4. Create tables via migrations or manually run schema SQL.
5. Start backend server:
   npm run start
---

### Frontend Setup

1. Navigate to frontend folder:
cd frontend
2. Install dependencies:
npm install

3. Create a `.env.local` file:
REACT_APP_API_URL=https://your-backend-production-url/api
REACT_APP_SOCKET_URL=https://your-backend-production-url

5. Start React dev server:
npm start

---

## 🔑 Environment Variables

| Variable Name           | Description                                  |
|------------------------|----------------------------------------------|
| PORT                   | Backend server port                          |
| DATABASE_URL           | PostgreSQL connection string                 |
| JWT_SECRET             | Secret key for JWT                           |
| NODE_ENV               | Environment (development/production)        |
| TZ                     | Timezone (Asia/Kolkata recommended)         |
| REACT_APP_API_URL       | Frontend URL for backend API                 |
| REACT_APP_SOCKET_URL    | Frontend URL for websocket                    |

---

## 🗄 Database Schema

- **users**: user info with roles and location
- **jobs**: farmer posted jobs
- **worker_availability**: worker availability
- **equipment**: rentable farm equipment
- **bookings**: equipment rentals
- **matches**: job-worker matches
- **ads**: advertisement campaigns

---

## 🚀 Deployment

- Backend + PostgreSQL on Railway
- Frontend on Vercel connected via environment variables

---

## 🎯 Usage

- Register as farmer, worker, or company
- Post jobs, set availability, browse/book equipment
- Manage ads and matches on dashboard

---

## 🛠 Troubleshooting

- **relation "users" does not exist:** Create tables on Railway database, not local.
- **Invalid credentials:** Ensure registrations save users with hashed passwords.
- **TimeZone error:** Set TZ=Asia/Kolkata in Railway backend environment variables.
- **Connection errors:** Check `REACT_APP_API_URL` points to Railway backend URL.
- Use Railway logs for backend errors diagnostics.

---

## 📜 License

Its free to use bro

---

Made with 🚀 by Santanu Pal

