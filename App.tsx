import React from "react";
import { IntlProvider } from "react-intl";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "intl";
import { StatusBar } from "expo-status-bar";

import { createStore } from "./src/data";
import { useCachedResources } from "./src/hooks/useCachedResources";
import { AppNavigator } from "./src/navigation";

if (Platform.OS === "android") {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  // eslint-disable-next-line
  if (typeof (Intl as any).__disableRegExpRestore === "function") {
    // eslint-disable-next-line
    (Intl as any).__disableRegExpRestore();
  }
}

// TODO consider of moving store creation inside react lifecycle (under useEffect or ref)
const store = createStore();

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <Provider store={store}>
      <IntlProvider locale="en">
        <SafeAreaProvider>
          <AppNavigator />
          <StatusBar />
        </SafeAreaProvider>
      </IntlProvider>
    </Provider>
  );
};

export default App;
