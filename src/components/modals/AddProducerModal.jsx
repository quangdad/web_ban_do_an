import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAddProducerModal } from "../../redux/reducers/modalReducer";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import producerApi from "../../api/producerApi";
import Noti from "../common/Toast";
import { setAllProducers } from "../../redux/reducers/producerReducer";
import { setLoadingR } from "../../redux/reducers/loadingReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function AddProducerModal() {
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState(0);
  const [addressErr, setAddressErr] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.producer);
  const handleClose = () => {
    dispatch(setAddProducerModal(false));
    setLoading(false);
    setNameErr("");
    setPhoneErr(0);
    setAddressErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullname: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    let err = false;
    if (data.fullname === "") {
      setNameErr("Bạn chưa nhập tên");
      err = true;
    }
    if (data.phone === 0 || data.phone === "") {
      setPhoneErr("Bạn chưa nhập số điện thoại");
      err = true;
    }
    if (data.address === "") {
      setAddressErr("Bạn chưa nhập địa chỉ");
      err = true;
    }

    if (err) return;

    setNameErr("");
    setPhoneErr(0);
    setAddressErr("");
    setLoading(true);

    try {
      await producerApi.create(data);
      const producers = await producerApi.getAll();
      Noti("success", "Đã thêm thành công");
      setLoading(false);
      dispatch(setAllProducers(producers));
      dispatch(setAddProducerModal(false));
      dispatch(setLoadingR(false));
    } catch (error) {
      Noti("error", error.data);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" fontWeight={600} variant="h5">
            Thêm nhà sản xuất
          </Typography>
          <Box component={"form"} onSubmit={handleSubmit}>
            <TextField
              label="Tên nhà sản xuất"
              fullWidth
              margin="normal"
              name="name"
              error={nameErr !== ""}
              helperText={nameErr}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              margin="normal"
              type="number"
              name="phone"
              error={phoneErr !== 0}
              helperText={phoneErr !== 0}
            />
            <TextField
              label="Địa chỉ nhà sản xuất"
              fullWidth
              margin="normal"
              name="address"
              error={addressErr !== ""}
              helperText={addressErr}
            />
            <Box display="flex" flexDirection={"row"} gap={3} mt={2}>
              <Button
                variant="contained"
                fullWidth
                color="warning"
                onClick={handleClose}
              >
                Hủy
              </Button>
              <LoadingButton
                variant="contained"
                fullWidth
                color="success"
                type="submit"
                loading={loading}
              >
                Thêm
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
