const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

// import axios from "axios";

// const getTokenFromLocalStorage = () => {
//   return localStorage.getItem("token");
// };

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3001/api",

//   headers: {
//     common: {
//       Authorization: `Bearer ${getTokenFromLocalStorage()}`,
//       Accept: "application/json",
//     },
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getTokenFromLocalStorage();
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
