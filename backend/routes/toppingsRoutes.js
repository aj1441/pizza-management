const express = require("express");
const router = express.Router();
const toppingsController = require("../controllers/toppingsController");

// Get all toppings
router.get("/", toppingsController.getAllToppings);

// Create a new topping
router.post("/", toppingsController.createTopping);

// Update an existing topping
router.put("/:id", toppingsController.updateTopping);

// Delete a topping
router.delete("/:id", toppingsController.deleteTopping);

module.exports = router;
