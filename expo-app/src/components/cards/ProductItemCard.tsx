import { View, Text } from "react-native";
import React from "react";
import { ProductType } from "@/src/types/ProductType";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";

const ProductItemCard = ({ product }: { product: ProductType }) => {
  const colors = useColors();
  return (
    <View
      className=" self-stretch "
      style={{
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.text,
        flex: 1,
      }}
    >
      <Text style={{ color: colors.text }}>{product.title}</Text>
      <Text style={{ color: colors.text }}>{product.description}</Text>
      <Text style={{ color: colors.text }}>{product.price}</Text>
    </View>
  );
};

export default ProductItemCard;
