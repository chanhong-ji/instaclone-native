import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";
import DismissKeyBoard from "../DismissKeyBoard";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.color.bg};
  justify-content: center;
  align-items: center;
  padding: 0 10%;
`;

const Logo = styled.Image`
  width: 80%;
  max-width: 200px;
  height: 150px;
  margin: 0 auto;
`;

function AuthLayout({ children }) {
  return (
    <DismissKeyBoard>
      <Container>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ width: "100%" }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/instagram_logo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyBoard>
  );
}

export default AuthLayout;
