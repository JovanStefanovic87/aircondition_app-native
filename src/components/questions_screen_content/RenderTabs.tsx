// src/components/questions_screen_content/RenderTabs.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { customColors } from '../../assets/styles/customStyles';
import { TypedQuestionGroupForUI } from '../../../database/types';

interface Props {
    questionsData: TypedQuestionGroupForUI[];
    selectedTab: number | null;
    setSelectedTab: (id: number) => void;
}

const RenderTabs: React.FC<Props> = ({ questionsData, selectedTab, setSelectedTab }) => (
    <View style={styles.tabsContainer}>
        {questionsData.map((type) => (
            <TouchableOpacity
                key={type.inspectionTypeId}
                style={[styles.tab, selectedTab === type.inspectionTypeId && styles.activeTab]}
                onPress={() => setSelectedTab(type.inspectionTypeId)}
            >
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    style={[
                        styles.tabText,
                        selectedTab === type.inspectionTypeId && styles.activeTabText,
                    ]}
                >
                    {type.inspectionTypeName}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 10,
        marginVertical: 10,
    },
    tab: {
        width: '46%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '1%',
    },
    activeTab: { backgroundColor: customColors.blueDark },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        maxWidth: '100%',
        overflow: 'hidden',
        textAlign: 'center',
    },
    activeTabText: { color: 'white' },
});

export default RenderTabs;
