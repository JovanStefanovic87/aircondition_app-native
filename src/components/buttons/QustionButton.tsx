import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type QuestionButtonProps = {
    label: string;
    responses: { [key: string]: { answer: string } };
    q: { inspectionQuestionId: string };
    color: string;
    handleResponse: (id: string, label: string) => void;
};

const QuestionButton = ({ label, responses, q, color, handleResponse }: QuestionButtonProps) => {
    const isSelected = responses[q.inspectionQuestionId]?.answer === label;

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
            <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    answerButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
    },
    buttonText: {
        color: '#222222', // Poboljšava kontrast umesto crne
        fontSize: 18, // Malo veći font za bolju čitljivost
        fontWeight: '900', // Deblji tekst za bolju oštrinu
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: 1.2, // Poboljšava razmak između slova
        textShadowColor: 'rgba(0, 0, 0, 0.2)', // Blaga senka
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    selectedButtonText: {
        fontSize: 20, // Selektovan tekst je još izraženiji
        fontWeight: 'bold',
        color: '#FFD700', // Zlatna boja za selektovani tekst
        textShadowColor: 'rgba(0, 0, 0, 0.3)', // Jača senka na selektovanom tekstu
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
});

export default QuestionButton;
