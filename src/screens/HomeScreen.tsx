import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SubmitButton from '../components/buttons/SubmitButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputText from '../components/input/InputText';
import InputNumber from '../components/input/InputNumeric';
import ZoneButton from '../components/buttons/ZoneButton';

const HomeScreen = () => {
    const [inputValue, setInputValue] = useState<number | null>(null);
    const [inputTextValue, setInputTextValue] = useState<string>('');

    return (
        <GestureHandlerRootView style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Dugme" onPress={() => {}} />
                        <SubmitButton isDisabled={false} value="Submit" />
                    </View>
                </View>
                <InputText
                    value={inputTextValue}
                    placeholder="Input"
                    setValue={setInputTextValue}
                />
                <InputNumber value={inputValue} placeholder="Number" setValue={setInputValue} />
                <ZoneButton />
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    container: {
        gap: 7,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        gap: 5,
    },
});

export default HomeScreen;
