const toppingService = require('../services/toppingService');

// Fetch all toppings
async function getToppings(req, res) {
  try {
    const toppings = await toppingService.getAllToppings(); // Delegate to service
    res.json(toppings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new topping
async function createTopping(req, res) {
  try {
    const newTopping = await toppingService.createTopping(req.body); // Delegate to service
    res.status(201).json(newTopping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a topping
async function updateTopping(req, res) {
  try {
    const updatedTopping = await toppingService.updateTopping(req.params.id, req.body); // Delegate to service
    res.json(updatedTopping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a topping
async function deleteTopping(req, res) {
  try {
    const result = await toppingService.deleteTopping(req.params.id); // Delegate to service
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getToppings, createTopping, updateTopping, deleteTopping };
