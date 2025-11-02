import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";
import ProductItemCard from "../components/cards/ProductItemCard";
import FooterButton from "../components/Views/Footer/FooterButton";
import { Header } from "../components/Views/Header";
import { useProducts } from "../redux/slices/productsSlice/productsHooks";
import { deleteMultipleProducts } from "../redux/slices/productsSlice/productsSlice";
import { useColors } from "../redux/slices/themeSlice/colorsHooks";
import { ProductType } from "../types/ProductType";

function Index() {
  const colors = useColors();
  const _products = useProducts();

  const [searchText, setSearchText] = useState("");

  const products = useMemo(() => {
    const realSearchText = searchText.trim().toLowerCase();
    if (realSearchText.length < 3) {
      return _products;
    }

    const filteredProducts: ProductType[] = [];

    for (const product of _products) {
      const productTitle = product.title.trim().toLowerCase();
      if (productTitle.includes(realSearchText)) {
        filteredProducts.push(product);
      }
    }

    return filteredProducts;
  }, [_products, searchText]);

  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();

  const isVertical = height > width;
  const columnsNumber = isVertical ? 1 : 2;

  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set());
  const toggleSelect = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const deactivateMultiSelect = () => {
    setSelectedIds(new Set());
  };

  const isMultiSelectActive = selectedIds.size > 0;

  const RenderProduct = ({ item }: { item: ProductType }) => (
    <View
      style={{
        flex: 1,
        marginHorizontal: columnsNumber > 1 ? 4 : 0,
        maxWidth: columnsNumber > 1 ? "50%" : "100%",
      }}
    >
      <ProductItemCard
        product={item}
        key={item.id}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        isMultiSelectActive={isMultiSelectActive}
      />
    </View>
  );

  return (
    <View
      className=" flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Home" />
      <View className=" flex-1 self-stretch">
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          className=" border p-2"
          style={{
            borderColor: colors.primary,
            color: colors.text,
            marginHorizontal: 10,
            marginVertical: 5,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderRadius: 8,
          }}
          placeholderTextColor={colors.placeholder}
        />
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
      {isMultiSelectActive && (
        <View
          style={{ backgroundColor: colors.primary }}
          className=" self-stretch flex-row justify-between items-center px-2 py-3 gap-4"
        >
          <FooterButton
            text="Cancel"
            onPress={deactivateMultiSelect}
            iconName="xmark"
          />
          <FooterButton
            text="Select All"
            onPress={() => {
              const allIds = new Set(products.map((p) => p.id));
              setSelectedIds(allIds);
            }}
            iconName="check"
          />
          <FooterButton
            text="Delete"
            onPress={() => {
              Alert.alert(
                "Delete",
                `Delete ${selectedIds.size} selected items?`,
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                      dispatch(
                        deleteMultipleProducts({ ids: Array.from(selectedIds) })
                      );
                      deactivateMultiSelect();
                      Toast.success(
                        `${selectedIds.size} products deleted successfully 🎉`
                      );
                    },
                  },
                ]
              );
            }}
            iconName="trash"
          />
        </View>
      )}
    </View>
  );
}

const ItemSeparatorComponent = () => <View style={{ height: 20 }} />;

export default Index;
