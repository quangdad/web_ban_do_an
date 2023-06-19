import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:9000/api/";
// const baseURL = "https://be-ban-do-an2.onrender.com/api/";
export const dnrUri = "https://api.cloudinary.com/v1_1/dhotuzjtr/upload";

export const axiosClient = axios.create({
  baseURL,
});
const getToken = () => localStorage.getItem("token");

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Barer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
