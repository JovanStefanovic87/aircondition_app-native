import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { loginUser } from '../../database/dataAccess/Helper/auth';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;
const scale = width / 375;
const normalize = (size: number) => Math.round(scale * size);

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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.inner}>
                    <TextInput
                        placeholder="E-Mail-Adresse"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Passwort"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />

                    <TouchableOpacity onPress={() => setKeepMeLoggedIn(!keepMeLoggedIn)}>
                        <Text style={styles.keepLoggedInText}>
                            {keepMeLoggedIn ? '☑ Angemeldet bleiben' : '☐ Angemeldet bleiben'}
                        </Text>
                    </TouchableOpacity>

                    {loading ? (
                        <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
                    ) : (
                        <TouchableOpacity onPress={handleLogin} style={styles.button}>
                            <Text style={styles.buttonText}>Anmelden</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f3f4f6',
    },
    inner: {
        width: '100%',
        alignItems: 'center',
        maxWidth: 800,
        padding: 24,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: isSmallScreen ? 24 : 28,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderWidth: 1.5,
        borderColor: '#94a3b8',
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: '#f9fafb',
        fontSize: 17,
        color: 'black',
    },
    keepLoggedInText: {
        fontSize: 16,
        color: '#374151',
        textAlign: 'left',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 24,
        paddingHorizontal: 64,
        backgroundColor: '#2563eb',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loader: {
        marginTop: 24,
    },
});

export default LoginPage;
