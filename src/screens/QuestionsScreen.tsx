import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { customColors } from '../assets/styles/customStyles';
import { useInspectionStore } from '../store/store';
import { getInspectionQuestions } from '../../database/dataAccess/Query/sqlQueries';
import { saveInspectionQuestion } from '../../database/dataAccess/Command/sqlCommands';
import { TypedQuestionGroupForUI } from '../../database/types';
import QuestionButton from '../components/buttons/QustionButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PrimaryButton from '../components/buttons/PrimaryButton';

type NewInspectionScreenNavigationProp = NavigationProp<Record<string, object>, string>;

const QuestionsScreen = () => {
    const navigation = useNavigation<NewInspectionScreenNavigationProp>();
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [questionsData, setQuestionsData] = useState<TypedQuestionGroupForUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [responses, setResponses] = useState<
        Record<number, { answerId: string | null; comment: string }>
    >({});
    const [allCompleted, setAllCompleted] = useState<boolean[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getInspectionQuestions(inspectionId);
                setQuestionsData(data);

                const initialResponses: Record<
                    string,
                    { answerId: string | null; comment: string }
                > = {};

                data.forEach((type) => {
                    type.questionsByGroup.forEach((group) => {
                        group.questions.forEach((q) => {
                            initialResponses[q.inspectionQuestionId] = {
                                answerId: q.answerId?.toString() ?? null,
                                comment: q.comment ?? '',
                            };
                        });
                    });
                });

                setResponses(initialResponses);
            } catch (err) {
                setError('Fehler beim Abrufen der Fragen');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [inspectionId]);

    const answerMapping: Record<string, number> = {
        Ja: 1,
        Nein: 2,
        'Nicht relevant': 3,
    };

    const handleResponse = (questionId: string, label: string) => {
        const answerId = answerMapping[label] ?? null;

        setResponses((prev) => {
            const updatedResponses = {
                ...prev,
                [questionId]: {
                    answerId,
                    comment: prev[questionId]?.comment || '',
                },
            };

            saveInspectionQuestion({
                id: questionId,
                answerId: answerId?.toString() || '',
                comment: updatedResponses[questionId].comment,
            });

            return updatedResponses;
        });
    };

    const handleCommentChange = (questionId: string, comment: string) => {
        setResponses((prev) => {
            const updatedResponses = {
                ...prev,
                [questionId]: {
                    answerId: prev[questionId]?.answer ?? '',
                    comment,
                },
            };

            saveInspectionQuestion({
                id: questionId,
                answerId: updatedResponses[questionId].answer,
                comment,
            });

            return updatedResponses;
        });
    };

    const submit = async () => {
        if (isAllCompleted()) {
            navigation.navigate('AllInspectionsScreen');
        } else {
            console.log('error');
        }
    };

    const isAllCompleted = () => {
        const completionValues = Object.values(allCompleted);
        return completionValues.length > 0 && completionValues.every((status) => status === true);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <GestureHandlerRootView style={styles.scrollContainer}>
                {loading ? (
                    <Text>Laden...</Text>
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : (
                    <ScrollView style={styles.scrollView}>
                        {questionsData.map((type) => (
                            <View key={type.inspectionTypeId} style={styles.typeContainer}>
                                <Text style={styles.typeTitle}>{type.inspectionTypeName}</Text>
                                {type.questionsByGroup.map((group) => (
                                    <View key={group.groupId} style={styles.groupContainer}>
                                        <Text style={styles.groupTitle}>{group.name}</Text>
                                        {group.questions.map((q) => {
                                            return (
                                                <View
                                                    key={q.inspectionQuestionId}
                                                    style={styles.questionContainer}
                                                >
                                                    <Text style={styles.questionText}>
                                                        {q.questionNumber}. {q.fullDescription}
                                                    </Text>
                                                    <View style={styles.buttonContainer}>
                                                        {[
                                                            {
                                                                label: 'Ja',
                                                                color: customColors.greenMid,
                                                            }, // Zeleno
                                                            {
                                                                label: 'Nein',
                                                                color: customColors.redLight,
                                                            }, // Crveno
                                                            {
                                                                label: 'Nicht relevant',
                                                                color: '#9E9E9E',
                                                            }, // Sivo
                                                        ].map(({ label, color }) => {
                                                            return (
                                                                <QuestionButton
                                                                    key={label}
                                                                    label={label}
                                                                    responses={responses}
                                                                    q={q}
                                                                    color={color}
                                                                    handleResponse={handleResponse}
                                                                />
                                                            );
                                                        })}
                                                    </View>

                                                    <TextInput
                                                        style={styles.commentInput}
                                                        placeholder="Kommentar eingeben..."
                                                        value={
                                                            responses[q.inspectionQuestionId]
                                                                ?.comment || ''
                                                        }
                                                        onChangeText={(text) =>
                                                            handleCommentChange(
                                                                q.inspectionQuestionId,
                                                                text,
                                                            )
                                                        }
                                                    />
                                                </View>
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                )}
            </GestureHandlerRootView>
            <View style={styles.rightAlign}>
                <PrimaryButton title="Nächster Schritt" onPress={submit} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: customColors.blueLighter,
    },
    scrollContainer: {
        alignItems: 'center',
        width: '100%',
        maxHeight: '92%',
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
    scrollView: {
        marginTop: 10,
    },
    typeContainer: {
        marginBottom: 20,
        padding: 12,
        backgroundColor: customColors.blueLight,
        borderRadius: 8,
    },
    rightAlign: {
        display: 'flex',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    typeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    groupContainer: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: customColors.blueDark,
        borderRadius: 6,
        marginBottom: 5,
    },
    groupTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
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
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 5,
    },
    answerButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    commentInput: {
        marginTop: 10,
        padding: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 18,
    },
});

export default QuestionsScreen;
