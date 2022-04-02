import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const LoginLink = styled.Text`
  color: ${(props) => props.theme.color.text};
  margin-top: 20px;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("Login");
  const goToLogin = () => navigation.navigate("CreateAccount");
  return (
    <AuthLayout>
      <AuthButton
        text="Create Account"
        onPress={goToCreateAccount}
        disabled={true}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Login</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
