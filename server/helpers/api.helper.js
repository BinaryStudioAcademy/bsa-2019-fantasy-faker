import axios from "axios";

export const mainApp = axios.create({
  baseURL: "http://localhost:5001/api/"
});
