//Register a new user in Database and check that all fields are correct.
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { name, email, password, password_confirmation } = req.body;

  if (!name || !email || !password || !password_confirmation)
    return res.status(400).json({ message: "All fields are required" });

  if (password !== password_confirmation)
    return res.status(400).json({ message: "Passwords do not match" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(422).json({ message: "Email already taken" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.status(200).json({ message: "User registered successfully" });
});

module.exports = router;
