import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import useBackgroundMusic from './components/audio';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { MusicProvider, useMusic } from './context/MusicContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppMusicWrapper({ children }: { children: React.ReactNode }) {
  const { musicEnabled } = useMusic();
  useBackgroundMusic(musicEnabled);
  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <MusicProvider>
          <AppMusicWrapper>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="edit-profile" />
                <Stack.Screen name="optional-survey" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="intro" />
                <Stack.Screen name="music-effect" />
                <Stack.Screen name="create-quiz" />
                <Stack.Screen name="loading-quiz" />
                <Stack.Screen name="quiz-correct" />
                <Stack.Screen name="quiz-incorrect" />
                <Stack.Screen name="quiz-result" />
                <Stack.Screen name="quiz" />
                <Stack.Screen name="signin" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="arcade" />
                <Stack.Screen name="language-selector" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </AppMusicWrapper>
        </MusicProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}