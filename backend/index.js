require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = require("./db");

const authRouter = require("./routes/auth");
const announcementsRouter = require("./routes/announcements");
const libraryRouter = require("./routes/library");
const staffRouter = require("./routes/staff");

app.use("/api/auth", authRouter);
app.use("/api/announcements", announcementsRouter);
app.use("/api/library", libraryRouter);
app.use("/api/staff", staffRouter);

client
  .query("SELECT NOW()")
  .then((res) => {
    console.log("DB connected, time:", res.rows[0]);
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});