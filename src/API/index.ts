import axios from "axios";

const token = localStorage.getItem("Token");

const API = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: { Authorization: `Bearer ${token}` },
});
export const MSEmail = axios.create({
  baseURL: "http://localhost:8081",
  timeout: 5000,
  headers: { Authorization: `Bearer ${token}` },
});

export default API;
