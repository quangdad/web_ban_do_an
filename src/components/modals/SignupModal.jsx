import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setSigninModal,
  setSignupModal,
} from "../../redux/reducers/modalReducer";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Noti from "../common/Toast";
import authApi from "../../api/authApi";
import { setUser } from "../../redux/reducers/userReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function SignupModal() {
  const [loading, setLoading] = React.useState(false);
  const [phoneErrText, setPhoneErrText] = React.useState("");
  const [nameErrText, setNameErrText] = React.useState("");
  const [usernameErrText, setUsernameErrText] = React.useState("");
  const [passwordErrText, setPasswordErrText] = React.useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrTextErrText] =
    React.useState("");

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.signup);
  const handleClose = () => {
    dispatch(setSignupModal(false));
    setPhoneErrText("");
    setNameErrText("");
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrTextErrText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      phone: Number(formData.get("phone")),
      fullname: formData.get("name"),
      username: formData.get("username"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    let err = false;
    if (data.phone === "") {
      setPhoneErrText("Bạn chưa nhập số điện thoại");
      err = true;
    }
    if (data.phone.length < 10 || data.phone.length > 11) {
      setPhoneErrText("Số điện thoại không hợp lệ");
      err = true;
    }
    if (data.fullname === "") {
      setNameErrText("Bạn chưa nhập tên");
      err = true;
    }
    if (data.username.length < 6) {
      setUsernameErrText("Tài khoản yêu cầu tối thiểu 6 ký tự");
      err = true;
    }
    if (data.username === "") {
      setUsernameErrText("Bạn chưa nhập tài khoản");
      err = true;
    }
    if (data.password === "") {
      setPasswordErrText("Bạn chưa nhập mật khẩu");
      err = true;
    }
    if (data.password.length < 6) {
      setPasswordErrText("Mật khẩu yêu cầu tối thiểu 6 kí tự");
      err = true;
    }
    if (data.confirmPassword === "" || data.confirmPassword !== data.password) {
      setConfirmPasswordErrTextErrText("Mật khẩu không khớp");
      err = true;
    }

    if (err) {
      return;
    }

    setPhoneErrText("");
    setNameErrText("");
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrTextErrText("");
    setLoading(true);

    try {
      const { user, token } = await authApi.signup(data);
      dispatch(setUser(user));
      dispatch(setSignupModal(false));
      localStorage.setItem("token", token);
      localStorage.setItem("UID", user._id);
      setLoading(false);
      Noti("success", "Đăng kí thành công");
    } catch (error) {
      console.log(err);
      Noti("error", error.data);
      setLoading(false);
    }
  };

  const handleSignin = () => {
    dispatch(setSignupModal(false));
    dispatch(setSigninModal(true));
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
          <Typography fontWeight={600} variant="h5" align="center">
            Đăng ký
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="phone"
              margin="normal"
              label="Số điện thoại"
              fullWidth
              sx={{ mt: 1 }}
              helperText={phoneErrText}
              error={phoneErrText !== ""}
            />
            <TextField
              type="text"
              name="name"
              margin="normal"
              label="Tên đầy đủ"
              fullWidth
              sx={{ mt: 1 }}
              helperText={nameErrText}
              error={nameErrText !== ""}
            />
            <TextField
              type="text"
              name="username"
              margin="normal"
              label="Tài khoản"
              fullWidth
              sx={{ mt: 1 }}
              helperText={usernameErrText}
              error={usernameErrText !== ""}
            />
            <TextField
              type="password"
              name="password"
              margin="normal"
              label="Mật khẩu"
              fullWidth
              sx={{ mt: 1 }}
              helperText={passwordErrText}
              error={passwordErrText !== ""}
            />
            <TextField
              type="password"
              name="confirmPassword"
              margin="normal"
              label="Nhập lại mật khẩu"
              fullWidth
              sx={{ mt: 1 }}
              helperText={confirmPasswordErrText}
              error={confirmPasswordErrText !== ""}
            />
            <Box display={"flex"} gap={2} justifyContent="space-around" mt={1}>
              <Button
                onClick={handleClose}
                color="warning"
                variant="contained"
                fullWidth
              >
                Hủy
              </Button>
              <LoadingButton
                fullWidth
                color="success"
                variant="contained"
                type="submit"
                loading={loading}
              >
                Đăng Ký
              </LoadingButton>
            </Box>
            <Button variant="text" sx={{ mt: 2 }} onClick={handleSignin}>
              Bạn đã có tài khoản? Đăng nhập ngay
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
