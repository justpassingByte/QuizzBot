import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { fetchQuizzes, getQuestionById } from '../constants/api';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ArcadeScreen() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes().then((data) => {
      setQuizzes(data.slice(0, 5)); // chỉ lấy 5 quiz đầu
      setLoading(false);
    });
  }, []);

  const handleSelectQuiz = async (quiz: any) => {
    setSelecting(true);
    const questions = await getQuestionById(quiz.id);
    setSelecting(false);
    router.push({ pathname: '../quiz', params: { topic: quiz.topic, questions: JSON.stringify(questions) } });
  };

  return (
    <View style={styles.root}>
      {/* Layered background boxes */}
      <View style={styles.bgCyan1} />
      <View style={styles.bgCyan2} />
      <View style={styles.bgCyan3} />
      <View style={styles.bgBlue} />
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.timeText}>9:41</Text>
        {/* ...icon bar omitted for brevity... */}
      </View>
      {/* Title */}
      <Text style={styles.arcadeTitle}>Arcade</Text>
      {/* Loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 100 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.quizList} showsVerticalScrollIndicator={false}>
          <Text style={styles.quizTitle}>Choose your topic</Text>
          {quizzes.map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              style={styles.quizBtn}
              onPress={() => handleSelectQuiz(quiz)}
              disabled={selecting}
            >
              <Text style={styles.quizBtnText}>{quiz.topic}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {selecting && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 24 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#005fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bgCyan1: {
    position: 'absolute',
    top: 26,
    left: 0,
    width: 40,
    height: 26,
    backgroundColor: '#00cfff',
    borderRadius: 13,
    opacity: 0.2,
  },
  bgCyan2: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 116,
    height: 116,
    backgroundColor: '#00cfff',
    borderRadius: 58,
    opacity: 0.2,
  },
  bgCyan3: {
    position: 'absolute',
    top: 100,
    left: 60,
    width: 123,
    height: 123,
    backgroundColor: '#00cfff',
    borderRadius: 62,
    opacity: 0.2,
  },
  bgBlue: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: '100%',
    backgroundColor: '#005fff',
    zIndex: -1,
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
  arcadeTitle: {
    position: 'absolute',
    top: 60,
    left: width / 2 - 60,
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 120,
    zIndex: 3,
  },
  quizList: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  quizTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  quizBtn: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginBottom: 16,
    alignItems: 'center',
    width: 300,
  },
  quizBtnText: {
    color: '#005fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizInfo: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
}); 