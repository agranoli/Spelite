import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Image } from 'react-native';

const RegisterPage = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Handle registration logic here
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        // You can add your registration API call here
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contentContainer}>
                {/* Left half: Registration form */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Register</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Register" onPress={handleRegister} />
                    </View>
                </View>

                {/* Right half: Photo */}
                <View style={styles.photoContainer}>
                    <Image
                        style={styles.photo}
                        resizeMode="cover"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formContainer: {
        width: '48%', // Adjust the width to your preference
    },
    photoContainer: {
        width: '48%', // Adjust the width to your preference
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
});

export default RegisterPage;