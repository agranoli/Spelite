import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import gem from "../Images/gem.png";

const ShopIcon = ({ navigation }) => {
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
            <View style={[styles.coinContainer, styles.shadowProp]}>
                <View style={styles.currencySort}>
                    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                        <Path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </Svg>
                    <Text style={styles.profileText}>
                        {userData?.coins}
                    </Text>
                </View>
                <View style={styles.currencySort}>
                    <Image source={gem} style={styles.gems} />
                    <Text style={styles.profileText}>
                        {userData?.premium_coins}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={[styles.shopIcon, styles.shadowProp]}
                              onPress={() => navigation.navigate('Shop')}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="white">
                    <Path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        position: "absolute",
        width: "27%",
        height: "15%",
        zIndex: 1,
        top: 20,
        right: 50,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        fontFamily: "Kode"
    },
    profileText: {
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 5,
        marginTop: 4
    },
    shopIcon: {
        width: "25%",
        height: "100%",
        backgroundColor: "#7393B3",
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    coinContainer: {
        width: "70%",
        height: "100%",
        backgroundColor: "#7393B3",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    currencySort: {
        width: "98%",
        height: "50%",
        flexDirection: "row",
        marginLeft: 10
    },
    gems: {
        height: 24,
        width: 24
    }
});

export default ShopIcon;
