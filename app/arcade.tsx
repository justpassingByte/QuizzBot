import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchRecommendedQuizzes, getQuestionById } from '../constants/api';
import { useAuth } from './context/AuthContext';

const { width } = Dimensions.get('window');
const robotImg = require('../assets/images/robot2.png');

export default function ArcadeScreen() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setQuizzes([]);
      return;
    }
    fetchRecommendedQuizzes(user.id).then((data) => {
      setQuizzes(data.slice(0, 5));
      setLoading(false);
    });
  }, [user]);

  const handleSelectQuiz = async (quiz: any) => {
    setSelecting(true);
    const questions = await getQuestionById(quiz.id);
    setSelecting(false);
    console.log('Quiz data before navigating to quiz.tsx:', questions);
    router.push({ pathname: '../quiz', params: { quizId: quiz.id, topic: quiz.topic, questions: JSON.stringify(questions) } });
  };

  // Màu gradient cho từng category
  const gradients = [
    ['#FFD600', '#FF9900'], // Science - vàng cam
    ['#3BE65F', '#1CBF3B'], // Maths - xanh lá
    ['#FF9800', '#FF5E62'], // Social - cam đỏ
    ['#F75555', '#FF416C'], // Technology - đỏ hồng
    ['#A259FF', '#3B2FE3'], // Movies - tím
  ];

  return (
    <View style={styles.root}>
      {/* Layered background boxes */}
      <View style={styles.bgCyan1} />
      <View style={styles.bgCyan2} />
      <View style={styles.bgCyan3} />
      <View style={styles.bgBlue} />
      {/* Robot và tiêu đề */}
      <View style={{ alignItems: 'center', marginTop: 48, marginBottom: 12 }}>
        <Text style={styles.arcadeTitle}>Arcade</Text>
        <Image source={robotImg} style={styles.robot} />
      </View>
      {/* Khung chọn category */}
      <View style={styles.categoryBox}>
        <Text style={styles.categoryTitle}>Choose your category{"\n"}Explore!</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
        ) : (
          quizzes.map((quiz, idx) => (
            <LinearGradient
              key={quiz.id}
              colors={gradients[idx % gradients.length] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quizBtn}
            >
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => handleSelectQuiz(quiz)}
                disabled={selecting}
                activeOpacity={0.85}
              >
                <Text style={styles.quizBtnText}>{quiz.topicName || quiz.topicSlug || quiz.topic}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))
        )}
        {selecting && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 24 }} />}
      </View>
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
  arcadeTitle: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 0,
  },
  robot: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  categoryBox: {
    backgroundColor: '#0047ab',
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 18,
    alignItems: 'center',
    width: width * 0.85,
    alignSelf: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 24,
  },
  quizBtn: {
    borderRadius: 24,
    marginBottom: 18,
    width: 260,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  quizBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
}); 