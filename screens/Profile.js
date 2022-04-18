import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";

function Profile({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.username,
    });
  }, []);
  return (
    <View>
      <Text>Pofile</Text>
    </View>
  );
}

export default Profile;
