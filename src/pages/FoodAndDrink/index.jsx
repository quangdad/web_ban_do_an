import { Box, Button, Typography } from "@mui/material";
import React from "react";
import banner from "../../access/imgs/banner.jpg";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import productApi from "../../api/productApi";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/reducers/productReducer";

const img1 = require("../../access/imgs/bn1.jpg");
const img2 = require("../../access/imgs/bn2.jpg");

const FoodDrink = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getProducts = async () => {
      const productsData = await productApi.getAllProducts();
      dispatch(setProducts(productsData));
    };
    getProducts();
  }, [dispatch, navigate]);

  return (
    <Box>
      <Box
        sx={{
          background: `url(${banner})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "500px",
        }}
      >
        <Box color="white" pt={10} pl={40}>
          <Typography variant="h3" fontWeight={600}>
            NHANH VÀ NGON
          </Typography>
          <Typography variant="h5" width={"600px"}>
            Thực đơn đa dạng luôn sẵn sàng mang đến cho bạn nhiều sự lựa chọn
            hấp dẫn vào bất cứ thời điểm nào trong ngày.
          </Typography>
        </Box>
      </Box>
      {pathname.split("/")[2] ? (
        <Outlet />
      ) : (
        <Box p={5}>
          <Typography align="center" color="red" fontWeight={600} variant="h4">
            Giải cơn khát, thỏa cơn đói
          </Typography>
          <Typography align="center" fontWeight={500} p={2} variant="h5">
            Hãy đến ngay cửa hàng LeQuangFood gần nhất để có những trải nghiệm
            thú vị với chúng tôi.
          </Typography>
          <Box
            display="flex"
            flexDirection={"row"}
            color="white"
            justifyContent={"center"}
            gap="3rem"
          >
            <Box
              sx={{
                background: `url(${img1})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "500px",
                width: "550px",
                padding: 3,
              }}
            >
              <Typography pt={6} pb={3}>
                LeQuangFood luôn "thỏa cơn khát" của bạn 24/7 với đa dạng các
                loại thức uống từ nóng đến lạnh. Chúng tôi luôn có thức uống mới
                để bạn thưởng thức và trải nghiệm.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("thuc-an")}
              >
                Xem tất cả
              </Button>
            </Box>
            <Box
              sx={{
                background: `url(${img2})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "500px",
                width: "550px",
                padding: 3,
              }}
            >
              <Typography pt={7} pb={3}>
                Với cam kết "Tươi và Ngon" cùng các lựa chọn phong phú từ món ăn
                quốc tế quen thuộc đến món ăn địa phương và thức ăn đường phố
                phổ biến, LeQuangFood luôn mang đến cho bạn sự hài lòng như mong
                muốn.
              </Typography>
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate("thuc-uong")}
              >
                Xem tất cả
              </Button>
            </Box>
          </Box>

          <Box sx={{ background: "#f4f4f4" }} p={3} mt={4}>
            <Typography
              color={"red"}
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
                  Tìm hiểu thêm các món ăn nhanh đa dạng, cùng các thức uống độc
                  đáo và rất chất tại LeQuangFood.
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
                  Với hơn 400 cửa hàng tại Tp.Hồ Chí Minh, Bình Dương, Vũng Tàu,
                  Cần Thơ, Hạ Long, Hà Nội, Hải Phòng, Long Xuyên và Biên Hòa
                  bạn sẽ dễ dàng tìm được cửa hàng LeQuangFood gần nhất.
                </Typography>
                <Button variant={"outlined"}>TÌM CỬA HÀNG</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FoodDrink;
