import "@/src/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import {
  useColors,
  useThemeMode,
} from "../redux/slices/themeSlice/colorsHooks";
import { store } from "../redux/store";

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
