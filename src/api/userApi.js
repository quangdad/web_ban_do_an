import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => axiosClient.get("user/all"),
  getUser: (payload) => axiosClient.get(`user/${payload}`),
  update: (payload) => axiosClient.put(`user/${payload._id}`, payload),
  create: (payload) => axiosClient.post("user/create", payload),
  delete: (payload) => axiosClient.delete(`user/${payload}`),
};

export default userApi;
