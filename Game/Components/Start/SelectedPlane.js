import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SelectedPlane = ({ route }) => {
    console.log("Route:", route); // Add this line to check the route object
    const selectedImageIndex = route?.params?.selectedImageIndex ?? 0; // Use optional chaining and nullish coalescing

    const [planeImage, setPlaneImage] = useState(null);

    useEffect(() => {
        const planeImages = [
            require('../Images/plane1.png'),
            require('../Images/plane2.png'),
            require('../Images/plane3.png'),
            require('../Images/plane4.png'),
            require('../Images/plane5.png'),
        ];

        if (selectedImageIndex >= 0 && selectedImageIndex < planeImages.length) {
            setPlaneImage(planeImages[selectedImageIndex]);
        } else {
            setPlaneImage(null); // No image for invalid index
        }
    }, [selectedImageIndex]);

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
