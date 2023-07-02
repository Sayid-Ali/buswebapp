import axios from 'axios'
import baseUrl from "./backendConfig";
const BASE_URL = baseUrl;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,

  timeout: 5000,
});
