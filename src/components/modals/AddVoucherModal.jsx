import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAddUserModal } from "../../redux/reducers/modalReducer";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Noti from "../common/Toast";
import { setAddVoucherModal } from "../../redux/reducers/voucherReducer";
import voucherApi from "../../api/voucher";

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

export default function AddVoucherModal({ loading, setLoading }) {
  const [voucherErrText, setvoucherErrText] = useState("");
  const [salesErrText, setSalesErrText] = useState("");

  const dispatch = useDispatch();
  const open = useSelector((state) => state.voucher.modal);
  const handleClose = () => {
    dispatch(setAddVoucherModal(false));
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      voucher: formData.get("voucher"),
      sales: +formData.get("sales"),
      dateDie: formData.get("dateDie"),
    };
    let err = false;
    if (data.voucher === "") {
      setvoucherErrText("Bạn chưa voucher");
      err = true;
    }
    if (!data.sales) {
      setSalesErrText("Bạn chưa nhập % giảm giá");
      err = true;
    }

    if (err) return;

    setvoucherErrText("");
    setSalesErrText("");

    setLoading(true);
    try {
      await voucherApi.create(data);
      Noti("success", "Đã thêm Voucher");
      dispatch(setAddVoucherModal(false));
      setLoading(false);
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
          <Box component="form" onSubmit={handleSubmit}>
            <Typography fontWeight={500} variant="h4">
              Thêm Voucher
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
              <TextField
                name={"voucher"}
                margin={"normal"}
                label={"Voucher"}
                fullWidth
                error={voucherErrText !== ""}
                helperText={voucherErrText}
              />
              <TextField
                name={"sales"}
                margin={"normal"}
                label={"%"}
                type={"number"}
                fullWidth
                error={salesErrText !== ""}
                helperText={salesErrText}
              />
            </Box>
            <TextField
              name={"dateDie"}
              margin={"normal"}
              // label={"Hạn sử dụng"}
              type={"date"}
              fullWidth
            />

            <Box display={"flex"} flexDirection={"column"} pt={2} gap={2}>
              <LoadingButton
                fullWidth
                color="success"
                variant={"contained"}
                type="submit"
              >
                Thêm Voucher
              </LoadingButton>
              <LoadingButton
                fullWidth
                color="warning"
                variant="contained"
                onClick={handleClose}
                loading={loading}
              >
                Hủy
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
