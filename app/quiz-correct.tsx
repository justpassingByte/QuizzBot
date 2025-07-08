import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AnswerButton from './components/AnswerButton';
import { useLanguage } from './context/LanguageContext';

const { width } = Dimensions.get('window');
const robotImg = require('../assets/images/robot2.png');

export default function QuizCorrectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { explanation, current, total, score, topic, questions: questionsParam, selected, answers } = params;
  const { t, language } = useLanguage();

  // Sử dụng useMemo để tránh tạo lại mảng questions trên mỗi lần render
  const questions = useMemo(() => (
    questionsParam ? JSON.parse(questionsParam as string) : []
  ), [questionsParam]);
  
  const currentIdx = Number(current || 0);
  const selectedIdx = selected !== undefined ? Number(selected) : -1;

  const isLastQuestion = currentIdx + 1 === Number(total);

  const handleNext = () => {
    if (isLastQuestion) {
      // Logic gửi kết quả cuối cùng đã có ở quiz.tsx, ở đây chỉ cần chuyển màn hình
      router.replace({ pathname: '/quiz-result', params: { score, total, topic, suggestedTopics: params.suggestedTopics || '[]' } });
    } else {
      router.replace({
        pathname: '../quiz',
        params: {
          topic,
          questions: JSON.stringify(questions),
          current: String(currentIdx + 1), // Chuyển đến câu hỏi tiếp theo
          score,
          answers, // Truyền lại mảng answers đã được cập nhật
          quizId: params.quizId, // Thêm quizId vào đây
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

  // Lấy câu hỏi và đáp án theo ngôn ngữ nếu có
  const getQuestionText = (q: any) => {
    if (!q) return '';
    if (language === 'vi' && q.question_vi) return q.question_vi;
    if (language === 'en' && q.question_en) return q.question_en;
    return q.question;
  };
  const getAnswerText = (ans: any) => {
    if (!ans) return '';
    if (language === 'vi' && ans.text_vi) return ans.text_vi;
    if (language === 'en' && ans.text_en) return ans.text_en;
    return ans.text;
  };
  const getExplanationText = () => {
    if (Array.isArray(explanation)) return explanation.join(' ');
    if (typeof explanation === 'object' && explanation !== null && !Array.isArray(explanation)) {
      const exp: any = explanation;
      if (language === 'vi' && exp.vi) return exp.vi;
      if (language === 'en' && exp.en) return exp.en;
    }
    return explanation;
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {/* Banner Correct */}
        <View style={styles.bannerCorrect}>
          <Text style={styles.bannerTitle}>{t.quiz.correct}</Text>
          <Text style={styles.bannerBox}>{'Great job!'}</Text>
        </View>
        {/* Robot */}
        <View style={styles.robotWrap}>
          <Image source={robotImg} style={styles.robot} />
        </View>
        {/* Question */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{getQuestionText(questions[currentIdx])}</Text>
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
            if (isCorrect) { // Chỉ làm nổi bật đáp án đúng
              variant = 'correct';
              showIcon = true;
              iconType = 'check';
            }
            return (
              <AnswerButton
                key={getAnswerText(ans)}
                text={getAnswerText(ans)}
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
          <Text style={styles.explanationTitle}>{t.quiz.explanation}</Text>
          <ScrollView style={styles.explanationScrollView}>
            <Text style={styles.explanationText}>{getExplanationText()}</Text>
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