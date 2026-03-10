const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'gym_website_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'gym-website')));

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ==================== AUTH ENDPOINTS ====================

// Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, age } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  db.run(
    `INSERT INTO users (name, email, password, phone, age) VALUES (?, ?, ?, ?, ?)`,
    [name, email, hashedPassword, phone, age],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      res.json({ message: 'Registration successful', userId: this.lastID });
    }
  );
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        membership_plan: user.membership_plan
      }
    });
  });
});

// ==================== USER ENDPOINTS ====================

// Get user profile
app.get('/api/user/profile', verifyToken, (req, res) => {
  db.get(`SELECT id, name, email, phone, age, membership_plan, membership_start_date, membership_end_date FROM users WHERE id = ?`,
    [req.user.id],
    (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    }
  );
});

// Update user profile
app.put('/api/user/profile', verifyToken, (req, res) => {
  const { name, phone, age } = req.body;

  db.run(
    `UPDATE users SET name = ?, phone = ?, age = ? WHERE id = ?`,
    [name, phone, age, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Profile updated successfully' });
    }
  );
});

// ==================== MEMBERSHIP ENDPOINTS ====================

// Get all membership plans
app.get('/api/memberships/plans', (req, res) => {
  db.all(`SELECT * FROM membership_plans`, (err, plans) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(plans);
  });
});

// Purchase membership
app.post('/api/memberships/purchase', verifyToken, (req, res) => {
  const { plan_name } = req.body;

  db.get(`SELECT * FROM membership_plans WHERE name = ?`, [plan_name], (err, plan) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + plan.duration_months);

    db.run(
      `UPDATE users SET membership_plan = ?, membership_start_date = ?, membership_end_date = ? WHERE id = ?`,
      [plan_name, startDate.toISOString(), endDate.toISOString(), req.user.id],
      (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({
          message: 'Membership purchased successfully',
          plan: plan_name,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          price: plan.price
        });
      }
    );
  });
});

// ==================== TRAINER ENDPOINTS ====================

// Get all trainers
app.get('/api/trainers', (req, res) => {
  db.all(`SELECT * FROM trainers`, (err, trainers) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(trainers);
  });
});

// Get trainer details
app.get('/api/trainers/:id', (req, res) => {
  db.get(`SELECT * FROM trainers WHERE id = ?`, [req.params.id], (err, trainer) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    res.json(trainer);
  });
});

// ==================== CLASS ENDPOINTS ====================

// Get all classes
app.get('/api/classes', (req, res) => {
  db.all(
    `SELECT c.*, t.name as trainer_name FROM classes c LEFT JOIN trainers t ON c.trainer_id = t.id`,
    (err, classes) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(classes);
    }
  );
});

// Get class details
app.get('/api/classes/:id', (req, res) => {
  db.get(
    `SELECT c.*, t.name as trainer_name FROM classes c LEFT JOIN trainers t ON c.trainer_id = t.id WHERE c.id = ?`,
    [req.params.id],
    (err, class_info) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!class_info) return res.status(404).json({ error: 'Class not found' });
      res.json(class_info);
    }
  );
});

// ==================== BOOKING ENDPOINTS ====================

// Book a class
app.post('/api/bookings', verifyToken, (req, res) => {
  const { class_id, booking_date } = req.body;

  if (!class_id || !booking_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO bookings (user_id, class_id, booking_date) VALUES (?, ?, ?)`,
    [req.user.id, class_id, booking_date],
    function (err) {
      if (err) return res.status(500).json({ error: 'Booking failed' });
      res.json({ message: 'Booking confirmed', bookingId: this.lastID });
    }
  );
});

// Get user bookings
app.get('/api/bookings', verifyToken, (req, res) => {
  db.all(
    `SELECT b.*, c.name as class_name, t.name as trainer_name 
     FROM bookings b 
     LEFT JOIN classes c ON b.class_id = c.id 
     LEFT JOIN trainers t ON c.trainer_id = t.id 
     WHERE b.user_id = ?`,
    [req.user.id],
    (err, bookings) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(bookings);
    }
  );
});

// Cancel booking
app.delete('/api/bookings/:id', verifyToken, (req, res) => {
  db.run(
    `UPDATE bookings SET status = 'cancelled' WHERE id = ? AND user_id = ?`,
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Cancellation failed' });
      res.json({ message: 'Booking cancelled' });
    }
  );
});

// ==================== BMI CALCULATOR ====================

app.post('/api/bmi/calculate', (req, res) => {
  const { height, weight } = req.body;

  if (!height || !weight) {
    return res.status(400).json({ error: 'Height and weight required' });
  }

  const h = height / 100;
  const bmi = weight / (h * h);
  let category = '';

  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  res.json({ bmi: bmi.toFixed(2), category: category });
});

// ==================== CONTACT ENDPOINT ====================

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // In production, you would save this to database or send email
  console.log('Contact form submission:', { name, email, phone, message });
  res.json({ message: 'Message received! We will contact you soon.' });
});

// ==================== ROOT ROUTE ====================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'gym-website', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n===========================================`);
  console.log(`   EliteFit Gym Website - Server Running`);
  console.log(`===========================================`);
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api/*`);
  console.log(`\nPress Ctrl+C to stop the server\n`);
});
