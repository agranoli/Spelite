import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileStats = ({ navigation }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

                console.log('Token:', token);

                const response = await fetch(`http://172.20.10.3:8888/getUserData.php?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    console.error('Failed to fetch user data:', response.statusText);
                    return;
                }

                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, [navigation]);


    return (
        <View style={styles.main}>
            <TouchableOpacity style={[styles.imageContainer, styles.shadowProp]}
                              onPress={() => navigation.navigate('Register')}>
                <Image source={{ uri: userData?.avatarUrl }} // Use user's avatarUrl for the image source
                       style={styles.imageBorder}>
                </Image>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.levelContainer, styles.shadowProp]}
                  onPress={() => navigation.navigate('Edit')}>
                <Text style={styles.profileText}>
                    {userData?.username} {/* Use optional chaining to avoid errors if userData is null */}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main:{
        position: "absolute",
        width: "27%",
        height: "15%",
        zIndex: 1,
        top: 20,
        left: 50,
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        fontFamily: "Kode"
    },
    imageBorder: {
        borderWidth: 3,
        borderColor: 'white',
        height: "80%",
        width: "80%"
    },
    levelContainer: {
        width: "70%",
        height: "100%",
        marginLeft:5,
        backgroundColor: "#7393B3",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    imageContainer: {
        width: "25%",
        height: "100%",
        backgroundColor: "#7393B3",
        justifyContent: "center",
        alignItems: "center",
    },
    profileText: {
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 5,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
    }
});

export default ProfileStats;
