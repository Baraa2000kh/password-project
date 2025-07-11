//Express library, which is the basis for creating the server and handling requests (e.g. POST, GET, DELETE...).
const express = require("express");
//Cors library allows communication between front-end and back-end.
const cors = require("cors");
//This calls the database connection file. This file contains the code that connects to the MongoDB database using Mongoose.
const connectDB = require("./db");

//Here the files containing the paths are called.

const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");

//This allows you to read data from an .env file.
require("dotenv").config();
//app is the Express server itself
const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
connectDB();

//To allow the frontend to communicate with the backend and to convert the request body from JSON to a JavaScript object.
app.use(cors());
app.use(express.json());

//Middleware
app.use("/api", registerRoutes);
app.use("/api/login", loginRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
