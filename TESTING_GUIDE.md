# 🧪 Complete Testing Guide

## How to Test All Features

---

## 🎬 Getting Started

### Step 1: Start the Server
```bash
cd "c:\Users\kashy\OneDrive\Desktop\GYM PROTO\gym-website"
npm start
```

Expected output:
```
✅ Server running on http://localhost:3000
```

### Step 2: Open in Browser
```
http://localhost:3000
```

---

## 👤 User Registration & Authentication

### Test 1: Register New User
1. Go to `http://localhost:3000`
2. Click **"Login"** in header
3. Click **"Register here"** link
4. Fill in form:
   - Name: `John Fitness`
   - Email: `john@fitness.com`
   - Phone: `9876543210`
   - Age: `25`
   - Password: `password123`
5. Click **"Register"**
6. **Expected:** "Registration successful!" message
7. **Verify:** Check `gym.db` - new user should be in database

### Test 2: Login with New Account
1. Switch back to Login tab
2. Enter credentials:
   - Email: `john@fitness.com`
   - Password: `password123`
3. Click **"Login"**
4. **Expected:** Redirected to dashboard
5. **Verify:** See username in header logout button

### Test 3: Invalid Login
1. Try login with wrong password
2. **Expected:** "Invalid email or password" error
3. Try non-existent email
4. **Expected:** "Invalid email or password" error

### Test 4: Duplicate Email
1. Try registering with same email
2. **Expected:** "Email already registered" error

---

## 📊 Dashboard Features

### Test 5: View User Profile
1. After login, go to **Dashboard**
2. Check "My Profile" tab
3. **Expected:** See your registration info displayed
4. Phone should show: `9876543210`
5. Age should show: `25`

### Test 6: Update Profile
1. In Dashboard profile tab
2. Update phone: `9999999999`
3. Update age: `26`
4. Click **"Update Profile"**
5. **Expected:** Success message
6. Refresh page
7. **Verify:** Updated values are saved

### Test 7: Check Auth UI Update
1. After login, header should show:
   - "Login" button → Hidden
   - "Logout (John Fitness)" button → Visible
2. Click logout
3. **Expected:** Redirected to home page
4. Verify "Login" button is visible again

---

## 💳 Membership System

### Test 8: View All Plans
1. From home, click **"Plans"** in navigation
2. **Expected:** See 3 plans displayed:
   - Basic - ₹999
   - Pro - ₹1999
   - Elite - ₹2999
3. Scroll down
4. **Expected:** See comparison table with features

### Test 9: Purchase Membership (Not Logged In)
1. Logout if logged in
2. Click "Choose Plan" button on any plan
3. **Expected:** Prompted to login first
4. Redirected to login page

### Test 10: Purchase Membership (Logged In)
1. Login with your account
2. Go to **Plans** page
3. Click **"Select Plan"** on "Pro" plan
4. Click **"Confirm"** if prompted
5. **Expected:** Success message
6. Redirected to dashboard

### Test 11: Check Membership Status
1. In Dashboard → "My Profile" tab
2. Check membership section
3. **Expected:** 
   - Plan name: "Pro"
   - Start date: Today
   - End date: 1 month from today
   - Status appears in green

### Test 12: Upgrade Membership
1. In Dashboard → "Membership" tab
2. Click "Select" on "Elite" plan
3. **Expected:** Confirmation dialog
4. Click "Yes"
5. **Expected:** Success message
6. Go to "My Profile" tab
7. **Verify:** Plan changed to "Elite"

---

## 👨‍🏫 Trainers System

### Test 13: View All Trainers
1. From home, click **"Trainers"** in navigation
2. **Expected:** See trainer cards with:
   - Trainer name
   - Specialization (e.g., "Strength Training")
   - Years of experience
   - Photo
   - Bio
   - Contact info
3. **Expected:** 2 trainers displayed (Alex, David)

### Test 14: Trainer Details
1. In trainers page
2. Look for trainer info:
   - **Alex**: Strength Training, 5 years
   - **David**: Fitness Coaching, 7 years
3. Click **"Book Session"** button
4. **Expected:** If not logged in → redirect to login
5. **Expected:** If logged in → confirmation message

---

## 🏋️ Classes System

### Test 15: View All Classes
1. From home, click **"Classes"** in navigation
2. **Expected:** See class cards with:
   - Class name
   - Trainer name
   - Duration (in minutes)
   - Capacity (number of people)
   - Schedule
   - Description
