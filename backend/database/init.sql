-- Create the 'toppings' table
-- Define the structure of a new table
CREATE TABLE IF NOT EXISTS toppings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Create the 'pizzas' table
-- Define the structure of a new table
CREATE TABLE IF NOT EXISTS pizzas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Create the 'pizza_toppings' junction table
-- Define the structure of a new table
CREATE TABLE IF NOT EXISTS pizza_toppings (
    id SERIAL PRIMARY KEY,
    pizza_id INT NOT NULL REFERENCES pizzas(id) ON DELETE CASCADE,
    topping_id INT NOT NULL REFERENCES toppings(id) ON DELETE CASCADE,
    UNIQUE (pizza_id, topping_id)
);
