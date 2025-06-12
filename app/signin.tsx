import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/api';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      Alert.alert('Đăng nhập thành công!', JSON.stringify(res.data));
    } catch (err: any) {
      Alert.alert('Đăng nhập thất bại', err?.response?.data?.message || 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Sign in to Quizzie Bot</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.forgotBtn} onPress={() => {}}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.signInText}>{loading ? 'Signing in...' : 'SIGN IN'}</Text>
        </TouchableOpacity>
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>
        <View style={styles.rememberRow}>
          <TouchableOpacity style={styles.rememberBtn} onPress={() => {}}>
            <View style={styles.rememberBox} />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  formBox: {
    width: '100%',
    maxWidth: 380,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 32,
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
    textAlign: 'left',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#1c58f2',
    fontSize: 18,
    paddingVertical: 8,
    marginBottom: 24,
    color: '#222',
  },
  forgotBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#1c58f2',
    textAlign: 'right',
  },
  signInBtn: {
    backgroundColor: '#1c58f2',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  orText: {
    marginHorizontal: 12,
    color: '#888',
    fontWeight: '600',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1c58f2',
    marginRight: 8,
  },
  rememberText: {
    color: '#222',
    fontSize: 16,
  },
}); 