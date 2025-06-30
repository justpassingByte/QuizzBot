import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import useBackgroundMusic from './components/audio';
import { MusicProvider, useMusic } from './context/MusicContext';

function AppMusicWrapper({ children }: { children: React.ReactNode }) {
  const { musicEnabled } = useMusic();
  useBackgroundMusic(musicEnabled); // Gọi hook ngay khi ứng dụng khởi động
  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <MusicProvider>
      <AppMusicWrapper>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="loading-quiz" />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="create-quiz" />
            <Stack.Screen name="edit-profile" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="intro" />
            <Stack.Screen name="music-effect" />
            <Stack.Screen name="optional-survey" />
            <Stack.Screen name="quiz-correct" />
            <Stack.Screen name="quiz-incorrect" />
            <Stack.Screen name="quiz-result" />
            <Stack.Screen name="quiz" />
            <Stack.Screen name="signin" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="arcade" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AppMusicWrapper>
    </MusicProvider>
  );
}