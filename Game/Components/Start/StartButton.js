import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
const StartButton = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Game')} style={[styles.button, styles.shadowProp]}>
            <Text style={styles.ButtonText}>Start</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    button:{
        position: "absolute",
        height: "15%",
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0096FF",
        bottom: 50,
        right: 50
    },
    ButtonText:{
        color: 'white',
        fontSize: 30,
        fontFamily: "Kode"
    }
})

export default StartButton;