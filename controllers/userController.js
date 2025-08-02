const db = require('../db');
const bcrypt = require('bcrypt');

//GET/Home
exports.getWelcome = (req, res)=>{
    res.send("Welcome to User Management System")
}

// GET /users
exports.getAllUsers = (req, res) => {
  db.all("SELECT id, name, email FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /user/:id
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT id, name, email FROM users WHERE id = ?", [id], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  });
};

// POST /users
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashed], function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, email });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// PUT /user/:id
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }
  db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated" });
  });
};

// DELETE /user/:id
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM users WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  });
};

// GET /search?name=
exports.searchUsers = (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Provide name to search" });
  db.all("SELECT id, name, email FROM users WHERE name LIKE ?", [`%${name}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// POST /login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });
    res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
  });
};
