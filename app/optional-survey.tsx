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

const { width } = Dimensions.get('window');

interface AccountType {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

type TopicSlug = string;

interface Topic {
  slug: string;
  name: string;
}

const topicConcepts = [
  {
    concept: 'Khoa học & Công nghệ',
    topics: [
      { slug: 'physics', name: 'Vật lý' },
      { slug: 'chemistry', name: 'Hóa học' },
      { slug: 'biology', name: 'Sinh học' },
      { slug: 'ai', name: 'Trí tuệ nhân tạo' },
      { slug: 'robotics', name: 'Robot' },
      { slug: 'cs', name: 'Khoa học máy tính' },
      { slug: 'tech-trends', name: 'Xu hướng công nghệ' },
      { slug: 'sci-fi', name: 'Khoa học viễn tưởng' },
      { slug: 'math', name: 'Toán học' },
      { slug: 'astronomy', name: 'Thiên văn học' },
      { slug: 'earth-science', name: 'Khoa học Trái Đất' },
      { slug: 'engineering', name: 'Kỹ thuật' },
      { slug: 'environment', name: 'Môi trường' },
      { slug: 'medicine', name: 'Y học' },
      { slug: 'science', name: 'Khoa học' },
    ],
  },
  {
    concept: 'Lịch sử & Xã hội',
    topics: [
      { slug: 'history', name: 'Lịch sử' },
      { slug: 'countries', name: 'Quốc gia' },
      { slug: 'economics', name: 'Kinh tế' },
      { slug: 'geography', name: 'Địa lý' },
      { slug: 'politics', name: 'Chính trị' },
      { slug: 'law', name: 'Luật pháp' },
      { slug: 'culture', name: 'Văn hóa' },
      { slug: 'philosophy', name: 'Triết học' },
      { slug: 'education', name: 'Giáo dục' },
      { slug: 'sociology', name: 'Xã hội học' },
      { slug: 'religion', name: 'Tôn giáo' },
    ],
  },
  {
    concept: 'Nghệ thuật & Văn hóa',
    topics: [
      { slug: 'art', name: 'Nghệ thuật' },
      { slug: 'music', name: 'Âm nhạc' },
      { slug: 'literature', name: 'Văn học' },
      { slug: 'fiction', name: 'Tiểu thuyết' },
      { slug: 'drama', name: 'Kịch' },
      { slug: 'photography', name: 'Nhiếp ảnh' },
      { slug: 'celebrities', name: 'Người nổi tiếng' },
      { slug: 'movies', name: 'Phim ảnh' },
      { slug: 'animation', name: 'Hoạt hình' },
      { slug: 'fashion', name: 'Thời trang' },
      { slug: 'design', name: 'Thiết kế' },
    ],
  },
  {
    concept: 'Ngôn ngữ',
    topics: [
      { slug: 'english', name: 'Tiếng Anh' },
      { slug: 'spanish', name: 'Tiếng Tây Ban Nha' },
      { slug: 'chinese', name: 'Tiếng Trung' },
      { slug: 'french', name: 'Tiếng Pháp' },
      { slug: 'german', name: 'Tiếng Đức' },
      { slug: 'japanese', name: 'Tiếng Nhật' },
      { slug: 'korean', name: 'Tiếng Hàn' },
      { slug: 'vietnamese', name: 'Tiếng Việt' },
    ],
  },
  {
    concept: 'Sức khỏe & Đời sống',
    topics: [
      { slug: 'health', name: 'Sức khỏe' },
      { slug: 'yoga', name: 'Yoga' },
      { slug: 'nutrition', name: 'Dinh dưỡng' },
      { slug: 'psychology', name: 'Tâm lý học' },
      { slug: 'wildlife', name: 'Động vật hoang dã' },
      { slug: 'food', name: 'Ẩm thực' },
      { slug: 'lifestyle', name: 'Phong cách sống' },
      { slug: 'travel', name: 'Du lịch' },
    ],
  },
  {
    concept: 'Giải trí & Thể thao',
    topics: [
      { slug: 'sports', name: 'Thể thao' },
      { slug: 'football', name: 'Bóng đá' },
      { slug: 'basketball', name: 'Bóng rổ' },
      { slug: 'tennis', name: 'Quần vợt' },
      { slug: 'cricket', name: 'Cricket' },
      { slug: 'quiz', name: 'Câu đố' },
      { slug: 'wonders', name: 'Kỳ quan' },
      { slug: 'games', name: 'Trò chơi' },
      { slug: 'esports', name: 'Thể thao điện tử' },
      { slug: 'boardgames', name: 'Boardgame' },
    ],
  },
  {
    concept: 'Kinh doanh & Công việc',
    topics: [
      { slug: 'business', name: 'Kinh doanh' },
      { slug: 'finance', name: 'Tài chính' },
      { slug: 'marketing', name: 'Tiếp thị' },
      { slug: 'startup', name: 'Khởi nghiệp' },
      { slug: 'management', name: 'Quản lý' },
      { slug: 'career', name: 'Nghề nghiệp' },
      { slug: 'productivity', name: 'Năng suất' },
    ],
  },
  {
    concept: 'Khác',
    topics: [
      { slug: 'algebra', name: 'Đại số' },
      { slug: 'logic', name: 'Logic' },
      { slug: 'puzzle', name: 'Câu đố logic' },
      { slug: 'random', name: 'Ngẫu nhiên' },
    ],
  },
];

const OptionalSurveyScreens = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<TopicSlug[]>([]);
  const router = useRouter();

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
    setSelectedAccount(accountId);
  };

  interface HandleTopicToggle {
    (topicSlug: TopicSlug): void;
  }

  const handleTopicToggle: HandleTopicToggle = (topicSlug) => {
    setSelectedTopics((prev: TopicSlug[]) =>
      prev.includes(topicSlug)
        ? prev.filter((slug: TopicSlug) => slug !== topicSlug)
        : [...prev, topicSlug]
    );
  };

  const handleBack = () => {
    if (currentScreen === 2) {
      setCurrentScreen(1);
    }
  };

  // Header component with consistent layout
  const Header = ({ progress, buttonText, onButtonPress, disabled, showBack = false }: {
    progress: number; // progress as a number (e.g., 33 for 33%)
    buttonText: string;
    onButtonPress: () => void;
    disabled: boolean;
    showBack?: boolean;
  }) => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {showBack && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#666" />
          </TouchableOpacity>
        )}
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <TouchableOpacity
          onPress={onButtonPress}
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

  // Screen 1: Account Type Selection
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

  // Screen 2: Topic Selection
  const TopicSelectionScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header
        progress={66}
        buttonText="HOÀN THÀNH"
        onButtonPress={() => {
          // Navigate to signup screen with selected data
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

          {topicConcepts.map((conceptGroup) => (
            <View key={conceptGroup.concept} style={styles.conceptGroup}>
              <Text style={styles.conceptTitle}>{conceptGroup.concept}</Text>
              <View style={styles.topicsContainer}>
                {conceptGroup.topics.map((topic) => (
                  <TouchableOpacity
                    key={topic.slug}
                    onPress={() => handleTopicToggle(topic.slug)}
                    style={[
                      styles.topicTag,
                      selectedTopics.includes(topic.slug) && styles.selectedTopicTag,
                    ]}
                  >
                    <Text
                      style={[
                        styles.topicText,
                        selectedTopics.includes(topic.slug) &&
                          styles.selectedTopicText,
                      ]}
                    >
                      {topic.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <>
      {currentScreen === 1 ? <AccountTypeScreen /> : <TopicSelectionScreen />}
      
      {/* Demo Navigation */}
      <View style={styles.demoNav}>
        <TouchableOpacity
          onPress={() => setCurrentScreen(1)}
          style={[styles.demoButton, currentScreen === 1 && styles.activeDemoButton]}
        >
          <Text style={[styles.demoButtonText, currentScreen === 1 && styles.activeDemoButtonText]}>
            Chọn Tài Khoản
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentScreen(2)}
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
    gap: 10,
    marginBottom: 10,
  },
  topicTag: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
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
  conceptGroup: {
    marginBottom: 24,
  },
  conceptTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
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