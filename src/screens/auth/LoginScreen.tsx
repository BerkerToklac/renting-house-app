import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { DEMO_CREDENTIALS } from '../../data/mockData';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    const result = await login(email.trim(), password);
    if (!result.success) {
      Alert.alert('Giriş Başarısız', result.error ?? 'Bir hata oluştu.');
    }
  };

  const quickLogin = (role: 'admin' | 'landlord' | 'tenant') => {
    const creds = DEMO_CREDENTIALS[role];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo / Brand */}
        <View style={styles.brand}>
          <View style={styles.logoCircle}>
            <Ionicons name="home" size={40} color={COLORS.white} />
          </View>
          <Text style={styles.brandName}>KiraEvim</Text>
          <Text style={styles.brandTagline}>Evinizi güvenle kirala</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Giriş Yap</Text>

          {/* Email */}
          <Text style={styles.label}>E-posta</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="ornek@email.com"
              placeholderTextColor={COLORS.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>Şifre</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••"
              placeholderTextColor={COLORS.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>

          {/* Register */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Hesabın yok mu? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Demo Login Shortcuts */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Hızlı Giriş (Demo)</Text>
          <View style={styles.demoRow}>
            <TouchableOpacity style={[styles.demoButton, { backgroundColor: '#E8F8F0' }]} onPress={() => quickLogin('admin')}>
              <Ionicons name="shield-checkmark" size={18} color={COLORS.success} />
              <Text style={[styles.demoLabel, { color: COLORS.success }]}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.demoButton, { backgroundColor: '#EBF5FB' }]} onPress={() => quickLogin('landlord')}>
              <Ionicons name="business" size={18} color={COLORS.info} />
              <Text style={[styles.demoLabel, { color: COLORS.info }]}>Ev Sahibi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.demoButton, { backgroundColor: '#FEF9E7' }]} onPress={() => quickLogin('tenant')}>
              <Ionicons name="person" size={18} color={COLORS.warning} />
              <Text style={[styles.demoLabel, { color: COLORS.warning }]}>Kiracı</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.demoHint}>Admin & Ev Sahibi sisteme dahil edilir · Kiracılar kayıt olabilir</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACING.lg },
  brand: { alignItems: 'center', marginBottom: SPACING.xl },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  brandName: { fontSize: 32, fontWeight: '800', color: COLORS.primary, letterSpacing: -0.5 },
  brandTagline: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.lg },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.xs },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  inputIcon: { marginRight: SPACING.xs },
  input: { flex: 1, height: 50, color: COLORS.text, fontSize: 15 },
  eyeButton: { padding: SPACING.xs },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  loginButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  registerText: { color: COLORS.textSecondary, fontSize: 14 },
  registerLink: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  demoSection: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  demoTitle: { fontSize: 13, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  demoRow: { flexDirection: 'row', gap: SPACING.sm },
  demoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  demoLabel: { fontSize: 13, fontWeight: '600' },
  demoHint: { fontSize: 12, color: COLORS.textSecondary, marginTop: SPACING.sm },
});
