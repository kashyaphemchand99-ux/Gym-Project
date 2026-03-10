# 📁 File Structure & Description

## Project Directory Overview

```
gym-website/
├── 📄 server.js                  ← Main Express server & all API routes
├── 📄 database.js                ← SQLite database setup & schema
├── 📄 package.json               ← NPM dependencies
├── 📄 .env                       ← Environment configuration
├── 📄 gym.db                     ← SQLite database (auto-created)
│
├── 📄 README.md                  ← Full documentation
├── 📄 QUICK_START.md             ← 30-second setup guide
├── 📄 API_DOCUMENTATION.md       ← All API endpoints with examples
├── 📄 IMPLEMENTATION_SUMMARY.md  ← What's been built
│
└── gym-website/                  ← Frontend folder
    ├── 📄 index.html             ← Home page
    ├── 📄 login.html             ← Login & registration
    ├── 📄 dashboard.html         ← User dashboard
    ├── 📄 plans.html             ← Membership plans
    ├── 📄 trainers.html          ← Trainers directory
    ├── 📄 classes.html           ← Classes list
    ├── 📄 contact.html           ← Contact form
    ├── 📄 bmi-calculator.html    ← BMI calculator
    ├── 📄 style.css              ← All styling
    │
    └── js/                       ← JavaScript files
        ├── 📄 api.js             ← API functions (20+ functions)
        └── 📄 home.js            ← Home page functions
```

---

## 📝 File Details

### Backend Files

#### `server.js` (299 lines)
**The main server file with all API endpoints**

Key sections:
- Express.js setup & middleware
- JWT authentication
- Auth routes (register, login)
- User profile routes
- Membership routes
- Trainer routes
- Class routes
- Booking routes
- Utility routes (BMI, contact)
- Error handling
- Server startup

Run with: `npm start` or `node server.js`

---

#### `database.js` (140 lines)
**Database initialization and schema**

What it does:
- Connects to SQLite database (gym.db)
- Creates 5 tables if they don't exist:
  - users
  - trainers
  - classes
  - bookings
  - membership_plans
- Adds sample data (trainers, classes, plans)
- Exports database connection

Tables created:
```
users (id, name, email, password, phone, age, membership info)
trainers (id, name, specialization, experience, contact info)
classes (id, name, trainer_id, capacity, duration, schedule)
bookings (id, user_id, class_id, booking_date, status)
membership_plans (id, name, price, duration, features)
```

---

#### `package.json`
**NPM package configuration**

Dependencies installed:
- express: Web server framework
- sqlite3: Database
- cors: Cross-origin requests
- bcryptjs: Password hashing
- jsonwebtoken: JWT tokens
- dotenv: Environment variables

Scripts:
- `npm start`: Run server
- `npm install`: Install dependencies

---

#### `.env`
**Environment variables**

```
PORT=3000
NODE_ENV=production
JWT_SECRET=gym_website_secret_key_2024
```

Can be modified for different environments.

---

### Frontend Files (in gym-website/ folder)

#### `index.html` (200+ lines)
**Home page**

Sections:
- Navigation header with links
- Hero section with call-to-action
- About us with 6 feature cards
- Statistics section (members, trainers, classes, satisfaction)
- Membership plans preview
- Footer with links and info

Loads: `js/api.js` and `js/home.js`

---

#### `login.html` (170+ lines)
**Login & Registration page**

Features:
- Two forms in tabs (Login / Register)
- Email & password validation
- Phone and age for registration
- Real API integration
- Info cards about gym benefits
- Responsive layout

Functionality:
- Register new users
- Login existing users
- Token-based authentication
- Error handling

---

#### `dashboard.html` (280+ lines)
**User dashboard (requires login)**

Sections:
- Sidebar navigation with 4 tabs
- Profile tab with user info and edit form
- Membership tab to view/upgrade plans
- Bookings tab to view class reservations
- Settings tab for account management

Features:
- View profile information
- Update phone and age
- View current membership status
- Upgrade to different plans
- View all class bookings
- Cancel bookings
- Logout button

Protected: Requires JWT token

---

#### `plans.html` (150+ lines)
**Membership plans page**

Shows:
- All 3 membership plans (Basic, Pro, Elite)
- Plan comparison table with features
- FAQ section
- Purchase buttons for each plan
- Detailed feature descriptions

Features:
- Side-by-side plan comparison
- Pricing information
- Features list
- Purchase confirmation

---

#### `trainers.html` (150+ lines)
**Trainers directory page**

Shows:
- All trainers with photos
- Specialization
- Years of experience
- Contact information
- Bio/description
- Book session buttons

Features:
- Responsive grid layout
- Trainer cards with images
- Why choose our trainers section
- Contact for booking

---

#### `classes.html` (140+ lines)
**Classes list and booking page**

Shows:
- All available classes
- Class name and description
- Assigned trainer
- Duration and capacity
- Schedule
- Training intensity level

Features:
- Class cards with details
- Schedule information
- Trainer information
- Booking functionality
- Class schedule section

---

#### `contact.html` (160+ lines)
**Contact us page**

Features:
- Contact form (name, email, phone, message)
- Contact information display
- Working hours table
- Address section
- Phone numbers
- Email addresses
- Social media links

Sections:
- Contact form (left)
- Contact info cards (right)
- Working hours grid
- Footer

---

#### `bmi-calculator.html` (160+ lines)
**BMI Calculator and health information**

