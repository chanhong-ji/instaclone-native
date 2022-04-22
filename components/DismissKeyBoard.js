import React from "react";
import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

function DismissKeyBoard({ children }) {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        if (Platform.OS === "web") return;
        Keyboard.dismiss();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyBoard;
