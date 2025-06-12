import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function QuizIncorrectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { explanation, current, total, score, topic, questions: questionsParam } = params;

  // Convert questionsParam back to array if available, otherwise pass empty array
  const questions = questionsParam ? JSON.parse(questionsParam as string) : [];

  const isLastQuestion = Number(current) + 1 === Number(total);
  const nextQuestionIndex = Number(current) + 1;

  const handleNext = () => {
    if (isLastQuestion) {
      router.replace({ pathname: '/quiz-result', params: { score, total, topic, suggestedTopics: params.suggestedTopics || '[]' } });
    } else {
      router.replace({
        pathname: '/quiz',
        params: {
          topic,
          questions: JSON.stringify(questions), // Đảm bảo truyền lại toàn bộ questions
          current: String(nextQuestionIndex),
          score,
          total,
        }
      });
    }
  };

  return (
    <View style={styles.root}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.timeText}>9:41</Text>
      </View>

      {/* Banner Incorrect */}
      <View style={styles.bannerIncorrect}>
        <Text style={styles.bannerTitle}>Incorrect!</Text>
        <View style={styles.bannerBox}>
          <Text style={styles.bannerBoxText}>Thật tiếc, bạn đã trả lời sai.</Text>
        </View>
      </View>

      {/* Explanation */}
      <View style={styles.explanationContainer}>
        <Text style={styles.explanationTitle}>Giải thích:</Text>
        <ScrollView style={styles.explanationScrollView}>
          <Text style={styles.explanationText}>{explanation}</Text>
        </ScrollView>
      </View>

      {/* Next/Finish Button */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextBtnText}>{isLastQuestion ? 'Finish Quiz' : 'Next Question'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
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
  bannerIncorrect: {
    alignItems: 'center',
    backgroundColor: 'rgba(247,85,85,0.9)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    width: '100%',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bannerBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  bannerBoxText: {
    color: '#f75555',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  explanationContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: Dimensions.get('window').height * 0.4, // Giới hạn chiều cao
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  explanationScrollView: {
    flexGrow: 0, // Quan trọng để ScrollView không chiếm toàn bộ không gian
  },
  explanationText: {
    color: '#222',
    fontSize: 16,
    lineHeight: 24,
  },
  nextBtn: {
    backgroundColor: '#1c58f2',
    borderRadius: 30,
    paddingVertical: 16,
    width: '80%',
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 