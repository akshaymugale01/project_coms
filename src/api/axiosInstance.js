import axios from "axios";
import { getItemInLocalStorage } from "../utils/localStorage";

const axiosInstance = axios.create({
  // baseURL: "http://13.215.74.38",

   baseURL: "https://app.myciti.life"
});

axiosInstance.interceptors.request.use(
  (authenticate) => {
    const token = getItemInLocalStorage("TOKEN");
    if (token) {
      authenticate.headers["Authorization"] = `${token}`;
    }
    return authenticate;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
