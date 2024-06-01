const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use((req, res, next) => {
  console.log(`Pod hit by request from: ${req.ip}`);
  next();
});

app.get("/records", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM records");
    console.log(`Hello from the pod which got hit from : ${req}`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
