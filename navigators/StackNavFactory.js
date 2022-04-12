import { createStackNavigator, Header } from "@react-navigation/stack";
import PropTypes from "prop-types";
import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Photos from "../screens/Photos";
import Me from "../screens/Me";
import { ThemeContext } from "styled-components/native";
import { useContext } from "react";
import { Image } from "react-native";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

function StackNavFactory({ screenName }) {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.color.text,
        headerStyle: {
          backgroundColor: theme.color.bg,
          shadowColor: theme.color.border,
        },
        headerMode: "screen",
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                source={require("../assets/instagram_logo_white.png")}
                style={{ width: 120 }}
                resizeMode="contain"
              />
            ),
          }}
        />
      ) : screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : (
        <Stack.Screen name="Me" component={Me} />
      )}
      <Stack.Screen name="Photos" component={Photos} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}

StackNavFactory.propTypes = {
  screenName: PropTypes.string.isRequired,
};

export default StackNavFactory;
