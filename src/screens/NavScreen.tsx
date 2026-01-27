// /src/screens/NavScreen.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { vw } from 'react-native-css-vh-vw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useInspectionStore } from '../store/store';
import NavButton from '../components/buttons/NavButton';
import { logoutUser } from '../../database/dataAccess/Helper/auth';
import { useAuth } from '../context/AuthContext';

type NavScreenNavigationProp = NavigationProp<any, any>;

const NavScreen: React.FC = () => {
    const navigation = useNavigation<NavScreenNavigationProp>();
    const setInspectionId = useInspectionStore((state) => state.setInspectionId);
    const { setIsLoggedIn } = useAuth();

    const { setIsLoading, setLoadingText, setError } = useInspectionStore();

    const handleNewInspectionPress = async () => {
        try {
            setIsLoading(true);
            setLoadingText('Neue Inspektion wird vorbereitet...');
            setInspectionId(null);
            navigation.navigate('InspectionBasicDetailsScreen');
        } catch (err: any) {
            setError('Fehler beim Starten der Inspektion.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAllInspectionsPress = async () => {
        try {
            setIsLoading(true);
            setLoadingText('Lade alle Inspektionen...');
            navigation.navigate('AllInspectionsScreen');
        } catch (err: any) {
            setError('Fehler beim Laden der Inspektionen.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoutUser = async () => {
        try {
            setIsLoading(true);
            setLoadingText('Abmeldung läuft...');
            await logoutUser();
            setIsLoggedIn(false);
        } catch (err: any) {
            setError('Fehler beim Abmelden.');
        } finally {
            setIsLoading(false);
        }
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
                        onPress={() => console.log('profile')}
                        iconName="user"
                        iconColor="#3498db"
                        buttonText="Profil"
                    />
                    <NavButton
                        onPress={handleLogoutUser}
                        iconName="sign-out"
                        iconColor="red"
                        buttonText="Ausloggen"
                    />
                    {__DEV__ && (
                        <NavButton
                            onPress={() => navigation.navigate('DevToolsScreen')}
                            iconName="gear"
                            iconColor="green"
                            buttonText="Dev Tools"
                        />
                    )}
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
