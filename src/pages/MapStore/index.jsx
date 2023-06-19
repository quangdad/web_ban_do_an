import { Box, Typography } from "@mui/material";
import React from "react";

const MapStore = () => {
  return (
    <Box>
      <Box
        sx={{
          background:
            "url('https://www.circlek.com.vn/wp-content/uploads/2022/08/Vietnam-Map_1920x350-1.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "450px",
        }}
      >
        <Box pt={15} pl={60} color={"white"}>
          <Typography variant={"h3"} fontWeight={700} width={"600px"}>
            TÌM CỬA HÀNG LeQuangFood GẦN NHẤT
          </Typography>
          <Typography pt={1} width={"800px"}>
            Với hơn 400 cửa hàng tại Tp.Hồ Chí Minh, Bình Dương, Vũng Tàu, Cần
            Thơ, Hà Nội, Hạ Long, Hải Phòng, Long Xuyên và Biên Hòa. Bạn sẽ luôn
            dễ dàng tìm được cửa hàng LeQuangFood gần nhất.
          </Typography>
        </Box>
      </Box>

      {/* map */}
      <Box>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d62706.356690205634!2d106.66070366111283!3d10.800028789652783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCircle%20K!5e0!3m2!1svi!2s!4v1668758713776!5m2!1svi!2s"
          width={"100%"}
          height={"700px"}
        ></iframe>
      </Box>
    </Box>
  );
};

export default MapStore;
