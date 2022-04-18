import { View, Text } from "react-native";
import { useEffect } from "react";
import { useMe } from "../hooks/useMe";

function Me({ navigation, route }) {
  const data = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
    <View>
      <Text>Me page</Text>
    </View>
  );
}

export default Me;
