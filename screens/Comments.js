import ScreenLayout from "../components/ScreenLayout";
import { useState } from "react";
import { FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, USER_FRAGMENT } from "../fragment";
import CommentRow from "../components/CommentRow";
import styled from "styled-components/native";

const SEE_PHOTO_COMMENTS_QUERY = gql`
  query seePhotoComments($photoId: Int!, $lastId: Int) {
    seePhotoComments(photoId: $photoId, lastId: $lastId) {
      ...CommentFragment
      user {
        ...UserFragment
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${USER_FRAGMENT}
`;
const Container = styled.View`
  width: 100%;
  padding: 10px 15px;
  flex-direction: row;
`;
const Username = styled.Text`
  color: ${(props) => props.theme.color.text};
  font-size: 15px;
  font-weight: 600;
`;
const UserAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 11px;
`;
const Caption = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
const CaptionText = styled.Text`
  color: ${(props) => props.theme.color.text};
  margin-left: 5px;
`;

function Comments({ route }) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO_COMMENTS_QUERY, {
    variables: { photoId: route?.params?.photoId },
  });
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <Container>
        <UserAvatar source={{ uri: route?.params?.avatarUrl }} />
        <Caption>
          <Username
            onPress={() => {
              navigation.navigate("Profile", {
                username: user.username,
                id: user.id,
              });
            }}
          >
            {route?.params?.username}
          </Username>
          <CaptionText>{route?.params?.caption}</CaptionText>
        </Caption>
      </Container>
      {data?.seePhotoComments && (
        <FlatList
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ flex: 1, width: "100%" }}
          data={data.seePhotoComments}
          renderItem={({ item: comment }) => <CommentRow {...comment} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </ScreenLayout>
  );
}

export default Comments;
