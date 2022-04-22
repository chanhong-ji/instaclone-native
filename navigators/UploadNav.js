import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function UploadNav() {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      activeColor={theme.color.text}
      barStyle={{
        backgroundColor: theme.color.bg,
      }}
    >
      <Tab.Screen name="Take" component={TakePhoto} />
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: theme.color.text,
              headerStyle: {
                backgroundColor: theme.color.bg,
              },
            }}
          >
            <Stack.Screen name="SelectStack" component={SelectPhoto} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default UploadNav;
