import axios from "axios";
const API_BASE_URL = "https://remotemonitoringapp.onrender.com/";
const Api = axios.create({
  baseURL: API_BASE_URL,
});

export default Api;
