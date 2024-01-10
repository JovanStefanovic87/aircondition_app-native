import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type NavScreenNavigationProp = NavigationProp<any, any>;

const NavScreen: React.FC = () => {
  const navigation = useNavigation<NavScreenNavigationProp>();

  const handleNewInspectionPress = () => {
    // Navigate to the 'HomeScreen'
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('NewInspection')}
      >
        <Icon name="user" size={30} color="#3498db" />
        <Text style={styles.buttonText}>NewInspection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNewInspectionPress}
      >
        <Icon name="plus" size={30} color="#2ecc71" />
        <Text style={styles.buttonText}>New Inspection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Inspection Ongoing')}
      >
        <Icon name="clock-o" size={30} color="#e67e22" />
        <Text style={styles.buttonText}>Inspection Ongoing</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Closed Inspection')}
      >
        <Icon name="check-circle" size={30} color="#e74c3c" />
        <Text style={styles.buttonText}>Closed Inspection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Logout')}
      >
        <Icon name="sign-out" size={30} color="#9b59b6" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  button: {
    width: '48%',
    aspectRatio: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default NavScreen;
