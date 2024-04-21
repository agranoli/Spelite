import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectedPlane = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [planeImage, setPlaneImage] = useState(null);

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

                // Logic to set plane image based on userData
                if (userData && userData.plane) {
                    switch (userData.plane) {
                        case 1:
                            setPlaneImage(require('../Images/plane1.png'));
                            break;
                        case 2:
                            setPlaneImage(require('../Images/plane2.png'));
                            break;
                        case 3:
                            setPlaneImage(require('../Images/plane3.png'));
                            break;
                        case 4:
                            setPlaneImage(require('../Images/plane4.png'));
                            break;
                        case 5:
                            setPlaneImage(require('../Images/plane5.png'));
                            break;
                        default:
                            setPlaneImage(null); // No image for other planes
                            break;
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, [navigation]);

    return (
        <View style={styles.main}>
            {planeImage && <Image source={planeImage} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400, // Adjust as needed
        height: 250, // Adjust as needed
    },
});

export default SelectedPlane;
