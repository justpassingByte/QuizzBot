import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from './context/LanguageContext';

export default function LoadingQuiz() {
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1976d2" />
      <Text style={styles.text}>{t.quiz.loadingQuiz}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: '#222',
  },
}); 