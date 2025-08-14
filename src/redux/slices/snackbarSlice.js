import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: null,
  type: "success",
};

const snackbarSlice = createSlice({
  name: "snackbar", // tên slice -> sẽ thành prefix cho các action type
  initialState,
  reducers: {
    /*
      🔹openSnackbar: hàm này được Redux Toolkit tự động biến thành một action creator.
      - Action creator là một hàm khi gọi sẽ trả về một action object { type, payload }
      - Ví dụ: openSnackbar({ message: "Good luck", type: "error" })
        => trả về action { type: "snackbar/openSnackbar", payload: { message: "Good luck", type: "error" } }
      - Khi action này được dispatch, reducer bên dưới sẽ chạy và cập nhật state.
    */
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackbar: () => {
      return initialState;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
