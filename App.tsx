import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Text } from 'react-native';

import TabNavigator from './src/navigators/TabNavigator';
import LoginScreen from './src/screens/LoginScreen';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import GlobalUI from './src/components/ui/GlobalUI';
import { initializeApp } from './database/dbConnection/initDatabase';
import { checkSession } from './database/dataAccess/Helper/auth';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    useEffect(() => {
        checkSession((user) => {
            setIsLoggedIn(!!user);
        });
    }, [setIsLoggedIn]);

    if (isLoggedIn === null) return null;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <Stack.Screen name="Tab" component={TabNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
};

const App = () => {
    const [loading, setLoading] = useState(true);
    const [initError, setInitError] = useState<string | null>(null);
    const [statusText, setStatusText] = useState('App wird initialisiert...');

    useEffect(() => {
        initializeApp(setLoading, setInitError, setStatusText);
    }, []);

    if (loading || initError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {initError ? (
                    <Text style={{ color: 'red', textAlign: 'center', padding: 24 }}>
                        {initError}
                    </Text>
                ) : (
                    <>
                        <ActivityIndicator size="large" />
                        <Text>{statusText}</Text>
                    </>
                )}
            </View>
        );
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
                <GlobalUI />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
