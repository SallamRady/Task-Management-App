// import my packages
const express = require("express");
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/task.route");
const mongoose = require("mongoose");
require('dotenv').config();
// const bodyParser = require('body-parser');

//Helpers variables
const PORT = process.env.PORT || 9000;

// create server application.
const app = express();

// configration our server app.
// app.use(bodyParser.json());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


//Helper middleware to add general setting
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

//handle routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

//error middleware
app.use((error, req, res, next) => {
    console.log("Error :", error);
    let status = error.statusCode || 500;
    let message = error.message;
    res.status(status).json({ message: message, error: error });
});

// connect with DB
mongoose
    .connect("mongodb://127.0.0.1:27017/task-management-app")
    .then(() => {
        console.log("connected! server running on port :", PORT);
        app.listen(PORT);
    })
    .catch((err) => {
        console.log("mongoose error in DB connection :", err);
    });
