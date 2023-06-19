import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ProductServices = () => {
  return (
    <Box>
      <Typography align="center" variant="h4" fontWeight={600} color="blue">
        MUA SẮM NHANH CHÓNG, TIỆN LỢI VÀ AN TOÀN
      </Typography>
      <Typography align="center">
        Hãy để LeQuangFood đáp ứng các nhu cầu thiết thực trong cuộc sống hằng
        ngày của bạn như một điểm đến mua sắm 24/7.
      </Typography>

      <Box display={"flex"} justifyContent={"center"} gap={2} p={5}>
        <Box
          sx={{
            background:
              "url('https://www.circlek.com.vn/wp-content/uploads/2021/10/File-1_VN-468x468.jpg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "500px",
            height: "500px",
            color: "white",
            p: 4,
          }}
        >
          <Typography pt={10} variant={"h5"} pb={2}>
            Sản phẩm tại LeQuangFood không những đa dạng về chủng loại, phong
            phú về thương hiệu mà còn chất lượng, giá cả hợp lý.
          </Typography>
          <Button color="primary" variant="outlined">
            KHÁM PHÁ THÊM
          </Button>
        </Box>
        <Box
          sx={{
            background:
              "url('https://www.circlek.com.vn/wp-content/uploads/2021/10/service_468x468_viet.jpg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "500px",
            height: "500px",
            color: "white",
            p: 4,
          }}
        >
          <Typography pt={10} variant={"h5"} pb={2}>
            Sản phẩm tại LeQuangFood không những đa dạng về chủng loại, phong
            phú về thương hiệu mà còn chất lượng, giá cả hợp lý.
          </Typography>
          <Button color="error" variant="outlined">
            KHÁM PHÁ THÊM
          </Button>
        </Box>
      </Box>

      <Box sx={{ background: "#f4f4f4" }} p={3}>
        <Typography
          color={"blue"}
          fontWeight={600}
          variant={"h4"}
          align="center"
        >
          KHÁM PHÁ THÊM
        </Typography>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent="center"
          gap={2}
          p={6}
        >
          <Box
            sx={{
              background:
                "url('https://www.circlek.com.vn/wp-content/uploads/2019/05/468wx242h-1_468x242_acf_cropped.jpg')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "500px",
              height: "200px",
              color: "white",
              p: 4,
            }}
          >
            <Typography fontWeight={600}>THỨC ĂN & THỨC UỐNG</Typography>
            <Typography>
              Tìm hiểu thêm các món ăn nhanh đa dạng, cùng các thức uống độc đáo
              và rất chất tại LeQuangFood.
            </Typography>
            <Button variant={"outlined"}>KHÁM PHÁ NGAY</Button>
          </Box>
          <Box
            sx={{
              background:
                "url('https://www.circlek.com.vn/wp-content/uploads/2015/11/xFAS.jpg.pagespeed.ic.fgALnJYnnE.webp')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "500px",
              height: "200px",
              color: "white",
              p: 4,
            }}
          >
            <Typography fontWeight={600}>TÌM CIRCEL K GẦN NHẤT</Typography>
            <Typography>
              Với hơn 400 cửa hàng tại Tp.Hồ Chí Minh, Bình Dương, Vũng Tàu, Cần
              Thơ, Hạ Long, Hà Nội, Hải Phòng, Long Xuyên và Biên Hòa bạn sẽ dễ
              dàng tìm được cửa hàng LeQuangFood gần nhất.
            </Typography>
            <Button variant={"outlined"}>TÌM CỬA HÀNG</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductServices;
