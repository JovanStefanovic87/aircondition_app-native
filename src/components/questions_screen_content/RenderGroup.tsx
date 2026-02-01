// src/components/questions_screen_content/RenderGroup.tsx
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import IconButton from '../../components/buttons/IconButton';
import QuestionButton from '../../components/buttons/QustionButton';
import { customColors } from '../../assets/styles/customStyles';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
console.log('Screen width:', width);
const RenderGroup = (
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
) => (
    <View key={group.groupId} style={styles.groupContainer}>
        <View style={styles.groupHeader}>
            <Text style={styles.groupTitle} numberOfLines={2} ellipsizeMode="middle">
                {group.name}
            </Text>

            {group.questions.length > 0 && (
                <TouchableOpacity
                    style={styles.allYesButton}
                    onPress={async () => {
                        try {
                            setLoadingText('Setze alle Antworten auf "Ja"...');
                            setIsLoading(true);
                            await new Promise((resolve) => setTimeout(resolve, 50));

                            for (const q of group.questions) {
                                await handleResponse(q.inspectionQuestionId, 'Ja');
                            }
                        } catch (error) {
                            console.error('Fehler beim Aktualisieren der Antworten:', error);
                            setError('Fehler beim Aktualisieren der Antworten.');
                        } finally {
                            setIsLoading(false);
                            setLoadingText(null);
                        }
                    }}
                >
                    <Text style={styles.allYesButtonText}>JA</Text>
                </TouchableOpacity>
            )}
        </View>

        {group.questions.map((q) => (
            <View key={q.inspectionQuestionId} style={styles.questionContainer}>
                <Text style={styles.questionText}>
                    {q.questionNumber}. {q.fullDescription}
                </Text>

                <View style={styles.buttonContainer}>
                    {[
                        { label: 'Ja', color: customColors.greenMid },
                        { label: 'Nein', color: customColors.redLight },
                        { label: 'Nicht relevant', color: '#9E9E9E' },
                    ].map(({ label, color }) => (
                        <QuestionButton
                            key={label}
                            label={label}
                            responses={responses}
                            q={q}
                            color={color}
                            handleResponse={handleResponse}
                        />
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Kommentar eingeben..."
                        value={responses[q.inspectionQuestionId]?.comment || ''}
                        onChangeText={(text) => handleCommentChange(q.inspectionQuestionId, text)}
                        onBlur={() => handleCommentBlur(q.inspectionQuestionId)}
                    />
                    <View style={styles.cameraIconsContainer}>
                        <IconButton
                            icon="camera"
                            onPress={() =>
                                toggleCameraDevice(q.inspectionQuestionId, Number(group.groupId))
                            }
                        />
                        <IconButton
                            icon="image"
                            onPress={() => onPressGallery(q.inspectionQuestionId)}
                        />
                    </View>
                </View>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    groupContainer: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: customColors.blueDark,
        borderRadius: 6,
        marginBottom: 5,
    },
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    groupTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        maxWidth: '70%',
        flexShrink: 1,
    },
    questionContainer: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: customColors.grayLight,
        borderRadius: 6,
        marginTop: 5,
    },
    questionText: {
        fontSize: 20,
        color: customColors.blackText,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 5,
        gap: 8,
    },
    commentInput: {
        flex: 1,
        padding: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 18,
        color: customColors.blackText,
        minWidth: 0, // sprečava flex child overflow
    },
    allYesButton: {
        backgroundColor: customColors.greenMid,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: '20%',
    },
    allYesButtonText: {
        color: '#FFD700',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    cameraIconsContainer: {
        flexDirection: 'row',
        gap: 6,
        flexShrink: 0, // dugmeta ne shrink-uju
    },
});

export default RenderGroup;
