import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/api';
import DateTimePicker from '@react-native-community/datetimepicker';

const countries = ['United States', 'Vietnam', 'Japan', 'Other'];
const genders = ['Male', 'Female', 'Other'];

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(new Date(2000, 0, 1));
  const [showDate, setShowDate] = useState(false);
  const [country, setCountry] = useState(countries[0]);
  const [gender, setGender] = useState(genders[0]);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        dob: dob.toISOString().split('T')[0],
        country,
        gender,
      });
      Alert.alert('Đăng ký thành công!', JSON.stringify(res.data));
    } catch (err: any) {
      Alert.alert('Đăng ký thất bại', err?.response?.data?.message || 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.desc}>Please enter your username, date of birth and country. If you forget it, then you have to do forgot password.</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={() => setShowDate(true)} style={styles.dateBtn}>
          <Text style={styles.dateText}>{dob.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            value={dob}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selectedDate) => {
              setShowDate(false);
              if (selectedDate) setDob(selectedDate);
            }}
          />
        )}
        <Text style={styles.label}>Country</Text>
        {countries.map((c) => (
          <TouchableOpacity key={c} onPress={() => setCountry(c)} style={styles.radioRow}>
            <View style={[styles.radioCircle, country === c && styles.radioCircleActive]} />
            <Text style={styles.radioText}>{c}</Text>
          </TouchableOpacity>
        ))}
        <Text style={[styles.label, { marginTop: 16 }]}>Gender</Text>
        {genders.map((g) => (
          <TouchableOpacity key={g} onPress={() => setGender(g)} style={styles.radioRow}>
            <View style={[styles.radioCircle, gender === g && styles.radioCircleActive]} />
            <Text style={styles.radioText}>{g}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.signUpText}>{loading ? 'Signing up...' : 'Sign up'}</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  desc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 24,
    textAlign: 'center',
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
  dateBtn: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#1c58f2',
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 18,
    color: '#222',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  radioCircleActive: {
    borderColor: '#1c58f2',
    backgroundColor: '#1c58f2',
  },
  radioText: {
    fontSize: 16,
    color: '#222',
  },
  signUpBtn: {
    backgroundColor: '#1c58f2',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}); 