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

    const handleLogout = () => {
        // Clear user data, session, or authentication token (if applicable)
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAvatarURL('');
        setPlane(1);
        setCoins(0);
        setPremium_coins(0);

        // Navigate to the login screen
        navigation.navigate('Menu');
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
                        {/* Logout button */}
                        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="white" className="w-6 h-6">
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </Svg>

                </TouchableOpacity>
                <View style={styles.photoContainer}>
                    <View style={[styles.containerRight, { width: '65%' }]}>
                        <View style={[styles.formContainer]}>
                            <Text style={styles.title}>Register</Text>
                            <View style={styles.fitment}>
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
                            </View>
                            <View style={styles.fitment}>
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
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <TextInput
                                        style={[styles.input, { width: '100%' }]}
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                        secureTextEntry
                                    />
                                </View>
                            </View>
                            <View style={styles.LongInputContainer}>
                                <Text style={styles.label}>Select avatar</Text>
                                <TextInput
                                    style={[styles.input, { width: '100%' }]}
                                    placeholder="Enter avatar URL"
                                    value={avatarURL}
                                    onChangeText={(text) => setAvatarURL(text)}
                                />
                            </View>
                            {/* Register Button */}
                            <View style={styles.inputContainer}>
                                <Button title="Register" onPress={handleRegister} color="orange" />
                            </View>
                            <View style={styles.LongInputContainer}>
                                <Button title="Already have an account? Log in" onPress={() => navigation.navigate('Login')} color="orange" />
                            </View>
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
    fitment: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
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
        height: '100%',
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff', // Set title color to white
        textAlign: 'center', // Center-align the title
    },
    LongInputContainer: {
        width: '90%', // Adjust width
    },
    inputContainer: {
        width: '42%', // Adjust width
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
        fontSize: 16,
        borderColor: 'orange',
        width: '90%', // Adjust width
    },
    textContainer: {
        backgroundColor: 'rgba(255, 154, 0, 0.9)', // Adjust opacity here
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        width: '90%', // Adjust width
    },
    gameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Set text color to white
        textAlign: 'center', // Center-align the game text
    },
    logoutButton: {
        backgroundColor: 'orange',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 10,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1 // Add zIndex style
    },
    photoContainer: {
        width: "90%"
    }
});

export default RegisterPage;
