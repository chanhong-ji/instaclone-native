import React, { useEffect, useContext } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DismissKeyBoard from "../components/DismissKeyBoard";
import { useForm } from "react-hook-form";
import styled, { ThemeContext } from "styled-components/native";
import { gql, useMutation } from "@apollo/client";
import { FEED_PHOTO_FRAGMENT } from "../fragment";
import { ReactNativeFile } from "apollo-upload-client";

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.color.blue};
  margin-right: 10px;
  font-weight: 600;
  font-size: 17px;
`;

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ok
      error
      photo {
        ...FeedPhotoFragment
      }
    }
  }
  ${FEED_PHOTO_FRAGMENT}
`;

function UploadForm({ navigation, route }) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const theme = useContext(ThemeContext);
  const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO_MUTATION, {
    update: (cache, result) => {
      const {
        data: { uploadPhoto },
      } = result;
      if (!uploadPhoto.ok) return;
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [...prev, uploadPhoto.photo];
          },
        },
      });
    },
  });

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Upload</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator
      size={"small"}
      color={theme.color.blue}
      style={{ marginRight: 20 }}
    />
  );

  const onValid = ({ payload }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: "1.jpg",
      type: "image/jpeg",
    });
    uploadPhoto({
      variables: {
        file,
        caption: String(payload),
      },
    });
  };

  useEffect(() => {
    register("payload");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      headerBackTitleVisible: loading ? false : true,
    });
  }, [loading]);

  return (
    <DismissKeyBoard>
      <View style={{ flex: 1, backgroundColor: theme.color.bg }}>
        {route?.params?.file !== undefined && (
          <Image
            source={{ uri: route?.params?.file }}
            style={{
              width: "100%",
              height: 300,
              resizeMode: "contain",
              backgroundColor: "black",
            }}
          />
        )}
        <View
          style={{
            borderTopWidth: 1,
            borderColor: theme.color.border,
            height: 100,
            width: "100%",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          <TextInput
            placeholder="write caption..."
            placeholderTextColor="grey"
            onChangeText={(text) => setValue("payload", text)}
            multiline={true}
            returnKeyType="done"
            style={{
              color: theme.color.text,
              width: "100%",
              height: "100%",
            }}
            onSubmitEditing={handleSubmit(onValid)}
          />
        </View>
      </View>
    </DismissKeyBoard>
  );
}

export default UploadForm;
