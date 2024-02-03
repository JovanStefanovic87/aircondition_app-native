import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import { runDBUpdates } from './database/runUpdates';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if initialization has been done
        const hasInitialized = await AsyncStorage.getItem('hasInitialized');

        if (hasInitialized !== 'true') {
          // Perform initialization
          await runDBUpdates();

          // Set the flag to indicate initialization is done
          await AsyncStorage.setItem('hasInitialized', 'true');
        }
      } catch (error) {
        console.error('Error during app database update: ', error);
      }
    };

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
