const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
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
        (name, price, scent_family, top_notes, heart_notes, base_notes, vibe_tag, intensity, occasion, image_url, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

      // FLORAL
      stmt.run("Midnight Bloom", 185.00, "Floral", "Bergamot, Pink Pepper", "Damask Rose, Iris", "Oud, Patchouli, Vanilla", "Romantic", "Bold", "Evening", "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800", "A dark, sensual blend that captures the essence of a midnight garden.");
      stmt.run("Rose Elixir", 165.00, "Floral", "Lychee, Peach", "Bulgarian Rose, Peony", "White Musk, Cedar", "Romantic", "Medium", "Date Night", "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=800", "A luminous, tender floral that blooms like a bouquet in the morning sun.");

      // WOODY
      stmt.run("Royal Oud", 210.00, "Woody", "Saffron, Nutmeg", "Agarwood (Oud), Leather", "Amber, Musk, Sandalwood", "Bold", "Strong", "Formal", "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800", "An exotic, deeply resinous oriental fragrance for the sophisticated.");
      stmt.run("Cedar Noir", 155.00, "Woody", "Black Pepper, Cardamom", "Vetiver, Cedarwood", "Tobacco, Dark Amber", "Bold", "Strong", "Evening", "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800", "A smoky, brooding cedar accord that commands every room it enters.");

      // FRESH
      stmt.run("Azure Mist", 145.00, "Fresh", "Sea Salt, Grapefruit", "Sage, Ambrette Seed", "Seaweed, Driftwood", "Minimalist", "Light", "Daily", "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800", "Clean, airy, and revitalizing like a morning breeze by the ocean.");
      stmt.run("Citrus Grove", 130.00, "Fresh", "Sicilian Lemon, Neroli", "Green Tea, Mint", "Vetiver, White Musk", "Minimalist", "Light", "Daily", "https://images.unsplash.com/photo-1549387219-75c78a4df365?auto=format&fit=crop&q=80&w=800", "A vivid burst of sunlit citrus groves and cooling green tea.");

      // ORIENTAL
      stmt.run("Velvet Amber", 165.00, "Oriental", "Cinnamon, Honey", "Amber, Labdanum", "Vanilla, Tonka Bean", "Warm", "Medium", "Date Night", "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?auto=format&fit=crop&q=80&w=800", "A golden, glowing scent that wraps you in rich, balsamic warmth.");
      stmt.run("Santal Mystique", 195.00, "Oriental", "Pink Pepper, Coriander", "Sandalwood, Rose Absolute", "Musk, Benzoin, Vanilla", "Warm", "Medium", "Formal", "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800", "A creamy, woody oriental with a mystical sandalwood heart.");

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

