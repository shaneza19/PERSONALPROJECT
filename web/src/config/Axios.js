import axios from "axios";
import { getToken } from "../services/localStorage";

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = "Bearer " + getToken();
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axios;
