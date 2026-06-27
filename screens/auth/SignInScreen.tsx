import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface Props {
  onGoSignUp: () => void;
}

export default function SignInScreen({ onGoSignUp }: Props) {
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError(null);
    const { error } = await signIn(email.trim(), password);
    setLoading(false);
    if (error) setError(error);
  };

  const handleForgotPassword = async () => {
    if (!email) { setError('Enter your email above first.'); return; }
    setLoading(true);
    setError(null);
    const { error } = await resetPassword(email.trim());
    setLoading(false);
    if (error) { setError(error); return; }
    setResetSent(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.inner}>
        <View style={styles.logoBlock}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.appName}>Applied</Text>
          <Text style={styles.tagline}>Your career, accelerated.</Text>
        </View>

        <Text style={styles.heading}>Welcome back</Text>

        {resetSent && (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle-outline" size={15} color="#059669" />
            <Text style={styles.successText}>Password reset email sent — check your inbox.</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={15} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />
        </View>

        <View style={styles.field}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
              <Text style={styles.forgotLink}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pwRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="••••••••"
              placeholderTextColor="#bbb"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPw}
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
            />
            <TouchableOpacity onPress={() => setShowPw(v => !v)} style={styles.eyeBtn} hitSlop={8}>
              <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={20} color="#aaa" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleSignIn}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Sign In</Text>}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onGoSignUp}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  inner: { flex: 1, paddingHorizontal: 28, justifyContent: 'center' },
  logoBlock: { alignItems: 'center', marginBottom: 36 },
  logoCircle: {
    width: 64, height: 64, borderRadius: 20,
    backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  logoText: { fontSize: 28, fontWeight: '800', color: '#fff' },
  appName: { fontSize: 26, fontWeight: '800', color: '#111', letterSpacing: -0.5 },
  tagline: { fontSize: 13, color: '#888', marginTop: 2 },
  heading: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 20 },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: '#dcfce7', borderRadius: 10, padding: 12, marginBottom: 14,
  },
  successText: { fontSize: 13, color: '#059669', flex: 1 },
  errorBox: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: '#fef2f2', borderRadius: 10, padding: 12, marginBottom: 14,
  },
  errorText: { fontSize: 13, color: '#dc2626', flex: 1 },
  field: { marginBottom: 16 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#555' },
  forgotLink: { fontSize: 13, fontWeight: '600', color: '#6366f1' },
  input: {
    backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 14, color: '#111',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  pwRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyeBtn: { padding: 4 },
  btn: {
    backgroundColor: '#111', borderRadius: 14, paddingVertical: 14,
    alignItems: 'center', marginTop: 8, marginBottom: 20,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 14, color: '#888' },
  footerLink: { fontSize: 14, fontWeight: '700', color: '#111' },
});
