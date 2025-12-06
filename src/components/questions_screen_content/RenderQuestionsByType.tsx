// src/components/questions_screen_content/RenderQuestionsByType.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TypedQuestionGroupForUI } from '../../../database/types';
import RenderGroup from './RenderGroup';
import { customColors } from '../../assets/styles/customStyles';

interface Props {
    questionsData: TypedQuestionGroupForUI[];
    selectedTab: number | null;
    responses: Record<number, { answerId: string | null; comment: string }>;
    handleResponse: (questionId: string, label: string) => void;
    handleCommentChange: (questionId: string, comment: string) => void;
    handleCommentBlur: (questionId: string) => void;
    toggleCameraDevice: (questionId: string, groupId: number) => void;
    onPressGallery: (questionId: string) => void;
    setIsLoading: (value: boolean) => void;
    setLoadingText: (text: string | null) => void;
    setError: (text: string) => void;
}

const RenderQuestionsByType: React.FC<Props> = ({
    questionsData,
    selectedTab,
    responses,
    handleResponse,
    handleCommentChange,
    handleCommentBlur,
    toggleCameraDevice,
    onPressGallery,
    setIsLoading,
    setLoadingText,
    setError,
}) => {
    return (
        <>
            {questionsData
                .filter((type) => type.inspectionTypeId === selectedTab)
                .map((type) => (
                    <View key={type.inspectionTypeId} style={styles.inspectionContainer}>
                        {type.questionsByGroup.map((group) =>
                            RenderGroup(
                                group,
                                responses,
                                handleResponse,
                                handleCommentChange,
                                handleCommentBlur,
                                toggleCameraDevice,
                                onPressGallery,
                                setIsLoading,
                                setLoadingText,
                                setError,
                            ),
                        )}
                    </View>
                ))}
        </>
    );
};

const styles = StyleSheet.create({
    inspectionContainer: {
        marginBottom: 30,
        padding: 15,
        backgroundColor: customColors.blueLighter,
        borderRadius: 10,
    },
});

export default RenderQuestionsByType;
