import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { JSX, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useButtonSound from './components/useButtonSound';
import { useMusic } from './context/MusicContext';

export default function LeaderboardScreen() {
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);
  const [activeTab, setActiveTab] = useState('Global');

  const topThree = [
    {
      id: 2,
      name: 'Jackson',
      score: 1847,
      username: '@username',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      position: 2,
    },
    {
      id: 1,
      name: 'Eiden',
      score: 2430,
      username: '@username',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      position: 1,
    },
    {
      id: 3,
      name: 'Emma Aria',
      score: 1674,
      username: '@username',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=100&h=100&fit=crop&crop=face',
      position: 3,
    },
  ];

  const otherUsers = [
    {
      id: 4,
      name: 'Marsha Fisher',
      score: 36,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 5,
      name: 'Juanita Cormier',
      score: 35,
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 6,
      name: 'You',
      score: 34,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isCurrentUser: true,
    },
    {
      id: 7,
      name: 'Tamara Schmidt',
      score: 33,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 8,
      name: 'Ricardo Veum',
      score: 32,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 9,
      name: 'Gary Sanford',
      score: 31,
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
    },
  ];

interface TopThreeUser {
    id: number;
    name: string;
    score: number;
    username: string;
    avatar: string;
    position: number;
}

interface RenderTopThreeItemProps {
    user: TopThreeUser;
    index: number;
}

const renderTopThreeItem = (user: TopThreeUser, index: number): JSX.Element => {
    const isCenter = user.position === 1;
    const containerStyle = isCenter ? styles.centerPodium : styles.sidePodium;
    const imageSize = isCenter ? 80 : 60;
    const crownColor = user.position === 1 ? '#ffd700' : user.position === 2 ? '#c0c0c0' : '#cd7f32';
    
    return (
        <View key={user.id} style={[styles.podiumItem, containerStyle]}>
            {user.position === 1 && (
                <View style={styles.crownContainer}>
                    <Ionicons name="trophy" size={32} color="#ffd700" />
                </View>
            )}
            <View style={[styles.avatarContainer, { width: imageSize, height: imageSize }]}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={[styles.positionBadge, { backgroundColor: crownColor }]}>
                    <Text style={styles.positionText}>{user.position}</Text>
                </View>
            </View>
            <Text style={styles.podiumName}>{user.name}</Text>
            <Text style={styles.podiumScore}>{user.score}</Text>
            <Text style={styles.podiumUsername}>{user.username}</Text>
        </View>
    );
};

  return (
    <LinearGradient colors={['#0a4cff', '#1c58f2']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>301</Text>
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
              Global
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
              National
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Top 3 Podium */}
          <View style={styles.podiumContainer}>
            <View style={styles.podiumRow}>
              {topThree.map((user, index) => renderTopThreeItem(user, index))}
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
                <Image source={{ uri: user.avatar }} style={styles.rankingAvatar} />
                <Text style={[styles.rankingName, user.isCurrentUser && styles.currentUserName]}>
                  {user.name}
                </Text>
                <Text style={[styles.rankingScore, user.isCurrentUser && styles.currentUserScore]}>
                  {user.score} pts
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/');
            }}
          >
            <Ionicons name="home" size={24} color="#bbb" />
            <Text style={styles.tabBarText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('../profile');
            }}
          >
            <Ionicons name="person" size={24} color="#bbb" />
            <Text style={styles.tabBarText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItemActive}>
            <Ionicons name="trophy" size={24} color="#1c58f2" />
            <Text style={styles.tabBarTextActive}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('../settings');
            }}
          >
            <Ionicons name="grid" size={24} color="#bbb" />
            <Text style={styles.tabBarText}>More</Text>
          </TouchableOpacity>
        </View>
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