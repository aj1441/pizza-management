const express = require("express");
const cors = require("cors");
const toppingsRoutes = require("./routes/toppingsRoutes");
const pizzasRoutes = require("./routes/pizzasRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/toppings", toppingsRoutes);
app.use("/pizzas", pizzasRoutes);

module.exports = app;

