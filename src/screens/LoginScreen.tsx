// /src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { loginUser } from '../../database/dataAccess/Helper/auth';
import { useAuth } from '../context/AuthContext';
import NavButton from '../components/buttons/NavButton';
import { useInspectionStore } from '../store/store';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

const LoginPage = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useAuth();
    const { setIsLoading, setLoadingText, setError } = useInspectionStore();

    const handleLogin = async () => {
        if (!userName || !password) {
            setError('Bitte E-Mail und Passwort eingeben.');
            return;
        }

        setIsLoading(true);
        setLoadingText('Anmeldung läuft...');

        loginUser(userName, password, (success, user, error) => {
            setIsLoading(false);
            if (success && user) {
                setIsLoggedIn(true);
            } else {
                setError(error || 'Login fehlgeschlagen.');
            }
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.inner}>
                            <Text style={styles.title}>Anmeldung</Text>

                            <TextInput
                                placeholder="Benutzername"
                                value={userName}
                                onChangeText={setUserName}
                                style={styles.input}
                                autoCapitalize="none"
                            />
                            <TextInput
                                placeholder="Passwort"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={styles.input}
                                blurOnSubmit={true}
                                onSubmitEditing={handleLogin}
                            />

                            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                                <Text style={styles.buttonText}>Anmelden</Text>
                            </TouchableOpacity>

                            {__DEV__ && (
                                <NavButton
                                    onPress={() => navigation.navigate('DevToolsScreen')}
                                    iconName="gear"
                                    iconColor="green"
                                    buttonText="Dev Tools"
                                />
                            )}
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: isSmallScreen ? 10 : 16,
        backgroundColor: '#f3f4f6',
    },
    inner: {
        width: '100%',
        alignItems: 'center',
        maxWidth: 800,
        padding: isSmallScreen ? 16 : 24,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: isSmallScreen ? 22 : 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: isSmallScreen ? 20 : 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        paddingVertical: isSmallScreen ? 10 : 14,
        paddingHorizontal: isSmallScreen ? 14 : 18,
        borderWidth: 1.5,
        borderColor: '#94a3b8',
        borderRadius: 10,
        marginBottom: isSmallScreen ? 12 : 16,
        backgroundColor: '#f9fafb',
        fontSize: isSmallScreen ? 15 : 17,
        color: 'black',
    },
    button: {
        paddingVertical: isSmallScreen ? 18 : 24,
        paddingHorizontal: isSmallScreen ? 48 : 64,
        backgroundColor: '#2563eb',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: isSmallScreen ? 10 : 20,
    },
    buttonText: {
        color: 'white',
        fontSize: isSmallScreen ? 15 : 16,
        fontWeight: 'bold',
    },
});

export default LoginPage;
