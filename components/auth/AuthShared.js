import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  padding: 13px 7px;
  font-size: 15px;
  border-radius: 5px;
  margin-bottom: ${(props) => (props.lastone ? "20px" : "7px")};
  color: ${(props) => props.theme.color.text};
  background-color: ${(props) => props.theme.color.textInputBg};
  :-ms-input-placeholder {
    color: black;
  }
`;

export const toNext = (nextRef) => nextRef?.current?.focus();
