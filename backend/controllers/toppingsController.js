const pool = require("../database/db");

// Get all toppings
const getAllToppings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM toppings");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch toppings" });
  }
};

const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  
  const createTopping = async (req, res) => {
    let { name } = req.body;
  
    try {
      // Capitalize the topping name
      name = capitalizeName(name);
  
      // Check if the topping already exists (case-insensitive)
      const result = await pool.query("SELECT * FROM toppings WHERE LOWER(name) = LOWER($1)", [name]);
      if (result.rowCount > 0) {
        return res.status(400).json({ error: "Topping already exists." });
      }
  
      // Insert the new topping
      const newTopping = await pool.query("INSERT INTO toppings (name) VALUES ($1) RETURNING *", [name]);
      res.status(201).json(newTopping.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create topping." });
    }
  };
  

// Update an existing topping
const updateTopping = async (req, res) => {
    const { id } = req.params; // Get the topping ID from the URL
    let { name } = req.body; // Get the new topping name from the request body
  
    try {
      // Capitalize the topping name for consistency
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  
      // Check if the new name already exists (case-insensitive)
      const duplicateCheck = await pool.query("SELECT * FROM toppings WHERE LOWER(name) = LOWER($1) AND id != $2", [name, id]);
      if (duplicateCheck.rowCount > 0) {
        return res.status(400).json({ error: "A topping with this name already exists." });
      }
  
      // Update the topping in the database
      const result = await pool.query("UPDATE toppings SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Topping not found." });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update topping." });
    }
  };
  
  module.exports = {
    // Other functions
    updateTopping,
  };
  

// Delete a topping
const deleteTopping = async (req, res) => {
  const { id } = req.params;
  const { force } = req.query; // Capture the force parameter

  try {
    // Find pizzas using this topping
    const pizzasWithTopping = await pool.query(
      `SELECT p.id, p.name 
       FROM pizzas p
       JOIN pizza_toppings pt ON p.id = pt.pizza_id
       WHERE pt.topping_id = $1`,
      [id]
    );

    if (pizzasWithTopping.rows.length > 0 && force !== "true") {
      return res.status(400).json({
        error: "This topping is used by existing pizzas.",
        affectedPizzas: pizzasWithTopping.rows,
      });
    }

    // If force=true or no pizzas are using the topping, delete it
    await pool.query("DELETE FROM pizza_toppings WHERE topping_id = $1", [id]);
    const result = await pool.query("DELETE FROM toppings WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Topping not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error deleting topping:", err);
    res.status(500).json({ error: "Failed to delete topping." });
  }
};

module.exports = {
  getAllToppings,
  createTopping,
  updateTopping,
  deleteTopping,
};
