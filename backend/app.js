const express = require("express");
const cors = require("cors");
const toppingsRoutes = require("./routes/toppingsRoutes");
const pizzasRoutes = require("./routes/pizzasRoutes");

// Initialize the Express application
const app = express();

// Setup middleware (e.g., JSON parsing, routing)
app.use(cors());
// Setup middleware (e.g., JSON parsing, routing)
app.use(express.json());

// API Routes
// Setup middleware (e.g., JSON parsing, routing)
app.use("/toppings", toppingsRoutes);
// Setup middleware (e.g., JSON parsing, routing)
app.use("/pizzas", pizzasRoutes);

module.exports = app;
