import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const QuizCard = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e2e8f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
  },
});

export default QuizCard;