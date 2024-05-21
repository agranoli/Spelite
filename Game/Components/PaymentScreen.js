import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

function PaymentScreen({ selectedItem, onClose }) {
    const { confirmPayment } = useStripe();

    const handlePayment = async () => {
        try {
            const { paymentIntent, error } = await confirmPayment(selectedItem.clientSecret, {
                type: 'Card',
                billingDetails: {
                    name: 'Test User',
                },
            });

            if (error) {
                console.error('Payment confirmation error:', error);
                // Handle payment error
            } else if (paymentIntent) {
                console.log('Payment confirmed:', paymentIntent);
                // Payment successful, handle accordingly
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            // Handle other errors
        }
    };

    return (
        <View style={styles.container}>
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={styles.card}
                style={styles.cardField}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                    // Handle card details change
                }}
            />
            <Pressable onPress={handlePayment}>
                <Text>Confirm Payment</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardField: {
        width: '100%',
        height: 50,
        marginVertical: 30,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        color: '#000000',
    },
});

export default PaymentScreen;
