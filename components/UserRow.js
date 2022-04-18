import { gql, useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Wrapper = styled.View`
  justify-content: space-between;
  text-align: center;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
`;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.color.text};
`;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.color.accent};
  margin-right: 20px;
  padding: 7px 30px;
  border-radius: 3px;
`;
const FollowBtnText = styled.Text`
  color: white;
`;

const TOGGLEFOLLOW_MUTATION = gql`
  mutation toggleFollow($username: String!) {
    toggleFollow(username: $username) {
      ok
      error
    }
  }
`;

export default function UserRow({ id, avatar, username, isFollowing, isMe }) {
  const navigation = useNavigation();
  const followUpdate = (cache, { data }) => {
    const {
      toggleFollow: { ok, error },
    } = data;
    console.log(ok);
    if (!ok) return;
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollowing: (prev) => !prev,
      },
    });
  };

  const [toggleFollow] = useMutation(TOGGLEFOLLOW_MUTATION, {
    variables: { username },
    update: followUpdate,
  });

  return (
    <Wrapper>
      <Column onPress={() => navigation.navigate("Profile", { username, id })}>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn onPress={toggleFollow}>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
