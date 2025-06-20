import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_URL } from '../constants/api';

const countries = ['United States', 'Vietnam', 'Japan', 'Other'];
const genders = ['Male', 'Female', 'Other'];

export default function SignUpScreen() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(new Date(2000, 0, 1));
  const [showDate, setShowDate] = useState(false);
  const [country, setCountry] = useState(countries[0]);
  const [gender, setGender] = useState(genders[0]);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/users`, {
        username,
        email,
        favoriteTopics: [], 
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.replace('/(tabs)');
      }, 1500);
    } catch (err) {
      setLoading(false);
      let msg = 'Sign up failed!';
      const error: any = err;
      if (error?.response?.data?.error) msg = error.response.data.error;
      console.error('Sign up error:', error);
      Alert.alert('Sign up error', msg);
    }
  };

  // UI bước 1
  const renderStep1 = () => (
    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={{fontSize: 28, color: '#222'}}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.progressWrap}>
        <View style={[styles.progressBar, { width: '33%' }]} />
        <View style={[styles.progressBarBg]} />
      </View>
      <Text style={styles.title}>Create an <Text style={{color:'#1c58f2'}}>account</Text></Text>
      <Text style={styles.desc}>
        Please complete your profile.{"\n"}
        Don't worry, your data will remain private and only you can see it.
      </Text>
      <View style={styles.rowWrap}>
        <View style={{flex:1, marginRight: 8}}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} placeholder="Andrew Ainsley" value={firstName} onChangeText={setFirstName} />
        </View>
        <View style={{flex:1, marginLeft: 8}}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} placeholder="Andrew Ainsley" value={lastName} onChangeText={setLastName} />
        </View>
      </View>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="andrew.ainsley@yourdomain.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, {flex:1, marginBottom:0}]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{marginLeft:8, marginTop:8}}>
          <Text style={{fontSize:18, color:'#1c58f2'}}>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe(!rememberMe)}>
        <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>{rememberMe && <Text style={{color:'#fff'}}>✓</Text>}</View>
        <Text style={styles.rememberText}>Remember me</Text>
      </TouchableOpacity>
      <View style={styles.orRow}><View style={styles.orLine}/><Text style={styles.orText}>or</Text><View style={styles.orLine}/></View>
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}><Image source={require('../assets/images/google.png')} style={styles.socialIcon} /></TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}><Image source={require('../assets/images/apple.png')} style={styles.socialIcon} /></TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}><Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} /></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(2)}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // UI bước 2
  const renderStep2 = () => (
    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
        <Text style={{fontSize: 28, color: '#222'}}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.progressWrap}>
        <View style={[styles.progressBar, { width: '66%' }]} />
        <View style={[styles.progressBarBg]} />
      </View>
      <Text style={styles.title}>Create an <Text style={{color:'#1c58f2'}}>account</Text></Text>
      <Text style={styles.desc}>Please enter your username, date of birth and country. If you forget it, then you have to do forgot password.</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} placeholder="andrew_ainsley" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowDate(true)} style={styles.inputPicker}>
        <Text style={styles.inputPickerText}>{dob.toLocaleDateString()}</Text>
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
      <TouchableOpacity style={styles.inputPicker} onPress={() => setShowCountryModal(true)}>
        <Text style={styles.inputPickerText}>{country}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Gender</Text>
      <TouchableOpacity style={styles.inputPicker} onPress={() => setShowGenderModal(true)}>
        <Text style={styles.inputPickerText}>{gender}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.signUpText}>{loading ? 'Signing up...' : 'SIGN UP'}</Text>
      </TouchableOpacity>
      {/* Modal chọn country */}
      <Modal visible={showCountryModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalSelectBg} activeOpacity={1} onPress={() => setShowCountryModal(false)}>
          <View style={styles.selectBox}>
            <Text style={styles.selectTitle}>Select Country</Text>
            <FlatList
              data={countries}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.selectItem} onPress={() => {setCountry(item); setShowCountryModal(false);}}>
                  <Text style={styles.selectItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* Modal chọn gender */}
      <Modal visible={showGenderModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalSelectBg} activeOpacity={1} onPress={() => setShowGenderModal(false)}>
          <View style={styles.selectBox}>
            <Text style={styles.selectTitle}>Select Gender</Text>
            <FlatList
              data={genders}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.selectItem} onPress={() => {setGender(item); setShowGenderModal(false);}}>
                  <Text style={styles.selectItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {step === 1 ? renderStep1() : renderStep2()}
      <Modal visible={loading || success} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.dialogBox}>
            {success ? (
              <>
                <Image source={require('../assets/images/icon_success_dialog.png')} style={styles.successIcon} />
                <Text style={styles.successTitle}>Successful!</Text>
                <Text style={styles.successDesc}>Please wait a moment, we are preparing for you...</Text>
                <ActivityIndicator size="large" color="#1c58f2" style={{marginTop: 16}} />
              </>
            ) : (
              <ActivityIndicator size="large" color="#1c58f2" />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, justifyContent: 'center' },
  backBtn: { marginTop: 32, marginBottom: 8, width: 40 },
  progressWrap: { height: 8, marginBottom: 24, justifyContent: 'center' },
  progressBar: { position: 'absolute', left: 0, top: 0, height: 8, backgroundColor: '#1c58f2', borderRadius: 4, zIndex: 2 },
  progressBarBg: { width: '100%', height: 8, backgroundColor: '#e5e5e5', borderRadius: 4, position: 'absolute', left: 0, top: 0, zIndex: 1 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center', marginTop: 8 },
  desc: { fontSize: 15, color: '#444', marginBottom: 24, textAlign: 'center' },
  rowWrap: { flexDirection: 'row', marginBottom: 8 },
  label: { fontSize: 16, color: '#222', marginBottom: 4, marginTop: 12 },
  input: { borderBottomWidth: 2, borderBottomColor: '#e5e5e5', fontSize: 18, paddingVertical: 8, marginBottom: 8, color: '#222' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rememberRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#1c58f2', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  checkboxActive: { backgroundColor: '#1c58f2', borderColor: '#1c58f2' },
  rememberText: { fontSize: 16, color: '#222' },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  orLine: { flex: 1, height: 1, backgroundColor: '#e5e5e5' },
  orText: { marginHorizontal: 12, color: '#888', fontSize: 16 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  socialBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8 },
  socialIcon: { width: 28, height: 28, resizeMode: 'contain' },
  nextBtn: { backgroundColor: '#1c58f2', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginTop: 16, marginBottom: 32 },
  nextText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' },
  inputPicker: { borderBottomWidth: 2, borderBottomColor: '#e5e5e5', paddingVertical: 8, marginBottom: 8 },
  inputPickerText: { fontSize: 18, color: '#222' },
  signUpBtn: { backgroundColor: '#1c58f2', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginTop: 32, marginBottom: 32 },
  signUpText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', alignItems: 'center', justifyContent: 'center' },
  dialogBox: { backgroundColor: '#fff', borderRadius: 32, padding: 32, alignItems: 'center', width: 320, maxWidth: '90%' },
  successIcon: { width: 100, height: 100, marginBottom: 16 },
  successTitle: { fontSize: 28, fontWeight: 'bold', color: '#1c58f2', marginBottom: 8, textAlign: 'center' },
  successDesc: { fontSize: 16, color: '#444', textAlign: 'center', marginBottom: 8 },
  modalSelectBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'center', alignItems: 'center' },
  selectBox: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: 300, maxWidth: '90%' },
  selectTitle: { fontSize: 20, fontWeight: 'bold', color: '#1c58f2', marginBottom: 16, textAlign: 'center' },
  selectItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  selectItemText: { fontSize: 18, color: '#222', textAlign: 'center' },
}); 