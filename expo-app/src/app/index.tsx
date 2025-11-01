import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import ProductItemCard from "../components/cards/ProductItemCard";
import { Header } from "../components/Views/Header";
import { useProducts } from "../redux/slices/productsSlice/productsHooks";
import { useColors } from "../redux/slices/themeSlice/colorsHooks";
import { ProductType } from "../types/ProductType";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

function Index() {
  const colors = useColors();
  const _products = useProducts();

  const products = _products;

  const { width, height } = useWindowDimensions();

  const isVertical = height > width;
  const columnsNumber = isVertical ? 1 : 2;

  const RenderProduct = ({ item }: { item: ProductType }) => (
    <View
      style={{
        flex: 1,
        marginHorizontal: columnsNumber > 1 ? 4 : 0,
        maxWidth: columnsNumber > 1 ? "50%" : "100%",
      }}
    >
      <ProductItemCard product={item} key={item.id} />
    </View>
  );

  return (
    <View
      className=" flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Home" />
      <View className=" flex-1 self-stretch">
        <FlatList
          data={products}
          renderItem={RenderProduct}
          className=" self-stretch flex-1 px-3"
          ItemSeparatorComponent={ItemSeparatorComponent}
          numColumns={columnsNumber}
          key={columnsNumber}
          style={{ paddingVertical: 10 }}
          contentContainerStyle={{ paddingVertical: 10, paddingBottom: 30 }}
        />

        <TouchableOpacity
          className=" absolute right-2 bottom-2 justify-center items-center rounded-full w-[48px] h-[48px]"
          style={{ backgroundColor: colors.primary }}
        >
          <FontAwesome6 name="plus" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ItemSeparatorComponent = () => <View style={{ height: 20 }} />;

export default Index;
