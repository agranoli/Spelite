import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Animated,
    Easing,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Path, Svg } from "react-native-svg";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
    const [plane, setPlane] = useState(1); // Default value for plane
    const [coins, setCoins] = useState(0); // Default value for coins
    const [premium_coins, setPremium_coins] = useState(0); // Default value for premium coins

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

    const isValidEmail = (email) => {
        // Basic email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const postData = async () => {
        try {
            const response = await axios.post('http://172.20.10.3:8888/registerUser.php', {
                username,
                email,
                password,
                confirmPassword,
                avatarURL,
                plane,
                coins,
                premium_coins
            });
            console.log('Response:', response.data);
            // Handle success, navigation, etc.
        } catch (error) {
            console.error('Error:', error);
            // Handle error, display message to the user, etc.
        }
    };

    const handleRegister = () => {
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill out all the fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        postData();
    };

    const handleLogout = async () => {
        try {
            // Clearing AsyncStorage of any tokens
            await AsyncStorage.removeItem('token');
            console.log('Token removed from local storage');

            // Reload the app
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    return (
        <ImageBackground
            source={require('../Images/background.jpeg')}
            style={styles.backgroundImage}
        >
            <Animated.View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="white">
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </Svg>
                </TouchableOpacity>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Register</Text>
                    <View style={styles.rowContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                keyboardType="email-address"
                            />
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                    <View style={styles.horizontal}>
                        <View style={styles.cont}>
                            <Button title="Register" onPress={handleRegister} color="#7393B3" />
                            <Button title="Already have an account? Log in" onPress={() => navigation.navigate('Login')} color="#7393B3" />
                        </View>
                        <View style={styles.cont}>
                            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
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
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(45, 52, 54, 0.8)', // Semi-transparent background color
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    cont:{
        alignItems:"center",
        justifyContent: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    inputContainer: {
        width: '48%',
    },
    horizontal:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: '100%'
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
        fontSize: 16,
        borderColor: '#7393B3',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        right: 10,
        zIndex:1
    },
    logoutButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 20,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default RegisterPage;
