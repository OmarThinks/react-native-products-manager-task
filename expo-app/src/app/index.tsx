import { FlatList, Text, View } from "react-native";
import { useColors } from "../redux/slices/themeSlice/colorsHooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProducts } from "../redux/slices/productsSlice/productsHooks";
import { ProductType } from "../types/ProductType";
import ProductItemCard from "../components/cards/ProductItemCard";

export default function Index() {
  const colors = useColors();
  const _products = useProducts();

  const products = _products;

  const RenderProduct = ({ item }: { item: ProductType }) => (
    <ProductItemCard product={item} key={item.id} />
  );

  return (
    <View
      className=" flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <FlatList
        data={products}
        renderItem={RenderProduct}
        className=" self-stretch flex-1"
      />
    </View>
  );
}
