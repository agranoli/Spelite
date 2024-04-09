import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useNavigation} from "@react-navigation/native";
// import axios from 'axios';

const PaymentScreen = ({ selectedItem, onClose }) => {
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCVC] = useState('');
    const navigation = useNavigation();

    const handlePayment = async () => {
        try {
            const response = await axios.post('YOUR_BACKEND_URL/payment', {
                email,
                amount: selectedItem.price * 100, // Stripe accepts amount in cents
                currency: 'usd',
                // Include any other necessary payment information
            });

            console.log('Payment successful:', response.data);
            // Handle successful payment
        } catch (error) {
            console.error('Payment error:', error);
            // Handle payment error
        }
    };

    const handleClose = () => {
        navigation.navigate('Shop'); // Navigate to MenuScreen when return button is pressed
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Details</Text>
            <Text style={styles.item}>Selected: {selectedItem && selectedItem.gems} LS</Text>
            <Text style={styles.item}>Total amount: {selectedItem && selectedItem.price}$</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <View style={styles.cardContainer}>
                <View style={styles.cardRow}>
                    <TextInput
                        style={[styles.input, styles.cardInput]}
                        placeholder="Card Number"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                    />
                </View>
                <View style={styles.cardRow}>
                    <TextInput
                        style={[styles.input, styles.cardInput]}
                        placeholder="MM/YY"
                        value={expiry}
                        onChangeText={setExpiry}
                    />
                    <TextInput
                        style={[styles.input, styles.cardInput]}
                        placeholder="CVC"
                        value={cvc}
                        onChangeText={setCVC}
                    />
                </View>
            </View>
            <View style={styles.buttons}>
                <Button title="Pay" onPress={handlePayment} />
                <Button title="Cancel" onPress={handleClose} color="gray" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    cardContainer: {
        width: '100%',
        marginBottom: 20,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardInput: {
        flex: 1,
        marginRight: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default PaymentScreen;
