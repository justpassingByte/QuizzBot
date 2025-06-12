import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.timeText}>9:41</Text>
        {/* ...icon bar omitted for brevity... */}
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.slogan}>
          Unleash the power of AI!{"\n"}Discover quizzes made just for you
        </Text>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Brown</Text>
            <View style={styles.profileScoreBox}>
              <Text style={styles.profileScore}>301</Text>
            </View>
          </View>
        </View>
        {/* Play Now Button */}
        <TouchableOpacity style={styles.playNowBtn} onPress={() => router.push('../arcade')}>
          <Text style={styles.playNowText}>Play Now</Text>
        </TouchableOpacity>
        {/* Create Quiz Card */}
        <TouchableOpacity style={styles.createQuizCard} onPress={() => router.push('../create-quiz')}>
          <Text style={styles.createQuizText}>Create your own quiz by QUIZZIE BOT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  topBar: {
    height: 44,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 23,
    paddingTop: 11,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  slogan: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 24,
    color: '#222',
    fontWeight: '500',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1c58f2',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  profileScoreBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  profileScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c58f2',
  },
  playNowBtn: {
    backgroundColor: '#1c58f2',
    borderRadius: 30,
    paddingVertical: 16,
    width: 300,
    alignItems: 'center',
    marginBottom: 24,
  },
  playNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  createQuizCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 24,
    width: 320,
    alignItems: 'center',
    marginBottom: 24,
  },
  createQuizText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    fontWeight: '500',
  },
});
