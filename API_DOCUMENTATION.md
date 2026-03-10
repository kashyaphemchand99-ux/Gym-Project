# API Documentation - EliteFit Gym

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require a JWT token. Include it in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "age": 25
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "userId": 1
}
```

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "membership_plan": "none"
  }
}
```

---

## User Profile Endpoints

### Get User Profile
**GET** `/user/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "age": 25,
  "membership_plan": "Pro",
  "membership_start_date": "2024-03-09T00:00:00.000Z",
  "membership_end_date": "2024-04-09T00:00:00.000Z"
}
```

---

### Update User Profile
**PUT** `/user/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "age": 26
}
```

**Response:**
```json
{
  "message": "Profile updated successfully"
}
```

---

## Membership Endpoints

### Get All Membership Plans
**GET** `/memberships/plans`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Basic",
    "price": 999,
    "duration_months": 1,
    "features": "Gym access,Cardio zone",
    "description": "Basic gym membership for one month"
  },
  {
    "id": 2,
    "name": "Pro",
    "price": 1999,
    "duration_months": 1,
    "features": "Gym access,Personal trainer,Classes",
    "description": "Professional membership with trainer access"
  },
  {
    "id": 3,
    "name": "Elite",
    "price": 2999,
    "duration_months": 1,
    "features": "Gym access,Personal trainer,All classes,Diet plan",
    "description": "Premium membership with all features"
  }
]
```

---

### Purchase Membership
**POST** `/memberships/purchase`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "plan_name": "Pro"
}
```

**Response:**
```json
{
  "message": "Membership purchased successfully",
  "plan": "Pro",
  "startDate": "2024-03-09T...",
  "endDate": "2024-04-09T...",
  "price": 1999
}
```

---

## Trainer Endpoints

### Get All Trainers
**GET** `/trainers`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Alex",
    "specialization": "Strength Training",
    "experience": 5,
    "phone": "9876543210",
    "email": "alex@elitefit.com",
    "image_url": "https://images.unsplash.com/...",
    "bio": "Expert strength trainer with 5 years experience"
  },
  {
    "id": 2,
    "name": "David",
    "specialization": "Fitness Coaching",
    "experience": 7,
    "phone": "9876543211",
    "email": "david@elitefit.com",
    "image_url": "https://images.unsplash.com/...",
    "bio": "Certified fitness coach specializing in weight loss"
  }
]
```

---

### Get Trainer Details
**GET** `/trainers/:id`

**Response:**
```json
{
  "id": 1,
  "name": "Alex",
  "specialization": "Strength Training",
  "experience": 5,
  "phone": "9876543210",
  "email": "alex@elitefit.com",
  "image_url": "https://images.unsplash.com/...",
  "bio": "Expert strength trainer with 5 years experience"
}
```

---

## Class Endpoints

### Get All Classes
**GET** `/classes`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Strength Training",
    "trainer_id": 1,
    "capacity": 20,
    "duration": 60,
    "schedule": "Mon, Wed, Fri 6AM",
    "description": "Build muscle strength with advanced techniques",
    "trainer_name": "Alex"
  },
  {
    "id": 2,
    "name": "Cardio Burn",
    "trainer_id": 2,
    "capacity": 25,
    "duration": 45,
    "schedule": "Tue, Thu, Sat 7AM",
    "description": "High-intensity cardio for fat burning",
    "trainer_name": "David"
  }
]
```

---

### Get Class Details
**GET** `/classes/:id`

**Response:**
```json
{
  "id": 1,
  "name": "Strength Training",
  "trainer_id": 1,
  "capacity": 20,
  "duration": 60,
  "schedule": "Mon, Wed, Fri 6AM",
  "description": "Build muscle strength with advanced techniques",
  "trainer_name": "Alex"
}
```

---

## Booking Endpoints

### Book a Class
**POST** `/bookings`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "class_id": 1,
  "booking_date": "2024-03-10"
}
```

**Response:**
```json
{
  "message": "Booking confirmed",
  "bookingId": 5
}
```

---

### Get User Bookings
**GET** `/bookings`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 5,
    "user_id": 1,
    "class_id": 1,
    "booking_date": "2024-03-10",
    "status": "confirmed",
    "created_at": "2024-03-09T...",
    "class_name": "Strength Training",
    "trainer_name": "Alex"
  }
]
```

---

### Cancel Booking
**DELETE** `/bookings/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Booking cancelled"
}
```

---

## Other Endpoints

### Calculate BMI
**POST** `/bmi/calculate`

**Request Body:**
```json
{
  "height": 180,
  "weight": 75
}
```

**Response:**
```json
{
  "bmi": "23.15",
  "category": "Normal weight"
}
```

---

### Submit Contact Form
**POST** `/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "I would like to know more about your gym"
}
```

**Response:**
```json
{
  "message": "Message received! We will contact you soon."
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad request (missing/invalid data)
- `401` - Unauthorized (no/invalid token)
- `404` - Not found
- `500` - Server error

---

## Testing with curl

### Example: Register a user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890",
    "age": 25
  }'
```

### Example: Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Example: Get user profile (with token)
```bash
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- req-rate-limiter
- express-rate-limit
- DDoS protection

---

## Security Notes

1. **Passwords** are hashed with bcryptjs (10 salt rounds)
2. **Tokens** expire after 7 days
3. **CORS** is enabled for local development
4. **All inputs** are validated before processing
5. **SQL Injection** is prevented using parameterized queries

For production, additionally implement:
- HTTPS/SSL
- CSRF protection
- Input sanitization
- API key management
- Request validation
- Rate limiting
