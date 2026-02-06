const express = require("express");
const client = require("../db");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT id, title, content, date_added FROM library ORDER BY date_added DESC, id DESC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Library fetch error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  const { title, content, date_added } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const result = await client.query(
      "INSERT INTO library (title, content, date_added) VALUES ($1, $2, COALESCE($3, CURRENT_DATE)) RETURNING id, title, content, date_added",
      [title, content, date_added || null]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Library create error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
