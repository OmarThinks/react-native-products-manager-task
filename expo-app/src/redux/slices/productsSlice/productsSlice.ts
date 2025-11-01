import { ProductType } from "@/src/types/ProductType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialProducts } from "./initialProducts";

type ProductsStateType = {
  products: ProductType[];
};

const initialState = initialProducts;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteSingle: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
  },
});

export { ProductsStateType, productsSlice };
