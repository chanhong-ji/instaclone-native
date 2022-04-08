import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";
import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Photos from "../screens/Photos";
import Me from "../screens/Me";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screenName === "Feed" ? (
        <Stack.Screen name="Feed" component={Feed} />
      ) : screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : (
        <Stack.Screen name="Me" component={Me} />
      )}
      <Stack.Screen name="Photos" component={Photos} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

StackNavFactory.propTypes = {
  screenName: PropTypes.string.isRequired,
};
