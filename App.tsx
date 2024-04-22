import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import { runDBUpdates } from './database/dbUpdates/runUpdates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dbConnectionExist, initDatabase } from './database/dbConnection/initDatabase';

const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Tab"
                    component={TabNavigator}
                    options={{ animation: 'slide_from_bottom' }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
