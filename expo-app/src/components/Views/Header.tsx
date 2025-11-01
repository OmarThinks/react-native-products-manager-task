import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import React from "react";
import { Text, View } from "react-native";

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
        backgroundColor: colors.primary,
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
        <Text style={{ color: colors.text }}>Settings</Text>
      )}
    </View>
  );
}

export { Header };
