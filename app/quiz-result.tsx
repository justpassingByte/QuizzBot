import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const trophyImg = require('../assets/images/tropy.png');
const coinImg = require('../assets/images/coin.png');

export default function QuizResultScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);

  useEffect(() => {
    if (params.score) setScore(Number(params.score));
    if (params.correctAnswers) setCorrectAnswers(Number(params.correctAnswers));
    if (params.totalQuestions) setTotalQuestions(Number(params.totalQuestions));
    if (params.coinsEarned) setCoinsEarned(Number(params.coinsEarned));
    if (params.xpEarned) setXpEarned(Number(params.xpEarned));
    if (params.suggestedTopics) {
      try {
        setSuggestedTopics(JSON.parse(params.suggestedTopics as string));
      } catch (e) {
        console.error("Failed to parse suggested topics", e);
      }
    }
  }, [params]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.resultTitle}>Result</Text>
        <Image source={trophyImg} style={styles.resultIcon} />
        <Text style={styles.achievementHeader}>Your Achievements</Text>
        <View style={styles.achievementsWrap}>
          <View style={styles.achievementBox}>
            <Image source={coinImg} style={styles.achievementIconImg} />
            <View style={styles.achievementTextWrap}>
              <Text style={styles.achievementValue}>{coinsEarned}</Text>
              <Text style={styles.achievementLabel}>Coins Earned</Text>
            </View>
          </View>
          <View style={styles.achievementBox}>
            <Ionicons name="flash" size={32} color="#ffcc4d" style={styles.achievementIconImg} />
            <View style={styles.achievementTextWrap}>
              <Text style={styles.achievementValue}>{xpEarned}</Text>
              <Text style={styles.achievementLabel}>XP</Text>
            </View>
          </View>
          <View style={styles.achievementBox}>
            <Ionicons name="time" size={32} color="#285ecc" style={styles.achievementIconImg} />
            <View style={styles.achievementTextWrap}>
              <Text style={styles.achievementValue}>{totalQuestions}</Text>
              <Text style={styles.achievementLabel}>Total Questions</Text>
            </View>
          </View>
          <View style={styles.achievementBox}>
            <Ionicons name="checkmark-circle" size={32} color="#00b676" style={styles.achievementIconImg} />
            <View style={styles.achievementTextWrap}>
              <Text style={styles.achievementValue}>{correctAnswers}</Text>
              <Text style={styles.achievementLabel}>Correct Questions</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
        {/* Gợi ý topic liên quan */}
        {suggestedTopics.length > 0 && (
          <View style={{ marginTop: 16, width: 340 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Related Topics:</Text>
            {suggestedTopics.map((topic: string, idx: number) => (
              <TouchableOpacity key={idx} onPress={() => router.push('/loading-quiz')}>
                <Text style={{ color: '#1c58f2', marginTop: 4 }}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* Retry Button */}
        <TouchableOpacity style={styles.retryBtn} onPress={() => router.back()}>
          <Text style={styles.retryText}>↻  Retry</Text>
        </TouchableOpacity>
        {/* Share & Home Buttons */}
        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.bottomBtn} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.bottomBtnText}>🏠  Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn}>
            <Text style={styles.bottomBtnText}>🔗  Share</Text>
          </TouchableOpacity>
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
  },
  resultTitle: {
    fontSize: 28,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
  },
  resultHeader: {
    marginTop: 0,
    alignItems: 'center',
    marginBottom: 24,
  },
  resultIcon: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 6,
  },
  achievementHeader: {
    fontSize: 22,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  achievementsWrap: {
    marginTop: 24,
    width: 340,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  achievementBox: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementIconGold: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffcc4d',
    marginRight: 12,
  },
  achievementIconRed: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f75555',
    marginRight: 12,
  },
  achievementIconBlue: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#285ecc',
    marginRight: 12,
  },
  achievementTextWrap: {
    flex: 1,
  },
  achievementValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  achievementLabel: {
    fontSize: 14,
    color: '#888',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
    marginTop: 16,
    marginBottom: 8,
  },
  bottomBtn: {
    backgroundColor: '#005fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginHorizontal: 8,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  bottomBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryWrap: {
    marginTop: 24,
    width: 340,
    alignItems: 'center',
  },
  retryBtn: {
    backgroundColor: '#005fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 64,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    width: 320,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  retryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  achievementIconImg: {
    width: 32,
    height: 32,
    marginRight: 12,
    resizeMode: 'contain',
  },
}); 