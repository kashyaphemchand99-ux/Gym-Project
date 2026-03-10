# ⚡ Quick Start Guide

## 🏃 Get Running in 30 Seconds

### 1. Install Dependencies (first time only)
```bash
cd "c:\Users\kashy\OneDrive\Desktop\GYM PROTO\gym-website"
npm install
```

### 2. Start the Server
```bash
npm start
```

You should see:
```
✅ Server running on http://localhost:3000
```

### 3. Open Your Browser
Go to: **http://localhost:3000**

---

## 🧪 Test the Website

### Create an Account
1. Click "Login" in the top right
2. Click "Register here"
3. Fill in the form and register
4. Login with your new account
5. You can now access the dashboard!

### Try These Features
- ✅ **View Plans** - See all membership plans
- ✅ **Buy Membership** - Purchase a plan from dashboard
- ✅ **Browse Trainers** - View trainer profiles
- ✅ **Book Classes** - Reserve fitness classes
- ✅ **Calculate BMI** - Get your BMI
- ✅ **Contact Us** - Send a message

---

## 📂 File Structure

```
✓ server.js           → Backend server
✓ database.js         → Database setup
✓ gym-website/*.html  → Frontend pages
✓ gym-website/js/     → JavaScript files
✓ gym.db              → Database (auto-created)
```

---

## 🛑 Stop the Server

Press `Ctrl+C` in the terminal to stop the server.

---

## ⚠️ If Port 3000 is Busy

Change the port in `server.js`:
```javascript
const PORT = 3001;  // Change to any available port
```

---

## 📱 Access Points

- **Frontend**: http://localhost:3000
- **API Base**: http://localhost:3000/api
- **Specific endpoints**: http://localhost:3000/api/trainers, etc.

---

## ✨ Features Available

✅ User Registration & Login
✅ User Dashboard
✅ Membership Plans & Purchase
✅ Trainers Directory
✅ Class Booking System
✅ BMI Calculator
✅ Contact Form
✅ JWT Authentication
✅ SQLite Database
✅ Responsive Design

---

## 🔐 Default Test Users

Register your own account! The system saves everything to the database.

---

**You're all set! Enjoy your gym website!** 💪🎉
