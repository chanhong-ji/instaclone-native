import { View, Text, TouchableOpacity } from "react-native";

function Search({ navigation }) {
  return (
    <View>
      <Text>Search</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Photos")}>
        <Text>Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Search;
