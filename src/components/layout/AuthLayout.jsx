import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { setUser } from "../../redux/reducers/userReducer";
import { setLoadingR } from "../../redux/reducers/loadingReducer";
import { Box } from "@mui/material";
import SideBar from "../common/Sidebar";

const AuthLayout = () => {
  const [loading, setLoading] = useState(false);
  const UID = localStorage.getItem("UID");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const drawerWidth = "220px";

  useEffect(() => {
    const checkUser = async () => {
      dispatch(setLoadingR(true));
      if (UID) {
        try {
          const user = await userApi.getUser(UID);
          dispatch(setUser(user));
          setLoading(true);
          dispatch(setLoadingR(false));
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("UID");
          navigate("/");
          dispatch(setLoadingR(false));
        }
      } else {
        localStorage.removeItem("token");
        navigate("/");
        dispatch(setLoadingR(false));
      }
    };
    checkUser();
  }, [navigate, dispatch, UID]);
  return (
    loading && (
      <Box display={"flex"}>
        <SideBar drawerWidth={drawerWidth} />
        <Box
          flexGrow={1}
          sx={{ minHeight: "calc(100vh - 60px)" }}
          pl={drawerWidth}
        >
          <Outlet />
        </Box>
      </Box>
    )
  );
};

export default AuthLayout;
