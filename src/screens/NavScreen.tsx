import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInspectionStore } from '../store/store';
import NavButton from '../components/buttons/NavButton';
import { getDeviceElements } from '../../database/dataAccess/Query/sqlQueries';
import { deleteAllTables } from '../../database/dataAccess/helpers';
import { Image, Text } from 'react-native';
import { DeviceElement } from '../../database/types';
import { DeviceElementImage } from '../resources/deviceElementImages';

type NavScreenNavigationProp = NavigationProp<any, any>;

const NavScreen: React.FC = () => {
    const navigation = useNavigation<NavScreenNavigationProp>();
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);
    const [deviceElements, setDeviceElements] = useState<DeviceElement[]>([]);

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

    const deleteAllTabless = async () => {
        await deleteAllTables();
    };

    const handleDeviceElements = async () => {
        const elements = await getDeviceElements();
        setDeviceElements(elements);
    };

    useEffect(() => {
        handleDeviceElements();
    }, []);

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
                        onPress={() => console.log('profile')}
                        iconName="user"
                        iconColor="#3498db"
                        buttonText="Profil"
                    />

                    <NavButton
                        onPress={() => console.log('sign-out')}
                        iconName="sign-out"
                        iconColor="red"
                        buttonText="Ausloggen"
                    />

                    <NavButton
                        onPress={() => deleteAllTabless()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Delete All Tables"
                    />

                    <NavButton
                        onPress={() => handleDeviceElements()}
                        iconName="database"
                        iconColor="red"
                        buttonText="Get Device Elements"
                    />
                </View>

                {deviceElements.map((deviceElement) => (
                    <View key={deviceElement.id}>
                        <Text>{deviceElement.name}</Text>
                        {deviceElement.imageFileName && (
                            <Image
                                style={styles.image}
                                source={DeviceElementImage.GetImage(deviceElement.imageFileName)}
                            />
                        )}
                    </View>
                ))}
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
    image: {
        width: 100,
        height: 100,
    },
});

export default NavScreen;
