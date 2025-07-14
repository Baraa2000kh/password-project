const express = require("express");
const router = express.Router();
const {
  addPassword,
  getPasswordsByUser,
} = require("../controllers/passwordsController");

//path add new password user
router.post("/", addPassword);
//path get all password user
router.get("/:userId", getPasswordsByUser);

module.exports = router;
