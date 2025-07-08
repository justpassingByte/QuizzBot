import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../../constants/api';
import useButtonSound from '../components/useButtonSound';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useMusic } from '../context/MusicContext';

interface User {
  id: string;
  username: string;
  score: number;
  avatar?: string;
  position?: number;
  isCurrentUser?: boolean;
}

export default function LeaderboardScreen() {
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);
  const [activeTab, setActiveTab] = useState('Global');
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();
  const { t } = useLanguage();

  useFocusEffect(
    useCallback(() => {
      const fetchLeaderboard = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_URL}/api/leaderboard?limit=10`);
          const data = await response.json();
          
          const formattedData = data.map((user: User, index: number) => ({
            ...user,
            position: index + 1,
            isCurrentUser: user.id === currentUser?.id,
          }));
          setLeaderboard(formattedData);
        } catch (error) {
          console.error("Failed to fetch leaderboard", error);
        } finally {
          setLoading(false);
        }
      };

      fetchLeaderboard();
    }, [currentUser])
  );

  const topThree = leaderboard.slice(0, 3);
  const otherUsers = leaderboard.slice(3);

  const renderTopThreeItem = (user: User) => {
    const isCenter = user.position === 1;
    const containerStyle = isCenter ? styles.centerPodium : styles.sidePodium;
    const imageSize = isCenter ? 80 : 60;
    const crownColor = user.position === 1 ? '#ffd700' : user.position === 2 ? '#c0c0c0' : '#cd7f32';
    const avatarUrl = user.avatar || `https://api.dicebear.com/8.x/initials/png?seed=${user.username}`;
    
    return (
        <View key={user.id} style={[styles.podiumItem, containerStyle]}>
            {user.position === 1 && (
                <View style={styles.crownContainer}>
                    <Ionicons name="trophy" size={32} color="#ffd700" />
                </View>
            )}
            <View style={[styles.avatarContainer, { width: imageSize, height: imageSize }]}>
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                <View style={[styles.positionBadge, { backgroundColor: crownColor }]}>
                    <Text style={styles.positionText}>{user.position}</Text>
                </View>
            </View>
            <Text style={styles.podiumName}>{user.username}</Text>
            <Text style={styles.podiumScore}>{user.score}</Text>
            <Text style={styles.podiumUsername}>@{user.username.toLowerCase()}</Text>
        </View>
    );
};

  return (
    <LinearGradient colors={['#0a4cff', '#1c58f2']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t.leaderboard.title}</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{currentUser?.score ?? 0}</Text>
            <Ionicons name="star" size={16} color="#ffd700" />
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Global' && styles.activeTab]}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              setActiveTab('Global');
            }}
          >
            <Text style={[styles.tabText, activeTab === 'Global' && styles.activeTabText]}>
              {t.leaderboard.global}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'National' && styles.activeTab]}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              setActiveTab('National');
            }}
          >
            <Text style={[styles.tabText, activeTab === 'National' && styles.activeTabText]}>
              {t.leaderboard.national}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
          ) : (
            <>
              {/* Top 3 Podium */}
              <View style={styles.podiumContainer}>
                <View style={styles.podiumRow}>
                  {topThree.map((user) => renderTopThreeItem(user))}
                </View>
              </View>

              {/* Other Rankings */}
              <View style={styles.rankingContainer}>
                {otherUsers.map((user, index) => (
                  <View
                    key={user.id}
                    style={[
                      styles.rankingItem,
                      user.isCurrentUser && styles.currentUserItem,
                    ]}
                  >
                    <Text style={styles.rankNumber}>{index + 4}</Text>
                    <Image source={{ uri: user.avatar || `https://api.dicebear.com/8.x/initials/png?seed=${user.username}` }} style={styles.rankingAvatar} />
                    <Text style={[styles.rankingName, user.isCurrentUser && styles.currentUserName]}>
                      {user.username}
                    </Text>
                    <Text style={[styles.rankingScore, user.isCurrentUser && styles.currentUserScore]}>
                      {user.score} {t.leaderboard.pts}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: '#1c58f2',
  },
  content: {
    flex: 1,
  },
  podiumContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  centerPodium: {
    marginTop: -20,
  },
  sidePodium: {
    marginTop: 10,
  },
  crownContainer: {
    position: 'absolute',
    top: -15,
    zIndex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  positionBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  positionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  podiumName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  podiumScore: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  podiumUsername: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  rankingContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  currentUserItem: {
    backgroundColor: '#1c58f2',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    width: 20,
    marginRight: 16,
  },
  rankingAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  rankingName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  currentUserName: {
    color: '#fff',
  },
  rankingScore: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  currentUserScore: {
    color: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabBarText: {
    fontSize: 12,
    color: '#bbb',
    fontWeight: '500',
    marginTop: 4,
  },
  tabBarTextActive: {
    fontSize: 12,
    color: '#1c58f2',
    fontWeight: '700',
    marginTop: 4,
  },
});