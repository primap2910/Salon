# Salon Management System
A full-stack MERN application with AI-powered chatbot for salon appointment booking and management.

## 🛠️ Tech Stack
* Frontend: React.js, Vite, Bootstrap
* Backend: Node.js, Express.js
* Database: MongoDB
* Auth: JWT Token
* File Upload: Multer
* AI Integration: Google Gemini API

## 📁 Project Structure
salon/ ├── backend/ → API, Auth, DB Connection, Multer, AI Chat └── frontend/ → React UI, Pages, Components, Chatbot

## ✨ Features
* User Signup / Login
* Browse Services & Categories
* Sub-category wise Services
* Service Details Page
* User Profile
* Admin - Add/Update/Delete Categories
* Admin - Manage Services
* General Inquiry / Contact Form
* JWT Authentication
* AI Salon Assistant Chatbot (Gujarati, Hindi, English)

## ⚙️ Installation & Setup
### Backend
cd backend npm install

.env file બનાવો: PORT=8000 MONGODB_URL=your_mongodb_connection_string JWT_SECRET=your_jwt_secret GEMINI_API_KEY=your_gemini_api_key

npm start

### Frontend
cd frontend npm install npm run dev

## 🔐 Environment Variables
.env file ક્યારેય GitHub પર push કરવી નહીં.

| Variable | Description |
|----------|-------------|
| PORT | Server port (8000) |
| MONGODB_URL | MongoDB Atlas connection string |
| JWT_SECRET | JWT secret key |
| GEMINI_API_KEY | Google Gemini API key |

## 👤 Author
primap2910