3. **Expected:** 2 classes displayed:
   - Strength Training
   - Cardio Burn

### Test 16: Book a Class
1. Click **"Book Class"** on any class
2. **Expected:** Prompt for booking date
3. Enter date: `2024-03-15`
4. **Expected:** Success message
5. Go to Dashboard → "My Bookings"
6. **Verify:** Booking appears in list

### Test 17: Cancel Booking
1. In Dashboard → "My Bookings" tab
2. Click **"Cancel"** button on a booking
3. **Expected:** Confirmation dialog
4. Click "Yes"
5. **Expected:** Success message
6. **Verify:** Booking is removed or marked as cancelled

### Test 18: Multiple Bookings
1. Book multiple classes
2. Go to "My Bookings" tab
3. **Expected:** All bookings listed with:
   - Class name
   - Trainer name
   - Booking date
   - Status (confirmed/cancelled)

---

## 🏥 BMI Calculator

### Test 19: Calculate BMI (Normal)
1. From home, click **"BMI"** in navigation (or use bmi-calculator.html)
2. Enter:
   - Height: `180` cm
   - Weight: `75` kg
3. Click **"Calculate BMI"**
4. **Expected:** BMI: 23.15
5. **Expected:** Category: "Normal weight"
6. **Expected:** Recommendation displayed

### Test 20: Calculate BMI (Underweight)
1. Enter:
   - Height: `180`
   - Weight: `50`
2. Click **"Calculate"**
3. **Expected:** BMI: 15.43
4. **Expected:** Category: "Underweight"
5. **Expected:** Specific advice for underweight

### Test 21: Calculate BMI (Overweight)
1. Enter:
   - Height: `170`
   - Weight: `85`
2. Click **"Calculate"**
3. **Expected:** BMI: 29.41
4. **Expected:** Category: "Overweight"
5. **Expected:** Recommendation for cardio

### Test 22: Calculate BMI (Obese)
1. Enter:
   - Height: `160`
   - Weight: `100`
2. Click **"Calculate"**
3. **Expected:** BMI: 39.06
4. **Expected:** Category: "Obese"
5. **Expected:** Recommendation for intensive training

---

## 📧 Contact System

### Test 23: Submit Contact Form
1. Click **"Contact"** in navigation
2. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `1234567890`
   - Subject: `Test Message`
   - Message: `This is a test message`
3. Click **"Send Message"**
4. **Expected:** Success message: "Thank you for your message!"
5. **Expected:** Form clears

### Test 24: Contact Form Validation
1. Try submitting with empty name
2. **Expected:** Browser validation prevents submission
3. Try empty email
4. **Expected:** Browser validation error
5. Try empty message
6. **Expected:** Browser validation error

### Test 25: View Contact Info
1. On Contact page
2. **Expected:** See contact information:
   - Address
   - Phone numbers
   - Email addresses
   - Working hours (all days)
3. Verify information display

---

## 🎨 Design & Responsiveness

### Test 26: Responsive Design (Desktop)
1. Open any page on full screen
2. **Expected:** All elements visible and aligned
3. No overlapping text
4. All buttons clickable
5. Navigation works smoothly

### Test 27: Responsive Design (Tablet)
1. Resize browser to 768px width
2. **Expected:** Layout adjusts
3. Navigation might be compact
4. Content still readable
5. All features work

### Test 28: Responsive Design (Mobile)
1. Resize browser to 375px width
2. **Expected:** 
   - Single column layout
   - Navigation optimized
   - Readable fonts
   - Tappable buttons
   - No horizontal scroll

