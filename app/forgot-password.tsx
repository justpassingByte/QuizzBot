import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Đếm ngược resend code
  React.useEffect(() => {
    if (step === 2 && timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer, step]);

  // Handler
  const handleSendEmail = () => {
    if (!email) return Alert.alert('Error', 'Please enter your email');
    setStep(2);
    setTimer(60);
  };
  const handleConfirmOtp = () => {
    if (otp.some(d => d === '')) return Alert.alert('Error', 'Please enter the OTP code');
    setStep(3);
  };
  const handleContinue = () => {
    if (!newPassword || !confirmPassword) return Alert.alert('Error', 'Please enter all fields');
    if (newPassword !== confirmPassword) return Alert.alert('Error', 'Passwords do not match');
    setSuccess(true);
  };
  const handleGoHome = () => {
    setSuccess(false);
    router.replace('/(tabs)');
  };

  // UI step 1: Nhập email
  const renderStep1 = () => (
    <View style={styles.innerContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={{fontSize: 28, color: '#222'}}>{'<'}</Text>
      </TouchableOpacity>
      <Image source={require('../assets/images/robot1.png')} style={styles.robot} />
      <Text style={styles.title}>Forgot <Text style={{color:'#1c58f2'}}>Password</Text></Text>
      <Text style={styles.desc}>Enter your email address to get an OTP code to reset your password.</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="John@beyondlogic.ai"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#bbb"
      />
      <TouchableOpacity style={styles.continueBtn} onPress={handleSendEmail}>
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );

  // UI step 2: Nhập OTP
  const renderStep2 = () => (
    <View style={styles.innerContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
        <Text style={{fontSize: 28, color: '#222'}}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>You've got <Text style={{color:'#1c58f2'}}>mail</Text> <Text>📧</Text></Text>
      <Text style={styles.desc}>We have sent the OTP verification code to your email address. Check your email and enter the code below.</Text>
      <View style={styles.otpRow}>
        {otp.map((d, i) => (
          <TextInput
            key={i}
            ref={otpInputs[i]}
            style={[styles.otpInput, d && styles.otpInputActive]}
            keyboardType="number-pad"
            maxLength={1}
            value={d}
            onChangeText={v => {
              const arr = [...otp];
              arr[i] = v.replace(/[^0-9]/g, '');
              setOtp(arr);
              if (v && i < 3) otpInputs[i+1].current?.focus();
              if (!v && i > 0) otpInputs[i-1].current?.focus();
            }}
          />
        ))}
      </View>
      <Text style={styles.resendText}>Didn't receive email?</Text>
      <Text style={styles.resendText}>You can resend code in <Text style={{color:'#1c58f2'}}>{timer} s</Text></Text>
      <TouchableOpacity style={styles.continueBtn} onPress={handleConfirmOtp}>
        <Text style={styles.continueText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );

  // UI step 3: Tạo mật khẩu mới
  const renderStep3 = () => (
    <View style={styles.innerContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={() => setStep(2)}>
        <Text style={{fontSize: 28, color: '#222'}}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create new <Text style={{color:'#1c58f2'}}>password</Text> <Text>🔐</Text></Text>
      <Text style={styles.desc}>Save the new password in a safe place, if you forget it then you have to do a forgot password again.</Text>
      <Text style={styles.label}>Create a new password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={styles.passwordInput}
          placeholder="••••••••••••••••"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#bbb"
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeBtn}>
          <Text style={{fontSize:18, color:'#1c58f2'}}>{showNewPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Confirm a new password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={styles.passwordInput}
          placeholder="••••••••••••••••"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#bbb"
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeBtn}>
          <Text style={{fontSize:18, color:'#1c58f2'}}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rememberRow}>
        <View style={[styles.checkbox, true && styles.checkboxActive]}><Text style={{color:'#fff'}}>✓</Text></View>
        <Text style={styles.rememberText}>Remember me</Text>
      </View>
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );

  // UI dialog thành công
  const renderSuccessDialog = () => (
    <Modal visible={success} transparent animationType="fade">
      <View style={styles.modalBg}>
        <View style={styles.dialogBox}>
          <Image source={require('../assets/images/icon_success_dialog.png')} style={styles.successIcon} />
          <Text style={styles.successTitle}>Welcome Back!</Text>
          <Text style={styles.successDesc}>You have successfully reset and created a new password.</Text>
          <TouchableOpacity style={styles.goHomeBtn} onPress={handleGoHome}>
            <Text style={styles.goHomeText}>GO TO HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {renderSuccessDialog()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', minHeight: 700, justifyContent: 'flex-start' },
  innerContainer: { flex: 1, paddingHorizontal: 24, paddingTop: 24, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', marginBottom: 8, marginTop: 8 },
  robot: { width: 120, height: 120, resizeMode: 'contain', alignSelf: 'center', marginBottom: 12, marginTop: 8 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#222', marginBottom: 16, textAlign: 'left', alignSelf: 'flex-start' },
  desc: { fontSize: 16, color: '#222', marginBottom: 24, textAlign: 'left', alignSelf: 'flex-start' },
  label: { fontSize: 18, color: '#222', fontWeight: 'bold', marginBottom: 8, alignSelf: 'flex-start' },
  input: { borderBottomWidth: 2, borderBottomColor: '#1c58f2', fontSize: 18, paddingVertical: 8, marginBottom: 32, color: '#222', width: 320, maxWidth: '100%', textAlign: 'left', alignSelf: 'flex-start' },
  continueBtn: { backgroundColor: '#1c58f2', borderRadius: 30, paddingVertical: 18, alignItems: 'center', width: '100%', marginTop: 32, marginBottom: 16 },
  continueText: { color: '#fff', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' },
  otpRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 32 },
  otpInput: { width: 56, height: 56, borderRadius: 16, borderWidth: 2, borderColor: '#eee', backgroundColor: '#fafbfc', fontSize: 28, color: '#222', textAlign: 'center', marginHorizontal: 8 },
  otpInputActive: { borderColor: '#1c58f2' },
  resendText: { color: '#222', fontSize: 16, textAlign: 'center', marginBottom: 4 },
  passwordRow: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 32, position: 'relative' },
  passwordInput: { flex: 1, borderBottomWidth: 2, borderBottomColor: '#1c58f2', fontSize: 18, paddingVertical: 8, color: '#222', textAlign: 'left', alignSelf: 'flex-start', marginBottom: 0 },
  eyeBtn: { position: 'absolute', right: 0, height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 },
  rememberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, alignSelf: 'flex-start' },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#1c58f2', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  checkboxActive: { backgroundColor: '#1c58f2', borderColor: '#1c58f2' },
  rememberText: { fontSize: 16, color: '#222' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', alignItems: 'center', justifyContent: 'center' },
  dialogBox: { backgroundColor: '#fff', borderRadius: 32, padding: 32, alignItems: 'center', width: 320, maxWidth: '90%' },
  successIcon: { width: 120, height: 120, marginBottom: 16 },
  successTitle: { fontSize: 28, fontWeight: 'bold', color: '#1c58f2', marginBottom: 8, textAlign: 'center' },
  successDesc: { fontSize: 16, color: '#444', textAlign: 'center', marginBottom: 16 },
  goHomeBtn: { backgroundColor: '#1c58f2', borderRadius: 30, paddingVertical: 16, alignItems: 'center', width: '100%', marginTop: 8 },
  goHomeText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' },
}); 