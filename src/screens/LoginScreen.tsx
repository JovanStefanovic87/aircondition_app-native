import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { loginUser } from '../../database/dataAccess/Helper/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setIsLoggedIn } = useAuth();

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Fehler', 'Bitte E-Mail und Passwort eingeben.');
            return;
        }

        setLoading(true);

        loginUser(email, password, keepMeLoggedIn, (success, user) => {
            setLoading(false);

            if (success && user) {
                setIsLoggedIn(true);
            } else {
                Alert.alert('Fehler', 'Ungültige E-Mail oder ungültiges Passwort.');
            }
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Anmeldung</Text>
            <TextInput
                placeholder="E-Mail"
                value={email}
                onChangeText={setEmail}
                style={{ width: '100%', padding: 10, borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Passwort"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ width: '100%', padding: 10, borderWidth: 1, marginBottom: 10 }}
            />
            <TouchableOpacity onPress={() => setKeepMeLoggedIn(!keepMeLoggedIn)}>
                <Text>{keepMeLoggedIn ? '☑ Angemeldet bleiben' : '☐ Angemeldet bleiben'}</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
            ) : (
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}
                >
                    <Text style={{ color: 'white' }}>Anmelden</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default LoginPage;
