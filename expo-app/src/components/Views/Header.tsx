import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Header({
  title,
  shouldDisplaySettings = true,
}: {
  title: string;
  shouldDisplaySettings?: boolean;
}) {
  const colors = useColors();
  const { canGoBack, back } = useRouter();

  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: colors.secondary,
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      {canGoBack() && (
        <TouchableOpacity
          className=" rounded-full self-stretch aspect-square justify-center items-center border"
          onPress={back}
          style={{ borderColor: colors.text }}
        >
          <FontAwesome6 name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
      )}

      <Text
        style={{ color: colors.text }}
        className="flex-1 text-[24px] font-bold"
      >
        {title}
      </Text>

      {shouldDisplaySettings && (
        <TouchableOpacity
          className=" rounded-full self-stretch aspect-square justify-center items-center border"
          onPress={() => {
            router.navigate("/settings");
          }}
          style={{ borderColor: colors.text }}
        >
          <FontAwesome6 name="gear" size={24} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export { Header };
