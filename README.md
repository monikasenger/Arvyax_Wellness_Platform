# 🌿 Arvyax Wellness Platform

A full-stack **Wellness Platform** built with **React (Vite) + Node.js (Express) + MongoDB**.  
Users can explore sessions, book wellness activities, and manage their personal dashboard.  

---

## 🚀 Deployment

- **Frontend (Vercel/Render):** [fontend](https://arvyax-wellness-platform-fr61.onrender.com)  
- **Backend (Render):** [backend](https://arvyax-wellness-platform-backend.onrender.com)  

---

## 🚀 Features

🔐 User Authentication (JWT)
📝 Create, Draft & Auto-Save Sessions
📅 Book & Manage Wellness Sessions
🧑‍💻 User Dashboard
🛠️ Session Editor with Draft/Publish
🎨 Responsive UI with TailwindCSS
☁️ Deployment on Render (Frontend + Backend)

---

## 🛠️ Tech Stack

| Technology   | Description                      |
|--------------|----------------------------------|
| **Frontend** | React (Vite), Tailwind CSS, Axios |
| **Backend**  |Node.js, Express.js, JWT, bcrypt |
| **Database** | MongoDB with Mongoose            |
| **Deployment** | Render (Frontend & Backend)   |

---
## ⚙️ Environment Variables

Create a `.env` file in both **backend** and **frontend** folders.

### Backend `.env`
```bash
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
---
### Frontend `.env`
```bash
VITE_BACKEND_URL=http://localhost:4000

```
---

## 💻 Installation Guide  & Setup

### ✅ Prerequisites

- **Node.js installed**  
- **MongoDB URI** (Cloud or Local)

---

### 📦 Clone the Repository
```bash

git clone https://github.com/monikasenger/Arvyax_Wellness_Platform.git
cd Arvyax_Wellness_Platform
```
---

### 🔧 Setup Backend:

```bash
cd backend
npm install

▶️ Run the backend:
npm start
http://localhost:4000
```
---
### 💻 Setup Frontend:
```bash
cd frontend
npm install

▶️ Run the frontend:
npm run dev
http://localhost:5173
```
---
## 📁 Folder Structure 
```bash
Arvyax_Wellness_Platform/
│── backend/              # Express + MongoDB backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── middleware/       # JWT auth middleware
│   └── server.js         # Entry point
│
│── frontend/             # React (Vite) frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # App pages (Login, Register, Dashboard, MySessions, etc.)
│   │   ├── context/      # Auth Context
│   │   └── App.jsx       # Main App
│   └── vite.config.js
│
└── README.md
