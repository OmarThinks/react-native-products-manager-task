import { useSelector } from "react-redux";
import { RootState } from "../../store";

const useProducts = () => {
  const products = useSelector(
    (state: RootState) => state.products.productsList
  );
  return products;
};

export { useProducts };
