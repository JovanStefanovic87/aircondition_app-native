import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NavScreen from '../screens/NavScreen';
import NewInspectionScreen from '../screens/NewInspectionScreen';
import OngoingInspectionScreen from '../screens/OngoingInspectionScreen';

const Stack = createStackNavigator();

const TabNavigator = () => {
  const navigationOptions = {
    headerShown: false,
  };

  const tabNameOptions = (customTitle: string) => ({
    title: customTitle,
  });

  return (
    <Stack.Navigator>
      <Stack.Screen name="NavScreen" component={NavScreen} options={navigationOptions} />
      <Stack.Screen
        name="NewInspectionScreen"
        component={NewInspectionScreen}
        options={tabNameOptions('NEUE INSPECTION')}
      />
      <Stack.Screen
        name="OngoingInspectionScreen"
        component={OngoingInspectionScreen}
        options={tabNameOptions('LAUFENDE INSPEKTIONEN')}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default TabNavigator;
