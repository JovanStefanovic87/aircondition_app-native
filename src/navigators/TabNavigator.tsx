import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NavScreen from '../screens/NavScreen';
import InspectionBasicDetailsScreen from '../screens/InspectionBasicDetailsScreen';
import InspectionDeviceStateScreen from '../screens/InspectionDeviceStateScreen';
import AllInspectionsScreen from '../screens/AllInspectionsScreen';

const Stack = createStackNavigator();

const TabNavigator = () => {
    const navigationOptions = {
        headerShown: false,
    };

    const headerStyleOptions = {
        backgroundColor: 'gray',
    };

    const headerTitleStyleOptions = {
        fontSize: 20,
        fontWeight: 'bold' as 'bold',
        color: 'white',
    };

    const tabNameOptions = (customTitle: string) => ({
        title: customTitle,
        headerStyle: headerStyleOptions,
        headerTitleStyle: headerTitleStyleOptions,
    });

    return (
        <Stack.Navigator>
            <Stack.Screen name="NavScreen" component={NavScreen} options={navigationOptions} />
            <Stack.Screen
                name="InspectionBasicDetailsScreen"
                component={InspectionBasicDetailsScreen}
                options={tabNameOptions('NEUE INSPECTION')}
            />
            <Stack.Screen
                name="InspectionDeviceStateScreen"
                component={InspectionDeviceStateScreen}
                options={tabNameOptions('LAUFENDE INSPEKTIONEN')}
            />
            <Stack.Screen
                name="AllInspectionsScreen"
                component={AllInspectionsScreen}
                options={tabNameOptions('ALLE INSPEKTIONEN')}
            />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default TabNavigator;
