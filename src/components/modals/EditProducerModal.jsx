import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setEditProducerModal } from "../../redux/reducers/modalReducer";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import producerApi from "../../api/producerApi";
import Noti from "../common/Toast";

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

export default function EditProducerModal() {
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState(0);
  const [addressErr, setAddressErr] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const editProducer = useSelector((state) => state.modal.editProducer);
  const open = editProducer.status;
  const value = editProducer.data;
  const handleClose = () => {
    dispatch(setEditProducerModal({ status: false, data: {} }));
    setLoading(false);
    setNameErr("");
    setPhoneErr(0);
    setAddressErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      _id: value._id,
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
      const producer = await producerApi.update(data);
      Noti("success", `Đã sửa thành công ${producer.fullname}`);
      setLoading(false);
      dispatch(setEditProducerModal({ status: false, data: [] }));
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
            Chỉnh sửa thông tin {value.fullname}
          </Typography>
          <Box component={"form"} onSubmit={handleSubmit}>
            <TextField
              label="Tên nhà sản xuất"
              fullWidth
              margin="normal"
              defaultValue={value.fullname}
              name="name"
              error={nameErr !== ""}
              helperText={nameErr}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              margin="normal"
              defaultValue={value.phone}
              type="number"
              name="phone"
              error={phoneErr !== 0}
              helperText={phoneErr !== 0}
            />
            <TextField
              label="Địa chỉ nhà sản xuất"
              fullWidth
              margin="normal"
              defaultValue={value.address}
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
                Sửa
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
