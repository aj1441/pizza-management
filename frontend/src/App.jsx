import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OwnerPage from "./pages/OwnerPage";
import ChefPage from "./pages/ChefPage";
import "./App.css";


const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/owner">Manage Toppings</Link>
          </li>
          <li>
            <Link to="/chef">Manage Pizzas</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/chef" element={<ChefPage />} />
      </Routes>
    </Router>
  );
};

export default App;
