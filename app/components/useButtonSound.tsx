import { Audio } from 'expo-av';
import { useCallback } from 'react';

const useButtonSound = (isEnabled: boolean) => {
  const playButtonSound = useCallback(async () => {
    if (!isEnabled) return;

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/music/button-click.mp3'),
        { shouldPlay: true }
      );
      await sound.playAsync();
      // Giải phóng âm thanh sau khi phát xong
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing button sound:', error);
    }
  }, [isEnabled]);

  return { playButtonSound };
};

export default useButtonSound;