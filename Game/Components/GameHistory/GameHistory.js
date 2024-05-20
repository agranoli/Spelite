import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserGameHistory = ({ navigation }) => {
    const [gameHistory, setGameHistory] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserDataAndGameHistory = async () => {
            try {
                let token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

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
                setUserId(userData.id);

                const gameHistoryResponse = await fetch('http://172.20.10.3:8888/GameHistory.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ userID: userData.id })
                });

                if (!gameHistoryResponse.ok) {
                    console.error('Failed to fetch game history:', gameHistoryResponse.statusText);
                    return;
                }

                const gameHistoryData = await gameHistoryResponse.json();
                setGameHistory(gameHistoryData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserDataAndGameHistory();
    }, [navigation]);

    const renderItem = ({ item, index }) => (
        <View style={styles.row}>
            <Text style={[styles.text, { color: 'black' }]}>{item.score}</Text>
            <Text style={[styles.text, { color: 'black' }]}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.main}>
            <Image
                source={require('../Images/background.jpeg')}
                style={styles.background}
            />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, { color: 'black' }]}>Score</Text>
                    <Text style={[styles.headerText, { color: 'black' }]}>Date</Text>
                </View>
                <FlatList
                    data={gameHistory}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Menu')}
            >
                <Svg height={40} width={40} fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="white" className="w-6 h-6">
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        width: "85%",
        height: "90%",
        backgroundColor: 'rgba(255,255,255,0.82)',
        borderRadius: 15,
        color: "black"
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        opacity: 0.95,
        position: "absolute"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        color: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    text: {
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
        color: '#ffffff',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20
    }
});

export default UserGameHistory;
