const express = require("express");
// Initialize the router for handling pizzas-related routes
const router = express.Router();
const pizzasController = require("../controllers/pizzasController");

// Get all pizzas
// Define a GET route to fetch pizzas
router.get("/", pizzasController.getAllPizzas);

// Create a new pizza
// Define a POST route to create a new pizza
router.post("/", pizzasController.createPizza);

// Update an existing pizza
// Define a PUT route to update a pizza
router.put("/:id", pizzasController.updatePizza);

// Delete a pizza
// Define a DELETE route to remove a pizza
router.delete("/:id", pizzasController.deletePizza);

module.exports = router;