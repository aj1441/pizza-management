import { useState, useEffect } from "react";
import api from "../api";

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState("");
  const [error, setError] = useState("");

  // Fetch toppings on component mount
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await api.get("/toppings");
        setToppings(response.data);
      } catch (err) {
        console.error("Error fetching toppings:", err);
      }
    };

    fetchToppings();
  }, []);

  // Add a new topping
  const addTopping = async () => {
    if (!newTopping) {
      setError("Topping name cannot be empty.");
      return;
    }

  // Check for duplicates (case-insensitive)
  if (toppings.some((t) => t.name.toLowerCase() === newTopping.toLowerCase())) {
    setError("Topping already exists.");
    return;
  }

    try {
      const response = await api.post("/toppings", { name: newTopping });
      setToppings([...toppings, response.data]);
      setNewTopping("");
      setError("");
    } catch (err) {
      console.error("Error adding topping:", err);
      setError("Could not add topping. It may already exist.");
    }
  };

  // Delete a topping
  const deleteTopping = async (id) => {
    try {
      await api.delete(`/toppings/${id}`);
      setToppings(toppings.filter((topping) => topping.id !== id));
    } catch (err) {
      console.error("Error deleting topping:", err);
    }
  };

  return (
    <div>
      <h2>Manage Toppings</h2>
      <ul>
        {toppings.map((topping) => (
          <li key={topping.id}>
            {topping.name}
            <button onClick={() => deleteTopping(topping.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTopping}
          onChange={(e) => setNewTopping(e.target.value)}
          placeholder="New topping"
        />
        <button onClick={addTopping}>Add Topping</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ToppingsList;
