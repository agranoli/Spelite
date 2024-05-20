import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { Audio } from 'expo-av';
import ProfileStats from "./ProfileStats";
import ShopIcon from "./ShopIcon";
import SideComponents from "./SideComponents";
import StartButton from "./StartButton";
import SelectedPlane from "./SelectedPlane";

const MenuScreen = ({ navigation }) => {
    const [sound, setSound] = useState(null);

    useEffect(() => {
        let soundObject;

        const loadSound = async () => {
            soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(require('../../assets/sound/menu.mp3'));
                await soundObject.playAsync();
                setSound(soundObject); // Set the sound object to state after it's loaded and playing
            } catch (error) {
                console.error('Error loading or playing sound:', error);
            }
        };

        loadSound();

        return () => {
            if (soundObject) {
                soundObject.unloadAsync();
            }
        };
    }, []);

    const playSound = async () => {
        if (sound) {
            try {
                await sound.replayAsync();
            } catch (error) {
                console.error('Error replaying sound:', error);
            }
        } else {
            console.log('Sound is not loaded yet.');
        }
    };

    return (
        <View style={styles.mainScreen}>
            <Image
                source={require('../Images/background.jpeg')}
                style={styles.background}
            />
            <View style={styles.centerPlane}>
                <SelectedPlane />
            </View>
            <ProfileStats navigation={navigation} />
            <ShopIcon navigation={navigation} />
            <SideComponents navigation={navigation} />
            <StartButton navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        height: "100%",
        fontFamily: "Kode"
    },
    centerPlane: {
        flex: 1,
        alignItems: "center",
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
        width: '80%',
        aspectRatio: 1
    },
});

export default MenuScreen;
