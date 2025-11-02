import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { ProductType } from "@/src/types/ProductType";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const ProductItemCard = ({
  product,
  selectedIds,
  toggleSelect,
  isMultiSelectActive,
}: {
  product: ProductType;
  selectedIds: Set<number>;
  toggleSelect: (id: number) => void;
  isMultiSelectActive: boolean;
}) => {
  const colors = useColors();

  const isSelected = selectedIds.has(product.id);

  const activeColor = isSelected ? colors.primary : colors.text;

  return (
    <TouchableOpacity
      className=" self-stretch rounded-[8px] border px-3 py-3 flex-row gap-2"
      style={{
        borderColor: activeColor,
      }}
      onPress={() => {
        if (isMultiSelectActive) {
          toggleSelect(product.id);
        } else {
          router.push(`/product/details/${product.id}`);
        }
      }}
      onLongPress={() => {
        console.log("Long Press");
        if (!isMultiSelectActive) {
          toggleSelect(product.id);
        }
      }}
    >
      <SelectionCheckBox
        isSelected={isSelected}
        activeColor={activeColor}
        isMultiSelectActive={isMultiSelectActive}
      />

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

const SelectionCheckBox = ({
  isMultiSelectActive,
  isSelected,
  activeColor,
}: {
  isSelected: boolean;
  activeColor: string;
  isMultiSelectActive: boolean;
}) => {
  if (!isMultiSelectActive) {
    return null;
  }

  return (
    <View
      style={{
        borderColor: activeColor,
      }}
      className=" w-[40px] h-[40px] rounded-[4px] border justify-center items-center"
    >
      {isSelected && (
        <FontAwesome6 name="check" size={24} color={activeColor} />
      )}
    </View>
  );
};

export default ProductItemCard;
