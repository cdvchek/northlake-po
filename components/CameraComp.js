import { View, Pressable, Image, StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Camera, CameraType } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CameraComp({ setCameraOpen, setReceiptPhoto }) {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
    const [image, setImage] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);
    const [flashOn, setFlashOn] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        processCameraPermissions();
    },[]);

    const processCameraPermissions = async () => {
        await checkCameraPermissions();

        if (!hasCameraPermissions) {
            await requestCameraPermissions();
        }
    }

    const checkCameraPermissions = async () => {
        const { status } = await Camera.getCameraPermissionsAsync();

        if (status === 'granted') {
            setHasCameraPermissions(true);
        }
    }

    const requestCameraPermissions = async () => {
        // MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        if (cameraStatus.status === 'granted') {
            setHasCameraPermissions(true);
        } else {
            exitCamera();
        }
    }

    const toggleFlash = () => {
        if (flashOn) {
            setCameraFlash(Camera.Constants.FlashMode.off);
            setFlashOn(false);
        } else {
            setCameraFlash(Camera.Constants.FlashMode.on);
            setFlashOn(true);
        }
    }

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const pictureData = await cameraRef.current.takePictureAsync({
                    quality: 0.1,
                    skipProcessing: true,
                 });
                setImage(pictureData);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const takeAnotherPicture = () => {
        setImage(null);
    }

    const savePicture = async () => {
        await setReceiptPhoto(image);
        setImage(null);
        setFlashOn(false);
        setCameraFlash(Camera.Constants.FlashMode.off);
        setCameraOpen(false);
    }

    const exitCamera = () => {
        setImage(null);
        setFlashOn(false);
        setCameraFlash(Camera.Constants.FlashMode.off);
        setCameraOpen(false);
    }

    return (
        <>
        {!image ?
        <View style={styles.view}>
            <View style={styles.flashBar}>
                <Pressable style={styles.button} onPress={exitCamera}>
                    <Ionicons name="arrow-back-circle-outline" size={32} />
                </Pressable>
                <Pressable style={styles.button} onPress={toggleFlash}>
                    {flashOn ? 
                    <Ionicons name="flash-outline" size={26} />
                    :
                    <Ionicons name="flash-off-outline" size={26} />
                    }
                </Pressable>
            </View>
            <Camera
                style={styles.camera}
                type={cameraType}
                flashMode={cameraFlash}
                ref={cameraRef}
            ></Camera>
            <View style={styles.pictureBar}>
                <Pressable style={styles.button} onPress={takePicture}>
                    <Ionicons name="ellipse-outline" size={62} color="black" />    
                </Pressable>    
            </View>
        </View>
        :
        <View style={styles.view}>
            <View style={styles.view} >
                <Image source={{uri: image.uri}} style={styles.camera}/>
            </View>
            <View style={styles.pictureBar}>
                <Pressable style={styles.button} onPress={takeAnotherPicture}>
                    <Ionicons name="close-circle-outline" size={40} color="black" />    
                </Pressable>
                <Pressable style={styles.button} onPress={savePicture}>
                    <Ionicons name="checkmark-circle-outline" size={40} color="black" />    
                </Pressable> 
            </View>
        </View>
        }
        </>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    flashBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingTop: 62,
        paddingBottom: 15,
    },
    pictureBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        height: 108,
        paddingTop: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});