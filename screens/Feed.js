import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { FEED_PHOTO_FRAGMENT } from "../fragment";

const SEE_FEED = gql`
  query seeFeed($offset: Int) {
    seeFeed(offset: $offset) {
      ...FeedPhotoFragment
    }
  }
  ${FEED_PHOTO_FRAGMENT}
`;

function Feed({ navigation }) {
  const { data, loading, refetch, fetchMore } = useQuery(SEE_FEED);
  const [refresh, setRefresh] = useState(false);
  const refeching = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReached={() => {
          fetchMore({
            variables: { offset: data?.seeFeed?.length },
          });
        }}
        onEndReachedThreshold={1}
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
