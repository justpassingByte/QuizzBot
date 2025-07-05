import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useButtonSound from './components/useButtonSound';
import { useMusic } from './context/MusicContext';

const { width } = Dimensions.get('window');

const PRESET_CONFIGS = {
  basic: {
    multipleChoiceCount: 5,
    difficultyDistribution: { basic: 0.7, intermediate: 0.2, advanced: 0.1 },
    maxAttempts: 5,
    includeHints: true,
  },
  intermediate: {
    multipleChoiceCount: 7,
    difficultyDistribution: { basic: 0.3, intermediate: 0.5, advanced: 0.2 },
    maxAttempts: 3,
    includeHints: true,
  },
  advanced: {
    multipleChoiceCount: 10,
    difficultyDistribution: { basic: 0.1, intermediate: 0.3, advanced: 0.6 },
    maxAttempts: 2,
    includeHints: false,
  },
};

export default function CreateQuizScreen() {
  const [topic, setTopic] = useState('');
  const [multipleChoiceCount, setMultipleChoiceCount] = useState('5');
  const [basic, setBasic] = useState('0.3');
  const [intermediate, setIntermediate] = useState('0.5');
  const [advanced, setAdvanced] = useState('0.2');
  const [maxAttempts, setMaxAttempts] = useState('3');
  const [includeHints, setIncludeHints] = useState(true);
  const [level, setLevel] = useState('intermediate');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);
  // Khi chọn preset, tự động set config
  const handleSelectLevel = (lv: string) => {
    setLevel(lv);
    const preset = PRESET_CONFIGS[lv as keyof typeof PRESET_CONFIGS];
    setMultipleChoiceCount(String(preset.multipleChoiceCount));
    setBasic(String(preset.difficultyDistribution.basic));
    setIntermediate(String(preset.difficultyDistribution.intermediate));
    setAdvanced(String(preset.difficultyDistribution.advanced));
    setMaxAttempts(String(preset.maxAttempts));
    setIncludeHints(preset.includeHints);
  };

  const handleCreateQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const config = {
        multipleChoiceCount: Number(multipleChoiceCount),
        codingQuestionCount: 0,
        difficultyDistribution: {
          basic: Number(basic),
          intermediate: Number(intermediate),
          advanced: Number(advanced),
        },
        typeDistribution: {
          multipleChoice: 1,
          coding: 0,
        },
        includeHints,
        maxAttempts: 3,
      };
      // Điều hướng đến màn hình loading-quiz và truyền params
      router.push({
        pathname: '/loading-quiz',
        params: {
          topic: topic.trim(),
          config: JSON.stringify(config),
          level: level,
        },
      });
    } catch (err: any) {
      // Sẽ không còn lỗi ở đây, lỗi sẽ được xử lý ở màn hình loading-quiz
      Alert.alert('Lỗi', 'Không thể chuẩn bị tạo quiz.');
    } finally {
      setLoading(false); // Đảm bảo loading tắt sau khi điều hướng (nếu không có lỗi)
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Create your own quiz</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a topic (e.g. Harry Potter, Math, ... )"
        value={topic}
        onChangeText={setTopic}
      />
      <Text style={styles.label}>Level (Preset)</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
        {['basic', 'intermediate', 'advanced'].map((lv) => (
          <TouchableOpacity
            key={lv}
            style={[styles.levelBtn, level === lv && styles.levelBtnActive]}
            onPress={() => { handleSelectLevel(lv); playButtonSound() }}
          >
            <Text style={level === lv ? styles.levelBtnTextActive : styles.levelBtnText}>{lv}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Multiple Choice Count</Text>
      <TextInput
        style={styles.input}
        placeholder="5"
        keyboardType="numeric"
        value={multipleChoiceCount}
        onChangeText={setMultipleChoiceCount}
      />
      <Text style={styles.label}>Difficulty Distribution (basic/intermediate/advanced)</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="0.3" keyboardType="decimal-pad" value={basic} onChangeText={setBasic} />
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="0.5" keyboardType="decimal-pad" value={intermediate} onChangeText={setIntermediate} />
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="0.2" keyboardType="decimal-pad" value={advanced} onChangeText={setAdvanced} />
      </View>
      <Text style={styles.label}>Max Attempts</Text>
      <TextInput
        style={styles.input}
        placeholder="3"
        keyboardType="numeric"
        value={maxAttempts}
        onChangeText={setMaxAttempts}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => {setIncludeHints((v) => !v); playButtonSound()}} style={styles.checkbox}>
          <View style={[styles.checkboxBox, includeHints && styles.checkboxBoxChecked]} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 8 }}>Include Hints</Text>
      </View>
      <TouchableOpacity style={styles.createBtn} onPress={() => {handleCreateQuiz;  playButtonSound()}} disabled={loading || !topic.trim()}>
        <Text style={styles.createBtnText}>{loading ? 'Creating...' : 'Create Quiz'}</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#1c58f2" style={{ marginTop: 24 }} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#1c58f2',
    borderRadius: 16,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
    backgroundColor: '#f5f5f5',
  },
  createBtn: {
    backgroundColor: '#1c58f2',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#1c58f2',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checkboxBoxChecked: {
    backgroundColor: '#1c58f2',
  },
  levelBtn: {
    borderWidth: 1,
    borderColor: '#1c58f2',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  levelBtnActive: {
    backgroundColor: '#1c58f2',
  },
  levelBtnText: {
    color: '#1c58f2',
    fontWeight: 'bold',
  },
  levelBtnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 