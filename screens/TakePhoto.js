import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

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

function TakePhoto({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.on);
  const [zoomValue, setZoomValue] = useState(0);

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

  useEffect(() => {
    (async () => {
      await getPermission();
    })();
  }, []);

  return (
    <Container>
      <StatusBar hidden={true} />
      {hasPermission && (
        <Camera
          style={{ flex: 1 }}
          type={cameraType}
          zoom={zoomValue}
          flashMode={flashMode}
        >
          <CloseBtn onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" size={30} color="white" />
          </CloseBtn>
        </Camera>
      )}
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
        <TakePhotoBtn></TakePhotoBtn>
        <FlipBtn onPress={onCameraSwitch}>
          <Ionicons name="camera-reverse-outline" size={40} color="white" />
        </FlipBtn>
      </Actions>
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
    </Container>
  );
}

export default TakePhoto;
