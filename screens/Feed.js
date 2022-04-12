import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { getUserLogin, getUserLogout } from "../apollo";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAMENT } from "../fragment";

const SEE_FEED = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      comments {
        ...CommentFragment
      }
      isMine
      isLiked
      createdAt
      updatedAt
      user {
        id
        username
        avatar
      }
    }
  }
  ${PHOTO_FRAMENT}
  ${COMMENT_FRAGMENT}
`;

function Feed({ navigation }) {
  const { data, loading, refetch } = useQuery(SEE_FEED);
  const [refresh, setRefresh] = useState(false);
  const refeching = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refresh}
        onRefresh={refeching}
        data={data?.seeFeed}
        renderItem={({ item: photo }) => <Photo {...photo} />}
        keyExtractor={(item) => String(item.id)}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
}

export default Feed;
