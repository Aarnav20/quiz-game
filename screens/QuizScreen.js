import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function QuizScreen({ route, navigation }) {
  const { quiz } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => e.preventDefault());
    return unsubscribe;
  }, [navigation]);

  const question = quiz.questions[currentQuestion];

  const handleCheck = () => {
    const isCorrect = selectedOption === question.answer;
    if (isCorrect) setScore({ ...score, correct: score.correct + 1 });
    else setScore({ ...score, incorrect: score.incorrect + 1 });
    setAnswers([...answers, { ...question, selectedOption }]);
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      navigation.replace('Result', { score, answers });
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
        Question {currentQuestion + 1}
      </Text>
      <Text style={{ marginBottom: 16 }}>{question.question}</Text>
      {question.options.map((opt, index) => {
        let bg = '#e2e8f0';
        if (showAnswer) {
          if (index === question.answer) bg = 'lightgreen';
          else if (index === selectedOption) bg = 'salmon';
        } else if (index === selectedOption) bg = 'skyblue';

        return (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedOption(index)}
            disabled={showAnswer}
            style={{ padding: 12, marginBottom: 8, backgroundColor: bg, borderRadius: 6 }}
          >
            <Text>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      {!showAnswer ? (
        <TouchableOpacity
          onPress={handleCheck}
          disabled={selectedOption === null}
          style={{
            backgroundColor: selectedOption === null ? '#cbd5e1' : '#6b46c1',
            padding: 12,
            marginTop: 16,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Check your answer</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleNext}
          style={{ backgroundColor: 'green', padding: 12, marginTop: 16, borderRadius: 6 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}