### Test 29: Color Scheme
1. Check all pages
2. **Expected:** Consistent color scheme:
   - Dark background (#0d0d0d)
   - Orange accents (#ff8c00)
   - White text
3. No jarring colors
4. Professional appearance

### Test 30: Hover Effects
1. Hover over buttons
2. **Expected:** Color change or shadow effect
3. Hover over links
4. **Expected:** Visual feedback
5. Hover over cards
6. **Expected:** Lift/shadow effect

---

## 🔐 Security Tests

### Test 31: Password Hashing
1. Register user with password `test12345`
2. Open database (gym.db)
3. **Expected:** Password is hashed (not readable)
4. Try login with password
5. **Expected:** Works (correctly hashed/compared)

### Test 32: Token Expiration
1. Login and get token
2. Token should be in localStorage
3. Wait 7 days (or modify JWT_SECRET to test)
4. **Expected:** Token eventually expires
5. User needs to login again

### Test 33: Protected Routes
1. Try accessing dashboard without logging in
2. Modify URL directly
3. **Expected:** Redirected to login page
4. Cannot access user data without token

---

## 📱 Database Tests

### Test 34: Data Persistence
1. Register user
2. Add membership
3. Book class
4. Refresh browser page
5. **Expected:** All data persists
6. Login again
7. **Expected:** See all saved data

### Test 35: Database File
1. Open File Explorer
2. Navigate to gym-website folder
3. **Expected:** `gym.db` file exists
4. Size increases as you add data
5. File is readable SQLite format

---

## 🔗 API Tests (Advanced)

### Test 36: Test API with curl
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"API User","email":"api@test.com","password":"test123","phone":"123","age":30}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"test123"}'

# Get plans
curl http://localhost:3000/api/memberships/plans

# Get trainers
curl http://localhost:3000/api/trainers

# Get classes
curl http://localhost:3000/api/classes
```

### Test 37: Test Protected Endpoint
```bash
# Get profile (with token)
curl http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ⚡ Performance Tests

### Test 38: Page Load Speed
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Load each page
4. **Expected:** Load time < 1 second
5. All resources load successfully

### Test 39: API Response Time
1. Open Network tab
2. Make an API call (login)
3. **Expected:** Response time < 200ms
4. Response status: 200 OK

---

## 🐛 Error Handling Tests

### Test 40: Invalid Data
1. Try registering with invalid email format
2. **Expected:** Form validation error
3. Try update profile with invalid age
4. **Expected:** Handled gracefully

### Test 41: Network Error
1. Stop the server (Ctrl+C)
2. Try to load web page
3. **Expected:** "Cannot connect" error
4. Restart server
5. **Expected:** Works again

### Test 42: SQL Injection Prevention
1. Try login with email: `admin' OR '1'='1`
2. **Expected:** Not bypassed
3. Normal error message

---

## ✅ Complete Test Checklist

### Authentication (6 tests)
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Duplicate email prevention
- [ ] Header updates on login/logout
- [ ] Password hashing verified

### Membership (5 tests)
- [ ] View all plans
- [ ] Purchase membership
- [ ] Check membership status
- [ ] Upgrade membership
- [ ] Plan comparison works

### Trainers (2 tests)
- [ ] View all trainers
- [ ] Trainer details display

### Classes (4 tests)
- [ ] View all classes
- [ ] Book a class
- [ ] Cancel booking
- [ ] Multiple bookings

### BMI (4 tests)
- [ ] Normal weight calculation
- [ ] Underweight detection
- [ ] Overweight detection
- [ ] Obese detection

### Contact (2 tests)
- [ ] Submit contact form
- [ ] Form validation

### Design (5 tests)
- [ ] Desktop responsive
- [ ] Tablet responsive
- [ ] Mobile responsive
- [ ] Color scheme consistent
- [ ] Hover effects work

### Database (3 tests)
- [ ] Data persistence
- [ ] Database file exists
- [ ] Queries work correctly

### Security (3 tests)
- [ ] Password hashing
- [ ] Protected routes
- [ ] SQL injection prevention

### API (2 tests)
- [ ] Public endpoints work
- [ ] Protected endpoints with token

---

## 🏆 Total Test Coverage

**42 comprehensive tests to verify:**
- ✅ Frontend functionality
- ✅ Backend API
- ✅ Database operations
- ✅ User authentication
- ✅ Business logic
- ✅ Responsive design
- ✅ Security
- ✅ Error handling
- ✅ Performance

---

## 📝 Test Results Template

```
Test #: 1
Feature: User Registration
Status: ✅ PASS / ❌ FAIL
Notes: 

Test #: 2
Feature: Login
Status: ✅ PASS / ❌ FAIL
Notes:

... (continue for all tests)
```

---

## 🎯 Success Criteria

Your website is working correctly if:
- ✅ All 42 tests pass
- ✅ No console errors
- ✅ No network errors
- ✅ Database has data
- ✅ Responsive on all devices
- ✅ Fast page loads
- ✅ Secure authentication

---

## 🚀 Next Steps

After testing:
1. Customize colors and branding
2. Add more trainers/classes
3. Upload real images
4. Set up payment gateway
5. Deploy to production
6. Monitor performance

---

**Happy Testing!** 🎉
