import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function QuizResultScreen() {
  const params = useLocalSearchParams();
  const suggestedTopics = params.suggestedTopics ? JSON.parse(params.suggestedTopics as string) : [];
  return (
    <View style={styles.root}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.timeText}>9:41</Text>
      </View>
      {/* Result Title */}
      <View style={styles.resultHeader}>
        <View style={styles.resultIcon} />
        <Text style={styles.resultTitle}>Result</Text>
      </View>
      {/* Achievements */}
      <View style={styles.achievementsWrap}>
        <View style={styles.achievementBox}>
          <View style={styles.achievementIconGold} />
          <View style={styles.achievementTextWrap}>
            <Text style={styles.achievementValue}>245,679</Text>
            <Text style={styles.achievementLabel}>Coins Earned</Text>
          </View>
        </View>
        <View style={styles.achievementBox}>
          <View style={styles.achievementIconRed} />
          <View style={styles.achievementTextWrap}>
            <Text style={styles.achievementValue}>124</Text>
            <Text style={styles.achievementLabel}>XP</Text>
          </View>
        </View>
        <View style={styles.achievementBox}>
          <View style={styles.achievementIconBlue} />
          <View style={styles.achievementTextWrap}>
            <Text style={styles.achievementValue}>72</Text>
            <Text style={styles.achievementLabel}>Avg time</Text>
          </View>
        </View>
        <View style={styles.achievementBox}>
          <View style={styles.achievementIconRed} />
          <View style={styles.achievementTextWrap}>
            <Text style={styles.achievementValue}>38</Text>
            <Text style={styles.achievementLabel}>Correct Questions</Text>
          </View>
        </View>
      </View>
      {/* Gợi ý topic liên quan */}
      {suggestedTopics.length > 0 && (
        <View style={{ marginTop: 16, width: 340 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Related Topics:</Text>
          {suggestedTopics.map((topic: string, idx: number) => (
            <Text key={idx} style={{ color: '#1c58f2', marginTop: 4 }}>{topic}</Text>
          ))}
        </View>
      )}
      {/* Share & Home Buttons */}
      <View style={styles.bottomRow}>
        <View style={styles.bottomBtn}><Text style={styles.bottomBtnText}>Home</Text></View>
        <View style={styles.bottomBtn}><Text style={styles.bottomBtnText}>Share</Text></View>
      </View>
      {/* Retry Button */}
      <View style={styles.retryWrap}>
        <View style={styles.retryBtn}><Text style={styles.retryText}>Retry</Text></View>
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
  resultHeader: {
    marginTop: 60,
    alignItems: 'center',
    marginBottom: 24,
  },
  resultIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#005fff',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 28,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
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
  },
  bottomBtn: {
    backgroundColor: '#005fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginHorizontal: 8,
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
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 