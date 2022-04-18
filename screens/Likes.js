import React, { useState } from "react";
import { FlatList, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../fragment";
import UserRow from "../components/UserRow";

const SEEPHOTOLIKES_QUERY = gql`
  query seePhotoLikes($photoId: Int!, $offset: Int) {
    seePhotoLikes(photoId: $photoId, offset: $offset) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

function Likes({ route }) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, fetchMore, refetch } = useQuery(SEEPHOTOLIKES_QUERY, {
    variables: { photoId: route?.params?.id },
    skip: !route?.params?.id,
  });
  const refetching = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        refreshing={refreshing}
        onRefresh={refetching}
        data={data?.seePhotoLikes}
        renderItem={({ item: user }) => <UserRow {...user} />}
        keyExtractor={(item) => item.id}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seePhotoLikes?.length,
              photoId: route?.params?.id,
            },
          })
        }
        onEndReachedThreshold={1}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          ></View>
        )}
      />
    </ScreenLayout>
  );
}

export default Likes;
