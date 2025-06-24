import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import useButtonSound from './components/useButtonSound';
import { useMusic } from './context/MusicContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { soundEffectsEnabled } = useMusic();
  const { playButtonSound } = useButtonSound(soundEffectsEnabled);

  const [userName, setUserName] = useState('John_Brown12');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Brown');
  const [email, setEmail] = useState('john.brown@bu.edu');
  const [dateOfBirth, setDateOfBirth] = useState('12/7/1995');

  const handleSave = () => {
    if (soundEffectsEnabled) playButtonSound();
    Alert.alert('Thành công', 'Thông tin đã được cập nhật!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleChangeAvatar = () => {
    if (soundEffectsEnabled) playButtonSound();
    Alert.alert('Đổi ảnh đại diện', 'Chọn nguồn ảnh', [
      { text: 'Camera', onPress: () => console.log('Camera') },
      { text: 'Thư viện', onPress: () => console.log('Library') },
      { text: 'Hủy', style: 'cancel' }
    ]);
  };

  return (
    <LinearGradient colors={['#0a4cff', '#1c58f2']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.back();
            }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Text style={styles.levelBadge}>L1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="trophy" size={20} color="#ffd700" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="notifications" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Image */}
          <View style={styles.profileImageSection}>
            <TouchableOpacity onPress={handleChangeAvatar} style={styles.profileImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face' }}
                style={styles.profileImage}
              />
              <View style={styles.editImageIcon}>
                <Ionicons name="camera" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>User Name</Text>
              <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                placeholder="Nhập tên người dùng"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Nhập tên"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Nhập họ"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.emailContainer}>
                <TextInput
                  style={[styles.input, styles.emailInput]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Nhập email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                />
                <TouchableOpacity 
                  style={styles.sendButton}
                  onPress={() => {
                    if (soundEffectsEnabled) playButtonSound();
                    Alert.alert('Gửi email', 'Đã gửi email xác nhận!');
                  }}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity style={styles.dateInput}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholder="Chọn ngày sinh"
                  placeholderTextColor="#999"
                />
                <Ionicons name="calendar" size={20} color="#1c58f2" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('/');
            }}
          >
            <Ionicons name="home-outline" size={24} color="#bbb" />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItemActive}>
            <Ionicons name="person" size={24} color="#1c58f2" />
            <Text style={styles.tabTextActive}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('../leaderboard');
            }}
          >
            <Ionicons name="trophy-outline" size={24} color="#bbb" />
            <Text style={styles.tabText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (soundEffectsEnabled) playButtonSound();
              router.push('../settings');
            }}
          >
            <Ionicons name="grid-outline" size={24} color="#bbb" />
            <Text style={styles.tabText}>More</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  levelBadge: {
    backgroundColor: '#fff',
    color: '#1c58f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editImageIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#1c58f2',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    flex: 1,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1c58f2',
  },
  sendButtonText: {
    color: '#1c58f2',
    fontSize: 16,
    fontWeight: '600',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  saveButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#1c58f2',
    fontSize: 18,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#bbb',
    fontWeight: '500',
    marginTop: 4,
  },
  tabTextActive: {
    fontSize: 12,
    color: '#1c58f2',
    fontWeight: '700',
    marginTop: 4,
  },
});