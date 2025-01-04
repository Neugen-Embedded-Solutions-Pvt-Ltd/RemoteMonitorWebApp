import axios from "axios";
const API_BASE_URL = "http://localhost:3001";
const Api = axios.create({
  baseURL: API_BASE_URL,
});

export default Api;
