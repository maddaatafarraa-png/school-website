const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client = require("../db");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const result = await client.query(
      "SELECT id, email, password, role, name FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT secret not configured" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT secret not configured" });
  }

  try {
    const existing = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userRole = role || "student";

    const result = await client.query(
      "INSERT INTO users (email, name, password, role) VALUES ($1, $2, $3, $4) RETURNING id, role",
      [email, name || null, hashedPassword, userRole]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ token });
  } catch (err) {
    console.error("Signup error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
