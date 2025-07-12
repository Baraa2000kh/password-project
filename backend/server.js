const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const passwordsRoutes = require("./routes/passwords");
require("dotenv").config();

const app = express();

// Database connection
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/passwords", passwordsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
