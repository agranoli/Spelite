import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Text } from 'react-native';
import { Path, Svg } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlaneSelectScreen = ({ navigation }) => {
    const [selectedPlane, setSelectedPlane] = useState(0);
    const scrollViewRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const planeWidth = screenWidth * 0.6;
    const planeHeight = screenHeight * 0.6;
    const smallPlaneWidth = screenWidth * 0.3;
    const smallPlaneHeight = planeHeight * 0.5;
    const padding = (screenWidth - planeWidth) / 2;

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newSelectedPlane = Math.round(contentOffsetX / (planeWidth + 20));
        setSelectedPlane(newSelectedPlane);
    };

    const handlePlaneSelect = async (index) => {
        setSelectedPlane(index);
        scrollViewRef.current.scrollTo({
            x: index * (planeWidth + 20),
            animated: true
        });

        try {
            // Save the selected plane index to AsyncStorage
            await AsyncStorage.setItem('selectedPlane', String(index));
            console.log('Selected plane index saved:', index);
        } catch (error) {
            console.error('Error saving selected plane:', error);
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
        <View style={styles.container}>
            <Image
                source={require('../Images/background.jpeg')}
                style={styles.background}
            />
            <ScrollView
                horizontal
                contentContainerStyle={{ ...styles.scrollView, paddingHorizontal: padding }}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                snapToInterval={planeWidth + 20}
                decelerationRate="fast"
                scrollEventThrottle={16} // Receive all scroll events
                scrollEnabled={selectedPlane !== null}
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
                            <Image source={image} style={[styles.planeImage, { height: index === selectedPlane ? planeHeight : smallPlaneHeight }]} />
                        </TouchableOpacity>
                        {index === selectedPlane && (
                            <TouchableOpacity style={styles.selectButton} onPress={() => handlePlaneSelect(index)}>
                                <Text style={styles.selectButtonText}>Select</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Menu')}
            >
                <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="white" className="w-6 h-6">
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
        height: "100%"
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.95,
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
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20
    }
});

export default PlaneSelectScreen;
