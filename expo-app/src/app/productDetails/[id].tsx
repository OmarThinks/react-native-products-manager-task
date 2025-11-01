import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import { useProducts } from "@/src/redux/slices/productsSlice/productsHooks";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";

const ProductDetails = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const products = useProducts();

  const product = products.find((item) => item.id === parseInt(id));
  const colors = useColors();
  console.log("hey", product, id);

  return (
    <View
      className=" px-2 py-4 flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Text style={{ color: colors.text }}>{product?.title}</Text>
      <Text style={{ color: colors.text }}>{product?.description}</Text>
      <Text style={{ color: colors.text }}>{product?.price}</Text>
    </View>
  );
};

export default ProductDetails;
