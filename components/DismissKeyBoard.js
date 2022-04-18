import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

function DismissKeyBoard({ children }) {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyBoard;
