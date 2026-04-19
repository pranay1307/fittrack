# FitTrack - Quick Setup Guide

## 🚀 5-Minute Setup

### Step 1: Backend Setup (Terminal 1)
```bash
cd server
npm install
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 2: Frontend Setup (Terminal 2)
```bash
cd client
npm install
npm start
```
✅ Frontend running on http://localhost:3000

### Step 3: MongoDB Setup
```bash
# Option A: Local MongoDB (Windows)
mongod

# Option B: Use MongoDB Atlas (Free Cloud)
# https://www.mongodb.com/cloud/atlas
# Update MONGODB_URI in server/.env
```

### Step 4: Test the App
1. Go to http://localhost:3000
2. Register a new account
3. Add a workout
4. View your dashboard

---

## 📋 Environment Variables

### server/.env
```
MONGODB_URI=mongodb://localhost:27017/fittrack
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

---

## 🎯 Default Test Credentials

### Admin User (Create manually in MongoDB)
```javascript
{
  name: "Admin User",
  email: "admin@fittrack.com",
  password: "password123",
  role: "admin"
}
```

---

## 💡 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB Connection Error | Ensure MongoDB is running: `mongod` |
| Port 5000 Already in Use | Kill process or change PORT in .env |
| CORS Error | Backend must be on port 5000 |
| Login Not Working | Check token in localStorage |
| Workouts Not Loading | Ensure user is logged in |

---

## 📚 API Testing with Postman/Insomnia

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}
Response includes: token, user info
```

### 3. Add Workout (Protected)
```
POST http://localhost:5000/api/workouts
Headers:
  Authorization: Bearer <token>
Body (JSON):
{
  "exercise": "Bench Press",
  "sets": 3,
  "reps": 10,
  "weight": 80
}
```

### 4. Get All Workouts (Protected)
```
GET http://localhost:5000/api/workouts
Headers:
  Authorization: Bearer <token>
```

---

## 🔒 Security Notes

- Passwords are hashed with bcryptjs
- JWT tokens expire in 7 days
- Protected routes require valid token
- Admin routes require admin role
- Password validation (min 6 characters)

---

## 📱 Responsive Design

- Mobile-friendly UI
- Works on all screen sizes
- Touch-friendly buttons
- Optimized navigation

---

## 🎓 What You'll Learn

✅ Full MERN Stack Development
✅ REST API Design
✅ Authentication & Authorization
✅ Database Design with MongoDB
✅ React Hooks & Context API
✅ Error Handling & Validation
✅ Responsive Web Design

---

## 📞 Support

Check browser console (F12) for errors:
- Frontend: Development server messages
- Backend: Terminal output

Server logs show:
- Database connections
- API requests
- Authentication events

---

**Ready to get started? Follow the 5-Minute Setup above! 🚀**
