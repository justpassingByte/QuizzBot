import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function QuizScreen() {
  const router = useRouter();
  const { topic, questions: questionsParam, current: initialCurrent, score: initialScore } = useLocalSearchParams();
  const questions = questionsParam ? JSON.parse(questionsParam as string) : [];
  const [current, setCurrent] = useState(Number(initialCurrent || 0));
  const [score, setScore] = useState(Number(initialScore || 0));
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

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
    <View style={styles.root}>
      <View style={styles.topBar}>
        <Text style={styles.timeText}>9:41</Text>
      </View>
      <Text style={styles.topic}>{topic}</Text>
      <Text style={styles.progress}>{current + 1}/{questions.length}</Text>
      <Text style={styles.questionText}>{q.question}</Text>
      <View style={styles.answersWrap}>
        {q.answers.map((ans: any, idx: number) => {
          let style = styles.answerDefault;
          if (selected !== null) {
            if (idx === q.answers.findIndex((a: any) => a.correct)) style = styles.answerGreen;
            else if (idx === selected && !ans.correct) style = styles.answerRed;
            else style = styles.answerDefault;
          }
          return (
            <TouchableOpacity
              key={ans.text}
              style={[styles.answerBox, style, { top: idx * 60 + 10 }]}
              disabled={selected !== null}
              onPress={() => handleSelect(idx)}
            >
              <Text style={styles.answerText}>{ans.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    fontSize: 20,
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
    marginHorizontal: 16,
    fontWeight: '500',
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
}); 