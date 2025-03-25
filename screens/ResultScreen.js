import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function ResultScreen({ route }) {
  const { score, answers } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Your Results</Text>
      <Text style={{ fontSize: 18, marginBottom: 4 }}>✅ Correct: {score.correct}</Text>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>❌ Incorrect: {score.incorrect}</Text>

      <FlatList
        data={answers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: 'bold' }}>
              Q{index + 1}: {item.question}
            </Text>
            <Text>Your Answer: {item.options[item.selectedOption]}</Text>
            <Text>Correct Answer: {item.options[item.answer]}</Text>
          </View>
        )}
      />
    </View>
  );
}