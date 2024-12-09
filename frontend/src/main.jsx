// Import necessary libraries and the main App component
import { StrictMode } from 'react'
// Import necessary libraries and the main App component
import { createRoot } from 'react-dom/client'
// Import necessary libraries and the main App component
import './index.css'
// Import necessary libraries and the main App component
import App from './App.jsx'
// Import necessary libraries and the main App component
// import "./App.css";

// Render the App component into the DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
