import { FlatList, useWindowDimensions, View } from "react-native";
import ProductItemCard from "../components/cards/ProductItemCard";
import { useProducts } from "../redux/slices/productsSlice/productsHooks";
import { useColors } from "../redux/slices/themeSlice/colorsHooks";
import { ProductType } from "../types/ProductType";

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
      className=" flex-1 self-stretch px-3 py-4"
      style={{ backgroundColor: colors.background }}
    >
      <FlatList
        data={products}
        renderItem={RenderProduct}
        className=" self-stretch flex-1"
        ItemSeparatorComponent={ItemSeparatorComponent}
        numColumns={columnsNumber}
        key={columnsNumber}
        /*columnWrapperStyle={
          columnsNumber > 1
            ? {
                justifyContent: "space-between",
                paddingHorizontal: 0,
              }
            : undefined
        }*/
      />
    </View>
  );
}

const ItemSeparatorComponent = () => <View style={{ height: 20 }} />;

export default Index;
