import { View, StyleSheet, Image, Text, Pressable, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import Gem from "../Images/gem.png";
import { Audio } from 'expo-av';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const prices = [
    { gems: 50, price: 2.99 },
    { gems: 100, price: 4.99 },
    { gems: 200, price: 8.99 },
    { gems: 500, price: 19.99 },
    { gems: 1000, price: 34.99 },
    { gems: 2000, price: 59.99 },
];

function Shop() {
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);// Initialize navigation hook

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setShowPaymentModal(true);
    };

    const [fontLoaded] = useFonts({
        'Kode': require('../../assets/fonts/KodeMono-VariableFont_wght.ttf'),
    });

    if (!fontLoaded) {
        return null; // or a loading indicator
    }

    useEffect(() => {
        let soundObject;

        const playBackgroundMusic = async () => {
            try {
                soundObject = new Audio.Sound();
                await soundObject.loadAsync(require('../sound/menu1.mp3'));
                await soundObject.setVolumeAsync(1);
                await soundObject.playAsync();
            } catch (error) {
                console.log('Error playing background music:', error);
            }
        };

        playBackgroundMusic();

        return () => {
            if (soundObject) {
                soundObject.stopAsync();
                soundObject.unloadAsync();
            }
        };
    }, []);

    const handleReturnPress = () => {
        navigation.navigate('Menu'); // Navigate to MenuScreen when return button is pressed
    };

    const handleShop = () => {
        navigation.navigate('Payment'); // Navigate to MenuScreen when return button is pressed
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.back}>
                    <Pressable onPress={handleReturnPress}>
                        <Svg width={50} height={50} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </Svg>
                    </Pressable>
                </View>
                <Image
                    source={require('../Images/background.jpeg')}
                    style={styles.background}
                />
                <View style={styles.box}>
                    {prices.map((item, index) => (
                        <View style={styles.gems} key={index}>
                            <Image
                                source={Gem}
                                style={styles.gem}
                            />
                            <Text style={styles.desc}>{item.gems} LS</Text>
                            <Pressable style={styles.price} onPress={handleShop}>
                                <Text style={styles.tag}>{item.price}$</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#0096FF",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    tag: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'Kode',
    },
    back: {
        position: "absolute",
        flex: 1,
        right: 20,
        top: 5,
        zIndex: 1,
    },
    price: {
        position: "absolute",
        bottom: 5,
        backgroundColor: "green",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        borderRadius: 20, // Add border radius for rounded corners
    },
    desc: {
        position: "absolute",
        right: 13,
        fontFamily: 'Kode',
        fontSize: 25,
        top: 8,
    },
    gem: {
        position: "absolute",
        left: 0,
        top: 20,
        width: "65%",
        height: "65%",
    },
    gems: {
        position: "relative",
        height: "45%",
        width: "30%",
        margin: 5,
        // backgroundColor: "#00000099",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: "white",
    },
    box: {
        flex: 1,
        width: "70%",
        flexDirection: "row",
        padding: 5,
        paddingTop: 20,
        margin: 30,
        backgroundColor: "rgba(255, 255, 255, 0.80)",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        opacity: 0.95,
        position: "absolute"
    }
})
export default Shop;
