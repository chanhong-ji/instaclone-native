import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useMe } from "../hooks/useMe";
import { getUserLogout } from "../apollo";

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
      <TouchableOpacity onPress={async () => await getUserLogout()}>
        <View>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Me;
