import { useState, useEffect } from "react";
import api from "../api";

const PizzasList = () => {
    const [pizzas, setPizzas] = useState([]);
    const [newPizza, setNewPizza] = useState("");
    const [toppings, setToppings] = useState([]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [error, setError] = useState("");

    // Fetch pizzas and toppings on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pizzasResponse = await api.get("/pizzas");
                const toppingsResponse = await api.get("/toppings");
                setPizzas(pizzasResponse.data);
                setToppings(toppingsResponse.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      };
      
      const addPizza = async () => {
        if (!newPizza) {
          setError("Pizza name cannot be empty.");
          return;
        }
      
        // Capitalize the pizza name
        const formattedName = capitalizeName(newPizza);
      
        // Sort selected toppings to ensure consistent comparison
        const sortedSelectedToppings = [...selectedToppings].sort();
      
        if (
          pizzas.some(
            (pizza) =>
              JSON.stringify(pizza.toppings.sort()) ===
              JSON.stringify(sortedSelectedToppings)
          )
        ) {
          setError("A pizza with the same ingredients already exists.");
          return;
        }
      
        try {
          await api.post("/pizzas", { name: formattedName, toppings: selectedToppings });
      
          // Refetch the updated list of pizzas
          const pizzasResponse = await api.get("/pizzas");
          setPizzas(pizzasResponse.data);
      
          setNewPizza("");
          setSelectedToppings([]);
          setError("");
        } catch (err) {
          console.error("Error adding pizza:", err);
          setError("Could not add pizza. It may already exist.");
        }
      };
      
      
    


// Delete a pizza
const deletePizza = async (id) => {
    try {
        await api.delete(`/pizzas/${id}`);
        setPizzas(pizzas.filter((pizza) => pizza.id !== id));
    } catch (err) {
        console.error("Error deleting pizza:", err);
    }
};

// Toggle topping selection
const toggleTopping = (id) => {
    if (selectedToppings.includes(id)) {
        setSelectedToppings(selectedToppings.filter((toppingId) => toppingId !== id));
    } else {
        setSelectedToppings([...selectedToppings, id]);
    }
};

return (
    <div>
        <h2>Manage Pizzas</h2>
        <ul>
  {pizzas.map((pizza) => (
    <li key={pizza.id}>
      {pizza.name} - Toppings: {Array.isArray(pizza.toppings) && pizza.toppings.length > 0 
        ? pizza.toppings.map((topping, index) => (
            <span key={index}>
              {topping}{index < pizza.toppings.length - 1 ? ", " : ""}
            </span>
          ))
        : "No toppings"}
      <button onClick={() => deletePizza(pizza.id)}>Delete</button>
    </li>
  ))}
</ul>

        <div>
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
                            value={topping}
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