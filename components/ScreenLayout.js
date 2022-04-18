import propTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.bg};
`;

function ScreenLayout({ loading = false, children }) {
  return <Container>{loading ? <ActivityIndicator /> : children}</Container>;
}
export default ScreenLayout;

ScreenLayout.propTypes = {
  loading: propTypes.bool,
  children: propTypes.any,
};
