import { notification } from "antd";
import axios from "axios";
import localStorageService from "../services/LocalStorageService";

axios.defaults.baseURL = "http://localhost:8000";

//if path is not login/register, add header Authorization with value = Bearer token
axios.interceptors.request.use(
  (config) => {
    if (config.url.includes("/login") || config.url.includes("/register"))
      return config;

    const token = localStorageService.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);


//when token expires, remove token and refresh browser
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorageService.removeToken();
      window.location.reload();
      notification.error({
        message: "กรุณาเข้าสู่ระบบใหม่",
      });
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default axios;
