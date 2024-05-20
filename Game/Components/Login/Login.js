import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, ImageBackground, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Path, Svg } from "react-native-svg";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
            );
        };
        lockOrientation();

    }, []);

    const handleLogin = async () => {
        let hasError = false;
        setUsernameError('');
        setPasswordError('');
        setLoginError('');

        if (!username) {
            setUsernameError('Please enter your username');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Please enter your password');
            hasError = true;
        }

        if (hasError) {
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
                setLoginError('Invalid username or password');
                console.error('Token not found in login response');
            }
        } catch (error) {
            setLoginError('An error occurred during login');
            console.error('Login error:', error);
        }
    };

    return (
        <ImageBackground
            source={require('../Images/background.jpeg')}
            style={styles.backgroundImage}
        >
            <Animated.View style={styles.container}>
                <View style={styles.formContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('Menu')}
                    >
                        <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="white" className="w-6 h-6">
                            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                        />
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    </View>
                    <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                        <Button title="Login" onPress={handleLogin} color="#7393B3" />
                        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
                        <Button title="Don't have an account? Register" onPress={() => navigation.navigate('Register')} color="#7393B3" />
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
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: "100%"
    },
    formContainer: {
        backgroundColor: 'rgba(45, 52, 54, 0.8)',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        height: '100%',
        alignItems: 'center',
        position: 'relative',
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
        width: '90%', // Widened input container
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
        borderColor: '#7393B3',
        width: '100%',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 10
    }
});

export default LoginPage;
