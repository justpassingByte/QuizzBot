import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import useButtonSound from './components/useButtonSound';
import { useLanguage } from './context/LanguageContext';
import { useMusic } from './context/MusicContext';

export default function MusicEffectsScreen() {
  const router = useRouter();
  const { musicEnabled, setMusicEnabled, soundEffectsEnabled, setSoundEffectsEnabled } = useMusic();
  const [vibrationsEnabled, setVibrationsEnabled] = useState(true);
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);
  const { t } = useLanguage();

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
          <Text style={styles.headerTitle}>{t.settings.musicEffects}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>{t.settings.music}</Text>
            <Switch
              value={musicEnabled}
              onValueChange={(value) => {
                if (soundEffectsEnabled) playButtonSound();
                setMusicEnabled(value);
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={musicEnabled ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>{t.settings.soundEffects}</Text>
            <Switch
              value={soundEffectsEnabled}
              onValueChange={(value) => {
                if (soundEffectsEnabled) playButtonSound(); // Chỉ phát khi đang bật
                setSoundEffectsEnabled(value);
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={soundEffectsEnabled ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>{t.settings.vibrations}</Text>
            <Switch
              value={vibrationsEnabled}
              onValueChange={(value) => {
                if (soundEffectsEnabled) playButtonSound();
                setVibrationsEnabled(value);
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={vibrationsEnabled ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
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
            <Text style={styles.tabText}>{t.settings.home}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/profile');
            }}
          >
            <Ionicons name="person" size={24} color="#bbb" />
            <Text style={styles.tabText}>{t.settings.profile}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/Leaderboard');
            }}
          >
            <Ionicons name="trophy" size={24} color="#bbb" />
            <Text style={styles.tabText}>{t.settings.leaderboard}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItemActive}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/Settings');
            }}
          >
            <Ionicons name="grid" size={24} color="#1c58f2" />
            <Text style={styles.tabTextActive}>{t.settings.more}</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, marginTop: 30 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingText: { fontSize: 18, fontWeight: '500', color: '#fff' },
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
  tabItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabItemActive: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabText: { fontSize: 12, color: '#bbb', fontWeight: '500', marginTop: 4 },
  tabTextActive: { fontSize: 12, color: '#1c58f2', fontWeight: '700', marginTop: 4 },
});