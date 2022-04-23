import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Text } from "react-native";
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
      inactiveColor="grey"
      barStyle={{
        backgroundColor: theme.color.bg,
        fontSize: 20,
        padding: 0,
        shadowColor: theme.color.border,
        shadowOpacity: 1,
        shadowRadius: 4,
      }}
    >
      <Tab.Screen
        name="Take"
        component={TakePhoto}
        options={{
          tabBarLabel: <Text style={{ fontSize: 17 }}>Take</Text>,
        }}
      />
      <Tab.Screen
        name="Select"
        options={{
          tabBarLabel: <Text style={{ fontSize: 17 }}>Select</Text>,
        }}
      >
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: theme.color.text,
              headerStyle: {
                backgroundColor: theme.color.bg,
                shadowColor: theme.color.border,
              },
            }}
          >
            <Stack.Screen
              name="SelectStack"
              component={SelectPhoto}
              options={{
                headerTitle: "Choose a photo",
                headerBackTitleVisible: false,
                headerBackImage: ({ tintColor }) => (
                  <Ionicons
                    name="close"
                    size={20}
                    color={tintColor}
                    style={{ marginLeft: 20 }}
                  />
                ),
              }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default UploadNav;
