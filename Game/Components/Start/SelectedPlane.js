import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SelectedPlane = ({ route }) => {
    const { selectedPlaneIndex } = route.params;

    const [planeImage, setPlaneImage] = useState(null);

    useEffect(() => {
        const planeImages = [
            require('../Images/plane1.png'),
            require('../Images/plane2.png'),
            require('../Images/plane3.png'),
            require('../Images/plane4.png'),
            require('../Images/plane5.png'),
        ];

        if (selectedPlaneIndex >= 0 && selectedPlaneIndex < planeImages.length) {
            setPlaneImage(planeImages[selectedPlaneIndex]);
        } else {
            setPlaneImage(null); // No image for invalid plane index
        }
    }, [selectedPlaneIndex]);

    return (
        <View style={styles.main}>
            {planeImage && <Image source={planeImage} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400, // Adjust as needed
        height: 250, // Adjust as needed
    },
});

export default SelectedPlane;
