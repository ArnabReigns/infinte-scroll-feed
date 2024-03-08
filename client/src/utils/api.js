import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Set the x-api-key header for all requests
api.defaults.headers.common['x-api-key'] = 'secret-api-key-1234';

export default api;