import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { loginUser } from '../../database/dataAccess/Helper/auth';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password.');
            return;
        }

        setLoading(true);

        loginUser(email, password, keepMeLoggedIn, (success, user) => {
            setLoading(false);

            if (success && user) {
                Alert.alert('Success', 'Login successful!', [
                    { text: 'OK', onPress: () => navigation.replace('NavScreen') },
                ]);
            } else {
                Alert.alert('Error', 'Invalid email or password.');
            }
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ width: '100%', padding: 10, borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ width: '100%', padding: 10, borderWidth: 1, marginBottom: 10 }}
            />
            <TouchableOpacity onPress={() => setKeepMeLoggedIn(!keepMeLoggedIn)}>
                <Text>{keepMeLoggedIn ? '☑ Keep me logged in' : '☐ Keep me logged in'}</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
            ) : (
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}
                >
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default LoginPage;
