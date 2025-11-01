import "@/src/global.css";
import { Stack } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useColors, useThemeMode } from "../redux/slices/themeSlice/hooks";
import { StatusBar } from "expo-status-bar";

function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <AppInsideRedux />
    </ReduxProvider>
  );
}

const AppInsideRedux = () => {
  const colors = useColors();
  const themeMode = useThemeMode();
  console.log(themeMode, colors);

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className=" self-stretch flex-1"
    >
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
};

export default RootLayout;
