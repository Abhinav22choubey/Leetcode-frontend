import axios from "axios";
const axiosMain = axios.create({
  baseURL: "https://leetcode-backend-smd2.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosMain;