import { gql, useQuery } from "@apollo/client";
import { ScrollView, RefreshControl } from "react-native";
import { useEffect, useState, useContext } from "react";
import Photo from "../components/Photo";
import { PHOTO_FRAGMENT } from "../fragment";
import { ThemeContext } from "styled-components/native";

const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
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
  ${PHOTO_FRAGMENT}
`;

function Photos({ navigation, route }) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO_QUERY, {
    variables: { id: route?.params?.photoId },
  });
  const theme = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "#" + route?.params?.hashtag,
    });
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: theme.color.bg }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data?.seePhoto && <Photo {...data.seePhoto} />}
    </ScrollView>
  );
}

export default Photos;
