import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import { authApi } from "../services/authAPI";
import { productApi } from "../services/productAPI";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
