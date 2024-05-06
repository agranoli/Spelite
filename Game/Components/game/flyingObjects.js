// FlyingObject.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const FlyingObject = ({ initialPositionX, initialPositionY, speed, onCollision }) => {
    const [positionX, setPositionX] = useState(initialPositionX);
    const [positionY, setPositionY] = useState(initialPositionY);
    const [planeImageIndex, setPlaneImageIndex] = useState(0); // Store the index of the selected plane image
    const [spawnedCount, setSpawnedCount] = useState(0); // Keep track of the number of spawned objects
    const maxSpawnCount = 2; // Maximum number of spawned objects
    const planeImages = [
        require('../Images/plane1.png'),
        require('../Images/plane2.png'),
        require('../Images/plane3.png'),
        require('../Images/plane4.png'),
        require('../Images/plane5.png'),
    ]; // Array of plane image imports

    useEffect(() => {
        // Randomly select a plane image index once when the component is initialized
        if (spawnedCount < maxSpawnCount) {
            const randomIndex = Math.floor(Math.random() * planeImages.length);
            setPlaneImageIndex(randomIndex);

            const interval = setInterval(() => {
                setPositionX(prevX => prevX - speed); // Move the object towards the left (plane)
            }, 10);

            setSpawnedCount(prevCount => prevCount + 1); // Increment the spawned count
            return () => clearInterval(interval);
        }
    }, []); // Empty dependency array to ensure this effect runs only once

    useEffect(() => {
        if (positionX <= 0) {
            // Object reached the plane
            onCollision();
        }
    }, [positionX, onCollision]);

    return (
        <View style={[styles.object, { left: positionX, top: positionY }]}>
            {spawnedCount < maxSpawnCount && (
                <Image
                    source={planeImages[planeImageIndex]} // Use the selected image
                    style={styles.image}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    object: {
        position: 'absolute',
    },
    image: {
        width: 80,
        height: 20,
    },
});

export default FlyingObject;
