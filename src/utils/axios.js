import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_HIIT_BACKEND_LOCALHOST
});
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
