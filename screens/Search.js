import { useEffect, useContext } from "react";
import {
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import DismissKeyBoard from "../components/DismissKeyBoard";
import { gql, useLazyQuery } from "@apollo/client";
import { PHOTO_FRAGMENT, USER_FRAGMENT } from "../fragment";
import styled, { ThemeContext } from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const SEARCHUSER_QUERY = gql`
  query searchUser($keyword: String!, $lastId: Int) {
    searchUser(keyword: $keyword, lastId: $lastId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const SEARCHPHOTO_QUERY = gql`
  query searchPhotos($hashtag: String!, $lastId: Int) {
    searchPhotos(hashtag: $hashtag, lastId: $lastId) {
      ...PhotoFragment
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.color.bg};
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.View``;

const MessageText = styled.Text`
  color: ${(props) => props.theme.color.text};
  margin-top: 20px;
  font-weight: 600;
  font-size: 15px;
`;

const Input = styled.TextInput`
  width: ${(props) => (props.width * 4) / 5}px;
  height: 35px;
  border-radius: 10px;
  padding-left: 15px;
  background-color: ${(props) => props.theme.color.textInputBg};
  color: ${(props) => props.theme.color.text};
`;

function Search({ navigation }) {
  const theme = useContext(ThemeContext);
  const { register, setValue, handleSubmit, getValues } = useForm();
  const { width } = useWindowDimensions();

  const onValid = ({ keyword }) => {
    searchPhotos({ variables: { hashtag: "#" + keyword } });
  };
  // const onValid = ({ keyword }) => {
  //   searchUser({ variables: { keyword } });
  // };

  const SearchBox = () => (
    <Input
      placeholder="Search"
      placeholderTextColor={theme.color.text}
      autoCorrect={false}
      autoCapitalize="none"
      onChangeText={(text) => setValue("keyword", text)}
      returnKeyType="search"
      onSubmitEditing={handleSubmit(onValid)}
      width={+width}
    />
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: SearchBox });
    register("keyword", { required: true });
  }, []);

  const [searchUser, { loading, data }] = useLazyQuery(SEARCHUSER_QUERY);
  const [searchPhotos, { loading: photoLoading, data: photoData }] =
    useLazyQuery(SEARCHPHOTO_QUERY, {
      onCompleted: (data) => console.log(data),
    });

  return (
    <DismissKeyBoard>
      {/* <Container>
        {loading && (
          <MessageContainer>
            <ActivityIndicator color={theme.color.text} />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        )}
        {data?.searchUser && data.searchUser.length === 0 && (
          <MessageContainer>
            <MessageText>No result for "{watch("keyword")}"</MessageText>
          </MessageContainer>
        )}
      </Container> */}
      <Container>
        {photoLoading && (
          <MessageContainer>
            <ActivityIndicator color={theme.color.text} />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        )}
        {photoData?.searchPhotos ? (
          photoData.searchPhotos.length === 0 ? (
            <MessageContainer>
              <MessageText>No result for "{getValues().keyword}"</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={4}
              data={photoData.searchPhotos}
              style={{ width: "100%" }}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item: photo }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Photos", {
                      photoId: photo.id,
                      hashtag: getValues().keyword,
                    })
                  }
                >
                  <Image
                    source={{ uri: photo.file }}
                    style={{
                      width: width / 4,
                      height: width / 4,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          )
        ) : null}
      </Container>
    </DismissKeyBoard>
  );
}

export default Search;
