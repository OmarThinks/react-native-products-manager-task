import "@/src/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import ToastManager from "toastify-react-native";
import { useIsAppInitialized } from "../hooks/useIsAppInitialized";
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

  const isAppInitialized = useIsAppInitialized();

  if (!isAppInitialized) {
    return (
      <View className=" self-stretch flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: colors.background }}
        className=" self-stretch flex-1"
      >
        <ToastManager />

        <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default RootLayout;
