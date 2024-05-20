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
    const [avatars] = useState([
        require('../Images/profile.jpeg'),
        require('../Images/profile1.jpeg'),
        require('../Images/profile2.jpeg'),
        require('../Images/profile3.jpeg')
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

        if (username) {
            requestData.username = username;
        }
        if (password && password === confirmPassword) {
            requestData.password = password;
        }
        if (avatar) {
            requestData.avatar = avatar;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`http://172.20.10.3:8888/updateProfile.php?token=${token}`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Profile updated successfully');
            navigation.replace('ProfileEdit');
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
                <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="white">
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
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
                        {avatars.map((avatarUri, index) => (
                            <TouchableOpacity key={index} onPress={() => setAvatar(avatarUri)}>
                                <Image
                                    source={avatarUri}
                                    style={[
                                        styles.avatar,
                                        avatar === avatarUri && styles.selectedAvatar
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
