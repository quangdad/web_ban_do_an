import axiosClient from "./axiosClient";
const productApi = {
  getAllProducts: () => axiosClient.get("products"),
  create: (payload) => axiosClient.post("products", payload),
  update: (payload) => axiosClient.patch(`products/${payload._id}`, payload),

  delete: (payload) => axiosClient.delete(`products/${payload}`),
};

export default productApi;
