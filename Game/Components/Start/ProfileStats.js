import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';

const ProfileStats = () => {
    const [fontLoaded] = useFonts({
        'Kode': require('../../assets/fonts/KodeMono-VariableFont_wght.ttf'),
    });
    if (!fontLoaded) {
        return null; // or a loading indicator
    }
    return (
        <View style={styles.main}>
            <TouchableOpacity style={[styles.imageContainer, styles.shadowProp]}
                              onPress={() => navigation.navigate('Register')}>
                <Image source={require('../Images/profile.jpeg')}
                       style={styles.imageBorder}>
                </Image>
            </TouchableOpacity>
            <View style={[styles.levelContainer, styles.shadowProp]}>
                <Text style={styles.profileText}>
                   username
                </Text>
                <Text style={styles.profileText}>
                    Level 4
                </Text>
            </View>
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
        backgroundColor: "#0096FF",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    imageContainer: {
        width: "25%",
        height: "100%",
        backgroundColor: "#0096FF",
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