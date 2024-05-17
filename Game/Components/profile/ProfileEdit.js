import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Path, Svg } from "react-native-svg";

const ProfileEdit = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatars] = useState([
        { uri: 'data:image/jpeg;base64,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' },
        { uri: 'data:image/jpeg;base64,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' },
        { uri: 'data:image/jpeg;base64,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' },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZm3xqMSA_EXBNhZe7E3X3NUJkqc4CbYa8A&s' }
    ]);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`http://172.20.10.3:8888/getUserData.php?token=${token}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUsername(response.data.username);
                    setAvatar(response.data.avatar);
                }
            } catch (error) {
                console.error('Failed to load profile:', error);
            }
        };

        loadProfile();
    }, []);

    const handleSave = async () => {
        let requestData = {};

        // Only include fields that are filled
        if (username) {
            requestData.username = username;
        }
        if (password && password === confirmPassword) {
            requestData.password = password;
        }
        if (avatarUrl) {
            requestData.avatar = avatarUrl;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`http://172.20.10.3:8888/updateProfile.php`, {
                ...requestData,
                token: token,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Reload the app by navigating back to the menu and resetting the stack
            navigation.reset({
                index: 0,
                routes: [{ name: 'Menu' }],
            });
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile');
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
                <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </Svg>
            </TouchableOpacity>
            <Animated.View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Edit Profile</Text>
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
                    <Text style={styles.label}>Select Avatar</Text>
                    <View style={styles.avatarsContainer}>
                        {avatars.map((avatarObj, index) => (
                            <TouchableOpacity key={index} onPress={() => setAvatarUrl(avatarObj.uri)}>
                                <Image
                                    source={{ uri: avatarObj.uri }}
                                    style={[
                                        styles.avatar,
                                        avatarUrl === avatarObj.uri && styles.selectedAvatar
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Button title="Save" onPress={handleSave} color="orange" />
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
        backgroundColor: 'rgba(45, 52, 54, 0.6)',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputContainer: {
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        borderColor: 'orange',
        width: '100%',
        color: '#fff',
    },
    avatarsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginHorizontal: 10,
    },
    selectedAvatar: {
        borderWidth: 2,
        borderColor: 'orange',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
});

export default ProfileEdit;
