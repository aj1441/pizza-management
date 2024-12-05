const pool = require("../database/db");

// Get all pizzas
const getAllPizzas = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.name, ARRAY_AGG(t.name) AS toppings
       FROM pizzas p
       LEFT JOIN pizza_toppings pt ON p.id = pt.pizza_id
       LEFT JOIN toppings t ON pt.topping_id = t.id
       GROUP BY p.id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pizzas" });
  }
};

// Create a new pizza
const createPizza = async (req, res) => {
    const { name, toppings } = req.body;
  
    try {
      // Fetch all pizzas with their toppings
      const result = await pool.query(`
        SELECT p.id, ARRAY_AGG(pt.topping_id ORDER BY pt.topping_id) AS toppings
        FROM pizzas p
        LEFT JOIN pizza_toppings pt ON p.id = pt.pizza_id
        GROUP BY p.id
      `);
  
      const existingPizzas = result.rows;
  
      // Sort and compare toppings to ensure uniqueness
      const sortedToppings = toppings.sort((a, b) => a - b);
      const isDuplicate = existingPizzas.some((pizza) =>
        JSON.stringify(pizza.toppings) === JSON.stringify(sortedToppings)
      );
  
      if (isDuplicate) {
        return res.status(400).json({ error: "A pizza with the same ingredients already exists." });
      }
  
      // Insert the new pizza
      const pizzaResult = await pool.query("INSERT INTO pizzas (name) VALUES ($1) RETURNING *", [name]);
  
      if (toppings && toppings.length > 0) {
        const pizzaId = pizzaResult.rows[0].id;
        const insertPromises = toppings.map((toppingId) =>
          pool.query("INSERT INTO pizza_toppings (pizza_id, topping_id) VALUES ($1, $2)", [pizzaId, toppingId])
        );
        await Promise.all(insertPromises);
      }
  
      res.status(201).json(pizzaResult.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create pizza." });
    }
  };
  
  

// Update a pizza
const updatePizza = async (req, res) => {
  const { id } = req.params;
  const { name, toppings } = req.body;

  try {
    const pizzaResult = await pool.query("UPDATE pizzas SET name = $1 WHERE id = $2 RETURNING *", [name, id]);

    if (pizzaResult.rowCount === 0) return res.status(404).json({ error: "Pizza not found" });

    await pool.query("DELETE FROM pizza_toppings WHERE pizza_id = $1", [id]);
    if (toppings && toppings.length > 0) {
      const insertPromises = toppings.map((toppingId) =>
        pool.query("INSERT INTO pizza_toppings (pizza_id, topping_id) VALUES ($1, $2)", [id, toppingId])
      );
      await Promise.all(insertPromises);
    }

    res.json(pizzaResult.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "Failed to update pizza" });
  }
};

// Delete a pizza
const deletePizza = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM pizzas WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Pizza not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete pizza" });
  }
};

module.exports = {
  getAllPizzas,
  createPizza,
  updatePizza,
  deletePizza,
};
