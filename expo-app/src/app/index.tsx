import { Text, View } from "react-native";
import { useColors } from "../redux/slices/themeSlice/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useColors();

  return (
    <View
      className=" flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Text style={{ color: colors.text }}>
        Edit app/index.tsx to edit this screen.
      </Text>

      <Text className="text-xl font-bold " style={{ color: colors.text }}>
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
