# EliteFit Gym - Complete Website

A fully functional gym website with frontend, backend, and SQLite database. All features are working, including user authentication, membership management, class bookings, trainers, and more!

## 🚀 Features

### Frontend
- ✅ Responsive modern design with HTML, CSS, JavaScript
- ✅ User authentication (Login & Registration)
- ✅ User dashboard with profile management
- ✅ Membership plans and purchase functionality
- ✅ Trainers directory with details
- ✅ Classes listing and booking
- ✅ BMI Calculator
- ✅ Contact form
- ✅ Real-time data loading from API

### Backend (Node.js + Express)
- ✅ Complete REST API endpoints
- ✅ User authentication with JWT
- ✅ Password hashing with bcryptjs
- ✅ CORS enabled for frontend communication
- ✅ Comprehensive error handling
- ✅ Static file serving for frontend

### Database (SQLite)
- ✅ Users table with authentication
- ✅ Membership plans table
- ✅ Trainers table
- ✅ Classes table
- ✅ Bookings table
- ✅ Pre-populated with sample data

## 📁 Project Structure

```
gym-website/
├── server.js                 # Express server & API endpoints
├── database.js              # SQLite database setup
├── package.json             # Dependencies
├── .env                     # Environment configuration
├── gym.db                   # SQLite database (auto-created)
└── gym-website/             # Frontend files
    ├── index.html           # Home page
    ├── login.html           # Login & Registration
    ├── plans.html           # Membership plans
    ├── trainers.html        # Trainers list
    ├── classes.html         # Classes list
    ├── contact.html         # Contact form
    ├── bmi-calculator.html  # BMI Calculator
    ├── dashboard.html       # User dashboard
    ├── style.css            # Global styles
    └── js/
        ├── api.js           # API communication functions
        ├── home.js          # Home page functions
        └── [other JS files]
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Step 1: Install Dependencies
```bash
cd "path/to/gym-website"
npm install
```

### Step 2: Start the Server
```bash
npm start
# or
node server.js
```

You should see:
```
===========================================
   EliteFit Gym Website - Server Running
===========================================

✅ Server running on http://localhost:3000
📱 Frontend: http://localhost:3000
🔌 API: http://localhost:3000/api/*

Press Ctrl+C to stop the server
```

### Step 3: Open in Browser
Go to `http://localhost:3000` in your web browser

## 👤 Test Accounts

The system uses a real database, so you can register new accounts. Here's how to test:

### Option 1: Register a New Account
1. Go to `http://localhost:3000`
2. Click "Login"
3. Switch to "Register"
4. Fill in the details:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Phone: 9876543210
   - Age: 25
5. Click "Register"
6. Login with your new account

