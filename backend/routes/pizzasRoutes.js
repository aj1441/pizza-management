const express = require("express");
const router = express.Router();
const pizzasController = require("../controllers/pizzasController");

// Get all pizzas
router.get("/", pizzasController.getAllPizzas);

// Create a new pizza
router.post("/", pizzasController.createPizza);

// Update an existing pizza
router.put("/:id", pizzasController.updatePizza);

// Delete a pizza
router.delete("/:id", pizzasController.deletePizza);

module.exports = router;
