import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

function tabBarIcon({ name, focused, color }) {
  return (
    <Ionicons
      name={focused ? name : name + "-outline"}
      size={focused ? 27 : 25}
      color={color}
    />
  );
}

export default tabBarIcon;

tabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};
