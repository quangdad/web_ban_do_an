import axiosClient from "./axiosClient";

const authApi = {
  signin: (payload) => axiosClient.post("auth/signin", payload),
  signup: (payload) => axiosClient.post("auth/signup", payload),
};

export default authApi;
