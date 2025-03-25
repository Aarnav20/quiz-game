import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { quizzes } from '../data/quizzes';
import QuizCard from '../components/QuizCard';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>Choose a Quiz</Text>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuizCard
            title={item.title}
            onPress={() => navigation.navigate('Quiz', { quiz: item })}
          />
        )}
      />
    </View>
  );
}