import { setThemeMode } from "../redux/slices/themeSlice/themeSlice";
import { useAppDispatch } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../storage/StorageKeysEnum";
import { useEffect, useState } from "react";
import {
  resetProductsState,
  setProductsList,
} from "../redux/slices/productsSlice/productsSlice";
import { initialProducts } from "../redux/slices/productsSlice/initialProducts";

const useIsAppInitialized = () => {
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);
  const [isProductsListInitialized, setIsProductsListInitialized] =
    useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeTheme = async () => {
      console.log("initializing theme...");
      const storedThemeMode = await AsyncStorage.getItem(
        StorageKeysEnum.THEME_MODE
      );

      if (storedThemeMode === "light") {
        dispatch(setThemeMode({ mode: "light" }));
      } else if (storedThemeMode === "dark") {
        dispatch(setThemeMode({ mode: "dark" }));
      }

      setIsThemeInitialized(true);
    };

    initializeTheme();
  }, []);

  useEffect(() => {
    const initializeProductsList = async () => {
      console.log("initializing products list...");
      const storedProductsList = await AsyncStorage.getItem(
        StorageKeysEnum.PRODUCTS_LIST
      );

      if (storedProductsList) {
        const products = JSON.parse(storedProductsList);
        // Dispatch an action to set the products list in the Redux store
        dispatch(setProductsList({ products }));
      } else {
        dispatch(setProductsList({ products: initialProducts }));
      }

      setIsProductsListInitialized(true);
    };

    initializeProductsList();
  }, []);

  const isAppInitialized = isThemeInitialized && isProductsListInitialized;

  return isAppInitialized;
};

export { useIsAppInitialized };
