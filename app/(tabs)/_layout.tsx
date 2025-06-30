import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useMusic } from '../context/MusicContext';

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
            tabBarInactiveTintColor: '#bbb',
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: {
              ...Platform.select({
                ios: { position: 'absolute' },
                default: {},
              }),
              height: 64,
              backgroundColor: '#fff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              tabBarLabel: ({ focused, color }) => (
                <Text style={[styles.tabText, focused ? styles.tabTextActive : { color: '#bbb' }]}>Home</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="person.fill" color={color} />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text style={[styles.tabText, focused ? styles.tabTextActive : { color: '#bbb' }]}>Profile</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="leaderboard"
            options={{
              title: 'Leaderboard',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="trophy.fill" color={color} />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text style={[styles.tabText, focused ? styles.tabTextActive : { color: '#bbb' }]}>Leaderboard</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="setting"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="gearshape.fill" color={color} />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text style={[styles.tabText, focused ? styles.tabTextActive : { color: '#bbb' }]}>Setting</Text>
              ),
            }}
          />
        </Tabs>
      </AppMusicWrapper>
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  tabTextActive: {
    fontWeight: '700',
    color: '#1c58f2',
  },
}); 