import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Svg, Path, Polygon } from 'react-native-svg';

const SideComponents = ({navigation}) => {
    return (
        <View style={styles.main}>
            <TouchableOpacity
                style={[styles.button, styles.shadowProp]}
                onPress={() => navigation.navigate('PlaneSelect')}
            >
                <Svg style={styles.shadowPropMin} height={50} width={50} viewBox="0 0 64 64">
                    <Path
                        data-name="layer1"
                        d="M57.4 38.3L37 22.5v-15a5 5 0 0 0-10 0v15L6.6 38.3S5 39.4 5 40.5v4.2a1.3 1.3 0 0 0 .7 1.3c.5.3 1.9-.3 2.4-.5L27 39.4v11.1L19.7 56a1.6 1.6 0 0 0-.7 1.4v3.1c0 .4.1 1.3 1.4.8L32 56.5l11.6 4.8c1.4.5 1.4-.5 1.4-.8v-3.1a1.6 1.6 0 0 0-.7-1.4L37 50.5V39.4l18.9 6.2c.5.2 1.9.7 2.4.5a1.3 1.3 0 0 0 .7-1.3v-4.3c0-1.1-1.6-2.2-1.6-2.2z"
                        fill="#202020"
                    />
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.shadowProp]}
                              onPress={() => navigation.navigate('Leaderboard')}>
                <Svg style={styles.shadowPropMin} fill="#000000" height={50} width={50} viewBox="0 0 24 24" id="podium"
                     data-name="Line Color"
                     xmlns="http://www.w3.org/2000/svg" className="icon line-color">
                    <Polygon id="secondary"
                             points="11.54 3.94 10.5 4.09 11.25 4.82 11.07 5.85 12 5.37 12.93 5.85 12.75 4.82 13.5 4.09 12.46 3.94 12 3 11.54 3.94"
                             style="fill: none; stroke: rgb(44, 169, 188); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></Polygon>
                    <Path id="primary" d="M9,21H3V16H9Zm6-11H9V21h6Zm6,4H15v7h6Z"
                          style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></Path>
                </Svg>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    main: {
        position: "absolute",
        top: 125,
        left: 50,
        flexDirection: "column",
        width: "20%",
        flex: 1,
    },
    button: {
        height: 57,
        width: 57,
        marginTop: 10,
        backgroundColor: "#0096FF",
        justifyContent: "center",
        alignItems: "center",
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    shadowPropMin: {
        shadowColor: '#171717',
        shadowOffset: { width: -1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
})
export default SideComponents;