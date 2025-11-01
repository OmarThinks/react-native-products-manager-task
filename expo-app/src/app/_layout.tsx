import "@/src/global.css";
import { Stack } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <Stack />
    </ReduxProvider>
  );
}
