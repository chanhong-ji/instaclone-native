import { View, Text, TouchableOpacity } from "react-native";

export default function Welcome({ navigation }) {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View>
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
