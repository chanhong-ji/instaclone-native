import { useState, useContext } from "react";
import propTypes from "prop-types";
import styled from "styled-components/native";
import { useWindowDimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { gql, useMutation } from "@apollo/client";

const Container = styled.View`
  border: 1px solid ${(props) => props.theme.color.border};
`;
const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 11px;
`;
const UserAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 11px;
`;
const Username = styled.Text`
  color: ${(props) => props.theme.color.text};
  font-size: 15px;
  font-weight: 600;
`;
const File = styled.Image``;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  color: ${(props) => props.theme.color.text};
  margin-right: 10px;
`;
const Likes = styled.Text`
  color: ${(props) => props.theme.color.text};
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: ${(props) => props.theme.color.text};
  margin-left: 5px;
`;

const TOGGLELIKE_MUTATION = gql`
  mutation toggleLike($photoId: Int!) {
    toggleLike(photoId: $photoId) {
      ok
      error
    }
  }
`;

function Photo({ id, user, file, caption, likes, commentCount, isLiked }) {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const { width: windowWidth, height } = useWindowDimensions();
  const [imgHeight, setImgHeight] = useState(0);

  const updateLike = (cache, { data }) => {
    const {
      toggleLike: { ok, error },
    } = data;
    if (!ok) return;

    cache.modify({
      id: `Photo:${id}`,
      fields: {
        likes: (prev, { readField }) =>
          readField("isLiked") ? prev - 1 : prev + 1,
        isLiked: (prev) => !prev,
      },
    });
  };
  const [toggleLike] = useMutation(TOGGLELIKE_MUTATION, {
    variables: { photoId: id },
    update: updateLike,
  });

  Image.getSize(file, (width, height) => {
    setImgHeight((windowWidth * height) / width);
  });
  return (
    <Container>
      <Header
        onPress={() => {
          navigation.navigate("Profile", {
            username: user.username,
            id: user.id,
          });
        }}
      >
        <UserAvatar source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        source={{ uri: file }}
        resizeMode="contain"
        style={{ width: windowWidth, height: imgHeight, maxHeight: height }}
      />
      <InfoContainer>
        <Actions>
          <Action onPress={toggleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "red" : theme.color.text}
              size={30}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons
              name="chatbubble-outline"
              size={25}
              color={theme.color.text}
            />
          </Action>
        </Actions>
        <Likes onPress={() => navigation.navigate("Likes", { id })}>
          좋아요 {likes}개
        </Likes>
        <Caption>
          <Username
            onPress={() => {
              navigation.navigate("Profile", {
                username: user.username,
                id: user.id,
              });
            }}
          >
            {user.username}
          </Username>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </InfoContainer>
    </Container>
  );
}

export default Photo;

Photo.propTypes = {
  id: propTypes.number.isRequired,
  user: propTypes.shape({
    avatar: propTypes.string,
    username: propTypes.string.isRequired,
  }),
  file: propTypes.string.isRequired,
  caption: propTypes.string,
  likes: propTypes.number.isRequired,
  isLiked: propTypes.bool.isRequired,
  commentCount: propTypes.number.isRequired,
  avatarUrl: propTypes.string,
};
