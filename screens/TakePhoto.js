import React, { useState, useEffect, useRef } from "react";
import { View, StatusBar, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
`;
const Actions = styled.View`
  background-color: black;
  flex: 0.3;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const FlashBtn = styled.TouchableOpacity``;
const TakePhotoBtn = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 30px;
  border-width: 5px;
  border-color: grey;
  background-color: white;
`;
const FlipBtn = styled.TouchableOpacity``;
const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
`;
const PhotoAction = styled.TouchableOpacity`
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;
const PhotoActionText = styled.Text`
  font-size: 20px;
`;

function TakePhoto({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.on);
  const [zoomValue, setZoomValue] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState("");
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  const getPermission = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(granted);
  };

  const onCameraSwitch = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onFlashSwitch = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const onCameraReady = () => setCameraReady(true);

  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takePhoto);
    }
    navigation.navigate("UploadForm", { file: takenPhoto });
  };

  const onUpload = () => {
    Alert.alert("Upload", "Do you want to save the photo?", [
      { text: "Save & Upload", onPress: () => goToUpload(true) },
      { text: "Just upload", onPress: () => goToUpload(false) },
    ]);
  };

  const takePhoto = async () => {
    if (cameraRef.current && cameraReady) {
      const { uri, width, height, exif, base64 } =
        await cameraRef.current.takePictureAsync({ quality: 1, exif: true });
      setTakenPhoto(uri);
    }
  };

  const onDismiss = () => setTakenPhoto("");

  useEffect(() => {
    (async () => {
      await getPermission();
    })();
  }, []);

  return (
    <Container>
      <StatusBar hidden={true} />

      {takenPhoto === "" ? (
        isFocused && (
          <Camera
            style={{ flex: 1 }}
            type={cameraType}
            zoom={zoomValue}
            flashMode={flashMode}
            onCameraReady={onCameraReady}
            ref={cameraRef}
          >
            <CloseBtn onPress={() => navigation.navigate("Tabs")}>
              <Ionicons name="close" size={30} color="white" />
            </CloseBtn>
          </Camera>
        )
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}

      {takenPhoto === "" ? (
        <Actions>
          <FlashBtn onPress={onFlashSwitch}>
            <Ionicons
              name={
                flashMode === Camera.Constants.FlashMode.off
                  ? "flash-off"
                  : flashMode === Camera.Constants.FlashMode.auto
                  ? "eye"
                  : "flash"
              }
              color="white"
              size={40}
            />
          </FlashBtn>
          <TakePhotoBtn onPress={takePhoto} />
          <FlipBtn onPress={onCameraSwitch}>
            <Ionicons name="camera-reverse-outline" size={40} color="white" />
          </FlipBtn>
        </Actions>
      ) : (
        <Actions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction>
            <PhotoActionText onPress={onUpload}>Upload</PhotoActionText>
          </PhotoAction>
        </Actions>
      )}

      {takePhoto === "" && (
        <View style={{ alignItems: "center", backgroundColor: "black" }}>
          <Slider
            style={{ width: 200, height: 40, bottom: 0 }}
            minimumValue={0}
            maximumValue={0.05}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="grey"
            value={zoomValue}
            onValueChange={(value) => setZoomValue(value)}
          />
        </View>
      )}
    </Container>
  );
}

export default TakePhoto;
