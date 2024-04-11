import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, Easing, ImageBackground } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const LoginPage = () => {
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

    const handleLogin = () => {
        if (!email || !password) {
            alert('Please fill out all the fields');
            return;
        }

        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
        // You can add your login API call here
    };

    return (
        <ImageBackground
            source={require('../Images/background.jpeg')}
            style={styles.backgroundImage}
        >
            <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login</Text>

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

                    {/* Login Button */}
                    <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                        <Button title="Login" onPress={handleLogin} color="orange" />
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
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        backgroundColor: 'transparent', // Set background color to transparent
        marginHorizontal: 20, // Add margin to left and right sides
        marginTop: 50, // Add margin to top
    },
    formContainer: {
        backgroundColor: 'rgba(45, 52, 54, 0.5)', // Semi-transparent background color
        borderRadius: 10,
        padding: 20,
        elevation: 5, // Add elevation for shadow on supported devices
        height: 'auto', // Remove fixed height
        width: '80%', // Adjust width
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        borderColor: 'orange',
        width: '100%',
    },
});

export default LoginPage;
