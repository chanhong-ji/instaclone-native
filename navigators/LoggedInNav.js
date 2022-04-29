import { createStackNavigator } from "@react-navigation/stack";
import UploadForm from "../screens/UploadForm";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import { Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import { useContext } from "react";

const Stack = createStackNavigator();

function LoggedInNav() {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{
          headerBackTitle: "Select",
          headerTintColor: theme.color.text,
          headerStyle: {
            backgroundColor: theme.color.bg,
            shadowColor: theme.color.border,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default LoggedInNav;
