import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Text } from 'react-native';

const PlaneSelectScreen = ({ navigation }) => {
    const [selectedPlane, setSelectedPlane] = useState(0);
    const scrollViewRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const planeWidth = screenWidth * 0.6;
    const planeHeight = screenHeight * 0.6;
    const smallPlaneWidth = screenWidth * 0.3;
    const smallPlaneHeight = planeHeight * 0.5;
    const padding = (screenWidth - planeWidth) / 2; // Calculate the padding

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newSelectedPlane = Math.round(contentOffsetX / (planeWidth + 20)); // Adjust this value according to your needs
        setSelectedPlane(newSelectedPlane);
    };

    const handlePlaneSelect = (index) => {
        setSelectedPlane(index);
        scrollViewRef.current.scrollTo({
            x: (index * (planeWidth + 20)), // Adjust this value according to your needs
            animated: true
        });
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
                contentContainerStyle={{...styles.scrollView, paddingHorizontal: padding}} // Add padding to the scroll view
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                snapToInterval={planeWidth + 20} // Adjust this value according to your needs
                decelerationRate="fast"
                scrollEnabled={selectedPlane !== null}
                onScroll={handleScroll} // Use onScroll instead of onMomentumScrollEnd
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
                            <TouchableOpacity style={styles.selectButton} onPress={() => console.log('Plane selected')}>
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
                <Text style={styles.backButtonText}>Back</Text>
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
        margin: 10, // Added margin to create space between images
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#0096FF',
        padding: 10,
        borderRadius: 8,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PlaneSelectScreen;