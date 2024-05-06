// PlaneGame.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import MovingImage from "./movingBackground";
import { Audio } from 'expo-av';
import FlyingObject from './flyingObjects'; // Import the FlyingObject component

const PlaneGame = () => {
    const [positionY, setPositionY] = useState(200);
    const [positionX, setPositionX] = useState(150);
    const [movingUp, setMovingUp] = useState(false);
    const [soundObject, setSoundObject] = useState(null);
    const [moveInterval, setMoveInterval] = useState(null);
    const [objects, setObjects] = useState([]); // Store flying objects

    useEffect(() => {
        const playBackgroundMusic = async () => {
            try {
                const soundObj = new Audio.Sound();
                await soundObj.loadAsync(require('../sound/menu1.mp3'));
                await soundObj.setVolumeAsync(1);
                await soundObj.playAsync();
                setSoundObject(soundObj);
            } catch (error) {
                console.log('Error playing background music:', error);
            }
        };

        playBackgroundMusic();

        return () => {
            if (soundObject) {
                soundObject.stopAsync();
                soundObject.unloadAsync();
            }
        };
    }, []);

    const movePlaneUp = () => {
        setMovingUp(true);
        clearInterval(moveInterval);

        const interval = setInterval(() => {
            setPositionY(prevY => Math.max(prevY + 5, 60)); // Adjusted to prevent going off-screen
        }, 5);
        setMoveInterval(interval);
    };

    const movePlaneDown = () => {
        setMovingUp(false);
        clearInterval(moveInterval);

        const interval = setInterval(() => {
            setPositionY(prevY => Math.min(prevY - 5, screenHeight - 140)); // Adjusted to prevent going off-screen
        }, 5);
        setMoveInterval(interval);
    };


    const handlePressIn = () => {
        movePlaneUp();
    };

    const handlePressOut = () => {
        movePlaneDown();
    };

    // useEffect(() => {
    //     // Add flying objects
    //     const interval = setInterval(() => {
    //         const newObjects = [...objects];
    //         newObjects.push({
    //             id: newObjects.length,
    //             positionX: Dimensions.get('window').width,
    //             positionY: Math.floor(Math.random() * (Dimensions.get('window').height - 100)),
    //             speed: Math.floor(Math.random() * 5) + 1, // Random speed between 1 and 5
    //         });
    //         setObjects(newObjects);
    //     }, 3000); // Adjust the interval as needed to control the frequency of flying objects
    //
    //     return () => clearInterval(interval);
    // }, []);

    const handleCollision = (objectId) => {
        // Remove the collided object from the objects array
        setObjects(objects.filter(obj => obj.id !== objectId));
    };

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const clampedY = Math.min(Math.max(positionY, 40), screenHeight - 100);
    const clampedX = Math.min(Math.max(positionX, 0), screenWidth - 150);

    return (
<>
        <View style={styles.header}>
            <Text style={styles.score}>Score: 00000</Text>
            <View style={styles.row}>
                <Image source={require('../Images/gem.png')} style={styles.life}/>
                <Image source={require('../Images/gem.png')} style={styles.life}/>
                <Image source={require('../Images/gem.png')} style={styles.life}/>
            </View>
        </View>
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <View style={styles.container}>

                <MovingImage />
                {/* Render flying objects */}
                {/*{objects.map(obj => (*/}
                {/*    <FlyingObject*/}
                {/*        key={obj.id}*/}
                {/*        initialPositionX={obj.positionX}*/}
                {/*        initialPositionY={obj.positionY}*/}
                {/*        speed={obj.speed}*/}
                {/*        onCollision={() => handleCollision(obj.id)}*/}
                {/*    />*/}
                {/*))}*/}
                <Image
                    source={require('../Images/plane2.png')}
                    style={[
                        styles.plane,
                        {
                            bottom: clampedY,
                            left: clampedX,
                            transform: [{ rotate: movingUp ? '-15deg' : '15deg' }],
                        },
                    ]}
                />
            </View>
        </TouchableWithoutFeedback>
</>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    life:{
        width: 80,
        height: 30,
        top: 10,
        opacity: 1,
    },
    row:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        width: 100,
        left: 200,
    },
    plane: {
        width: 150,
        height: 40,
        position: 'absolute',
        borderWidth: 2,
        borderColor: 'red',
    },
    header: {
        flex: 1,
        position: 'absolute',
        backgroundColor: "transparent",
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        zIndex: 1,
    },
    score:{
        fontSize: 25,
        color: "darkorange",
        marginLeft: 100,
        top: 10,
        position: "absolute",
    }
});

export default PlaneGame;
