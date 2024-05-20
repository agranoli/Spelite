import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'; // Import Platform from react-native
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PaymentScreen = ({ selectedItem }) => {
    const navigation = useNavigation();
    console.log(selectedItem);
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCVC] = useState('');

    const handleClose = () => {
        navigation.navigate('Shop');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            <Button title="Cancel" onPress={handleClose} color="gray" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
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
        width: '80%',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardRow: {
        flexDirection: 'row',
        width: '80%',
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
