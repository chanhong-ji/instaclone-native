import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "../navigators/StackNavFactory";

const Tab = createBottomTabNavigator();

function LoggedInNav() {
  let theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.color.text,
        headerTintColor: theme.color.text,
        tabBarStyle: {
          backgroundColor: theme.color.bg,
          borderTopColor: theme.color.border,
        },
        headerStyle: {
          backgroundColor: theme.color.bg,
          shadowColor: theme.color.border,
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
