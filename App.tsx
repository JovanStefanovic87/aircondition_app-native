import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Text } from 'react-native';

import TabNavigator from './src/navigators/TabNavigator';
import LoginScreen from './src/screens/LoginScreen';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import GlobalUI from './src/components/ui/GlobalUI';

import {
    checkFreshInstall,
    initDatabase,
    databaseFileExists,
    getDatabaseFilePath,
} from './database/dbConnection/initDatabase';
import { checkSession } from './database/dataAccess/Helper/auth';
import { runDBUpdates } from './database/dbUpdates/runUpdates';
import { downloadLatestDb, latestDbExists } from './src/api/uploadSqliteBackupToS3';

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

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await checkFreshInstall();
                await initDatabase();
                await runDBUpdates();

                const user = await new Promise<any>((resolve) => {
                    checkSession(resolve);
                });

                if (user) {
                    const localExists = await databaseFileExists();

                    if (!localExists) {
                        const remoteExists = await latestDbExists(user.username);

                        if (remoteExists) {
                            const targetPath = getDatabaseFilePath();
                            await downloadLatestDb(user.username, targetPath);

                            await initDatabase();
                            await runDBUpdates();
                        }
                    }
                }
            } catch (err) {
                console.error('App initialization failed:', err);
            } finally {
                setLoading(false);
            }
        };

        initializeApp();
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
