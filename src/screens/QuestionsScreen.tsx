import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { customColors } from '../assets/styles/customStyles';
import { useInspectionStore } from '../store/store';
import { getInspectionQuestions } from '../../database/dataAccess/Query/sqlQueries';
import { TypedQuestionGroupForUI } from '../../database/types';

const QuestionsScreen = () => {
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [questionsData, setQuestionsData] = useState<TypedQuestionGroupForUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getInspectionQuestions(inspectionId);
                setQuestionsData(data);
            } catch (err) {
                setError('Error fetching questions');
                console.error('Error fetching inspection questions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [inspectionId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inspection Questions</Text>
            {loading ? (
                <Text>Loading...</Text>
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
                                    {group.questions.map((q) => (
                                        <View
                                            key={q.inspectionQuestionId}
                                            style={styles.questionContainer}
                                        >
                                            <Text style={styles.questionText}>
                                                {q.questionNumber}. {q.fullDescription}
                                            </Text>
                                        </View>
                                    ))}
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
        fontSize: 20,
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
        padding: 10,
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
        padding: 8,
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
        padding: 6,
        backgroundColor: customColors.grayLight,
        borderRadius: 4,
        marginTop: 3,
    },
    questionText: {
        fontSize: 14,
        color: 'black',
    },
});

export default QuestionsScreen;
