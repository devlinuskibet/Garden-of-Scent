const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const seedProducts = require('./seedData');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'garden-of-scent-secret-key';

// Initialize SQLite tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT
  )`);
  
  db.run(`DROP TABLE IF EXISTS products`); // Recreate for new schema
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    brand TEXT,
    category TEXT,
    price REAL,
    scent_family TEXT,
    top_notes TEXT,
    heart_notes TEXT,
    base_notes TEXT,
    vibe_tag TEXT,
    intensity TEXT,
    occasion TEXT,
    image_url TEXT,
    description TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  // Seed data
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare(`INSERT INTO products 
        (name, brand, category, price, scent_family, top_notes, heart_notes, base_notes, vibe_tag, intensity, occasion, image_url, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

      seedProducts.forEach(product => {
        stmt.run(
          product.name, product.brand, product.category, product.price, 
          product.scent_family, product.top_notes, product.heart_notes, 
          product.base_notes, product.vibe_tag, product.intensity, 
          product.occasion, product.image_url, product.description
        );
      });

      stmt.finalize();
    }
  });
});

app.get('/api/products', (req, res) => {
  const { vibe, intensity, occasion, scent_family } = req.query;
  let query = "SELECT * FROM products";
  const params = [];

  if (vibe || intensity || occasion || scent_family) {
    query += " WHERE 1=1";
    if (vibe) { query += " AND vibe_tag = ?"; params.push(vibe); }
    if (intensity) { query += " AND intensity = ?"; params.push(intensity); }
    if (occasion) { query += " AND occasion = ?"; params.push(occasion); }
    if (scent_family) { query += " AND scent_family = ?"; params.push(scent_family); }
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Product not found" });
    res.json(row);
  });
});

app.post('/api/inquiry', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });

  db.run("INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)", [name, email, message], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, message: "Inquiry received" });
  });
});

// Authentication endpoints
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: "Missing fields" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) return res.status(400).json({ error: "Email already exists" });
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "User created", userId: this.lastID });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

