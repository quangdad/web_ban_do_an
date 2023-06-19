import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import {
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PeopleIcon from "@mui/icons-material/People";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import InventoryIcon from "@mui/icons-material/Inventory";
import LabelIcon from "@mui/icons-material/Label";
export default function SideBar({ drawerWidth }) {
  const user = useSelector((s) => s.user.data);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/")[2]
    ? pathname.split("/")[1] + "/" + pathname.split("/")[2]
    : pathname.split("/")[1];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UID");
    navigate("/");
  };

  const headerData = [
    {
      icon: <AccountBoxIcon />,
      text: "Profile",
      path: "profile",
      display: 1,
    },
    {
      icon: <LocalMallIcon />,
      text: "Đơn hàng đã mua",
      path: "don-hang-da-mua",
      display: 1,
    },
    {
      icon: <AttachMoneyIcon />,
      text: "Thống kê chi tiêu",
      path: "thong-ke-chi-tieu",
      herf: "https://spending-app.vercel.app/",
      display: 1,
    },
    {
      icon: <AdminPanelSettingsIcon />,
      text: "Admin Page",
      path: "admin",
      display: user.permission === 1 ? false : true,
    },
    {
      icon: <PeopleIcon />,
      text: "Users",
      path: "admin/users",
      display: user.permission === 1 ? false : true,
    },
    {
      icon: <ProductionQuantityLimitsIcon />,
      text: "Products",
      path: "admin/products",
      display: user.permission === 1 ? false : true,
    },
    {
      icon: <SwitchAccountIcon />,
      text: "Producers",
      path: "admin/producers",
      display: user.permission === 1 ? false : true,
    },
    {
      icon: <LabelIcon />,
      text: "Orders",
      path: "admin/orders",
      display: user.permission === 1 ? false : true,
    },
    {
      icon: <InventoryIcon />,
      text: "Voucher",
      path: "admin/vouchers",
      display: user.permission === 1 ? false : true,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        width: drawerWidth,
        position: "fixed",
        flexDirection: "column",
        // minHeight: "45vh",
      }}
    >
      <Typography variant="h6" fontWeight={600} align="center">
        Chào {user.fullname}
      </Typography>
      <MenuList>
        {headerData.map(
          (e, i) =>
            e.display && (
              <MenuItem
                key={i}
                sx={path === e.path && { bgcolor: "rgba(0,0,0,.05)" }}
                onClick={() => {
                  i === 2
                    ? (window.location.href =
                        "https://spending-app.vercel.app/")
                    : navigate(e.path);
                }}
              >
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText>{e.text}</ListItemText>
              </MenuItem>
            )
        )}
      </MenuList>
      <Button
        fullWidth
        variant="outlined"
        color="error"
        onClick={handleLogout}
        sx={{
          mt: "1rem",
          height: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LogoutIcon />
        <Typography>Đăng xuất</Typography>
      </Button>
    </Box>
  );
}
