import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import { runDBUpdates } from './database/dbUpdates/runUpdates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dbConnectionExist, initDatabase } from './database/dbConnection/initDatabase';
import { checkSession } from './database/dataAccess/Helper/auth';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
    Tab: undefined;
    Auth: undefined;
};

const AppNavigator = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    useEffect(() => {
        checkSession((user) => {
            setIsLoggedIn(!!user);
        });
    }, []);

    if (isLoggedIn === null) {
        return null;
    }

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
    useEffect(() => {
        const initializeApp = async () => {
            try {
                await initDatabase();
                const migrationRunning = await AsyncStorage.getItem('dbMigrationStatus');

                if (migrationRunning !== 'started') {
                    await AsyncStorage.setItem('dbMigrationStatus', 'started');
                    await runDBUpdates();
                    await AsyncStorage.setItem('dbMigrationStatus', 'done');
                }
            } catch (error) {
                console.error('Error during app database update: ', error);
            }
        };

        if (!dbConnectionExist()) initializeApp();
    }, []);

    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
