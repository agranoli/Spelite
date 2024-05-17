import React, { useState, useEffect } from 'react';
import { ImageBackground,View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Path, Svg} from "react-native-svg";

const PlaneSelectScreen = ({ navigation }) => {
    const [selectedPlaneIndex, setSelectedPlaneIndex] = useState(0);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const planeWidth = screenWidth * 0.6;
    const planeHeight = screenHeight * 0.6;
    const smallPlaneWidth = screenWidth * 0.3;
    const smallPlaneHeight = planeHeight * 0.5;
    const padding = (screenWidth - planeWidth) / 2;

    useEffect(() => {
        const fetchSelectedPlaneIndex = async () => {
            try {
                const storedIndex = await AsyncStorage.getItem('selectedPlaneIndex');
                if (storedIndex !== null) {
                    setSelectedPlaneIndex(parseInt(storedIndex, 10)); // Parse to integer
                    console.log('Selected plane index retrieved from AsyncStorage:', storedIndex);
                }
            } catch (error) {
                console.error('Error retrieving selected plane index from AsyncStorage:', error);
            }
        };

        fetchSelectedPlaneIndex();
    }, []);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newSelectedPlane = Math.round(contentOffsetX / (planeWidth + 20));
        setSelectedPlaneIndex(newSelectedPlane);
    };

    const handlePlaneSelect = async (index) => {
        try {
            // Save the selected plane index to AsyncStorage
            await AsyncStorage.setItem('selectedPlaneIndex', String(index));
            console.log('Selected plane index saved:', index);

            // Navigate back to the previous screen
            navigation.goBack();
        } catch (error) {
            console.error('Error saving selected plane index:', error);
        }
    };

    const planeImages = [
        require('../Images/plane1.png'),
        require('../Images/plane2.png'),
        require('../Images/plane3.png'),
        require('../Images/plane4.png'),
        require('../Images/plane5.png'),
    ];

    return (
        <ImageBackground
            source={require('../Images/background.jpeg')}
            style={styles.backgroundImage}
        >
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Menu')}
            >
                <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="white">
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </Svg>
            </TouchableOpacity>

            <ScrollView
                horizontal
                contentContainerStyle={{ ...styles.scrollView, paddingHorizontal: padding }}
                showsHorizontalScrollIndicator={false}
                snapToInterval={planeWidth + 20}
                decelerationRate="fast"
                scrollEventThrottle={16}
                scrollEnabled={selectedPlaneIndex !== null}
                onScroll={handleScroll}
                pagingEnabled
            >
                {planeImages.map((image, index) => (
                    <View key={index} style={styles.planeItem}>
                        <TouchableOpacity
                            style={[styles.planeImageContainer, { width: planeWidth, margin: 10 }]}
                            onPress={() => handlePlaneSelect(index)}
                            activeOpacity={0.8}
                        >
                            <Image source={image} style={[styles.planeImage, { height: index === selectedPlaneIndex ? planeHeight : smallPlaneHeight }]} />
                        </TouchableOpacity>
                        {index === selectedPlaneIndex && (
                            <TouchableOpacity style={styles.selectButton} onPress={() => handlePlaneSelect(index)}>
                                <Text style={styles.selectButtonText}>Select</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    backButtonText: {
        color: '#0096FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
    },
    planeItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    planeImageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
    },
    planeImage: {
        width: '100%',
        resizeMode: 'cover',
    },
    selectButton: {
        marginTop: 10,
        backgroundColor: '#0096FF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    selectButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PlaneSelectScreen;
