import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { createQuiz, analyzeContext } from '../constants/api';

const { width } = Dimensions.get('window');

export default function LoadingQuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { topic, config: configParam, level } = params;
  const [loadingText, setLoadingText] = useState('Creating your quiz...');

  useEffect(() => {
    const createAndAnalyzeQuiz = async () => {
      if (!topic || !configParam || typeof topic !== 'string' || typeof configParam !== 'string') {
        Alert.alert('Lỗi', 'Thông tin tạo quiz không đầy đủ.');
        router.back();
        return;
      }

      try {
        const parsedConfig = JSON.parse(configParam);

        // Gọi song song 2 API: tạo quiz và context analysis
        const [res, contextRes] = await Promise.all([
          createQuiz(topic.trim(), parsedConfig, level as string),
          analyzeContext(topic.trim())
        ]);

        let quizId = res;
        let questions = undefined;

        if (typeof res === 'object' && res !== null) {
          quizId = res.id || res.quiz?.id;
          if (res.quiz && Array.isArray(res.quiz.questions)) {
            questions = res.quiz.questions.map((q: any) => ({
              question: q.text,
              answers: q.choices.map((c: any) => ({ text: c.text, correct: !!c.isCorrect })),
              explanation: q.explanation,
              id: q.id,
            }));
          }
        }

        if (!questions && quizId) {
          const { getQuestionById } = await import('../constants/api');
          questions = await getQuestionById(quizId);
        }

        if (!questions) throw new Error('No questions found');

        console.log('Number of questions:', questions.length);
        console.log('Length of questions JSON string:', JSON.stringify(questions).length);

        // Điều hướng đến màn hình quiz
        router.replace({
          pathname: '../quiz',
          params: {
            topic: topic.trim(),
            questions: JSON.stringify(questions),
            suggestedTopics: JSON.stringify(contextRes.suggestedTopics || [])
          }
        });

      } catch (err: any) {
        Alert.alert('Tạo quiz thất bại', err?.response?.data?.message || err.message || 'Lỗi không xác định');
        router.back(); // Quay lại màn hình tạo quiz nếu có lỗi
      }
    };

    createAndAnalyzeQuiz();
  }, [topic, configParam, level, router]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.timeText}>9:41</Text>
      </View>
      <Text style={styles.title}>Loading...</Text>
      <ActivityIndicator size="large" color="#1c58f2" style={{ marginTop: 20 }} />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 23,
    paddingTop: 11,
    zIndex: 2,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  title: {
    fontSize: 28,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
}); 