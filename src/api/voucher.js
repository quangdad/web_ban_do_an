import axiosClient from "./axiosClient";

const voucherApi = {
  create: (payload) => axiosClient.post(`voucher/create`, payload),
  get: (payload) => axiosClient.post(`voucher/get`, payload),
  gets: () => axiosClient.get(`voucher/gets`),
  update: (payload) => axiosClient.put(`voucher/update/${payload.id}`, payload),
  delete: (payload) => axiosClient.delete(`voucher/delete/${payload.id}`),
};

export default voucherApi;
