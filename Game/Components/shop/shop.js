import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Gem from '../Images/gem.png';
import PaymentScreen from "../PaymentScreen";
import { StripeProvider } from '@stripe/stripe-react-native';

const prices = [
    { gems: 50, price: 2.99 },
    { gems: 100, price: 4.99 },
    { gems: 200, price: 8.99 },
    { gems: 500, price: 19.99 },
    { gems: 1000, price: 34.99 },
    { gems: 2000, price: 59.99 },
];

function Shop() {
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleSelectItem = async (item) => {
        setSelectedItem(item);

        try {
            const response = await fetch('http://172.20.10.2/datubazes/stripe/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: item.price * 100 }), // Convert price to cents
            });
            const data = await response.json();
            if (response.ok) {
                setSelectedItem({ ...item, clientSecret: data.clientSecret });
                setShowPaymentModal(true);
            } else {
                console.error('Error creating payment intent:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReturnPress = () => {
        navigation.navigate('Menu');
    };

    const handleClosePayment = () => {
        setShowPaymentModal(false);
    };


    return (
        <StripeProvider publishableKey="pk_live_51MLtN5DjfQfCJkDARKMZi5zjByrSgTPIzsPSBl97NsT8evpv5Gtv8f5qFY7r7YNIeWL2d9BTvT0koywxRr13o77p00JyDU2MmS">
            <View style={styles.container}>
                <View style={styles.back}>
                    <Pressable onPress={handleReturnPress}>
                        <Svg width={50} height={50} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </Svg>
                    </Pressable>
                </View>
                <Image source={require('../Images/background.jpeg')} style={styles.background} />
                <View style={styles.box}>
                    {prices.map((item, index) => (
                        <Pressable key={index} onPress={() => handleSelectItem(item)} style={styles.gems}>
                            <Image source={Gem} style={styles.gem} />
                            <Text style={styles.desc}>{item.gems} LS</Text>
                            <Text style={styles.price}>{item.price}$</Text>
                        </Pressable>
                    ))}
                </View>
                <Modal animationType="slide" visible={showPaymentModal && selectedItem !== null} transparent={true}>
                    <View style={styles.modalContainer}>
                        <PaymentScreen selectedItem={selectedItem} onClose={handleClosePayment} />
                    </View>
                </Modal>
            </View>
        </StripeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0096FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        position: 'absolute',
        flex: 1,
        right: 20,
        top: 5,
        zIndex: 1,
    },
    price: {
        position: 'absolute',
        bottom: 5,
        backgroundColor: 'green',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 20,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 5,
    },
    desc: {
        position: 'absolute',
        right: 13,
        fontFamily: 'Kode',
        fontSize: 25,
        top: 8,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 3, // Shadow blur radius
    },

    gem: {
        position: 'absolute',
        left: 0,
        top: 20,
        width: '65%',
        height: '65%',
    },
    gems: {
        position: 'relative',
        height: '45%',
        width: '30%',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    box: {
        flex: 1,
        width: '70%',
        flexDirection: 'row',
        padding: 5,
        paddingTop: 20,
        margin: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.80)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.95,
        position: 'absolute',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Shop;
