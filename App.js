import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { Appearance } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, defaultTheme, lightTheme } from "./styles";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, LoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [dark, setDark] = useState(Appearance.getColorScheme() === "dark");
  const [loading, setLoading] = useState(true);
  const LoggedIn = useReactiveVar(LoggedInVar);
  const onFinish = () => setLoading(false);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const assetsToLoad = [require("./assets/instagram_logo.png")];
    const assetPromises = assetsToLoad.map((asset) => Asset.loadAsync(asset));
    return Promise.all([...fontPromises, ...assetPromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      tokenVar(token);
      LoggedInVar(true);
    }
    await preloadAssets();
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
    <ApolloProvider client={client}>
      <ThemeProvider
        theme={
          dark
            ? { ...darkTheme, ...defaultTheme }
            : { ...lightTheme, ...defaultTheme }
        }
      >
        <NavigationContainer>
          {LoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
