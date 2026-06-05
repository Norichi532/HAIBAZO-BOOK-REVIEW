import axios from "axios";

const api = axios.create({
  baseURL: "https://haibazo-book-review-api.onrender.com",
});
export default api;