import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "../navigators/StackNavFactory";
import { ThemeContext } from "styled-components/native";
import { useContext } from "react";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

function LoggedInNav() {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: theme.color.text,
        tabBarStyle: {
          backgroundColor: theme.color.bg,
          borderTopColor: theme.color.border,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: theme.color.bg,
      }}
    >
      <Tab.Screen
        name="TabFeed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="home" focused={focused} color={color} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tab.Screen>
      <Tab.Screen
        name="TabSearch"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="search" focused={focused} color={color} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tab.Screen>
      <Tab.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="camera" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="TabNotifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="heart" focused={focused} color={color} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notifications" />}
      </Tab.Screen>
      <Tab.Screen
        name="TabMe"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="person" focused={focused} color={color} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default LoggedInNav;
