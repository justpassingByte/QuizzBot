import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AnswerButton from './components/AnswerButton';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const robotImg = require('../assets/images/robot2.png');

export default function QuizScreen() {
  const router = useRouter();
  const { topic, questions: questionsParam, current: initialCurrent, score: initialScore } = useLocalSearchParams();
  const questions = questionsParam ? JSON.parse(questionsParam as string) : [];
  const [current, setCurrent] = useState(Number(initialCurrent || 0));
  const [score, setScore] = useState(Number(initialScore || 0));
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const totalTime = 10;
  const [timer, setTimer] = React.useState(totalTime);

  React.useEffect(() => {
    if (selected !== null) return;
    if (timer === 0) {
      if (current < questions.length - 1) {
        setSelected(null);
        setCurrent((c) => c + 1);
        setTimer(totalTime);
      } else {
        setShowResult(true);
        router.replace({ pathname: '/quiz-result', params: { score: String(score), total: String(questions.length), topic } });
      }
      return;
    }
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, selected]);

  // Sau khi chọn đáp án, tự động chuyển câu sau 5 giây
  React.useEffect(() => {
    if (selected === null) return;
    const timeout = setTimeout(() => {
      if (current < questions.length - 1) {
        setSelected(null);
        setCurrent((c) => c + 1);
        setTimer(totalTime);
      } else {
        setShowResult(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [selected]);

  if (!questions.length) {
    return <View style={styles.root}><Text style={styles.error}>No questions found.</Text></View>;
  }

  const q = questions[current];
  const correctIdx = q.answers.findIndex((a: any) => a.correct);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (q.answers[idx].correct) {
      setScore((s) => s + 1);
      router.push({ pathname: '/quiz-correct', params: { explanation: q.explanation, current: String(current), total: String(questions.length), score: String(score + 1), topic, questions: questionsParam } });
    } else {
      router.push({ pathname: '/quiz-incorrect', params: { explanation: q.explanation, current: String(current), total: String(questions.length), score: String(score), topic, questions: questionsParam } });
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setShowResult(true);
      router.replace({ pathname: '/quiz-result', params: { score: String(score), total: String(questions.length), topic } });
    }
  };

  if (showResult) {
    return <View style={styles.root}><Text style={styles.result}>Quiz Finished! Score: {score}/{questions.length}</Text></View>;
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
            fill={(timer / totalTime) * 100}
            tintColor="#1976d2"
            backgroundColor="#e0e0e0"
            rotation={0}
            style={styles.quizProgress}
          >
            {() => <Text style={styles.quizProgressText}>{timer.toString().padStart(2, '0')}</Text>}
          </AnimatedCircularProgress>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity style={styles.quizCloseBtn} onPress={() => router.replace('/') }>
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
            let showIcon = false;
            let iconType: 'check' | 'close' | undefined = undefined;
            let variant: 'default' | 'correct' | 'wrong' | 'faded' | 'warning' = 'default';
            if (selected !== null) {
              if (ans.correct) {
                variant = 'correct';
                showIcon = true;
                iconType = 'check';
              } else if (idx === selected && !ans.correct) {
                variant = 'wrong';
                showIcon = true;
                iconType = 'close';
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
                showIcon={showIcon}
                iconType={iconType}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
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
  topic: {
    marginTop: 60,
    fontSize: 20,
    color: '#1c58f2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progress: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 28,
    color: '#222',
    textAlign: 'center',
    marginHorizontal: 16,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  questionBox: {
    minHeight: 80,
    maxHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  answersWrap: {
    width: 382,
    height: 340,
    position: 'relative',
    marginBottom: 24,
  },
  answerBox: {
    position: 'absolute',
    left: 0,
    width: 382,
    height: 59,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 2,
  },
  answerDefault: {
    backgroundColor: '#285ecc',
  },
  answerGreen: {
    backgroundColor: '#00b676',
  },
  answerRed: {
    backgroundColor: '#f75555',
  },
  answerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
  },
  explanationBox: {
    marginTop: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 20,
    width: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  explanationTitleCorrect: {
    color: '#00b676',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanationTitleIncorrect: {
    color: '#f75555',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanationText: {
    color: '#222',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  nextBtn: {
    backgroundColor: '#1c58f2',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 100,
    color: 'red',
    fontSize: 18,
  },
  result: {
    marginTop: 100,
    color: '#1c58f2',
    fontSize: 22,
    fontWeight: 'bold',
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
}); 