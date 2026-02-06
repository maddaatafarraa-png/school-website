const express = require("express");
const client = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT id, name, position, bio FROM staff ORDER BY id"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Staff fetch error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;