import { View, Text, TouchableOpacity } from "react-native";

export default function CreateAccount({ navigation }) {
  return (
    <View>
      <Text>CreateAccount</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View>
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
