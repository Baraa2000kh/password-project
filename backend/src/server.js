const passwordsRoutes = require("./routes/passwords");
const authRoutes = require("./routes/authRoutes");
const users = require("./routes/users");
const express = require("express");
const connectDB = require("./db");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Database connection
connectDB();
//Enable Middleware, connect frountend to server.
app.use(cors());
// understand the JSON data in request
app.use(express.json());
app.use("/api/passwords", passwordsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", users);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
