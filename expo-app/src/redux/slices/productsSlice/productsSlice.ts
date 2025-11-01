import { ProductType } from "@/src/types/ProductType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialProducts } from "./initialProducts";

type ProductsStateType = {
  productsList: ProductType[];
};

const initialState = { productsList: initialProducts };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteSingle: (state, action: PayloadAction<{ id: number }>) => {
      const productId = action.payload.id;
      state.productsList = state.productsList.filter(
        (product) => product.id !== productId
      );
    },
    deleteMultiple: (state, action: PayloadAction<{ ids: number[] }>) => {
      const productIds = action.payload.ids;
      state.productsList = state.productsList.filter(
        (product) => !productIds.includes(product.id)
      );
    },
    editSingle: (
      state,
      action: PayloadAction<{ updatedProduct: ProductType }>
    ) => {
      const updatedProduct = action.payload.updatedProduct;
      const index = state.productsList.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.productsList[index] = updatedProduct;
      }
    },
    addProduct: (state, action: PayloadAction<{ newProduct: ProductType }>) => {
      const newProduct = action.payload.newProduct;
      state.productsList.push(newProduct);
    },
  },
});

export { ProductsStateType, productsSlice };
