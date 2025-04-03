import React, { useEffect } from 'react';
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

const Stack = createNativeStackNavigator();

type RootStackParamList = {
    Tab: undefined;
    Auth: undefined;
};

const AppNavigator = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // useEffect(() => {
    //     checkSession((user) => {
    //         if (!user) {
    //             navigation.reset({
    //                 index: 0,
    //                 routes: [{ name: 'Auth' }],
    //             });
    //         }
    //     });
    // }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tab"
                component={TabNavigator}
                options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
                name="Auth"
                component={LoginScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
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
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
};

export default App;
