import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const MovingImage = () => {
    const [positionX, setPositionX] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPositionX(prevX => {
                let newPosition = prevX - 3; // Move image to the left

                // Reset position to create a seamless loop
                if (newPosition <= -screenWidth) {
                    newPosition = 0;
                }

                return newPosition;
            });
        }, 35); // Adjust the interval for smoother animation

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../Images/sky.jpg')}
                style={[styles.image, { left: positionX }]}
            />
            <Image
                source={require('../Images/sky.jpg')}
                style={[styles.image, { left: positionX + screenWidth }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: 'absolute',
        // marginLeft: "-100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    image: {
        position: 'absolute',
        width: "100%", // Set the width of the images to the screen width
        height: '100%',
        resizeMode: 'cover',
    },
});

export default MovingImage;
