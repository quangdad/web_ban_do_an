import { LoadingButton } from "@mui/lab";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import voucherApi from "../../../api/voucher";
import Noti from "../../../components/common/Toast";

const VoucherItem = ({ voucher, loading, setLoading }) => {
  const [voucherErrText, setvoucherErrText] = useState("");
  const [salesErrText, setSalesErrText] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: voucher._id,
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
      await voucherApi.update(data);
      Noti("success", "Đã sửa Voucher");
      setDisabled(true);
      setLoading(false);
    } catch (error) {
      Noti("error", error.data);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await voucherApi.delete({ id: voucher._id });
      Noti("success", "Đã xóa Voucher");
      setLoading(false);
    } catch (error) {
      Noti("error", error.data);
      setLoading(false);
    }
  };

  return (
    <Box m={2}>
      <Paper sx={{ width: "300px" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <TextField
              name={"voucher"}
              margin={"normal"}
              label={"Voucher"}
              defaultValue={voucher.voucher}
              fullWidth
              error={voucherErrText !== ""}
              helperText={voucherErrText}
              disabled={disabled}
            />
            <TextField
              name={"sales"}
              margin={"normal"}
              label={"%"}
              type={"number"}
              defaultValue={voucher.sales}
              fullWidth
              error={salesErrText !== ""}
              helperText={salesErrText}
              disabled={disabled}
            />
          </Box>
          <TextField
            name={"dateDie"}
            margin={"normal"}
            defaultValue={voucher.dateDie}
            // label={"Hạn sử dụng"}
            type={"date"}
            disabled={disabled}
            fullWidth
          />

          <Box display={"flex"} flexDirection={"column"} pt={2} gap={2}>
            {disabled ? (
              <Button
                fullWidth
                color="success"
                variant={"contained"}
                onClick={() => setDisabled(!disabled)}
              >
                Chỉnh sửa Voucher
              </Button>
            ) : (
              <LoadingButton
                fullWidth
                color="success"
                variant={"contained"}
                type="submit"
              >
                Done
              </LoadingButton>
            )}
            <LoadingButton
              fullWidth
              color="warning"
              variant="contained"
              onClick={handleDelete}
            >
              Xóa
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default VoucherItem;
