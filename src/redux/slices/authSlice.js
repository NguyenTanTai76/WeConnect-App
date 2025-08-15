import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: {},
};

const authSlice = createSlice({
  name: "auth", // // tên slice -> sẽ thành prefix cho các action type
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logOut: () => {
      return initialState;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Tự động tạo ra action creators từ reducers
export const { login, logOut, saveUserInfo } = authSlice.actions;

// Xuất reducers của slice để gộp vào store
export default authSlice.reducer;
