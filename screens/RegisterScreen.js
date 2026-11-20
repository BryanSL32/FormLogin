import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {
  validateFullName,
  validateEmail,
  validateRegisterPassword,
  validateConfirmPassword,
} from '../utils/validators';

export default function RegisterScreen({ onNavigateLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFullNameChange = (text) => {
    setFullName(text);
    setTouched((prev) => ({ ...prev, fullName: true }));
    setErrors((prev) => ({ ...prev, fullName: validateFullName(text) }));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setTouched((prev) => ({ ...prev, email: true }));
    setErrors((prev) => ({ ...prev, email: validateEmail(text) }));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setTouched((prev) => ({ ...prev, password: true }));
    setErrors((prev) => ({
      ...prev,
      password: validateRegisterPassword(text),
      confirmPassword: touched.confirmPassword
        ? validateConfirmPassword(text, confirmPassword)
        : prev.confirmPassword,
    }));
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setTouched((prev) => ({ ...prev, confirmPassword: true }));
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(password, text),
    }));
  };

  const isFormValid =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    password !== '' &&
    confirmPassword !== '' &&
    agreed &&
    !validateFullName(fullName) &&
    !validateEmail(email) &&
    !validateRegisterPassword(password) &&
    !validateConfirmPassword(password, confirmPassword);

  const handleRegister = () => {
    const nameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validateRegisterPassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);

    setErrors({
      fullName: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
    });
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (nameError || emailError || passwordError || confirmError || !agreed) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Alert', 'Registration successful!', [
        { text: 'OK', onPress: onNavigateLogin },
      ]);
    }, 800);
  };

  const getBorderColor = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) {
      return '#f44336';
    }
    if (focusedField === fieldName) {
      return '#00b894';
    }
    return '#e0e0e0';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: getBorderColor('fullName') },
              ]}
              placeholder="Enter your full name"
              placeholderTextColor="#9aa0a6"
              autoCapitalize="words"
              value={fullName}
              onChangeText={handleFullNameChange}
              onFocus={() => setFocusedField('fullName')}
              onBlur={() => {
                setFocusedField(null);
                setTouched((prev) => ({ ...prev, fullName: true }));
                setErrors((prev) => ({
                  ...prev,
                  fullName: validateFullName(fullName),
                }));
              }}
            />
            {touched.fullName && errors.fullName ? (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, { borderColor: getBorderColor('email') }]}
              placeholder="Enter your email"
              placeholderTextColor="#9aa0a6"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={handleEmailChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => {
                setFocusedField(null);
                setTouched((prev) => ({ ...prev, email: true }));
                setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
              }}
            />
            {touched.email && errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: getBorderColor('password') },
              ]}
              placeholder="Enter your password"
              placeholderTextColor="#9aa0a6"
              secureTextEntry
              value={password}
              onChangeText={handlePasswordChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => {
                setFocusedField(null);
                setTouched((prev) => ({ ...prev, password: true }));
                setErrors((prev) => ({
                  ...prev,
                  password: validateRegisterPassword(password),
                }));
              }}
            />
            {touched.password && errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: getBorderColor('confirmPassword') },
              ]}
              placeholder="Confirm your password"
              placeholderTextColor="#9aa0a6"
              secureTextEntry
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => {
                setFocusedField(null);
                setTouched((prev) => ({ ...prev, confirmPassword: true }));
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: validateConfirmPassword(
                    password,
                    confirmPassword
                  ),
                }));
              }}
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.75}
          >
            <View style={[styles.checkboxBox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree with Terms &amp; Conditions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              (!isFormValid || isLoading) && styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            disabled={!isFormValid || isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Register'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onNavigateLogin} activeOpacity={0.7}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#22252a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#687078',
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3035',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#22252a',
    backgroundColor: '#ffffff',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 6,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 18,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#00b894',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#00b894',
    borderColor: '#00b894',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#2c3035',
    flexShrink: 1,
  },
  button: {
    backgroundColor: '#00b894',
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#cfd6d9',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  footerText: {
    fontSize: 14,
    color: '#687078',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00b894',
  },
});