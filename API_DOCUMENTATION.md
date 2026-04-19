# FitTrack API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register User
Register a new user account

```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64a5f3b2c1d2e3f4g5h6i7j8",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### 2. Login
Login with email and password

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64a5f3b2c1d2e3f4g5h6i7j8",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User
Get the logged-in user's information

```
GET /auth/me
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a5f3b2c1d2e3f4g5h6i7j8",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Workout Endpoints

All workout endpoints require authentication.

### 4. Get All Workouts
Get all workouts for the current user

```
GET /workouts
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64a5f3b2c1d2e3f4g5h6i7j8",
      "userId": "64a5f3b2c1d2e3f4g5h6i7j7",
      "exercise": "Bench Press",
      "sets": 3,
      "reps": 10,
      "weight": 80,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "64a5f3b2c1d2e3f4g5h6i7j9",
      "userId": "64a5f3b2c1d2e3f4g5h6i7j7",
      "exercise": "Squats",
      "sets": 4,
      "reps": 8,
      "weight": 100,
      "createdAt": "2024-01-14T15:20:00.000Z",
      "updatedAt": "2024-01-14T15:20:00.000Z"
    }
  ]
}
```

---

### 5. Create Workout
Add a new workout

```
POST /workouts
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "exercise": "Bench Press",
  "sets": 3,
  "reps": 10,
  "weight": 80
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64a5f3b2c1d2e3f4g5h6i7j8",
    "userId": "64a5f3b2c1d2e3f4g5h6i7j7",
    "exercise": "Bench Press",
    "sets": 3,
    "reps": 10,
    "weight": 80,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

---

### 6. Update Workout
Update an existing workout

```
PUT /workouts/:id
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` - Workout ID

**Request Body:**
```json
{
  "exercise": "Bench Press",
  "sets": 4,
  "reps": 12,
  "weight": 85
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a5f3b2c1d2e3f4g5h6i7j8",
    "userId": "64a5f3b2c1d2e3f4g5h6i7j7",
    "exercise": "Bench Press",
    "sets": 4,
    "reps": 12,
    "weight": 85,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to update this workout"
}
```

---

### 7. Delete Workout
Delete a workout

```
DELETE /workouts/:id
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` - Workout ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Workout deleted"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Workout not found"
}
```

---

## Admin Endpoints

All admin endpoints require:
- Valid JWT token
- User role must be "admin"

### 8. Get All Users
Get list of all registered users

```
GET /admin/users
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a5f3b2c1d2e3f4g5h6i7j7",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "64a5f3b2c1d2e3f4g5h6i7j9",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-10T08:00:00.000Z"
    }
  ]
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized as admin"
}
```

---

### 9. Delete User
Delete a user and all their workouts

```
DELETE /admin/user/:id
Authorization: Bearer <admin_token>
```

**Path Parameters:**
- `id` - User ID to delete

**Success Response (200):**
```json
{
  "success": true,
  "message": "User and their workouts deleted"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 10. Get All Workouts (Admin)
Get all workouts from all users

```
GET /admin/workouts
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "64a5f3b2c1d2e3f4g5h6i7j8",
      "userId": {
        "_id": "64a5f3b2c1d2e3f4g5h6i7j7",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "exercise": "Bench Press",
      "sets": 3,
      "reps": 10,
      "weight": 80,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error |

---

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Rate Limiting & Best Practices

1. **Token Management:**
   - Store token in localStorage on client
   - Include in Authorization header for all protected requests
   - Token expires in 7 days
   - Clear token on logout

2. **Input Validation:**
   - All required fields must be provided
   - Email must be valid format
   - Password must be minimum 6 characters
   - Numbers must be positive values

3. **Error Recovery:**
   - Check error message in response
   - Re-authenticate if token expires
   - Validate input data before sending

---

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Workouts (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/workouts \
  -H "Authorization: Bearer TOKEN"
```

---

**API Documentation v1.0**
Last Updated: January 2024
