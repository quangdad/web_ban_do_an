import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
const UuDaiDacBiet = () => {
  return (
    <Box>
      <Typography
        align="center"
        variant="h4"
        fontWeight={600}
        color="red"
        pt={1}
      >
        ƯU ĐÃI ĐẶC BIỆT
      </Typography>
      <Typography align="center" width="600px" p={3} sx={{ m: "0 auto" }}>
        LeQuangFood luôn mang đến cho bạn những chương trình ưu đãi mới, đặc
        biệt, hấp dẫn và thú vị, từ các Chương Trình Khuyến Mãi Tháng, Giá Rẻ
        Mỗi Ngày đến các combo ăn uống mà bạn không thể bỏ qua.
      </Typography>

      <Box pl={40} pr={40}>
        <img
          src="https://images.unsplash.com/photo-1508899203029-1c9eb493c9bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZCUyMGdpZnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
        <Box p={4} display={"flex"} flexDirection="column" gap={2}>
          <Box display={"flex"} flexDirection="row" gap={2}>
            <Button color="primary" variant="contained">
              <ThumbUpAltIcon />
              <Typography>Thích</Typography>
            </Button>
            <Button color="primary" variant="contained">
              <ShareIcon />
              <Typography>Chia sẻ</Typography>
            </Button>
          </Box>
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Box>
              <Typography color="error" fontWeight={600} variant={"h6"}>
                KHUYẾN MÃI ĐẶC BIỆT THÁNG 11/2022
              </Typography>
              <Typography>Có hiệu lực từ 03.11.2022 đến 30.11.2022</Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              sx={{ boderRadius: "10px" }}
            >
              XEM TẤT CẢ
            </Button>
          </Box>
          <Typography>
            Đến LeQuangFood - chuỗi cửa hàng tiện lợi mở cửa 24/7 để trải nghiệm
            phong cách mua sắm tiện lợi, nhanh chóng với những ưu đãi hấp dẫn
            không thể bỏ lỡ!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UuDaiDacBiet;
