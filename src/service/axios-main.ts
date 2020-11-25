import axios from "axios";

export const customerAxios = axios.create({
  baseURL: "http://localhost:8080/customers",
});
