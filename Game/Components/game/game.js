import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View, Button } from 'react-native';
import MovingImage from './movingBackground';
import { TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import sound1 from '../sound/game.mp3';

const sound = require('../sound/game.mp3');

const PlaneGame = () => {
    const [positionY, setPositionY] = useState(200);
    const [positionX, setPositionX] = useState(150);
    const [movingUp, setMovingUp] = useState(false);
    const [soundObject, setSoundObject] = useState(null);
    const [moveInterval, setMoveInterval] = useState(null);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [obstacles, setObstacles] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const [collisionCooldown, setCollisionCooldown] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [isPausedScreen, setIsPausedScreen] = useState(false);

    useEffect(() => {
        const loadSound = async () => {
            try {
                // Provide the URI of the sound file directly
                const { sound: soundObject } = await Audio.Sound.createAsync(
                    require('../sound/game.mp3')
                );
                await soundObject.setVolumeAsync(1);
                await soundObject.playAsync();
                setSoundObject(soundObject);
            } catch (error) {
                console.log('Error playing background music:', error);
            }
        };

        loadSound();

        return () => {
            if (soundObject) {
                soundObject.stopAsync();
                soundObject.unloadAsync();
            }
        };
    }, []);


    useEffect(() => {
        const scoreInterval = setInterval(() => {
            if (!isPausedScreen) {
                setScore(prevScore => prevScore + 1);
            }
        }, 1000);

        return () => clearInterval(scoreInterval);
    }, [isPausedScreen]);

    useEffect(() => {
        const generateObstacle = () => {
            return setInterval(() => {
                if (!isPausedScreen) {
                    const newObstacle = {
                        id: Date.now(),
                        x: Dimensions.get('window').width,
                        y: Math.random() * (Dimensions.get('window').height - 50), // Adjust the 50 based on obstacle size
                        width: 50, // Assuming obstacle width
                        height: 50, // Assuming obstacle height
                    };
                    setObstacles(prevObstacles => [...prevObstacles, newObstacle]);
                }
            }, Math.random() * 2000 + 2000); // Random interval between 2000ms and 4000ms
        };

        const obstacleInterval = generateObstacle();

        return () => clearInterval(obstacleInterval); // Clear interval on component unmount
    }, [isPausedScreen]);

    useEffect(() => {
        const moveObstacles = setInterval(() => {
            if (!isPausedScreen) {
                setObstacles(prevObstacles =>
                    prevObstacles.map(obstacle => {
                        const newX = obstacle.x - 5;
                        return { ...obstacle, x: newX };
                    }).filter(obstacle => obstacle.x > -obstacle.width)
                );
            }
        }, 30);

        return () => clearInterval(moveObstacles);
    }, [isPausedScreen]);

    useEffect(() => {
        if (!isPausedScreen && !collisionCooldown) {
            obstacles.forEach(obstacle => {
                checkCollision(obstacle);
            });
        }
    }, [obstacles, isPausedScreen, collisionCooldown]);

    const handleCollision = (collidedObstacle) => {
        if (!collisionCooldown) {
            setLives(prevLives => prevLives - 1);
            setCollisionCooldown(true);
            setTimeout(() => {
                setCollisionCooldown(false);
            }, 1000); // 1 second cooldown

            setObstacles(prevObstacles => prevObstacles.filter(obstacle => obstacle.id !== collidedObstacle.id));

            if (lives <= 1) {
                // Game over logic
                setGameOver(true);
                setIsPaused(true);
                // setIsPausedScreen(true);
            }
        }
    };

    const quitToMenu = () => {

    };

    const checkCollision = (obstacle) => {
        if (!isPausedScreen && !collisionCooldown) {
            const planeTop = positionY;
            const planeBottom = positionY + 20; // Assuming plane height is 40
            const planeLeft = positionX;
            const planeRight = positionX + 120; // Assuming plane width is 150

            const obstacleTop = obstacle.y;
            const obstacleBottom = obstacle.y + obstacle.height; // Use obstacle's height
            const obstacleLeft = obstacle.x;
            const obstacleRight = obstacle.x + obstacle.width; // Use obstacle's width

            // Check if any part of the plane's hitbox intersects with the obstacle's hitbox
            if (
                planeLeft <= obstacleRight &&
                planeRight >= obstacleLeft &&
                planeTop <= obstacleBottom &&
                planeBottom >= obstacleTop
            ) {
                console.log('Collision detected!');
                handleCollision(obstacle);
                return;
            }
        }
    };

    const resetGame = () => {
        setLives(3);
        setScore(0);
        setObstacles([]);
        setGameOver(false);
    };

    const movePlaneUp = () => {
        if (!isPausedScreen) {
            setMovingUp(true);
            clearInterval(moveInterval);

            const interval = setInterval(() => {
                setPositionY(prevY => Math.max(prevY - 5, 0));
            }, 5);
            setMoveInterval(interval);
        }
    };

    const movePlaneDown = () => {
        if (!isPausedScreen) {
            setMovingUp(false);
            clearInterval(moveInterval);

            const interval = setInterval(() => {
                setPositionY(prevY => Math.min(prevY + 5, Dimensions.get('window').height - 40));
            }, 5);
            setMoveInterval(interval);
        }
    };

    const handlePressIn = () => {
        movePlaneDown();
    };

    const handlePressOut = () => {
        movePlaneUp();
    };

    const handleTogglePause = () => {
        setIsPausedScreen(prevState => !prevState);
    };

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.score}>Score: {String(score).padStart(5, '0')}</Text>
                <View style={styles.row}>
                    {[...Array(lives)].map((_, index) => (
                        <Image key={`life_${index}`} source={require('../Images/gem.png')} style={styles.life} />
                    ))}
                </View>
                <TouchableOpacity style={styles.overlays} onPress={handleTogglePause}>
                    <Text style={styles.pauseBtn}>{isPausedScreen ? 'Resume' : 'Pause'}</Text>
                </TouchableOpacity>

            </View>
            {isPausedScreen && (
                <View style={styles.pauseOverlay}>
                    <Text style={styles.pauseText}>Game Paused</Text>
                </View>
            )}
            <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <View style={styles.container}>
                    <MovingImage />
                    <Image
                        source={require('../Images/plane2.png')}
                        style={[
                            styles.plane,
                            {
                                bottom: positionY,
                                left: positionX,
                                transform: [{ rotate: movingUp ? '10deg' : '-10deg' }],
                            },
                        ]}
                    />
                    {/* Render obstacles */}
                    {obstacles.map(obstacle => (
                        <View
                            key={obstacle.id}
                            style={[
                                styles.obstacle,
                                {
                                    left: obstacle.x,
                                    top: obstacle.y,
                                    width: obstacle.width,
                                    height: obstacle.height,
                                },
                            ]}
                        />
                    ))}
                    {gameOver && (
                        <View style={styles.gameOverScreen}>
                            <Text style={styles.gameOverText}>Game Over</Text>
                            <View style={styles.buttonContainer}>
                                <Button title="Restart" onPress={resetGame} />
                                <Button title="Quit to Menu" onPress={quitToMenu} />
                            </View>
                        </View>
                    )}
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
    life: {
        width: 50,
        height: 50,
        top: 3,
        opacity: 1,
    },
    gameOverScreen: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3, // Change zIndex to 3 to ensure it appears above other elements
    },
    gameOverText: {
        fontSize: 30,
        color: 'white',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        left: 200,
    },
    plane: {
        width: 150,
        height: 40,
        position: 'absolute',
        backgroundColor: 'red',
    },
    header: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 1,
    },
    score: {
        fontSize: 25,
        color: 'darkorange',
        marginLeft: 100,
        top: 10,
        position: 'absolute',
    },
    pauseOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    pauseText: {
        fontSize: 30,
        color: 'white',
    },
    overlays:{
      zIndex: 99,
    },
    pauseBtn: {
        fontSize: 20,
        color: 'green',
        margin: 13,
        zIndex: 99,
    },
    obstacle: {
        position: 'absolute',
        backgroundColor: 'red',
    },
});

export default PlaneGame;