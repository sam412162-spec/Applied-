import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import TabNavigator from './TabNavigator';

export default function RootNavigator() {
  const { session, loading } = useAuth();
  const [screen, setScreen] = useState<'signin' | 'signup'>('signin');

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f6fb' }}>
        <ActivityIndicator size="large" color="#111" />
      </View>
    );
  }

  if (!session) {
    if (screen === 'signup') {
      return <SignUpScreen onGoSignIn={() => setScreen('signin')} />;
    }
    return <SignInScreen onGoSignUp={() => setScreen('signup')} />;
  }

  return <TabNavigator />;
}
