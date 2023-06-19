import axiosClient from "./axiosClient";

const producerApi = {
  getAll: () => axiosClient.get("producers"),
  create: (payload) => axiosClient.post("producers", payload),
  get: (payload) => axiosClient.get(`producers/${payload.id}`, payload),
  update: (payload) => axiosClient.patch(`producers/${payload._id}`, payload),
  delete: (payload) => axiosClient.delete(`producers/${payload}`, payload),
};

export default producerApi;
