// API Base URL
const API_BASE = 'http://localhost:3000/api';

// Auth Functions
async function registerUser(name, email, password, phone, age) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, phone, age })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    // Store token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// Get user token
function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}

function isLoggedIn() {
  return !!getToken();
}

// User Profile Functions
async function getUserProfile() {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const response = await fetch(`${API_BASE}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
}

async function updateUserProfile(name, phone, age) {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const response = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone, age })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
}

// Membership Functions
async function getMembershipPlans() {
  try {
    const response = await fetch(`${API_BASE}/memberships/plans`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Get plans error:', error);
    throw error;
  }
}

async function purchaseMembership(planName) {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const response = await fetch(`${API_BASE}/memberships/purchase`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plan_name: planName })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Purchase membership error:', error);
    throw error;
  }
}

// Trainer Functions
async function getTrainers() {
  try {
    const response = await fetch(`${API_BASE}/trainers`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Get trainers error:', error);
    throw error;
  }
}

async function getTrainerDetails(id) {
  try {
    const response = await fetch(`${API_BASE}/trainers/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Get trainer error:', error);
    throw error;
  }
}

// Class Functions
async function getClasses() {
  try {
    const response = await fetch(`${API_BASE}/classes`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Get classes error:', error);
    throw error;
  }
}

async function getClassDetails(id) {
  try {
    const response = await fetch(`${API_BASE}/classes/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Get class error:', error);
    throw error;
  }
}

// Booking Functions
async function bookClass(classId, bookingDate) {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ class_id: classId, booking_date: bookingDate })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Booking error:', error);
    throw error;
  }
}

async function getUserBookings() {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const response = await fetch(`${API_BASE}/bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Get bookings error:', error);
    throw error;
  }
}

async function cancelBooking(bookingId) {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Cancel booking error:', error);
    throw error;
  }
}

// BMI Calculator
async function calculateBMI(height, weight) {
  try {
    const response = await fetch(`${API_BASE}/bmi/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ height, weight })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('BMI calculation error:', error);
    throw error;
  }
}

// Contact Form
async function submitContact(name, email, phone, message) {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, message })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Contact submission error:', error);
    throw error;
  }
}

// UI Helper Functions
function showMessage(message, type = 'success') {
  alert(message);
}

function updateAuthUI() {
  const authLink = document.getElementById('authLink');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (isLoggedIn()) {
    const user = getUser();
    authLink.style.display = 'none';
    logoutBtn.style.display = 'block';
    logoutBtn.textContent = `Logout (${user.name})`;
  } else {
    authLink.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
}

// Call this on page load
document.addEventListener('DOMContentLoaded', updateAuthUI);
