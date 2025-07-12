const express = require("express");
const router = express.Router();
const Password = require("../models/Password");

router.post("/", async (req, res) => {
  const { userId, website, password } = req.body;

  if (!userId || !website || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //Save New Password in the MongooDB

    const newPassword = new Password({
      userId,
      website,
      password,
    });
    await newPassword.save();

    res.status(201).json(newPassword);
  } catch (err) {
    res.status(500).json({ message: "A server error occurred." });
  }
});

// Get Passwords User

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const passwords = await Password.find({ userId });
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ message: "A server error occurred." });
  }
});

module.exports = router;
