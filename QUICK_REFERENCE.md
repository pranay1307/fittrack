# ⚡ FitTrack - Quick Reference

## 🚀 Start Project in 2 Commands

```bash
# Terminal 1 - Backend
cd server && npm install && npm run dev

# Terminal 2 - Frontend  
cd client && npm install && npm start
```

---

## 📖 Key Files Reference

### Most Important Files to Review
1. `server/server.js` - Backend entry point
2. `client/src/App.js` - Frontend routing
3. `client/src/context/AuthContext.js` - Auth state
4. `server/middleware/auth.js` - Route protection
5. `server/models/User.js` - User schema with password hashing
6. `server/models/Workout.js` - Workout schema

### Most Important Endpoints
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Sign in
- `GET /api/workouts` - Get workouts (Protected)
- `POST /api/workouts` - Create workout (Protected)
- `GET /api/admin/users` - Get all users (Admin only)

---

## 🎨 UI Pages

| Page | Path | Access |
|------|------|--------|
| Login | `/login` | Public |
| Register | `/register` | Public |
| User Dashboard | `/dashboard` | Users |
| Admin Dashboard | `/admin` | Admins |

---

## 🔑 Default Test User

After registration, you'll have a user account. To create an admin:

1. Register normally first
2. In MongoDB, update your user: `role: "admin"`
3. Or modify register endpoint temporarily

---

## 🐛 Common Issues

| Issue | Fix |
|-------|-----|
| Can't connect to MongoDB | `mongod` in terminal / Use MongoDB Atlas |
| Port 5000 in use | Kill process or change `PORT=5001` in .env |
| Token error on login | Clear localStorage, check JWT_SECRET matches |
| Workout won't save | Check that user is logged in |
| CORS error | Ensure backend is running on 5000 |

---

## 📚 File Modification Guide

### Add New Workout Field
1. Update `server/models/Workout.js` schema
2. Update `WorkoutForm.js` component
3. Update `WorkoutCard.js` to display

### Add New Auth Feature
1. Add controller method in `authController.js`
2. Add route in `authRoutes.js`
3. Add API call in `api.js`
4. Use in component with context

### Add Admin Feature
1. Add controller in `adminController.js`
2. Add route in `adminRoutes.js`
3. Add API call in `api.js`
4. Create page component
5. Add route in `App.js` with `adminOnly={true}`

---

## 🔗 Key Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests

### Frontend
- `react` - UI framework
- `react-router-dom` - Routing
- `axios` - HTTP requests

---

## 📋 Checklist for First Run

- [ ] MongoDB running locally or cloud setup
- [ ] .env file created in server folder
- [ ] `npm install` in both server and client
- [ ] `npm run dev` in server folder
- [ ] `npm start` in client folder
- [ ] Can access http://localhost:3000
- [ ] Can register new account
- [ ] Can add workout
- [ ] Can see workout in dashboard
- [ ] Can edit/delete workout
- [ ] Can logout and login again

---

## 💾 Data Persistence

- **User Token**: Stored in localStorage
- **Workouts**: Stored in MongoDB
- **User Data**: Stored in MongoDB
- **Session**: Browser session with token

---

## 🔐 Authentication Flow

```
User → Register → Hash Password → Save to DB → Issue Token
         ↓
User → Login → Verify Password → Issue Token → Store in localStorage
         ↓
User → API Call → Include Token in Header → Server Verifies → Proceed
         ↓
User → Logout → Clear Token from localStorage → Can't access protected routes
```

---

## 📞 Getting Help

### Check Files in This Order
1. Error message console (F12 in browser)
2. Server terminal output
3. Comments in the source code
4. README.md documentation
5. API_DOCUMENTATION.md for API reference

### Common Debug Steps
```javascript
// Check if token exists
console.log(localStorage.getItem('token'));

// Check current user
console.log(context.user);

// Check API response
console.log(response.data);
```

---

## 🎓 What to Learn From This

✓ How to build a full REST API
✓ How to structure a React app with routing
✓ How authentication works with JWT
✓ How to protect sensitive routes
✓ MongoDB schema design
✓ Password security (hashing vs storing)
✓ API error handling
✓ Frontend state management

---

**Everything is ready to use!** 🚀

Start with SETUP_GUIDE.md for quickest setup.
Read README.md for complete documentation.
Check API_DOCUMENTATION.md for API details.
