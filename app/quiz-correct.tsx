import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AnswerButton from './components/AnswerButton';

const { width } = Dimensions.get('window');
const robotImg = require('../assets/images/robot2.png');

export default function QuizCorrectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { explanation, current, total, score, topic, questions: questionsParam } = params;

  // Convert questionsParam back to array if available, otherwise pass empty array
  const questions = questionsParam ? JSON.parse(questionsParam as string) : [];
  const currentIdx = Number(current) || 0;
  const selected = params.selected !== undefined ? Number(params.selected) : undefined;

  const isLastQuestion = Number(current) + 1 === Number(total);
  const nextQuestionIndex = Number(current) + 1;

  const handleNext = () => {
    if (isLastQuestion) {
      router.replace({ pathname: '/quiz-result', params: { score, total, topic, suggestedTopics: params.suggestedTopics || '[]' } });
    } else {
      router.replace({
        pathname: '../quiz',
        params: {
          topic,
          questions: JSON.stringify(questions),
          current: String(nextQuestionIndex),
          score,
          total,
          selected: undefined,
        }
      });
    }
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      handleNext();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {/* Banner Correct */}
        <View style={styles.bannerCorrect}>
          <Text style={styles.bannerTitle}>Correct!</Text>
          <Text style={styles.bannerBox}>Great job!</Text>
        </View>
        {/* Robot */}
        <View style={styles.robotWrap}>
          <Image source={robotImg} style={styles.robot} />
        </View>
        {/* Question */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{questions[currentIdx]?.question}</Text>
        </View>
      </View>
      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {/* Answers */}
        <View style={styles.answersWrap}>
          {questions[currentIdx]?.answers.map((ans: any, idx: number) => {
            const isCorrect = ans.correct;
            let variant: 'default' | 'correct' | 'wrong' | 'faded' | 'warning' = 'faded';
            let showIcon = false;
            let iconType: 'check' | 'close' | undefined = undefined;
            if (isCorrect) {
              variant = 'correct';
              showIcon = true;
              iconType = 'check';
            }
            return (
              <AnswerButton
                key={ans.text}
                text={ans.text}
                variant={variant}
                showIcon={showIcon}
                iconType={iconType}
                disabled
              />
            );
          })}
        </View>
        {/* Explanation */}
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Giải thích:</Text>
          <ScrollView style={styles.explanationScrollView}>
            <Text style={styles.explanationText}>{explanation}</Text>
          </ScrollView>
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
    justifyContent: 'center',
    paddingTop: 0,
    paddingHorizontal: 24,
  },
  bannerCorrect: {
    backgroundColor: '#00b676',
    alignItems: 'center',
    paddingVertical: 24,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 12,
    marginTop: 20,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerBox: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  robotWrap: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  robot: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  questionText: {
    fontSize: 20,
    color: '#222',
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: 'bold',
  },
  answersWrap: {
    width: 340,
    alignSelf: 'center',
    marginBottom: 18,
  },
  explanationContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: Dimensions.get('window').height * 0.4,
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
    flexGrow: 0,
  },
  explanationText: {
    color: '#222',
    fontSize: 16,
    lineHeight: 24,
  },
  questionBox: {
    marginBottom: 18,
  },
}); 