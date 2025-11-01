import { FlatList, View } from "react-native";
import ProductItemCard from "../components/cards/ProductItemCard";
import { useProducts } from "../redux/slices/productsSlice/productsHooks";
import { useColors } from "../redux/slices/themeSlice/colorsHooks";
import { ProductType } from "../types/ProductType";

function Index() {
  const colors = useColors();
  const _products = useProducts();

  const products = _products;

  const RenderProduct = ({ item }: { item: ProductType }) => (
    <ProductItemCard product={item} key={item.id} />
  );

  return (
    <View
      className=" flex-1 self-stretch px-3 py-4"
      style={{ backgroundColor: colors.background }}
    >
      <FlatList
        data={products}
        renderItem={RenderProduct}
        className=" self-stretch flex-1"
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}

const ItemSeparatorComponent = () => <View style={{ height: 20 }} />;

export default Index;
