import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import { useProducts } from "@/src/redux/slices/productsSlice/productsHooks";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { Image } from "expo-image";

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
      <Image
        style={{
          borderRadius: 8,
          alignSelf: "stretch",
          width: "100%",
          aspectRatio: 1,
        }}
        source={{ uri: product?.image }}
      />

      <Text style={{ color: colors.text }}>{product?.title}</Text>
      <Text style={{ color: colors.text }}>
        Description: {product?.description}
      </Text>
      <Text style={{ color: colors.text }}>Price: ${product?.price}</Text>
      <Text style={{ color: colors.text }}>ID: {product?.id}</Text>
    </View>
  );
};

export default ProductDetails;
