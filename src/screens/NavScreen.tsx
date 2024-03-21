import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInspectionStore } from '../store/store';
import NavButton from '../components/buttons/NavButton';
import { getDeviceElements } from '../../database/dataAccess/Query/sqlQueries';
import { deleteAllTables } from '../../database/dataAccess/helpers';

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

    const handleDeviceElements = async () => {
        const test = await getDeviceElements();
        console.log('images: ', test);
    };

    const deleteAllTabless = async () => {
        await deleteAllTables();
    };

    return (
        <GestureHandlerRootView style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <NavButton
                        onPress={handleNewInspectionPress}
                        iconName="plus"
                        iconColor="yellow"
                        buttonText="Neue Inspektion"
                    />

                    <NavButton
                        onPress={handleAllInspectionsPress}
                        iconName="list"
                        iconColor="#e67e22"
                        buttonText="Alle Inspektionen"
                    />

                    <NavButton
                        onPress={() => deleteAllTabless()}
                        iconName="user"
                        iconColor="#3498db"
                        buttonText="Profil - deleteAllTables"
                    />

                    <NavButton
                        onPress={() => handleDeviceElements()}
                        iconName="sign-out"
                        iconColor="red"
                        buttonText="Ausloggen-handleDeviceElements"
                    />
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
        justifyContent: 'center',
        alignItems: 'center',
        gap: vw(4),
        marginTop: vw(4),
    },
});

export default NavScreen;
