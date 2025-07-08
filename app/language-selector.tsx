import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useButtonSound from './components/useButtonSound';
import { useLanguage } from './context/LanguageContext';
import { useMusic } from './context/MusicContext';

interface LanguageOption {
  code: 'en' | 'vi';
  name: string;
  nativeName: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
  },
];

export default function LanguageSelectorScreen() {
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageSelect = async (langCode: 'en' | 'vi') => {
    if (soundEffectsEnabled) playButtonSound();
    await setLanguage(langCode);
    router.back();
  };

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
          <Text style={styles.headerTitle}>{t.settings.language}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Choose your language</Text>
          <Text style={styles.subtitle}>Chọn ngôn ngữ của bạn</Text>

          <View style={styles.languageList}>
            {languageOptions.map((option) => (
              <TouchableOpacity
                key={option.code}
                style={[
                  styles.languageOption,
                  language === option.code && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageSelect(option.code)}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.flag}>{option.flag}</Text>
                  <View style={styles.languageTexts}>
                    <Text style={styles.languageName}>{option.name}</Text>
                    <Text style={styles.languageNative}>{option.nativeName}</Text>
                  </View>
                </View>
                {language === option.code && (
                  <Ionicons name="checkmark-circle" size={24} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
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
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 40,
  },
  languageList: {
    gap: 16,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLanguage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#fff',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageTexts: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
}); 