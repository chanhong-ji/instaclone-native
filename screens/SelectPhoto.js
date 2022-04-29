import react, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.color.bg};
`;
const Top = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  flex: 1;
`;
const ImageContainer = styled.TouchableOpacity`
  position: relative;
`;

const IconContainer = styled.View`
  position: absolute;
  z-index: 1;
  bottom: 5px;
  right: 0;
`;
const HeaderRight = styled.Text`
  color: ${(props) => props.theme.color.blue};
  margin-right: 10px;
  font-weight: 600;
  font-size: 17px;
`;

function SelectPhoto({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [selectedPhotoLocalUri, setSelectedPhotoLocalUri] = useState("");
  const theme = useContext(ThemeContext);
  const { width: windowWidth } = useWindowDimensions();

  const headerRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          file: selectedPhotoLocalUri,
        })
      }
    >
      <HeaderRight>Upload</HeaderRight>
    </TouchableOpacity>
  );

  const getPhotos = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync();
    let photos = assets;
    for (let photo of photos) {
      photo.localUri = await (
        await MediaLibrary.getAssetInfoAsync(photo)
      ).localUri;
    }
    setPhotos(photos);
  };

  const getPermission = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.requestPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      getPhotos();
    }
  };

  const renderItem = ({ item: photo }) => (
    <ImageContainer
      onPress={() => {
        setSelectedPhoto(photo.uri);
        setSelectedPhotoLocalUri(photo.localUri);
      }}
    >
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={20}
          color={photo.uri === selectedPhoto ? theme.color.blue : "white"}
        />
      </IconContainer>
      <Image
        source={{ uri: photo.uri }}
        style={{
          width: windowWidth / 4,
          height: windowWidth / 4,
        }}
      />
    </ImageContainer>
  );

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [selectedPhoto]);

  return (
    <Container>
      <Top>
        {selectedPhoto !== "" && (
          <Image
            source={{ uri: selectedPhoto }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Bottom>
    </Container>
  );
}

export default SelectPhoto;
