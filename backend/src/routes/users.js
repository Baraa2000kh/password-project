const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/usersController");
//path get all users in wibset to Admin
router.get("/", getAllUsers);

module.exports = router;
