import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-crie-f0533.cloudfunctions.net/api",
});

export default api;
