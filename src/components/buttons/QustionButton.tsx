import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type QuestionButtonProps = {
    label: string;
    responses: { [key: string]: { answerId: string } };
    q: { inspectionQuestionId: string };
    color: string;
    handleResponse: (id: string, label: string) => void;
};

const answerMapping: Record<string, number> = {
    Ja: 1,
    Nein: 2,
    'Nicht relevant': 3,
};

const reverseAnswerMapping: Record<number, string> = Object.fromEntries(
    Object.entries(answerMapping).map(([key, value]) => [value, key]),
);

const QuestionButton = ({ label, responses, q, color, handleResponse }: QuestionButtonProps) => {
    const currentAnswerId = responses[q.inspectionQuestionId]?.answerId ?? 0;
    const isSelected = (reverseAnswerMapping[currentAnswerId] || '') === label;

    return (
        <TouchableOpacity
            key={label}
            style={[
                styles.answerButton,
                {
                    backgroundColor: color,
                    borderWidth: 4,
                    borderColor: isSelected ? 'black' : 'transparent',
                },
            ]}
            onPress={() => handleResponse(q.inspectionQuestionId, label)}
        >
            <Text
                style={[styles.buttonText, isSelected && styles.selectedButtonText]}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
            >
                {label.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    answerButton: {
        flexBasis: '30%',
        flexGrow: 1,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 8,
    },
    buttonText: {
        color: '#222222',
        fontSize: 18,
        fontWeight: '900',
        textAlign: 'center',
        textAlignVertical: 'center',
        letterSpacing: 1.2,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    selectedButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
});

export default QuestionButton;
