import { useState, useEffect } from "react";
import api from "../api";

const PizzasList = () => {
    // Update the state variable with the fetched data
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState("");
    // Update the state variable with the fetched data
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [error, setError] = useState("");
  const [editingPizza, setEditingPizza] = useState(null); // State for editing pizza
  const [editedToppings, setEditedToppings] = useState([]); // State for toppings during edit
  const [editedName, setEditedName] = useState(""); // State for name during edit

  // Fetch pizzas and toppings on component mount
  useEffect(() => {
    const fetchData = async () => {
  // Start a block to attempt the API request
      try {
        const pizzasResponse = await api.get("/pizzas");
        const toppingsResponse = await api.get("/toppings");
    // Update the state variable with the fetched data
        setPizzas(pizzasResponse.data);
    // Update the state variable with the fetched data
        setToppings(toppingsResponse.data);
  // Catch and handle any errors that occur during the request
      } catch (err) {
    // Log the error for debugging purposes
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const capitalizeName = (name) => {
// Render the PizzasList Component's output
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const addPizza = async () => {
    if (!newPizza) {
      setError("Pizza name cannot be empty.");
// Render the PizzasList Component's output
      return;
    }

    const formattedName = capitalizeName(newPizza);
    const sortedSelectedToppings = [...selectedToppings].sort();

    if (
      pizzas.some(
        (pizza) =>
          JSON.stringify(pizza.toppings.sort()) ===
          JSON.stringify(sortedSelectedToppings)
      )
    ) {
      setError("A pizza with the same ingredients already exists.");
// Render the PizzasList Component's output
      return;
    }

  // Start a block to attempt the API request
    try {
      await api.post("/pizzas", { name: formattedName, toppings: selectedToppings });

      const pizzasResponse = await api.get("/pizzas");
    // Update the state variable with the fetched data
      setPizzas(pizzasResponse.data);

      setNewPizza("");
      setSelectedToppings([]);
      setError("");
  // Catch and handle any errors that occur during the request
    } catch (err) {
    // Log the error for debugging purposes
      console.error("Error adding pizza:", err);
      setError("Could not add pizza. It may already exist.");
    }
  };

  const deletePizza = async (id) => {
  // Start a block to attempt the API request
    try {
      await api.delete(`/pizzas/${id}`);
    // Update the state variable with the fetched data
      setPizzas(pizzas.filter((pizza) => pizza.id !== id));
  // Catch and handle any errors that occur during the request
    } catch (err) {
    // Log the error for debugging purposes
      console.error("Error deleting pizza:", err);
    }
  };

  const toggleTopping = (id) => {
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter((toppingId) => toppingId !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

  const startEditing = (pizza) => {
    setEditingPizza(pizza);
    setEditedName(pizza.name);
    setEditedToppings(
      pizza.toppings.map((topping) => {
        // Assuming toppings is an array of objects with `id` and `name`
        const toppingObj = toppings.find((t) => t.name === topping);
// Render the PizzasList Component's output
        return toppingObj?.id; // Map to IDs
      }).filter(Boolean) // Filter out null/undefined
    );
  };

  const toggleEditTopping = (id) => {
    if (editedToppings.includes(id)) {
      setEditedToppings(editedToppings.filter((toppingId) => toppingId !== id));
    } else {
      setEditedToppings([...editedToppings, id]);
    }
  };

  const saveEdits = async () => {
    if (!editedName) {
      setError("Pizza name cannot be empty.");
// Render the PizzasList Component's output
      return;
    }
  
    const formattedName = capitalizeName(editedName);
  
  // Start a block to attempt the API request
    try {
      console.log("Saving edits with payload:", {
        name: formattedName,
        toppings: editedToppings,
      });
  
      await api.put(`/pizzas/${editingPizza.id}`, {
        name: formattedName,
        toppings: editedToppings,
      });
  
      const pizzasResponse = await api.get("/pizzas");
    // Update the state variable with the fetched data
      setPizzas(pizzasResponse.data);
  
      setEditingPizza(null);
      setEditedName("");
      setEditedToppings([]);
      setError("");
  // Catch and handle any errors that occur during the request
    } catch (err) {
    // Log the error for debugging purposes
      console.error("Error saving pizza edits:", err);
      setError("Could not save edits.");
    }
  };
  

  const cancelEdit = () => {
    setEditingPizza(null);
    setEditedName("");
    setEditedToppings([]);
  };

// Render the PizzasList Component's output
  return (
    <div className="main">
      <h2>Manage Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li className="pizzas" key={pizza.id}>
            {pizza.id === editingPizza?.id ? (
              <div className="pizza-grid-container">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Pizza name"
                />
                <div>
                  {toppings.map((topping) => (
                    <label key={topping.id}>
                      <input
                        type="checkbox"
                        value={topping.id}
                        onChange={() => toggleEditTopping(topping.id)}
                        checked={editedToppings.includes(topping.id)}
                      />
                      {topping.name}
                    </label>
                  ))}
                </div>
                <button onClick={saveEdits}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="pizza-grid-container">
                {pizza.name} -Toppings:{" "}
                {Array.isArray(pizza.toppings) && pizza.toppings.length > 0
                  ? pizza.toppings.map((topping, index) => (
                      <span key={index}>
                        {topping}
                        {index < pizza.toppings.length - 1 ? " " : ""}
                      </span>
                    ))
                  : "No toppings"}
                <button onClick={() => startEditing(pizza)}>Edit</button>
                <button onClick={() => deletePizza(pizza.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="add-item-container">
        <input
          type="text"
          value={newPizza}
          onChange={(e) => setNewPizza(e.target.value)}
          placeholder="New pizza"
        />
        <div>
          {toppings.map((topping) => (
            <label key={topping.id}>
              <input
                type="checkbox"
                value={topping.id}
                onChange={() => toggleTopping(topping.id)}
                checked={selectedToppings.includes(topping.id)}
              />
              {topping.name}
            </label>
          ))}
        </div>
        <button onClick={addPizza}>Add Pizza</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PizzasList;
