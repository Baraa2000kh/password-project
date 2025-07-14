//In Mango De Baslan create a passwords table
const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // One-to-Many
    website: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;
