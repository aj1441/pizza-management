import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import OwnerPage from "./pages/OwnerPage";
import ChefPage from "./pages/ChefPage";
import "./App.css";
import Logo from "./assets/pizza.png";


const App = () => {
  return (
    <Router>
      <header>
      <img className="logo" src={Logo} alt="Pizza logo" />
      <nav className="navBar">
        <ul>
        <li>
            <Link className="pageHeading" to="/home">Home</Link>
          </li>
          <li>
            <Link className="pageHeading" to="/owner">Manage Toppings</Link>
          </li>
          <li>
            <Link className="pageHeading" to="/chef">Manage Pizzas</Link>
          </li>
        </ul>
      </nav>
      </header>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/chef" element={<ChefPage />} />
      </Routes>
    </Router>
  );
};

export default App;
