// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import { runDBUpdates } from './database/dbUpdates/runUpdates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    checkFreshInstall,
    dbConnectionExist,
    initDatabase,
} from './database/dbConnection/initDatabase';
import { checkSession } from './database/dataAccess/Helper/auth';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ActivityIndicator, View, Text } from 'react-native';
import { useInspectionStore } from './src/store/store';
import GlobalUI from './src/components/ui/GlobalUI';

const Stack = createNativeStackNavigator();

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
    const [loading, setLoading] = useState(true);
    const { isLoading, loadingText } = useInspectionStore(); // ✅ koristi hook

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await checkFreshInstall();
                await initDatabase();
                const migrationRunning = await AsyncStorage.getItem('dbMigrationStatus');
                console.log('migrationRunning', migrationRunning);

                if (migrationRunning !== 'started') {
                    await AsyncStorage.setItem('dbMigrationStatus', 'started');
                    await runDBUpdates();
                    await AsyncStorage.setItem('dbMigrationStatus', 'done');
                }
            } catch (error) {
                console.error('Error during app database update: ', error);
            } finally {
                setLoading(false);
            }
        };

        if (!dbConnectionExist()) initializeApp();
        else setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>App wird initialisiert (Initializing app) ...</Text>
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
