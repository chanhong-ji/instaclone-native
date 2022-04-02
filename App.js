import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const assetsToLoad = [require("./assets/instagram_logo.png")];
    const assetPromises = assetsToLoad.map((asset) => Asset.loadAsync(asset));
    Promise.all([...fontPromises, ...assetPromises]);
  };
  if (loading)
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
