import { Box } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserAdminModal from "../modals/UserAdminModal";

const AdminLayout = () => {
  return (
    <Box>
      <Outlet />
      <UserAdminModal />
    </Box>
  );
};

export default AdminLayout;
