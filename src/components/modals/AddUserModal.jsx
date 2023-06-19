import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAddUserModal } from "../../redux/reducers/modalReducer";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import userApi from "../../api/userApi";
import Noti from "../../components/common/Toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  outline: "none",
  borderRadius: "20px",
};

export default function AddUserModal() {
  const [usernameErrText, setUsernameText] = useState("");
  const [nameErrText, setNameErrText] = useState("");
  const [phoneErrText, setPhoneErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [addressErrText, setAddressText] = useState("");
  const [value, setValue] = useState(1);

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.addUser);
  const handleClose = () => {
    dispatch(setAddUserModal(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      permission: value,
      address: formData.get("address"),
    };
    let err = false;
    if (data.name === "") {
      setNameErrText("Bạn chưa nhập tên");
      err = true;
    }
    if (data.phone === "") {
      setPhoneErrText("Bạn chưa nhập số điện thoại");
      err = true;
    }
    if (data.username === "") {
      setUsernameText("Bạn chưa nhập tài khoản");
      err = true;
    }
    if (data.phone.length < 9 || data.phone.length > 11) {
      setPhoneErrText("Số điện thoại không hợp lệ");
      err = true;
    }
    if (data.password === "") {
      setPasswordErrText("Bạn chưa nhập mật khẩu");
      err = true;
    }
    if (data.address === "") {
      setAddressText("Bạn chưa nhập địa chỉ");
      err = true;
    }

    if (err) return;

    setNameErrText("");
    setPhoneErrText("");
    setUsernameText("");
    setPasswordErrText("");
    setAddressText("");
    setValue(1);

    try {
      await userApi.create(data);
      Noti("success", "Đã thêm người dùng");
      dispatch(setAddUserModal(false));
    } catch (error) {
      Noti("error", error.data);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
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
          <Avatar
            src={""}
            alt={"avatar"}
            sx={{
              width: "100px",
              height: "100px",
              m: "0 auto",
            }}
          />
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name={"name"}
              margin={"normal"}
              label={"Tên"}
              fullWidth
              error={nameErrText !== ""}
              helperText={nameErrText}
            />
            <TextField
              name={"phone"}
              margin={"normal"}
              label={"Số điện thoại"}
              fullWidth
              error={phoneErrText !== ""}
              helperText={phoneErrText}
            />
            <TextField
              name={"username"}
              margin={"normal"}
              label={"Tài khoản"}
              error={usernameErrText !== ""}
              helperText={usernameErrText}
              fullWidth
            />
            <TextField
              name={"password"}
              margin={"normal"}
              label={"Mật khẩu"}
              fullWidth
              type={"password"}
              error={passwordErrText !== ""}
              helperText={passwordErrText}
            />
            <TextField
              name={"address"}
              margin={"normal"}
              label={"Địa chỉ"}
              fullWidth
              type={"text"}
              error={addressErrText !== ""}
              helperText={addressErrText}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Quyền hạn</InputLabel>
              <Select label="Quyền hạn" onChange={handleChange} value={value}>
                <MenuItem value={0}>ADMIN</MenuItem>
                <MenuItem value={1}>NGƯỜI DÙNG</MenuItem>
                <MenuItem value={2}>NHÂN VIÊN</MenuItem>
              </Select>
            </FormControl>

            <Box display={"flex"} flexDirection={"column"} pt={2} gap={2}>
              <LoadingButton
                fullWidth
                color="success"
                variant={"contained"}
                type="submit"
              >
                Thêm {["ADMIN", "người dùng", "nhân viên"][value]}
              </LoadingButton>
              <Button
                fullWidth
                color="warning"
                variant="contained"
                onClick={handleClose}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
