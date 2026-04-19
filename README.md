# 🏋️ FitTrack - Gym Management System

A complete MERN stack web application for managing gym workouts and user administration. Built for learning full-stack web development with focus on core concepts needed for internships.

## 🎯 Features

### User Features
- ✅ User Registration & Login (JWT Authentication)
- ✅ Dashboard to view all personal workouts
- ✅ Add, Edit, and Delete workouts
- ✅ View workout details (exercise, sets, reps, weight)
- ✅ Workout history with timestamps

### Admin Features
- ✅ View all registered users
- ✅ Delete users (and their workouts)
- ✅ View all workouts across the system
- ✅ User management dashboard

### Technical Highlights
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (User/Admin)
- ✅ Protected routes on frontend and backend
- ✅ RESTful API design
- ✅ MongoDB with Mongoose ODM
- ✅ Clean, modular code structure
- ✅ Error handling and validation
- ✅ Responsive UI design

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT, bcryptjs |
| **Styling** | CSS3 |

## 📁 Project Structure

```
FitTrack/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── WorkoutCard.js
│   │   │   └── WorkoutForm.js
│   │   ├── pages/         # Page components
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── DashboardPage.js
│   │   │   └── AdminPage.js
│   │   ├── context/       # React Context
│   │   │   └── AuthContext.js
│   │   ├── api/           # API calls
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── ProtectedRoute.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
│
└── server/                 # Backend (Node/Express)
    ├── models/            # MongoDB schemas
    │   ├── User.js
    │   └── Workout.js
    ├── controllers/       # Route handlers
    │   ├── authController.js
    │   ├── workoutController.js
    │   └── adminController.js
    ├── routes/            # API routes
    │   ├── authRoutes.js
    │   ├── workoutRoutes.js
    │   └── adminRoutes.js
    ├── middleware/        # Custom middleware
    │   └── auth.js
    ├── server.js          # Main server file
    ├── .env               # Environment variables
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create/update `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/fittrack
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   ```bash
   # On Windows (if MongoDB is installed)
   mongod
   
   # Or use MongoDB Atlas cloud database
   ```

5. **Run the server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **In a new terminal, navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React app:**
   ```bash
   npm start
   ```

   Frontend will open at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
```

### Workout Endpoints (Protected)
```
GET    /api/workouts        - Get all workouts for user
POST   /api/workouts        - Create new workout
PUT    /api/workouts/:id    - Update workout
DELETE /api/workouts/:id    - Delete workout
```

### Admin Endpoints (Protected/Admin Only)
```
GET    /api/admin/users     - Get all users
DELETE /api/admin/user/:id  - Delete user
GET    /api/admin/workouts  - Get all workouts
```

## 🔐 Authentication Flow

1. **Registration:**
   - User provides name, email, password
   - Password is hashed using bcryptjs
   - User stored in MongoDB with role "user"
   - JWT token returned

2. **Login:**
   - User provides email and password
   - Password compared with hash
   - JWT token generated and returned
   - Token stored in localStorage

3. **Protected Requests:**
   - Token sent in Authorization header: `Bearer <token>`
   - Server verifies token and extracts user ID
   - Requests processed only if token is valid

## 🧪 Test the Application

### Create Test User
1. Click "Register"
2. Fill in name, email, password
3. Click "Register"

### Add Workouts
1. Log in with your account
2. Click "+ Add Workout"
3. Fill in exercise, sets, reps, weight
4. Click "Add Workout"

### Test Admin Features (Optional)
1. Create an admin user by modifying registration (set role: "admin")
2. Log in as admin
3. Click "Admin Dashboard"
4. View users and workouts, delete users

## 📝 Database Schema

### User Model
```javascript
{
  name: String,           // User's full name
  email: String,          // Unique email
  password: String,       // Hashed password
  role: String,           // "user" or "admin"
  createdAt: Date,        // Account creation time
  updatedAt: Date
}
```

### Workout Model
```javascript
{
  userId: ObjectId,       // Reference to User
  exercise: String,       // Exercise name
  sets: Number,           // Number of sets
  reps: Number,           // Reps per set
  weight: Number,         // Weight in kg
  createdAt: Date,        // Workout creation time
  updatedAt: Date
}
```

## 🔑 Key Concepts Demonstrated

| Concept | Implementation |
|---------|-----------------|
| **CRUD Operations** | Workout management (Create, Read, Update, Delete) |
| **Authentication** | JWT tokens with bcrypt password hashing |
| **Authorization** | Role-based access control (middleware) |
| **API Design** | RESTful endpoints with proper HTTP methods |
| **State Management** | React Context API |
| **Database Design** | MongoDB relationships with Mongoose |
| **Error Handling** | Try-catch blocks and error responses |
| **Security** | Password hashing, JWT verification, Protected routes |

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `nodemon` - Development auto-reload

### Frontend
- `react` - UI library
- `react-dom` - React rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check connection string in `.env`

### CORS Error
- Verify backend is running on port 5000
- Check `cors` configuration in server.js

### Authentication Issues
- Clear localStorage and login again
- Check token expiration (set to 7 days)
- Verify JWT_SECRET in .env

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or on macOS/Linux
lsof -i :5000
kill -9 <PID>
```

## 📚 Learning Resources

- **MERN Stack Concepts:** Authentication, Protected Routes, API Design
- **MongoDB:** Document model, relationships, indexing
- **React:** Hooks, Context API, Routing
- **Express:** Middleware, Controllers, Route organization
- **JWT:** Token-based authentication, token validation

## 🎓 Internship Preparation

This project demonstrates:
- ✅ Full-stack development capability
- ✅ Understanding of CRUD operations
- ✅ API design and RESTful principles
- ✅ Database modeling
- ✅ Authentication and security
- ✅ Code organization and best practices
- ✅ Error handling
- ✅ Responsive UI design

## 📝 Notes

- This is a learning project for internship preparation
- Security in production requires additional measures (HTTPS, environment variables, input validation)
- Consider adding email verification, password reset, and rate limiting for production
- Implement comprehensive error handling and logging

## 🤝 Contributing

This is an educational project. Feel free to extend it with:
- Workout statistics and analytics
- Social features (follow other users)
- Workout templates and recommendations
- Progress tracking charts
- Notifications system

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 💪🚀**

For questions or issues, refer to the code comments and error messages in your browser console and server terminal.
