import axios, { AxiosInstance } from "axios";
// import { HOST } from "../common/constant";
const API: AxiosInstance = axios.create({
  baseURL: "HOST",
  timeout: 4500,
  headers: {
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

export default API;
