import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInspectionStore } from '../store/store';
import NavButton from '../components/buttons/NavButton';

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
                        onPress={() => console.log('')}
                        iconName="user"
                        iconColor="#3498db"
                        buttonText="Profil"
                    />

                    <NavButton
                        onPress={() => console.log('Ausloggen')}
                        iconName="sign-out"
                        iconColor="red"
                        buttonText="Ausloggen"
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
