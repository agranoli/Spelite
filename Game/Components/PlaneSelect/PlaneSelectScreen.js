import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Text } from 'react-native';
import { Path, Svg } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectedPlane from '../Start/SelectedPlane'; // Import the SelectedPlane component

const PlaneSelectScreen = ({ navigation }) => {
    const [selectedPlaneIndex, setSelectedPlaneIndex] = useState(0);
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
        setSelectedPlaneIndex(newSelectedPlane);
    };

    const handlePlaneSelect = async (index) => {
        setSelectedPlaneIndex(index);

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
            {/* Your plane selection UI */}
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
            <SelectedPlane selectedImageIndex={selectedPlaneIndex} /> {/* Pass the selected plane index */}
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
