import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Animated, Easing, ImageBackground, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Path, Svg } from "react-native-svg";
import axios from 'axios'; // Import Axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
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

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please fill out all the fields');
            return;
        }

        try {
            const response = await axios.post('http://172.20.10.3:8888/login.php', {
                username,
                password
            });
            console.log('Login response:', response.data);

            if (response.data.token) {
                await AsyncStorage.setItem('token', response.data.token);
                navigation.navigate('Menu');
            } else {
                console.error('Token not found in login response');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <ImageBackground
            source={require('../Images/background.jpeg')}
            style={styles.backgroundImage}
        >
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Menu')}
            >
                <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="white" className="w-6 h-6">
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                </Svg>
            </TouchableOpacity>
            <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login</Text>
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
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20
    }
});

export default LoginPage;
