import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.color.bg};
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 150px;
`;

function AuthLayout({ children }) {
  return (
    <Container>
      <Logo
        resizeMode="contain"
        source={require("../../assets/instagram_logo.png")}
      />
      {children}
    </Container>
  );
}

export default AuthLayout;
