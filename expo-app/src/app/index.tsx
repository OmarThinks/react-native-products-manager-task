import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <Text className="text-xl font-bold text-#020203-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
