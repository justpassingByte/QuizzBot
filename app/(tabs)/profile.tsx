import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import useButtonSound from '../components/useButtonSound';
import { useMusic } from '../context/MusicContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const achievements = [
    { icon: 'trophy', count: 85, label: 'Quizzes', color: '#ffd700' },
    { icon: 'star', count: 245679, label: 'Lifetime Point', color: '#ffd700' },
    { icon: 'flame', count: 124, label: 'Quiz Passed', color: '#ff6b35' },
    { icon: 'medal', count: 38, label: 'Top 3 Positions', color: '#ffd700' },
    { icon: 'target', count: 269, label: 'Challenge Pass...', color: '#ff4757' },
    { icon: 'zap', count: 72, label: 'Fastest Record', color: '#ff4757' },
  ];

  return (
    <LinearGradient colors={['#0a4cff', '#1c58f2']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.back();
            }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Text style={styles.levelBadge}>L1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="trophy" size={20} color="#ffd700" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="notifications" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Info */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.profileName}>John Brown</Text>
            <Text style={styles.profileUsername}>@johnbrown_12</Text>
            
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => {
                if (soundEffectsEnabled) playButtonSound();
                router.push('../edit-profile');
              }}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Quizzes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5.6M</Text>
              <Text style={styles.statLabel}>Plays</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>16.8M</Text>
              <Text style={styles.statLabel}>Rank</Text>
            </View>
          </View>

          {/* Chart */}
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>My Statistics</Text>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Your Point this Week</Text>
              <Text style={styles.chartPoints}>875 Pt</Text>
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 80}
                height={200}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientFrom: 'transparent',
                  backgroundGradientTo: 'transparent',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#fff',
                  },
                }}
                bezier
                style={styles.chart}
              />
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Your Achievements</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementCard}>
                  <Ionicons 
                    name={achievement.icon as any} 
                    size={24} 
                    color={achievement.color} 
                  />
                  <Text style={styles.achievementNumber}>{achievement.count}</Text>
                  <Text style={styles.achievementLabel}>{achievement.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  levelBadge: {
    backgroundColor: '#fff',
    color: '#1c58f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  chartSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  chartTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  chartPoints: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  achievementsSection: {
    marginBottom: 40,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 8,
  },
  achievementLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});