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
import { validateEmail, validateLoginPassword } from '../utils/validators';

export default function LoginScreen({ onNavigateRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    setTouched((prev) => ({ ...prev, email: true }));
    setErrors((prev) => ({ ...prev, email: validateEmail(text) }));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setTouched((prev) => ({ ...prev, password: true }));
    setErrors((prev) => ({ ...prev, password: validateLoginPassword(text) }));
  };

  const isFormValid =
    email.trim() !== '' &&
    password !== '' &&
    !validateEmail(email) &&
    !validateLoginPassword(password);

  const handleLogin = () => {
    const emailError = validateEmail(email);
    const passwordError = validateLoginPassword(password);

    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    if (emailError || passwordError) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Alert', 'Login successful!', [{ text: 'OK' }]);
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

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
                  password: validateLoginPassword(password),
                }));
              }}
            />
            {touched.password && errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!isFormValid || isLoading) && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!isFormValid || isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={onNavigateRegister} activeOpacity={0.7}>
              <Text style={styles.linkText}>Sign Up</Text>
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
    marginBottom: 28,
  },
  fieldGroup: {
    marginBottom: 18,
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
  button: {
    backgroundColor: '#00b894',
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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