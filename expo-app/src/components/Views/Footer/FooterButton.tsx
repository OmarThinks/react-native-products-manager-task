import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const FooterButton = ({
  text,
  onPress,
  iconName,
}: {
  text: string;
  onPress: () => void;
  iconName: string;
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
      className=" flex-1 justify-center items-center flex-row gap-2"
    >
      <FontAwesome6 name={iconName} size={16} color={colors.text} />
      <Text
        style={{ color: colors.text }}
        className=" text-[16px] font-semibold"
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default FooterButton;
