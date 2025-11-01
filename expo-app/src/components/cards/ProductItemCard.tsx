import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ProductType } from "@/src/types/ProductType";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { router } from "expo-router";

const ProductItemCard = ({ product }: { product: ProductType }) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      className=" self-stretch rounded-[8px] border px-2 py-3"
      style={{
        borderColor: colors.text,
      }}
      onPress={() => router.push(`/productDetails/${product.id}`)}
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
      <Text style={{ color: colors.text }} numberOfLines={1}>
        ID: {product.id}
      </Text>
      {product.tags.length > 0 && (
        <Text style={{ color: colors.text }} numberOfLines={1}>
          Tags: {product.tags.join(", ")}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ProductItemCard;
