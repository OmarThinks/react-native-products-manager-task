import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";

function Header({
  title,
  shouldDisplaySettings = true,
}: {
  title: string;
  shouldDisplaySettings?: boolean;
}) {
  const colors = useColors();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: colors.secondary,
        height: 56,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{ color: colors.text }}
        className="flex-1 text-[24px] font-bold"
      >
        {title}
      </Text>

      {shouldDisplaySettings && (
        <TouchableOpacity
          className=" rounded-full self-stretch aspect-square justify-center items-center"
          onPress={() => {
            router.navigate("/settings");
          }}
        >
          <FontAwesome6 name="gear" size={24} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export { Header };
