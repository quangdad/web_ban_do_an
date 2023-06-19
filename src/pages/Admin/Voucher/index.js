import React, { useEffect, useState } from "react";
import voucherApi from "../../../api/voucher";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAddVoucherModal } from "../../../redux/reducers/voucherReducer";
import AddVoucherModal from "../../../components/modals/AddVoucherModal";
import VoucherItem from "./VoucherItem";
const Voucher = () => {
  const [vouchers, setVouchers] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getVoucher = async () => {
      const voucherData = await voucherApi.gets();
      setVouchers(voucherData);
    };
    getVoucher();
  }, [loading]);

  const handleAddVoucher = () => {
    dispatch(setAddVoucherModal(true));
  };

  return (
    <div>
      {vouchers?.length ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {vouchers.map((voucher, i) => (
            <VoucherItem
              key={i}
              voucher={voucher}
              loading={loading}
              setLoading={setLoading}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            mt: 5,
            gap: 5,
          }}
        >
          <Typography align="center" variant="h5">
            Chưa có Voucher
          </Typography>
          <Button
            onClick={handleAddVoucher}
            variant="contained"
            sx={{ width: "max-content", m: "0 auto" }}
          >
            Thêm ngay
          </Button>
        </Box>
      )}
      {/* <Button onClick={handleAddVoucher}>Thêm voucher</Button> */}
      <AddVoucherModal loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default Voucher;
