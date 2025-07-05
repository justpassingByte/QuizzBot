import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import useButtonSound from './components/useButtonSound';
import { useMusic } from './context/MusicContext';


const { width } = Dimensions.get('window');

interface AccountType {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

type Topic = string;

const OptionalSurveyScreens = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);

  const accountTypes: AccountType[] = [
    { id: 'personal', label: 'Cá nhân', icon: 'person', color: '#3b82f6' },
    { id: 'teacher', label: 'Giáo viên', icon: 'school', color: '#f97316' },
    { id: 'student', label: 'Học sinh', icon: 'book', color: '#22c55e' },
    { id: 'professional', label: 'Chuyên nghiệp', icon: 'briefcase', color: '#ec4899' }
  ];

  const topics = [
    'Vật lý', 'Trí tuệ nhân tạo', 'Khoa học', 'Hành động', 'Sinh học', 'Yoga', 
    'Lịch sử', 'Robot', 'Cricket', 'Tiểu thuyết', 'Câu đố', 'Sức khỏe', 'Tiếng Anh', 
    'Đại số', 'Khoa học máy tính', 'Người nổi tiếng', 'Động vật hoang dã', 'Nghệ thuật', 
    'Xu hướng công nghệ', 'Tiếng Tây Ban Nha', 'Quốc gia', 'Tiếng Trung', 'Kịch', 
    'Kỳ quan', 'Kinh tế', 'Địa lý', 'Khoa học viễn tưởng', 'Nhiếp ảnh'
  ];

  const handleAccountSelect = (accountId: string): void => {
    playButtonSound();
    setSelectedAccount(accountId);
  };

  const handleTopicToggle = (topic: Topic) => {
    playButtonSound();
    setSelectedTopics((prev: Topic[]) => 
      prev.includes(topic) 
        ? prev.filter((t: Topic) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleBack = () => {
    playButtonSound();
    if (currentScreen === 2) {
      setCurrentScreen(1);
    }
  };

  const Header = ({ progress, buttonText, onButtonPress, disabled, showBack = false }: {
    progress: number;
    buttonText: string;
    onButtonPress: () => void;
    disabled: boolean;
    showBack?: boolean;
  }) => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {showBack && (
          <TouchableOpacity onPress={() => {
            playButtonSound();
            handleBack();
          }} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#666" />
          </TouchableOpacity>
        )}
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            playButtonSound();
            onButtonPress();
          }}
          style={[styles.nextButton, disabled && styles.disabledButton]}
          disabled={disabled}
        >
          <Text style={[styles.nextButtonText, disabled && styles.disabledButtonText]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const AccountTypeScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header
        progress={33}
        buttonText="TIẾP THEO"
        onButtonPress={() => setCurrentScreen(2)}
        disabled={!selectedAccount}
      />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Chọn loại tài khoản bạn muốn{' '}
              <Text style={styles.highlightText}>tạo</Text>? 🤔
            </Text>
            <Text style={styles.subtitle}>Chọn một loại tài khoản phù hợp với bạn.</Text>
          </View>

          <View style={styles.accountOptions}>
            {accountTypes.map((account) => (
              <TouchableOpacity
                key={account.id}
                onPress={() => handleAccountSelect(account.id)}
                style={[
                  styles.accountOption,
                  selectedAccount === account.id && styles.selectedOption
                ]}
              >
                <View style={[styles.iconContainer, { backgroundColor: account.color }]}>
                  <Ionicons name={account.icon} size={24} color="white" />
                </View>
                <Text style={styles.accountLabel}>{account.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const TopicSelectionScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header
        progress={66}
        buttonText="HOÀN THÀNH"
        onButtonPress={() => {
          playButtonSound();
          router.push({
            pathname: '/signup',
            params: { selectedAccount, selectedTopics: JSON.stringify(selectedTopics) },
          });
        }}
        disabled={selectedTopics.length === 0}
        showBack={true}
      />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Để cá nhân hóa trải nghiệm quiz, chọn các chủ đề{' '}
              <Text style={styles.highlightText}>bạn quan tâm</Text>
            </Text>
            <Text style={styles.subtitle}>Chọn ít nhất một chủ đề để tiếp tục.</Text>
          </View>

          <View style={styles.topicsContainer}>
            {topics.map((topic) => (
              <TouchableOpacity
                key={topic}
                onPress={() => handleTopicToggle(topic)}
                style={[
                  styles.topicTag,
                  selectedTopics.includes(topic) && styles.selectedTopicTag
                ]}
              >
                <Text style={[
                  styles.topicText,
                  selectedTopics.includes(topic) && styles.selectedTopicText
                ]}>
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <>
      {currentScreen === 1 ? <AccountTypeScreen /> : <TopicSelectionScreen />}
      
      <View style={styles.demoNav}>
        <TouchableOpacity
          onPress={() => {
            playButtonSound();
            setCurrentScreen(1);
          }}
          style={[styles.demoButton, currentScreen === 1 && styles.activeDemoButton]}
        >
          <Text style={[styles.demoButtonText, currentScreen === 1 && styles.activeDemoButtonText]}>
            Chọn Tài Khoản
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            playButtonSound();
            setCurrentScreen(2);
          }}
          style={[styles.demoButton, currentScreen === 2 && styles.activeDemoButton]}
        >
          <Text style={[styles.demoButtonText, currentScreen === 2 && styles.activeDemoButtonText]}>
            Chọn Chủ Đề
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  nextButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#93c5fd',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#ccc',
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 8,
  },
  highlightText: {
    color: '#3b82f6',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  accountOptions: {
    marginBottom: 40,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  accountLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  topicTag: {
    width: (width - 50) / 3,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginBottom: 12,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  selectedTopicTag: {
    backgroundColor: '#3b82f6',
  },
  topicText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 16,
  },
  selectedTopicText: {
    color: '#fff',
  },
  demoNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  demoButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  activeDemoButton: {
    backgroundColor: '#3b82f6',
  },
  demoButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
  activeDemoButtonText: {
    color: '#fff',
  },
});

export default OptionalSurveyScreens;