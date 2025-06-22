import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

const useBackgroundMusic = (isEnabled: boolean) => {
  const sound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let isMounted = true;

    const playMusic = async () => {
      if (!isEnabled || sound.current) return;

      try {
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          require('../../assets/music/background.mp3'),
          { shouldPlay: true, isLooping: true }
        );
        if (isMounted) {
          sound.current = playbackObject;
        }
      } catch (error) {
        console.error('Error loading music:', error);
      }
    };

    playMusic();

    return () => {
      isMounted = false;
      if (sound.current) {
        sound.current.stopAsync().then(() => sound.current?.unloadAsync());
        sound.current = null;
      }
    };
  }, [isEnabled]);

  const toggleMusic = async (enabled: boolean) => {
    if (enabled && !sound.current) {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        require('../../assets/music/background.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      sound.current = playbackObject;
    } else if (!enabled && sound.current) {
      await sound.current.stopAsync();
      await sound.current.unloadAsync();
      sound.current = null;
    }
  };

  return { toggleMusic };
};

export default useBackgroundMusic;