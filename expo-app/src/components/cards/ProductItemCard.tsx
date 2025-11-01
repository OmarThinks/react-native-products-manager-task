import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { ProductType } from "@/src/types/ProductType";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProductItemCard = ({ product }: { product: ProductType }) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      className=" self-stretch rounded-[8px] border px-3 py-3 flex-row gap-2"
      style={{
        borderColor: colors.text,
      }}
      onPress={() => router.push(`/product/details/${product.id}`)}
    >
      <Image
        style={{ width: 100, height: 100, borderRadius: 8 }}
        source={{ uri: product.image }}
      />
      <View className=" flex-1 self-stretch">
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
      </View>
    </TouchableOpacity>
  );
};

export default ProductItemCard;
