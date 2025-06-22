import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useMusic } from '../context/MusicContext'; // Import useMusic

function AppMusicWrapper({ children }: { children: React.ReactNode }) {
  const { musicEnabled } = useMusic();
  return <>{children}</>;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <AppMusicWrapper>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: { position: 'absolute' },
              default: {},
            }),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="paperplane.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Leaderboard"
            options={{
              title: 'Leaderboard',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="pencil.and.outline" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="gamecontroller.fill" color={color} />
              ),
            }}
          />
        </Tabs>
      </AppMusicWrapper>
  );
}