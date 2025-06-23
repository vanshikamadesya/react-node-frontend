import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../../types";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { clearError, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
