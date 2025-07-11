/*
Receives the email and password.
Searches for the user in the database.
Uses bcrypt.compare to compare the entered password with the encrypted one.
 */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "The login data is incorrect." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid login data" });

    return res
      .status(200)
      .json({ message: "You have successfully logged in." });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "A server error occurred." });
  }
});

module.exports = router;
