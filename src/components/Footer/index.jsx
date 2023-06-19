import React from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Noti from "../common/Toast";
import { Link } from "react-router-dom";

const titleFooter = [
  {
    text: "HỆ THỐNG LeQuangFood",
    link: "",
  },
  {
    text: "ƯU ĐÃI ĐẶC BIỆT",
    link: "",
  },
  {
    text: "THỨC ĂN THỨC UỐNG",
    link: "",
  },
  {
    text: "SẢN PHẨM DỊCH VỤ",
    link: "",
  },
];

const subtitleFooter = [
  {
    text: "Giới thiệu",
    link: "",
  },
  {
    text: "Cơ Hội Nghề Nghiệp",
    link: "",
  },
  {
    text: "Tin Tức & Sự Kiện",
    link: "",
  },
  {
    text: "Liên Hệ",
    link: "",
  },
  {
    text: "Điều Khoản Sử Dụng",
    link: "",
  },
  {
    text: "Chính Sách Bảo Mật",
    link: "",
  },
  {
    text: "Hóa Đơn Đỏ",
    link: "",
  },
];

const handleSendEmail = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  if (email === "") {
    Noti("error", "Bạn chưa nhập email");
    return;
  }
  Noti("success", `Đã đăng ký thành công email: ${email}`);
};

const Footer = () => {
  return (
    <Box>
      <Box
        width={"100%"}
        height={"100px"}
        bgcolor={"#293F6F"}
        color={"#fff"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
      >
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <ForwardToInboxIcon
            sx={{
              width: "60px",
              height: "60px",
            }}
          />
          <Typography variant={"h5"} fontWeight={700}>
            ĐĂNG KÝ <br /> NHẬN THÔNG TIN
          </Typography>
        </Box>
        <Typography align="right" width={300}>
          Hãy là người đầu tiên nhận thông tin về ưu đãi, sản phẩm & dịch vụ
        </Typography>
        <Box display={"flex"} component={"form"} onSubmit={handleSendEmail}>
          <TextField
            placeholder="Email..."
            sx={{
              bgcolor: "white",
              width: "250px",
              borderRadius: "10px",
            }}
            name="email"
            type={"email"}
          />
          <Button variant="contained" color="success" type="submit">
            Send
          </Button>
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        textAlign={"center"}
        pt={5}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent="space-around"
          textAlign={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent="center"
            textAlign={"start"}
            gap={3}
          >
            <Typography
              sx={{ fontWeight: 600, fontSize: 32, color: "red" }}
              component={Link}
              to={"/"}
            >
              LeQuangFood
            </Typography>
            {titleFooter.map((e, i) => (
              <Typography
                key={i}
                color={"red"}
                fontWeight={600}
                width={"100px"}
              >
                <a href={e.link}>{e.text}</a>
              </Typography>
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection={"row"}
            alignItems={"center"}
            gap={2}
          >
            <IconButton href="https://www.facebook.com/bunhin.xanh.7">
              <FacebookIcon
                color="primary"
                sx={{ width: "40px", height: "40px" }}
              />
            </IconButton>
            <YouTubeIcon color="error" sx={{ width: "40px", height: "40px" }} />
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection="row"
          textAlign={"center"}
          justifyContent="center"
          gap={1}
          pt={1}
          pb={2}
        >
          {subtitleFooter.map((e, i) => (
            <Box key={i}>
              <Typography>
                <a href={e.link}>{e.text}</a> |
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider variant="middle" />
        <Box
          p={5}
          pt={1}
          pb={1}
          display="flex"
          justifyContent={"space-around"}
          textAlign={"start"}
        >
          <Box>
            <Typography>
              LeQuangFood Vietnam - Chuỗi cửa hàng tiện lợi - Mở cửa 24/7
            </Typography>
            <Typography>Copyright © 2016 LeQuangFood Vietnam</Typography>
            <Typography>
              <b>Tel:</b> +84 (28) 3620 9017
            </Typography>
            <Typography>
              <b>Email:</b> info@circlek.com.vn
            </Typography>
            <img
              src="https://www.circlek.com.vn/wp-content/themes/circlek/images/img/drsimage_-_DUNS.png"
              alt=""
              style={{
                width: "100px",
              }}
            />
          </Box>
          <Box>
            <Typography>
              CÔNG TY TNHH VÒNG TRÒN ĐỎ - Giấy CNĐKDN : 0306182043
            </Typography>
            <Typography>
              <b>Ngày cấp:</b> 10/11/2008.
              <br /> <b>Nơi cấp:</b> Sở Kế Hoạch - Đầu Tư Tp. Hồ Chí Minh
            </Typography>
            <Typography>
              <b>Địa chỉ</b> : 160 Bùi Thị Xuân, Phường Phạm Ngũ Lão, Quận 1,
              Tp.Hồ Chí Minh, Việt Nam.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
