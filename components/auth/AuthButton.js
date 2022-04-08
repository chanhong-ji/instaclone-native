import styled from "styled-components/native";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";

const Button = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  padding: 15px 10px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.color.accent};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const ButtonText = styled.Text`
  color: white;
  font-size: ${(props) => props.theme.size.button};
`;

function AuthButton({ text, disabled = false, onPress, loading }) {
  return (
    <Button onPress={onPress} disabled={disabled} loading={loading}>
      {loading ? <ActivityIndicator /> : <ButtonText>{text}</ButtonText>}
    </Button>
  );
}

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default AuthButton;
