import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Button = styled.TouchableOpacity`
  width: 80%;
  align-items: center;
  padding: 13px 0;
  border-radius: 3px;
  background-color: ${(props) => props.theme.color.accent};
`;

const ButtonText = styled.Text`
  color: white;
  font-size: ${(props) => props.theme.size.button};
`;

function AuthButton({ text, disabled = false, onPress }) {
  return (
    <Button onPress={onPress} disabled={disabled}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}

AuthButton.prototype = {
  text: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export default AuthButton;
