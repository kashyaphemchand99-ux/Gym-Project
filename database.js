const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'gym.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database');
});

// Initialize database tables
const initDatabase = () => {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT,
        age INTEGER,
        membership_plan TEXT DEFAULT 'none',
        membership_start_date TEXT,
        membership_end_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Trainers table
    db.run(`
      CREATE TABLE IF NOT EXISTS trainers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialization TEXT NOT NULL,
        experience INTEGER,
        phone TEXT,
        email TEXT UNIQUE NOT NULL,
        image_url TEXT,
        bio TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Classes table
    db.run(`
      CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        trainer_id INTEGER,
        capacity INTEGER DEFAULT 20,
        duration INTEGER DEFAULT 60,
        schedule TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (trainer_id) REFERENCES trainers(id)
      )
    `);

    // Bookings table
    db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        class_id INTEGER NOT NULL,
        booking_date TEXT NOT NULL,
        status TEXT DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (class_id) REFERENCES classes(id)
      )
    `);

    // Membership Plans table
    db.run(`
      CREATE TABLE IF NOT EXISTS membership_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        price REAL NOT NULL,
        duration_months INTEGER DEFAULT 1,
        features TEXT,
        description TEXT
      )
    `);

    // Insert default membership plans
    db.run(`
      INSERT OR IGNORE INTO membership_plans (name, price, duration_months, features, description)
      VALUES ('Basic', 999, 1, 'Gym access,Cardio zone', 'Basic gym membership for one month')
    `);

    db.run(`
      INSERT OR IGNORE INTO membership_plans (name, price, duration_months, features, description)
      VALUES ('Pro', 1999, 1, 'Gym access,Personal trainer,Classes', 'Professional membership with trainer access')
    `);

    db.run(`
      INSERT OR IGNORE INTO membership_plans (name, price, duration_months, features, description)
      VALUES ('Elite', 2999, 1, 'Gym access,Personal trainer,All classes,Diet plan', 'Premium membership with all features')
    `);

    // Insert sample trainers
    db.run(`
      INSERT OR IGNORE INTO trainers (name, specialization, experience, phone, email, image_url, bio)
      VALUES ('Alex', 'Strength Training', 5, '9876543210', 'alex@elitefit.com', 
              'https://images.unsplash.com/photo-1605296867424-35fc25c9212a', 'Expert strength trainer with 5 years experience')
    `);

    db.run(`
      INSERT OR IGNORE INTO trainers (name, specialization, experience, phone, email, image_url, bio)
      VALUES ('David', 'Fitness Coaching', 7, '9876543211', 'david@elitefit.com',
              'https://images.unsplash.com/photo-1599058917212-d750089bc07e', 'Certified fitness coach specializing in weight loss')
    `);

    // Insert sample classes
    db.run(`
      INSERT OR IGNORE INTO classes (name, trainer_id, capacity, duration, schedule, description)
      VALUES ('Strength Training', 1, 20, 60, 'Mon, Wed, Fri 6AM', 'Build muscle strength with advanced techniques')
    `);

    db.run(`
      INSERT OR IGNORE INTO classes (name, trainer_id, capacity, duration, schedule, description)
      VALUES ('Cardio Burn', 2, 25, 45, 'Tue, Thu, Sat 7AM', 'High-intensity cardio for fat burning')
    `);
  });
};

initDatabase();

module.exports = db;
