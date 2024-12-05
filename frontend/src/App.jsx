import ToppingsList from "./components/ToppingsList";
import PizzasList from "./components/PizzasList";

const App = () => {
  return (
    <div>
      <h1>Pizza Management</h1>
      <ToppingsList />
      <PizzasList />
    </div>
  );
};

export default App;
