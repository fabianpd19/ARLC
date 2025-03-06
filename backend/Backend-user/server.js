// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'arlc_database',
  password: process.env.DB_PASSWORD || 'Edison2300',
  port: process.env.DB_PORT || 5432,
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'edison2300';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Registration Step 1 Route
app.post('/api/auth/register/step1', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1', 
      [email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya existe' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store preliminary user data
    const result = await pool.query(
      'INSERT INTO users (email, password, registration_step) VALUES ($1, $2, 1) RETURNING *',
      [email, hashedPassword]
    );

    res.status(201).json({ 
      message: 'Registro exitoso',
      userId: result.rows[0].id 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Complete Registration Route
app.post('/api/auth/register/complete', async (req, res) => {
  try {
    const { 
      email, 
      fullName, 
      gender, 
      phoneNumber, 
      birthDate 
    } = req.body;

    // Update user with additional information
    const result = await pool.query(
      `UPDATE users 
       SET full_name = $1, 
           gender = $2, 
           phone_number = $3, 
           birth_date = $4, 
           registration_step = 2 
       WHERE email = $5 
       RETURNING *`,
      [
        fullName, 
        gender, 
        phoneNumber, 
        birthDate ? new Date(birthDate) : null, 
        email
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Registro completado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1', 
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const user = userResult.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email,
        fullName: user.full_name 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Database Initialization Script
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        gender VARCHAR(50),
        phone_number VARCHAR(50),
        birth_date DATE,
        registration_step INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Base de datos inicializada exitosamente');
  } catch (error) {
    console.error('Error de base de datos', error);
  }
};

// Start Server
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;