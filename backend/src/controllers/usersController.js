const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    // get all user to dashbord page admin
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "A server error occurred" });
  }
};
