import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import useButtonSound from './components/useButtonSound';
import { useMusic } from './context/MusicContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

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
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#ff4757' }]}>
                <Ionicons name="notifications" size={20} color="#fff" />
              </View>
              <Text style={styles.settingText}>Notification</Text>
            </View>
            <Switch
              value={notificationEnabled}
              onValueChange={(value) => {
                if (soundEffectsEnabled) playButtonSound();
                setNotificationEnabled(value);
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notificationEnabled ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/music-effect');
            }}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#5f27cd' }]}>
                <Ionicons name="musical-notes" size={20} color="#fff" />
              </View>
              <Text style={styles.settingText}>Music & Effects</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              // TODO: Thêm điều hướng hoặc logic chọn ngôn ngữ
            }}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#00d2d3' }]}>
                <Ionicons name="language" size={20} color="#fff" />
              </View>
              <Text style={styles.settingText}>Language</Text>
            </View>
            <View style={styles.languageSelector}>
              <Text style={styles.languageText}>{selectedLanguage}</Text>
              <Ionicons name="chevron-down" size={16} color="#666" style={styles.dropdownIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              // TODO: Thêm điều hướng đến trang About
            }}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#a55eea' }]}>
                <Ionicons name="information-circle" size={20} color="#fff" />
              </View>
              <Text style={styles.settingText}>About Quizzie Bot</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              // TODO: Thêm logic đăng xuất
            }}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#ff6b6b' }]}>
                <Ionicons name="log-out" size={20} color="#fff" />
              </View>
              <Text style={styles.settingText}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Privacy Policy & Quizzie Bot</Text>
        </View>

        {/* <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/index');
            }}
          >
            <Ionicons name="home" size={24} color="#bbb" />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/profile');
            }}
          >
            <Ionicons name="person" size={24} color="#bbb" />
            <Text style={styles.tabText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/Leaderboard');
            }}
          >
            <Ionicons name="trophy" size={24} color="#bbb" />
            <Text style={styles.tabText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItemActive}>
            <Ionicons name="grid" size={24} color="#1c58f2" />
            <Text style={styles.tabTextActive}>More</Text>
          </TouchableOpacity>
        </View> */}
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 80,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginRight: 4,
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 40,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
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
  tabText: {
    fontSize: 12,
    color: '#bbb',
    fontWeight: '500',
    marginTop: 4,
  },
  tabTextActive: {
    fontSize: 12,
    color: '#1c58f2',
    fontWeight: '700',
    marginTop: 4,
  },
});