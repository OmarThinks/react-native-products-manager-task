import { View, Text } from "react-native";
import React from "react";
import { ProductType } from "@/src/types/ProductType";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";

const ProductItemCard = ({ product }: { product: ProductType }) => {
  const colors = useColors();

  return (
    <View
      className=" self-stretch rounded-[8px] border px-2 py-3"
      style={{
        borderColor: colors.text,
      }}
    >
      <Text
        style={{ color: colors.primary }}
        className=" text-[20px] font-bold"
        numberOfLines={1}
      >
        {product.title}
      </Text>
      <Text style={{ color: colors.text }} numberOfLines={1}>
        {product.description}
      </Text>
      <Text
        style={{ color: colors.text }}
        numberOfLines={1}
        className=" font-semibold"
      >
        $
        <Text style={{ color: colors.secondary }} numberOfLines={1}>
          {product.price}
        </Text>
      </Text>
    </View>
  );
};

export default ProductItemCard;
