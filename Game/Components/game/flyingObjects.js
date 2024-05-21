import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const FlyingObject = ({ initialPositionX, initialPositionY, width, height, onPositionUpdate, id, isPaused }) => {
    const [positionX, setPositionX] = useState(initialPositionX);

    useEffect(() => {
        if (!isPaused) {
            const moveObstacle = setInterval(() => {
                setPositionX(prevPositionX => {
                    const newPositionX = prevPositionX - 10; // Move the obstacle to the left
                    onPositionUpdate(id, initialPositionY, newPositionX); // Notify parent with new position
                    return newPositionX;
                });
            }, 100); // Adjust the interval as needed

            return () => clearInterval(moveObstacle);
        }
    }, [isPaused, onPositionUpdate, id, initialPositionY]);

    return (
        <View style={[styles.obstacle, { left: positionX, top: initialPositionY, width, height }]} />
    );
};

const styles = StyleSheet.create({
    obstacle: {
        position: 'absolute',
        backgroundColor: 'red', // Customize the style as needed
    },
});

export default FlyingObject;
