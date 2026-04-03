import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { useAuth } from '../../context/AuthContext';

const MenuItem = ({ icon, label, onPress, danger, value }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={[styles.menuIcon, { backgroundColor: danger ? '#FDEDEC' : COLORS.surface }]}>
      <Ionicons name={icon} size={20} color={danger ? COLORS.error : COLORS.textSecondary} />
    </View>
    <Text style={[styles.menuLabel, danger && { color: COLORS.error }]}>{label}</Text>
    {value ? <Text style={styles.menuValue}>{value}</Text> : null}
    <Ionicons name="chevron-forward" size={18} color={COLORS.border} />
  </TouchableOpacity>
);

export const LandlordProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + SPACING.md }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0] ?? 'E'}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roleBadge}>
          <Ionicons name="business" size={14} color={COLORS.info} />
          <Text style={styles.roleText}>Ev Sahibi</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap Bilgileri</Text>
        <View style={styles.card}>
          <MenuItem icon="person-outline" label="Ad Soyad" value={user?.name} onPress={() => {}} />
          <MenuItem icon="mail-outline" label="E-posta" value={user?.email} onPress={() => {}} />
          <MenuItem icon="call-outline" label="Telefon" value={user?.phone ?? 'Ekle'} onPress={() => {}} />
          <MenuItem icon="calendar-outline" label="Üyelik Tarihi" value={user?.createdAt} onPress={() => {}} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yasal Belgeler</Text>
        <View style={styles.card}>
          <MenuItem icon="information-circle-outline" label="Şirket Bilgileri" onPress={() => {}} />
          <MenuItem icon="document-text-outline" label="Kullanıcı Sözleşmesi" onPress={() => {}} />
          <MenuItem icon="home-outline" label="Ev Sahibi Sözleşmesi" onPress={() => {}} />
          <MenuItem icon="lock-closed-outline" label="Gizlilik Politikası" onPress={() => {}} />
          <MenuItem icon="eye-outline" label="Aydınlatma Metni" onPress={() => {}} />
          <MenuItem icon="receipt-outline" label="Rezervasyon Şartları" onPress={() => {}} />
          <MenuItem icon="return-down-back-outline" label="İptal & İade Kuralları" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap</Text>
        <View style={styles.card}>
          <MenuItem icon="notifications-outline" label="Bildirimler" onPress={() => {}} />
          <MenuItem icon="shield-outline" label="Güvenlik" onPress={() => {}} />
          <MenuItem
            icon="log-out-outline"
            label="Çıkış Yap"
            danger
            onPress={() =>
              Alert.alert('Çıkış', 'Çıkış yapmak istiyor musunuz?', [
                { text: 'İptal', style: 'cancel' },
                { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
              ])
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  content: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  avatarSection: { alignItems: 'center', marginBottom: SPACING.lg },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.info, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  avatarText: { color: COLORS.white, fontSize: 36, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  email: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  roleBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EBF5FB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.round, marginTop: SPACING.sm, gap: 4 },
  roleText: { color: COLORS.info, fontSize: 13, fontWeight: '600' },
  section: { marginBottom: SPACING.md },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  menuLabel: { flex: 1, fontSize: 15, color: COLORS.text },
  menuValue: { fontSize: 13, color: COLORS.textSecondary, marginRight: SPACING.xs },
});
