import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import { runDBUpdates } from './database/dbUpdates/runUpdates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, initDatabase } from './database/dbConnection/initDatabase';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initDatabase();
        // Check if initialization has been done
        //const dbUpdateDone = await AsyncStorage.getItem('dbUpdateDone');

        //if (dbUpdateDone !== 'true') {
        // Perform initialization
        await runDBUpdates();

        // Set the flag to indicate initialization is done
        //await AsyncStorage.setItem('dbUpdateDone', 'true');
        //}
      } catch (error) {
        console.error('Error during app database update: ', error);
      }
    };

    const dbConnectionExist = () => {
      try {
        const db = getDatabase();
      } catch (error) {
        return false;
      }
      return true;
    }
    console.log('dbConnectionExist', dbConnectionExist());

    // if (!dbConnectionExist()) initializeApp();
    initializeApp();

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