Features:
- Height and weight input
- Real-time BMI calculation
- Category classification
- Personalized recommendations
- Health information display

Shows:
- Your BMI result
- Category (underweight/normal/overweight/obese)
- Specific recommendations for your category
- Comparison table of all categories
- What BMI means

---

#### `style.css` (650+ lines)
**Complete styling for entire website**

Includes:
- CSS variables for colors
- Grid layouts for responsiveness
- Gradient backgrounds
- Hover effects & transitions
- Responsive media queries
- Component styling:
  - Header & navigation
  - Hero section
  - Cards & grids
  - Forms & inputs
  - Buttons
  - Footer
  - Dashboard layouts
  - Responsive design

Color scheme:
- Dark background (#0d0d0d, #1a1a1a, #2d2d2d)
- Orange accent (#ff8c00, #ffaa33)
- White text (#fff, #ccc, #aaa)

---

### JavaScript Files (in gym-website/js/ folder)

#### `js/api.js` (350+ lines)
**All API communication functions**

Authentication functions:
- registerUser()
- loginUser()
- logoutUser()
- getToken()
- getUser()
- isLoggedIn()

User profile functions:
- getUserProfile()
- updateUserProfile()

Membership functions:
- getMembershipPlans()
- purchaseMembership()

Trainer functions:
- getTrainers()
- getTrainerDetails()

Class functions:
- getClasses()
- getClassDetails()

Booking functions:
- bookClass()
- getUserBookings()
- cancelBooking()

Utility functions:
- calculateBMI()
- submitContact()
- showMessage()
- updateAuthUI()

Base URL: `http://localhost:3000/api`

---

#### `js/home.js` (50+ lines)
**Home page specific functions**

Functions:
- displayPlans() - Load and show plans
- handleJoinClick() - Handle "Join Now" button
- handlePlanClick() - Handle plan selection
- purchasePlanModal() - Plan purchase confirmation

Loads plans on page load from API.

---

### Configuration & Documentation Files

#### `README.md`
Complete project documentation including:
- Features list
- Installation steps
- API endpoints
- Database schema
- Troubleshooting
- Deployment guide
- Learning resources

---

#### `QUICK_START.md`
Quick setup guide for impatient users:
- 3-step installation
- Where to get started
- Test scenarios
- Quick reference

---

#### `API_DOCUMENTATION.md`
Complete API reference with:
- All 20+ endpoints
- Request/response examples
- curl command examples
- Error handling
- Status codes
- Testing guide

---

#### `IMPLEMENTATION_SUMMARY.md`
Overview of what's been built:
- Feature checklist
- Statistics
- File count
- Lines of code
- Quality checklist

---

## 🔄 How Files Work Together

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │          HTML Pages (index.html, etc.)             │ │
│  │                                                    │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │         style.css (Styling)                  │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │                                                    │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │   JavaScript (api.js, home.js)               │ │ │
│  │  │   - API calls                                │ │ │
│  │  │   - Event handling                           │ │ │
│  │  │   - DOM manipulation                         │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTP
┌─────────────────────────────────────────────────────────┐
│                  SERVER / BACKEND                        │
│  ┌────────────────────────────────────────────────────┐ │
│  │        Express.js (server.js)                      │ │
│  │  - API Routes                                      │ │
│  │  - Authentication                                 │ │
│  │  - Request handling                               │ │
│  └────────────────────────────────────────────────────┘ │
│                          ↕                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │      SQLite Database (database.js → gym.db)       │ │
│  │  - Users table                                     │ │
│  │  - Trainers table                                 │ │
│  │  - Classes table                                  │ │
│  │  - Bookings table                                 │ │
│  │  - Membership plans table                         │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 File Usage Sequence

### When starting the server:
1. `npm start` runs `server.js`
2. `server.js` imports `database.js`
3. `database.js` creates/connects to `gym.db`
4. `server.js` starts listening on port 3000
5. `.env` provides configuration

### When user opens website:
1. Browser loads `index.html` (or other HTML)
2. `style.css` applies styling
3. `js/api.js` is loaded (available globally)
4. `js/home.js` or other JS files run
5. JavaScript makes API calls to `server.js`
6. Server queries `gym.db` database
7. Server sends response to browser
8. JavaScript updates the page

---

## 📊 File Statistics

| File | Type | Lines | Purpose |
|------|------|-------|---------|
| server.js | Backend | 299 | Express server & APIs |
| database.js | Backend | 140 | Database schema |
| index.html | Frontend | 200 | Home page |
| login.html | Frontend | 170 | Auth page |
| dashboard.html | Frontend | 280 | User dashboard |
| plans.html | Frontend | 150 | Membership plans |
| trainers.html | Frontend | 150 | Trainers page |
| classes.html | Frontend | 140 | Classes page |
| contact.html | Frontend | 160 | Contact page |
| bmi-calculator.html | Frontend | 160 | BMI page |
| style.css | Frontend | 650 | Styling |
| api.js | Frontend | 350 | API functions |
| home.js | Frontend | 50 | Home functions |
| ** TOTAL ** | ** ** | **3300+** | ** ** |

---

## ✨ Summary

Each file has a specific purpose:
- **server.js** - The heart of the backend
- **database.js** - Where data is stored
- **HTML files** - What users see
- **style.css** - How it looks
- **JavaScript files** - How it works
- **Config files** - Setup & documentation

All files work together to create a complete, functional gym website! 

🎉 **Start exploring and customize as needed!**
