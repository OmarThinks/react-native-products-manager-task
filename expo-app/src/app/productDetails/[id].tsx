import { Header } from "@/src/components/Views/Header";
import { useProducts } from "@/src/redux/slices/productsSlice/productsHooks";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const ProductDetails = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const products = useProducts();

  const product = products.find((item) => item.id === parseInt(id));
  const colors = useColors();

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
        <FooterButton text="Add to Cart" onPress={() => {}} />
        <FooterButton text="Buy Now" onPress={() => {}} />
      </View>
    </View>
  );
};

const FooterButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.secondary,
        padding: 12,
        borderRadius: 8,
      }}
      className=" flex-1 justify-center items-center"
    >
      <Text
        style={{ color: colors.text }}
        className=" text-[16px] font-semibold"
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductDetails;
