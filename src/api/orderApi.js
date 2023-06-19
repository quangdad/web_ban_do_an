import axiosClient from "./axiosClient";
const orderApi = {
  getOrders: () => axiosClient.get(`cart/gets`),
  getOrder: (payload) => axiosClient.get(`cart/get/${payload.id}`),
  createOrder: (payload) => axiosClient.post(`cart/create`, payload),
  updateOrder: (payload) =>
    axiosClient.put(`cart/update/${payload.id}`, payload),
  deleteOrder: (payload) => axiosClient.delete(`cart/delete/${payload.id}`),
  getOrderByUID: (payload) => axiosClient.get(`cart/user/${payload.id}`),
  deleteOrderByUID: (payload) =>
    axiosClient.delete(`cart/user/delete/${payload.id}`),
};

export default orderApi;
