const pizzaService = require('../services/pizzaService');

// Fetch all pizzas
async function getPizzas(req, res) {
  try {
    const pizzas = await pizzaService.getAllPizzas();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new pizza
async function createPizza(req, res) {
  try {
    const newPizza = await pizzaService.createPizza(req.body);
    res.status(201).json(newPizza);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a pizza
async function updatePizza(req, res) {
  try {
    const updatedPizza = await pizzaService.updatePizza(req.params.id, req.body);
    res.json(updatedPizza);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a pizza
async function deletePizza(req, res) {
  try {
    const result = await pizzaService.deletePizza(req.params.id);
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getPizzas, createPizza, updatePizza, deletePizza };
