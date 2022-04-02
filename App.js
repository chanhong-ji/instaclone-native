import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { Appearance } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./theme";

export default function App() {
  const [dark, setDark] = useState(Appearance.getColorScheme());
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const assetsToLoad = [require("./assets/instagram_logo.png")];
    const assetPromises = assetsToLoad.map((asset) => Asset.loadAsync(asset));
    Promise.all([...fontPromises, ...assetPromises]);
  };
  Appearance.addChangeListener(({ colorScheme }) =>
    colorScheme === "dark" ? setDark(true) : setDark(false)
  );
  if (loading)
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <LoggedOutNav />
      </NavigationContainer>
    </ThemeProvider>
  );
}
