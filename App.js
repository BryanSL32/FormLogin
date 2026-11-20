import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f8" />
      {currentScreen === 'login' ? (
        <LoginScreen
          onNavigateRegister={() => setCurrentScreen('register')}
        />
      ) : (
        <RegisterScreen
          onNavigateLogin={() => setCurrentScreen('login')}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
});