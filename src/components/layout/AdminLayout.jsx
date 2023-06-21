import { Box, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserAdminModal from "../modals/UserAdminModal";
import userApi from "../../api/userApi";

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  const UID = localStorage.getItem("UID");
  const navigation = useNavigate();

  useEffect(() => {
    const adminChecking = async () => {
      const user = await userApi.getUser(UID.toString());
      if (user.permission === 1) {
        alert("User are not administration");
        navigation("/");
      } else {
        setIsLoading(false);
      }
    };
    adminChecking();
  }, [UID, navigation]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box>
      <Outlet />
      <UserAdminModal />
    </Box>
  );
};

export default AdminLayout;
