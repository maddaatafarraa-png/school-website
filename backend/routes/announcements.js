const express = require("express");
const client = require("../db");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT id, title, content, date FROM announcements ORDER BY date DESC, id DESC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Announcements fetch error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  const { title, content, date } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const result = await client.query(
      "INSERT INTO announcements (title, content, date) VALUES ($1, $2, COALESCE($3, CURRENT_DATE)) RETURNING id, title, content, date",
      [title, content, date || null]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Announcement create error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await client.query("DELETE FROM announcements WHERE id = $1", [id]);
    return res.status(204).send();
  } catch (err) {
    console.error("Announcement delete error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
