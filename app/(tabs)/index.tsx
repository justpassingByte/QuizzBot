import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useButtonSound from '../components/useButtonSound';
import { useMusic } from '../context/MusicContext';

export default function HomeScreen() {
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);
  const avatarUri = null;
  const defaultAvatar = require('../../assets/images/avatar-default.png');

  return (
    <LinearGradient colors={['#0a4cff', '#1c58f2']} style={styles.gradient}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View style={styles.profileRow}>
            <TouchableOpacity
              onPress={() => {
                playButtonSound(); 
                router.push('/profile');
              }}
            >
              <Image
                source={avatarUri ? { uri: avatarUri } : defaultAvatar}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={styles.profileName}>John Brown</Text>
          </View>
          <View style={styles.topRight}>
            <View style={styles.coinBox}>
              <Text style={styles.coinText}>301</Text>
              <Image source={require('../../assets/images/coin.png')} style={styles.coinIcon} />
            </View>
            <Image source={require('../../assets/images/medal.png')} style={styles.medalIcon} />
           
            <TouchableOpacity
              onPress={() => {
                playButtonSound(); 
                router.push('../setting');
              }}
            >
               <Ionicons
              name="settings-outline"
              size={24}
              color="#fff"
              style={styles.bellIcon}
            />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require('../../assets/images/coin1.png')}
          style={[styles.floatingCoin, { top: 200, left: 20, width: 48, height: 48 }]}
        />
        <Image
          source={require('../../assets/images/coin2.png')}
          style={[styles.floatingCoin, { top: 120, right: 30, width: 64, height: 64 }]}
        />
        <Image
          source={require('../../assets/images/coin3.png')}
          style={[styles.floatingCoin, { bottom: 200, left: 40, width: 36, height: 36 }]}
        />
        <View style={styles.flexGrow}>
          <View style={styles.robotCenterWrap}>
            <Image source={require('../../assets/images/robot1.png')} style={styles.robot} />
          </View>
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.slogan}>
            Unleash the power of AI!{"\n"}Discover quizzes made just for you
          </Text>
          <TouchableOpacity
            style={styles.playNowBtn}
            onPress={() => {
              playButtonSound(); // Phát âm thanh khi nhấn
              router.push('/arcade');
            }}
          >
            <Text style={styles.playNowText}>Play Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createQuizBtn}
            onPress={() => {
              playButtonSound(); // Phát âm thanh khi nhấn
              router.push('/create-quiz');
            }}
          >
            <Text style={styles.createQuizText}>
              Create your own quiz by <Text style={{ fontWeight: 'bold' }}>QUIZZIE BOT</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../../assets/images/book.png')} style={styles.bookIcon} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    marginTop: 30,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingTop: 8,
    height: 44,
    marginRight: 34,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  coinBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 6,
  },
  coinText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 4,
  },
  coinIcon: {
    width: 20,
    height: 20,
  },
  medalIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 6,
  },
  bellIcon: {
    width: 22,
    height: 22,
    marginLeft: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 24,
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    height: 32,
  },
  floatingCoin: {
    position: 'absolute',
    zIndex: 2,
    opacity: 0.85,
  },
  robotWrap: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  robot: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  slogan: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 18,
    color: '#fff',
    fontWeight: '500',
    marginHorizontal: 24,
  },
  playNowBtn: {
    backgroundColor: '#3be65f',
    borderRadius: 30,
    paddingVertical: 16,
    width: 300,
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  playNowText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  createQuizBtn: {
    backgroundColor: '#ff9800',
    borderRadius: 20,
    paddingVertical: 14,
    width: 300,
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 1,
  },
  createQuizText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  bookIcon: {
    position: 'absolute',
    right: 32,
    bottom: 180,
    width: 48,
    height: 48,
    opacity: 0.8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
  tabIcon: {
    width: 26,
    height: 26,
    marginBottom: 2,
  },
  tabText: {
    fontSize: 12,
    color: '#bbb',
    fontWeight: '500',
  },
  tabTextActive: {
    fontSize: 12,
    color: '#1c58f2',
    fontWeight: '700',
  },
  flexGrow: {
    flex: 1,
    justifyContent: 'center',
  },
  robotCenterWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    alignItems: 'center',
    paddingBottom: 32,
  },
});