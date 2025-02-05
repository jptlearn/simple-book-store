import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "https://online-book-store-backend-01dv.onrender.com";

export default axios.create({
  baseURL: baseURL,
});
