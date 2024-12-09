const express = require("express");
// Initialize the router for handling toppings-related routes
const router = express.Router();
const toppingsController = require("../controllers/toppingsController");

// Get all toppings
// Define a GET route to fetch toppings
router.get("/", toppingsController.getAllToppings);

// Create a new topping
// Define a POST route to create a new topping
router.post("/", toppingsController.createTopping);

// Update an existing topping
// Define a PUT route to update a topping
router.put("/:id", toppingsController.updateTopping);

// Delete a topping
// Define a DELETE route to remove a topping
router.delete("/:id", toppingsController.deleteTopping);

module.exports = router;