import { Box } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserAdminModal from "../modals/UserAdminModal";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAdmin = async () => {
      // const isAdmin = await;
    };
  });
  return (
    loading && (
      <Box>
        <Outlet />
        <UserAdminModal />
      </Box>
    )
  );
};

export default AdminLayout;
