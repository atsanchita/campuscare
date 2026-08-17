//api service for making requests to the backend server
import axios from "axios";

const api = axios.create({
  baseURL: "https://campuscare-api-43wl.onrender.com/api/v1",
  withCredentials: true, // send cookies with requests
});

export default api;