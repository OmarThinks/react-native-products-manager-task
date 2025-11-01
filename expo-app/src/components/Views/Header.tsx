import { View, Text } from "react-native";
import React from "react";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";

function Header() {
  const colors = useColors();

  return (
    <View style={{ padding: 16, backgroundColor: colors.primary, height: 56 }}>
      <Text style={{ color: colors.text }}>Header</Text>
    </View>
  );
}

export { Header };
