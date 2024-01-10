// Navigator file (e.g., AppNavigator.tsx)
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NavScreen from '../screens/NavScreen';
import NewInspectionScreen from '../screens/NewInspection';

const Stack = createStackNavigator();

const TabNavigator = () => {
  const navigationOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewInspection" component={NewInspectionScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="NavScreen"
        component={NavScreen}
        options={navigationOptions}
      />

      {/* Add other screens as needed */}
    </Stack.Navigator>
  );
};

export default TabNavigator;
