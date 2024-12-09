const pool = require('../database/db');

// Fetch all toppings
async function getAllToppings() {
  try {
    const result = await pool.query('SELECT * FROM toppings');
    return result.rows;
  } catch (error) {
    console.error('Error fetching toppings:', error.message);
    throw error;
  }
}

// Create a new topping
async function createTopping(toppingData) {
  const { name } = toppingData;

  try {
    const result = await pool.query(
      'INSERT INTO toppings (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating topping:', error.message);
    throw error;
  }
}

// Update a topping
async function updateTopping(toppingId, updatedData) {
  const { name } = updatedData;

  try {
    const result = await pool.query(
      'UPDATE toppings SET name = $1 WHERE id = $2 RETURNING *',
      [name, toppingId]
    );
    if (result.rows.length === 0) {
      throw new Error('Topping not found');
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error updating topping:', error.message);
    throw error;
  }
}

// Delete a topping
async function deleteTopping(toppingId) {
  try {
    const result = await pool.query('DELETE FROM toppings WHERE id = $1 RETURNING id', [toppingId]);
    if (result.rows.length === 0) {
      throw new Error('Topping not found');
    }
    return `Topping with ID ${toppingId} deleted successfully`;
  } catch (error) {
    console.error('Error deleting topping:', error.message);
    throw error;
  }
}

module.exports = { getAllToppings, createTopping, updateTopping, deleteTopping };
