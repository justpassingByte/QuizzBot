import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useButtonSound from './components/useButtonSound';
import { useMusic } from './context/MusicContext';


const { width } = Dimensions.get('window');

const slides = [
  {
    key: 'slide1',
    title: 'QUIZZIE BOT',
    image: require('../assets/images/robot4.png'),
    description: '',
    button: 'START',
  },
  {
    key: 'slide2',
    title: '',
    image: require('../assets/images/robot5.png'),
    description: 'Experience dynamic quizzes powered by AI. Learn and have fun with interactive challenges anytime, anywhere!',
    button: 'CONTINUE AS GUEST',
    secondaryButton: 'SIGN IN OR SIGN UP',
  },
  {
    key: 'slide3',
    title: '',
    image: require('../assets/images/robot5.png'),
    description: 'Our AI-curated quizzes adapt to your learning style, making every session fun. Discover something new every day.',
    button: 'GET STARTED',
    secondaryButton: 'I ALREADY HAVE AN ACCOUNT',
  },
];

export default function IntroScreen() {
  const [current, setCurrent] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);

  const handleNext = () => {
    playButtonSound();
    if (current === 0) {
      flatListRef.current?.scrollToIndex({ index: 1, animated: true });
      setCurrent(1);
    } else if (current === 2) {
      router.push('/optional-survey');
    }
  };

  const handleContinueAsGuest = () => {
    playButtonSound();
    router.replace('/(tabs)');
  };

  const handleSignInOrSignUp = () => {
    playButtonSound();
    flatListRef.current?.scrollToIndex({ index: 2, animated: true });
    setCurrent(2);
  };

  const handleAlreadyHaveAccount = () => {
    playButtonSound();
    router.push('/signin');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        extraData={current}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <View style={styles.slide}>
            {(index === 1 || index === 2) && (
              <TouchableOpacity
                style={{ position: 'absolute', top: 40, left: 24, zIndex: 10 }}
                onPress={() => {
                  playButtonSound();
                  if (index === 1) {
                    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
                    setCurrent(0);
                  } else if (index === 2) {
                    flatListRef.current?.scrollToIndex({ index: 1, animated: true });
                    setCurrent(1);
                  }
                }}
              >
                <Text style={{ fontSize: 28, color: '#fff' }}>{'<'}</Text>
              </TouchableOpacity>
            )}
            {item.title ? <Text style={styles.title}>{item.title}</Text> : null}
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
            <View style={styles.buttonContainer}>
              {index === 1 ? (
                <>
                  <TouchableOpacity style={styles.button} onPress={handleContinueAsGuest}>
                    <Text style={styles.buttonText}>{item.button}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton} onPress={handleSignInOrSignUp}>
                    <Text style={styles.secondaryButtonText}>{item.secondaryButton}</Text>
                  </TouchableOpacity>
                </>
              ) : index === 2 ? (
                <>
                  <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>{item.button}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton} onPress={handleAlreadyHaveAccount}>
                    <Text style={styles.secondaryButtonText}>{item.secondaryButton}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>{item.button}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, current === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1877F2' },
  slide: { width, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#fff', marginTop: 40, marginBottom: 20, textAlign: 'center' },
  image: { width: 300, height: 300, marginVertical: 20 },
  description: { color: '#fff', fontSize: 20, textAlign: 'center', marginVertical: 20 },
  buttonContainer: { width: '100%', alignItems: 'center', marginTop: 20 },
  button: { backgroundColor: '#fff', borderRadius: 30, paddingVertical: 16, paddingHorizontal: 40, marginBottom: 12, width: '90%' },
  buttonText: { color: '#1877F2', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  secondaryButton: { backgroundColor: '#1877F2', borderRadius: 30, paddingVertical: 16, paddingHorizontal: 40, borderWidth: 2, borderColor: '#fff', width: '90%' },
  secondaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff', margin: 5, opacity: 0.5 },
  activeDot: { opacity: 1, width: 20 },
}); 