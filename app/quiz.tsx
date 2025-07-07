import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AnswerButton from './components/AnswerButton';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../constants/api';
import { useAuth } from './context/AuthContext';

const { width } = Dimensions.get('window');
const robotImg = require('../assets/images/robot2.png');

export default function QuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { 
    quizId: paramQuizId, 
    topic, 
    questions: questionsParam, 
    current: initialCurrent, 
    score: initialScore, 
    answers: answersParam 
  } = params;
  
  const { user, updateUser } = useAuth();

  // --- State Management ---
  const [quizId] = useState(paramQuizId); 
  const current = Number(initialCurrent || 0);
  const score = Number(initialScore || 0);

  const [quizStartTime] = useState(Date.now()); // Track quiz start time
  const [questionStartTime, setQuestionStartTime] = useState(Date.now()); // Track per-question start
  const [totalTime, setTotalTime] = useState(0); // Total quiz time in seconds

  const questions = useMemo(() => {
    if (!questionsParam) return [];
    if (typeof questionsParam === 'string') {
      try { return JSON.parse(questionsParam); } catch { return []; }
    }
    return questionsParam; // đã là object
  }, [questionsParam]);

  const initialAnswers = useMemo(() => {
    if (!answersParam) return [];
    const param = Array.isArray(answersParam) ? answersParam[0] : answersParam;
    try { return JSON.parse(param); } catch { return []; }
  }, [answersParam]);
  const [answers, setAnswers] = useState(initialAnswers);
  
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState(10);

  // --- Core Functions ---
  const submitQuiz = async (finalAnswers: any[]) => {
    if (!user) {
      Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return router.replace('/signin');
    }
    // Tính tổng thời gian thực tế
    const totalTimeSec = finalAnswers.reduce((sum, ans) => sum + (ans.timeTaken || 0), 0);
    setTotalTime(totalTimeSec);
    const payload = { 
      quizId, 
      userId: user.id, 
      answers: finalAnswers,
      totalTime: totalTimeSec,
    };

    console.log('--- SUBMITTING QUIZ PAYLOAD ---');
    console.log(JSON.stringify(payload, null, 2));
    console.log('-----------------------------');

    try {
      const response = await fetch(`${API_URL}/api/quizzes/submit-result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const resultData = await response.json();

      // Cập nhật điểm từ newTotalScore của backend
      if (updateUser && resultData.newTotalScore !== undefined) {
        updateUser({ score: resultData.newTotalScore });
      }

      router.replace({
        pathname: '/quiz-result',
        params: { ...resultData, suggestedTopics: JSON.stringify(resultData.suggestedTopics || []) },
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      Alert.alert("Lỗi", "Không thể nộp bài. Vui lòng thử lại.");
    }
  };

  const navigateToResultScreen = (isCorrect: boolean, newAnswers: any[], nextScore: number, selectedIndex: number) => {
    const isLastQuestion = current === questions.length - 1;

    if (isLastQuestion) {
      submitQuiz(newAnswers);
    } else {
      const screen = isCorrect ? '/quiz-correct' : '/quiz-incorrect';
      router.push({
        pathname: screen,
        params: {
          explanation: q.explanation,
          current: String(current),
          total: String(questions.length),
          score: String(nextScore),
          topic,
          questions: questionsParam,
          quizId,
          answers: JSON.stringify(newAnswers),
          selected: String(selectedIndex),
        }
      });
    }
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    
    const isCorrect = q.answers[idx].correct;
    setSelected(idx);
    
    const now = Date.now();
    const timeTaken = Math.round((now - questionStartTime) / 1000); // seconds
    const newAnswers = [...answers, {
      questionId: q.id,
      userAnswer: q.answers[idx].id,
      timeTaken,
      difficulty: q.difficulty || q?.metadata?.difficulty || 'intermediate',
    }];
    setAnswers(newAnswers);
    
    const nextScore = isCorrect ? score + 1 : score;
    setTimeout(() => {
      setQuestionStartTime(Date.now());
      navigateToResultScreen(isCorrect, newAnswers, nextScore, idx);
    }, 1200);
  };

  const q = questions[current];

  // Debug log
  console.log('questions:', questions);
  console.log('current:', current);
  console.log('q:', q);

  useEffect(() => {
    if (selected !== null || !q) return;
    const timerId = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        const now = Date.now();
        const timeTaken = Math.round((now - questionStartTime) / 1000); // seconds
        const newAnswers = [...answers, { 
          questionId: q.id, 
          userAnswer: null, 
          timeTaken,
          difficulty: q.difficulty || q?.metadata?.difficulty || 'intermediate',
        }];
        setAnswers(newAnswers);
        setQuestionStartTime(Date.now());
        navigateToResultScreen(false, newAnswers, score, -1);
      }
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timer, selected, q]);

  if (!q) {
    return <View style={styles.root}><Text>Loading question...</Text></View>
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.quizTopBar}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={styles.quizIndex}>{current + 1}/{questions.length}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <AnimatedCircularProgress
            size={44}
            width={5}
                fill={(timer / 10) * 100}
            tintColor="#1976d2"
            backgroundColor="#e0e0e0"
            rotation={0}
            style={styles.quizProgress}
          >
            {() => <Text style={styles.quizProgressText}>{timer.toString().padStart(2, '0')}</Text>}
          </AnimatedCircularProgress>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.quizCloseBtn} onPress={() => router.replace('/(tabs)') }>
            <Ionicons name="close" size={28} color="#222" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.robotWrap}>
          <Image source={robotImg} style={styles.robot} />
        </View>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{q.question}</Text>
        </View>
      </View>
      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.answersWrap}>
          {q.answers.map((ans: any, idx: number) => {
            let color: 'blue' | 'red' | 'orange' | 'green' = 'blue';
            if (idx === 0) color = 'blue';
            else if (idx === 1) color = 'red';
            else if (idx === 2) color = 'orange';
            else if (idx === 3) color = 'green';
                
            let variant: 'default' | 'correct' | 'wrong' | 'faded' | 'warning' = 'default';
            if (selected !== null) {
              if (ans.correct) {
                variant = 'correct';
              } else if (idx === selected && !ans.correct) {
                variant = 'wrong';
                } else {
                    variant = 'faded';
              }
            }
            return (
              <AnswerButton
                key={ans.text}
                text={ans.text}
                color={color}
                variant={variant}
                onPress={() => handleSelect(idx)}
                disabled={selected !== null}
                    showIcon={variant === 'correct' || variant === 'wrong'}
                    iconType={variant === 'correct' ? 'check' : 'close'}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  quizTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: 18,
    width: '100%',
  },
  quizIndex: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  quizProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizProgressText: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  quizCloseBtn: {
    padding: 4,
  },
  robotWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  robot: {
    width: 100,
    height: 100,
  },
  questionBox: {
    minHeight: 80,
    maxHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  questionText: {
    fontSize: 28,
    color: '#222',
    textAlign: 'center',
    marginHorizontal: 16,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  answersWrap: {
    width: 382,
    height: 340,
    position: 'relative',
    marginBottom: 24,
  },
}); 