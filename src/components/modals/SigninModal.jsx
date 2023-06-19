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
import authApi from "../../api/authApi";
import Noti from "../common/Toast";
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

export default function SigninModal() {
  const [loading, setLoading] = React.useState(false);
  const [usernameErrText, setUsernameErrText] = React.useState("");
  const [passwordErrText, setPasswordErrText] = React.useState("");

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.signin);
  const handleClose = () => {
    dispatch(setSigninModal(false));
    setUsernameErrText("");
    setPasswordErrText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    let err = false;
    if (data.username === "") {
      setUsernameErrText("Bạn chưa nhập tài khoản");
      err = true;
    }
    if (data.password === "") {
      setPasswordErrText("Bạn chưa nhập mật khẩu");
      err = true;
    }

    if (err) {
      return;
    }

    setUsernameErrText("");
    setPasswordErrText("");
    setLoading(true);

    try {
      const { user, token } = await authApi.signin(data);
      Noti("success", "Đăng nhập thành công");
      localStorage.setItem("token", token);
      localStorage.setItem("UID", user._id);
      dispatch(setUser(user));
      dispatch(setSigninModal(false));
      setLoading(false);
    } catch (error) {
      Noti("error", error.data);
      setLoading(false);
    }
  };

  const handleSignup = () => {
    dispatch(setSigninModal(false));
    dispatch(setSignupModal(true));
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
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
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
                Đăng Nhập
              </LoadingButton>
            </Box>
            <Button variant="text" sx={{ mt: 2 }} onClick={handleSignup}>
              Bạn chưa có tài khoản? Đăng ký ngay
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
