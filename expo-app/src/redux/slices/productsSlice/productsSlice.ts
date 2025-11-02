import { ProductType } from "@/src/types/ProductType";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { initialProducts } from "./initialProducts";
import { StorageKeysEnum } from "@/src/storage/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProductsStateType = {
  productsList: ProductType[];
};

const initialState = { productsList: [] as ProductType[] };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteSingleProduct: (state, action: PayloadAction<{ id: number }>) => {
      const productId = action.payload.id;
      state.productsList = state.productsList.filter(
        (product) => product.id !== productId
      );
      storeProductsInAsyncStorage(state.productsList);
    },
    deleteMultipleProducts: (
      state,
      action: PayloadAction<{ ids: number[] }>
    ) => {
      const productIds = action.payload.ids;
      state.productsList = state.productsList.filter(
        (product) => !productIds.includes(product.id)
      );
      storeProductsInAsyncStorage(state.productsList);
    },
    editSingleProduct: (
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
      storeProductsInAsyncStorage(state.productsList);
    },
    addProduct: (state, action: PayloadAction<{ newProduct: ProductType }>) => {
      const newProduct = action.payload.newProduct;
      state.productsList.push(newProduct);
      storeProductsInAsyncStorage(state.productsList);
    },
    resetProductsState: (state) => {
      state.productsList = initialProducts;
      storeProductsInAsyncStorage(state.productsList);
    },
    setProductsList: (
      state,
      action: PayloadAction<{ products: ProductType[] }>
    ) => {
      state.productsList = action.payload.products;
    },
  },
});

const storeProductsInAsyncStorage = async (products: ProductType[]) => {
  try {
    const productsString = JSON.stringify(products);
    await AsyncStorage.setItem(StorageKeysEnum.PRODUCTS_LIST, productsString);
  } catch (error) {
    console.error("Error storing products in AsyncStorage:", error);
  }
};

const {
  deleteSingleProduct,
  deleteMultipleProducts,
  editSingleProduct,
  addProduct,
  setProductsList,
  resetProductsState,
} = productsSlice.actions;

export {
  addProduct,
  deleteMultipleProducts,
  deleteSingleProduct,
  editSingleProduct,
  productsSlice,
  ProductsStateType,
  resetProductsState,
  setProductsList,
};
