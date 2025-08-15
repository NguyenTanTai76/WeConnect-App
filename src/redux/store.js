import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@redux/slices/authSlice";
import snackbarReducer from "@redux/slices/snackbarSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Lưu vào localStorage
import rootApi from "@services/rootApi";
import { logOutMiddleware } from "./middlewares";

// Cấu hình persist
const persistConfig = {
  key: "root", // key lưu trong storage
  version: 1,
  storage, // nơi lưu (ở đây là localStorage)
  blacklist: [rootApi.reducerPath], // Không lưu slice cache API
};

//  Tạo reducer đã persist
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logOutMiddleware, rootApi.middleware);
  },
});

export default store;
export const persistor = persistStore(store);
