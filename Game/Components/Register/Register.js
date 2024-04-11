import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, Easing, ImageBackground } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
            );
        };

        lockOrientation(); // Lock the orientation when the component mounts
        animateForm(); // Start animation
    }, []);

    const animateForm = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 0],
    });

    const handleRegister = () => {
        if (!username || !email || !password) {
            alert('Please fill out all the fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Handle registration logic here
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        // You can add your registration API call here
    };

    const isValidEmail = (email) => {
        // Basic email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <ImageBackground
            source={require('../Images/background.jpeg')}
            style={styles.backgroundImage}
        >
            <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
                <View style={[styles.containerRight, { width: '35%' }]}>
                    <View style={[styles.textContainer, styles.formContainer]}>
                        <Text style={styles.gameText}>
                            Hello, welcome to our endless runner game lets fly pilot !!
                        </Text>
                    </View>
                </View>

                <View style={[styles.containerRight, { width: '65%' }]}>
                    <View style={[styles.formContainer]}>
                        <Text style={styles.title}>Register</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                style={[styles.input, { width: '100%' }]}
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, { width: '100%' }]}
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={[styles.input, { width: '100%' }]}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                            />
                        </View>

                        {/* Register Button */}
                        <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                            <Button title="Register" onPress={handleRegister} color="orange" />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent', // Set background color to transparent
        marginHorizontal: 20, // Add margin to left and right sides
        marginTop: 50, // Add margin to top
        height: '100%', // Add height to fill the screen
    },
    containerLeft: {
        paddingHorizontal: 20,
        width: '35%', // Adjust width
    },
    containerRight: {
        paddingHorizontal: 20,
        width: '65%', // Adjust width
    },
    formContainer: {
        backgroundColor: 'rgba(45, 52, 54, 0.5)', // Semi-transparent background color
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 10, // Add some horizontal margin
        elevation: 5, // Add elevation for shadow on supported devices
        marginTop: 20, // Add margin to top
        height: '100%', // Add height to fill the container
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff', // Set title color to white
        textAlign: 'center', // Center-align the title
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%', // Adjust width
    },
    label: {
        fontSize: 16,
        color: '#fff', // Set label color to white
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        borderColor: 'orange',
        width: '100%', // Adjust width
    },
    textContainer: {
        backgroundColor: 'rgba(255, 154, 0, 0.9)', // Adjust opacity here
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        width: '100%', // Adjust width
    },
    gameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Set text color to white
        textAlign: 'center', // Center-align the game text
    },
});

export default RegisterPage;
