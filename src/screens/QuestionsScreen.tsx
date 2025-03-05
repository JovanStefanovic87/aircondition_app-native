import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { customColors } from '../assets/styles/customStyles';
import { useInspectionStore } from '../store/store';
import { getInspectionQuestions } from '../../database/dataAccess/Query/sqlQueries';
import { saveInspectionQuestion } from '../../database/dataAccess/Command/sqlCommands';
import { TypedQuestionGroupForUI } from '../../database/types';

const QuestionsScreen = () => {
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [questionsData, setQuestionsData] = useState<TypedQuestionGroupForUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [responses, setResponses] = useState<
        Record<number, { answer: string | null; comment: string }>
    >({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getInspectionQuestions(inspectionId);
                console.log('data', JSON.stringify(data));
                setQuestionsData(data);
            } catch (err) {
                setError('Fehler beim Abrufen der Fragen');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [inspectionId]);

    const handleResponse = (questionId: string, answer: string) => {
        setResponses((prev) => {
            const updatedResponses = {
                ...prev,
                [questionId]: {
                    answer,
                    comment: prev[questionId]?.comment || '',
                },
            };

            saveInspectionQuestion({
                id: questionId,
                answer,
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
                    answer: prev[questionId]?.answer ?? '',
                    comment,
                },
            };

            saveInspectionQuestion({
                id: questionId,
                answer: updatedResponses[questionId].answer,
                comment,
            });

            return updatedResponses;
        });
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getInspectionQuestions(inspectionId);
                console.log('data', JSON.stringify(data));
                setQuestionsData(data);

                // Inicijalizacija odgovora za svako pitanje
                const initialResponses: Record<number, { answer: string | null; comment: string }> =
                    {};
                data.forEach((type) => {
                    type.questionsByGroup.forEach((group) => {
                        group.questions.forEach((q) => {
                            initialResponses[q.inspectionQuestionId] = {
                                answer: null,
                                comment: '',
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

    useEffect(() => {
        console.log('Updated responses:', responses);
    }, [responses]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inspektionsfragen</Text>
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
                                        const selectedAnswer =
                                            responses[q.inspectionQuestionId]?.answer ?? null;

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
                                                        { label: 'Ja', color: '#4CAF50' }, // Zeleno
                                                        { label: 'Nein', color: '#F44336' }, // Crveno
                                                        {
                                                            label: 'Nicht relevant',
                                                            color: '#9E9E9E',
                                                        }, // Sivo
                                                    ].map(({ label, color }) => {
                                                        const isSelected = selectedAnswer === label;

                                                        return (
                                                            <TouchableOpacity
                                                                key={label}
                                                                style={[
                                                                    styles.answerButton,
                                                                    {
                                                                        backgroundColor:
                                                                            responses[
                                                                                q
                                                                                    .inspectionQuestionId
                                                                            ]?.answer === label
                                                                                ? '#222'
                                                                                : color,
                                                                        borderWidth:
                                                                            responses[
                                                                                q
                                                                                    .inspectionQuestionId
                                                                            ]?.answer === label
                                                                                ? 2
                                                                                : 0,
                                                                        borderColor:
                                                                            responses[
                                                                                q
                                                                                    .inspectionQuestionId
                                                                            ]?.answer === label
                                                                                ? '#FFD700'
                                                                                : 'transparent',
                                                                    },
                                                                ]}
                                                                onPress={() =>
                                                                    handleResponse(
                                                                        q.inspectionQuestionId,
                                                                        label,
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    style={[
                                                                        styles.buttonText,
                                                                        responses[
                                                                            q.inspectionQuestionId
                                                                        ]?.answer === label &&
                                                                            styles.selectedButtonText,
                                                                    ]}
                                                                >
                                                                    {label}
                                                                </Text>
                                                            </TouchableOpacity>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: customColors.blueLighter,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
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
    typeTitle: {
        fontSize: 18,
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
        fontSize: 16,
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
        fontSize: 16,
        color: 'black',
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
        color: '#FFD700', // Zlatna boja za izabrani odgovor
    },
    commentInput: {
        marginTop: 10,
        padding: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 14,
    },
});

export default QuestionsScreen;
