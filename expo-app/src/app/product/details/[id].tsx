import FooterButton from "@/src/components/Views/Footer/FooterButton";
import { Header } from "@/src/components/Views/Header";
import { useProducts } from "@/src/redux/slices/productsSlice/productsHooks";
import { deleteSingleProduct } from "@/src/redux/slices/productsSlice/productsSlice";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { useAppDispatch } from "@/src/redux/store";
import { ProductType } from "@/src/types/ProductType";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Toast as Toast2 } from "toastify-react-native";

const ProductDetails = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const products = useProducts();

  const product = products.find(
    (item) => item.id === Number(id)
  ) as ProductType;
  const colors = useColors();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const showDeleteProductAlert = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteSingleProduct({ id: product.id }));
            router.back();
            Toast2.success("Product deleted successfully 🎉");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View
      className="flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Product Details:" />
      <ScrollView
        className=" self-stretch flex-1"
        contentContainerClassName=" px-2 py-3 gap-2"
      >
        <Text
          style={{ color: colors.secondary }}
          className=" text-[32px] font-bold self-stretch"
        >
          {product?.title}
        </Text>

        <Image
          style={{
            borderRadius: 8,
            alignSelf: "stretch",
            width: "100%",
            aspectRatio: 1,
          }}
          source={{ uri: product?.image }}
        />

        <Text style={{ color: colors.text }}>
          Description: {product?.description}
        </Text>
        <Text
          style={{ color: colors.text }}
          className=" font-semibold text-[16px]"
        >
          Price: ${product?.price}
        </Text>
        <Text style={{ color: colors.text }}>ID: {product?.id}</Text>
      </ScrollView>
      <View
        style={{ backgroundColor: colors.primary }}
        className=" self-stretch flex-row justify-between items-center px-2 py-3 gap-4"
      >
        <FooterButton
          text="Delete"
          onPress={showDeleteProductAlert}
          iconName="trash"
        />
        <FooterButton
          text="Edit"
          onPress={() => {
            router.push(`/product/edit/${product.id}`);
          }}
          iconName="edit"
        />
      </View>
    </View>
  );
};

export default ProductDetails;
