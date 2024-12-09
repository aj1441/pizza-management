// Importing dependencies for making API requests
import axios from 'axios';

// Setting up Axios instance with the base URL for the API
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export default api;
