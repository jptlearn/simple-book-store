import axios from "axios";
import "dotenv/config";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default axios.create({
  baseURL: baseURL,
});
