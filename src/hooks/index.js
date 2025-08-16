import { useMediaQuery, useTheme } from "@mui/material";
import { logOut as logOutAction } from "@redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logOutAction());
    navigate("/login", { replace: true });
  };

  return { logOut };
};

export const useUserInfo = () => {
  return useSelector((state) => state.auth.userInfo);
};

export const useDetectLayout = () => {
  const theme = useTheme();
  const isMediumLayout = useMediaQuery(theme.breakpoints.down("md"));

  return { isMediumLayout };
};
