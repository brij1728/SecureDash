// router.ts
import express from 'express';
const router = express.Router();

// Home page route
router.get("/", (req, res) => {
  res.send(`<h2>Welcome to the Home Page</h2>`);
});

// About page route
router.get("/about", (req, res) => {
  res.send(`<h2>About Us</h2>`);
});

// POST request route
router.post("/submit", (req, res) => {
  const { name } = req.body;
  res.send(`<h2>Hello, ${name}! Your form was submitted successfully.</h2>`);
});

export default router;