### Option 2: Use Database Directly
The database stores user information and you can add test data to the `gym.db` file.

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/user/profile` - Get user profile (requires token)
- `PUT /api/user/profile` - Update user profile (requires token)

### Membership Plans
- `GET /api/memberships/plans` - Get all plans
- `POST /api/memberships/purchase` - Purchase a plan (requires token)

### Trainers
- `GET /api/trainers` - Get all trainers
- `GET /api/trainers/:id` - Get trainer details

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class details

### Bookings
- `POST /api/bookings` - Book a class (requires token)
- `GET /api/bookings` - Get user bookings (requires token)
- `DELETE /api/bookings/:id` - Cancel booking (requires token)

### Other
- `POST /api/bmi/calculate` - Calculate BMI
- `POST /api/contact` - Submit contact form

## 🔐 Authentication

Authentication uses JWT (JSON Web Tokens):
1. User logs in with email/password
2. Server returns a JWT token
3. Token is stored in localStorage
4. Token is sent with API requests in Authorization header
5. Token expires after 7 days

## 💾 Database Schema

### Users Table
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT UNIQUE)
- password (TEXT - hashed)
- phone (TEXT)
- age (INTEGER)
- membership_plan (TEXT)
- membership_start_date (DATETIME)
- membership_end_date (DATETIME)
- created_at (DATETIME)

### Trainers Table
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- specialization (TEXT)
- experience (INTEGER)
- phone (TEXT)
- email (TEXT UNIQUE)
- image_url (TEXT)
- bio (TEXT)

### Classes Table
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- trainer_id (INTEGER foreign key)
- capacity (INTEGER)
- duration (INTEGER - in minutes)
- schedule (TEXT)
- description (TEXT)

### Membership Plans Table
- id (INTEGER PRIMARY KEY)
- name (TEXT UNIQUE)
- price (REAL)
- duration_months (INTEGER)
- features (TEXT)
- description (TEXT)

### Bookings Table
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER foreign key)
- class_id (INTEGER foreign key)
- booking_date (TEXT)
- status (TEXT)
- created_at (DATETIME)

## 🎨 Features Walkthrough

### Home Page
- Hero section with call-to-action
- About us with features grid
- Statistics section
- Membership plans preview
- Footer with links

### Login & Registration
- Dual form (login + register tabs)
- Input validation
- Password hashing
- JWT token generation
- Secure authentication

### Dashboard
- User profile information
- Membership status
- Class bookings management
- Profile update functionality
- Plan upgrade options

### Membership Plans
- Display all available plans
- Plan comparison table
- Purchase functionality
- FAQ section
- Plan features breakdown

### Trainers
- View all trainers
- Trainer profiles with specialization
- Contact information
- Experience details
- Book session functionality

### Classes
- Browse all available classes
- Class schedule and duration
- Trainer assignment
- Capacity information
- Class booking

### BMI Calculator
- Calculate BMI from height/weight
- Category classification
- Personalized recommendations
- Health information

### Contact Form
- Message submission
- Contact information display
- Working hours
- Multiple communication channels

## 🔧 Configuration

Edit `.env` file to change:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret key for JWT tokens

## 📊 Default Sample Data

The database is auto-populated with:
- 3 Membership Plans (Basic, Pro, Elite)
- 2 Sample Trainers (Alex, David)
- 2 Sample Classes (Strength Training, Cardio Burn)

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Change port in server.js or kill existing process
# Kill process: taskkill /PID <process-id> /F (Windows)
```

### Database locked error
- SQLite locks database when accessed concurrently
- Make sure only one instance of server is running

### CORS errors
- Check that frontend makes requests to correct API URL
- `http://localhost:3000/api/*`

### Can't see homepage
- Make sure server is running: `npm start`
- Check browser console for errors (F12)
- Clear browser cache

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

## 🚀 Deployment Guide

To deploy to production:

1. **Update environment variables**
   ```bash
   NODE_ENV=production
   JWT_SECRET=your-strong-secret-key
   ```

2. **Choose a hosting service**
   - Heroku (easy for Node.js)
   - AWS/Azure
   - DigitalOcean
   - Vercel (frontend only)

3. **Database backup**
   - Download `gym.db` before deployment
   - Set up automatic backups

4. **SSL/HTTPS**
   - Use https instead of http
   - Get free SSL from Let's Encrypt

## 📝 Notes

- All passwords are hashed with bcryptjs (10 salt rounds)
- Tokens are valid for 7 days
- Database uses SQLite (file-based, no server needed)
- CORS is enabled for local development
- All forms include validation

## 🎓 Learning Resources

To understand and modify this website:

1. **Express.js** - Server framework
2. **SQLite3** - Database
3. **JWT** - Authentication
4. **REST API** - API design
5. **Vanilla JavaScript** - Frontend interactivity

## 📄 License

This project is open source and available under the MIT License.

## ✨ Future Enhancements

Potential features to add:
- Payment gateway integration
- Email notifications
- Advanced workout tracking
- Nutrition planning
- Social features (following trainers)
- Admin dashboard
- Analytics and reports
- Mobile app
- Video tutorials
- Live class streaming

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console errors (F12)
3. Check server logs in terminal
4. Review database structure

---

**Congratulations!** You now have a fully functional gym website with complete frontend, backend, and database! 🎉

Start the server with `npm start` and visit `http://localhost:3000` to see your website in action.
