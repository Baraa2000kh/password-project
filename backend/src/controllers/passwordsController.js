const Password = require("../models/Password");

//add new password to user and websit name
exports.addPassword = async (req, res) => {
  const { userId, website, password } = req.body;

  if (!userId || !website || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
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
};

//get all password user and websit neme
exports.getPasswordsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const passwords = await Password.find({ userId });
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ message: "A server error occurred." });
  }
};
