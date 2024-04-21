import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import ProfileStats from "./ProfileStats";
import ShopIcon from "./ShopIcon";
import SideComponents from "./SideComponents";
import StartButton from "./StartButton";
import SelectedPlane from "./SelectedPlane";
// import { ModelView } from 'react-native-3d-model-view';
// import { GLView } from 'expo-gl';
// import { Renderer } from 'expo-three';

const MenuScreen = ({navigation}) => {
    // const [fontLoaded] = useFonts({
    //     'Kode': require('../../assets/fonts/KodeMono-VariableFont_wght.ttf'),
    // });

    // if (!fontLoaded) {
    //     return null; // or a loading indicator
    // }

    return (
        <View style={styles.mainScreen}>
            <Image
                source={require('../Images/background.jpeg')}
                style={styles.background}
            />
            <View style={styles.centerPlane}>
                <SelectedPlane />
            </View>
            <ProfileStats navigation={navigation}/>
            <ShopIcon />
            <SideComponents navigation={navigation} />
            <StartButton />
            {/*<ModelView*/}
            {/*    style={styles.model}*/}
            {/*    source={{*/}
            {/*        obj: require('../Models/airplane1.obj'), // Corrected path*/}
            {/*        mtl: require('../Models/airplane1.mtl'), // Corrected path*/}
            {/*    }}*/}
            {/*/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        height: "100%",
        fontFamily: "Kode"
    },
    centerPlane:{
        flex:1,
        alignItems:"center",
        justifyContent: "center"
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        opacity: 0.95,
        position: "absolute"
    },
    model: {
        width: '80%', // Adjust size as needed
        aspectRatio: 1, // Ensure the model retains its aspect ratio
    },
});

export default MenuScreen;