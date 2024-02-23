import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInspectionStore } from '../store/store';

type NavScreenNavigationProp = NavigationProp<any, any>;

const NavScreen: React.FC = () => {
    const navigation = useNavigation<NavScreenNavigationProp>();
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);

    const handleNewInspectionPress = () => {
        setInspectionId(null);
        navigation.navigate('InspectionBasicDetailsScreen');
    };

    const handleAllInspectionsPress = () => {
        navigation.navigate('AllInspectionsScreen');
    };

    const handleHomePress = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <GestureHandlerRootView style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={handleNewInspectionPress}>
                        <Icon name="plus" size={30} color="yellow" />
                        <Text style={styles.buttonText}>Neue Inspektion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleAllInspectionsPress}>
                        <Icon name="list" size={30} color="#e67e22" />
                        <Text style={styles.buttonText}>Alle Inspektionen</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => console.log('')}>
                        <Icon name="user" size={30} color="#3498db" />
                        <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log('Ausloggen')}
                    >
                        <Icon name="sign-out" size={30} color="red" />
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    container: {
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
