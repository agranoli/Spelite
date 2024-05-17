import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

const SelectedPlane = () => {
    const [selectedPlaneIndex, setSelectedPlaneIndex] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
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
        }, [])
    );

    const planeImages = [
        require('../Images/plane1.png'),
        require('../Images/plane2.png'),
        require('../Images/plane3.png'),
        require('../Images/plane4.png'),
        require('../Images/plane5.png'),
    ];

    const selectedPlaneImage = planeImages[selectedPlaneIndex];

    return (
        <View style={styles.main}>
            <Image source={selectedPlaneImage} style={styles.image} />
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
