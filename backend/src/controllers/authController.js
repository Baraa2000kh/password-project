const User = require("../models/User");
const bcrypt = require("bcrypt");

// regester new user
exports.registerUser = async (req, res) => {
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
};

// Login account user
exports.loginUser = async (req, res) => {
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

    return res.status(200).json({
      message: "You have successfully logged in.",
      userId: user._id,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "A server error occurred." });
  }
};
