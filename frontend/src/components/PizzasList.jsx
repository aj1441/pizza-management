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

    // Add a new pizza
    const addPizza = async () => {
        if (!newPizza) {
            setError("Pizza name cannot be empty.");
            return;
        }

        // Sort toppings to ensure consistent comparison
        const sortedSelectedToppings = [...selectedToppings].sort((a, b) => a - b);

        // Check for duplicate ingredients
        if (
            pizzas.some(
                (pizza) =>
                    JSON.stringify(pizza.toppings.map((t) => t.id).sort((a, b) => a - b)) ===
                    JSON.stringify(sortedSelectedToppings)
            )
        ) {
            setError("A pizza with the same ingredients already exists.");
            return;
        }

        try {
            const response = await api.post("/pizzas", { name: newPizza, toppings: selectedToppings });
            setPizzas([...pizzas, response.data]);
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
                    {pizza.name} - Toppings: {pizza.toppings.join(", ")}
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
