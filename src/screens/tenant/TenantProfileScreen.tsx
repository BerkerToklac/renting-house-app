import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { useAuth } from '../../context/AuthContext';
import { MOCK_RESERVATIONS } from '../../data/mockData';

const MenuItem = ({ icon, label, onPress, danger, badge }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={[styles.menuIcon, { backgroundColor: danger ? '#FDEDEC' : COLORS.surface }]}>
      <Ionicons name={icon} size={20} color={danger ? COLORS.error : COLORS.textSecondary} />
    </View>
    <Text style={[styles.menuLabel, danger && { color: COLORS.error }]}>{label}</Text>
    {badge ? <View style={styles.menuBadge}><Text style={styles.menuBadgeText}>{badge}</Text></View> : null}
    <Ionicons name="chevron-forward" size={18} color={COLORS.border} />
  </TouchableOpacity>
);

export const TenantProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const myReservations = MOCK_RESERVATIONS.filter((r) => r.tenantId === user?.id);
  const activeCount = myReservations.filter((r) => r.status === 'confirmed').length;
  const totalSpent = myReservations
    .filter((r) => r.paymentStatus === 'paid')
    .reduce((s, r) => s + r.totalPrice, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + SPACING.md }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Avatar & Info */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0] ?? 'K'}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roleBadge}>
          <Ionicons name="person" size={14} color={COLORS.warning} />
          <Text style={styles.roleText}>Kiracı</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{myReservations.length}</Text>
          <Text style={styles.statLabel}>Toplam</Text>
        </View>
        <View style={[styles.statCard, styles.statCardBorder]}>
          <Text style={styles.statValue}>{activeCount}</Text>
          <Text style={styles.statLabel}>Aktif</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₺{totalSpent > 0 ? (totalSpent / 1000).toFixed(0) + 'K' : '0'}</Text>
          <Text style={styles.statLabel}>Harcama</Text>
        </View>
      </View>

      {/* Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap Bilgileri</Text>
        <View style={styles.card}>
          <MenuItem icon="person-outline" label="Ad Soyad" onPress={() => {}} />
          <MenuItem icon="mail-outline" label="E-posta" onPress={() => {}} />
          <MenuItem icon="call-outline" label="Telefon" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yasal Belgeler</Text>
        <View style={styles.card}>
          <MenuItem icon="information-circle-outline" label="Şirket Bilgileri" onPress={() => {}} />
          <MenuItem icon="document-text-outline" label="Kullanıcı Sözleşmesi" onPress={() => {}} />
          <MenuItem icon="lock-closed-outline" label="Gizlilik Politikası" onPress={() => {}} />
          <MenuItem icon="eye-outline" label="Aydınlatma Metni" onPress={() => {}} />
          <MenuItem icon="receipt-outline" label="Rezervasyon Şartları" onPress={() => {}} />
          <MenuItem icon="return-down-back-outline" label="İptal & İade Kuralları" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destek</Text>
        <View style={styles.card}>
          <MenuItem icon="headset-outline" label="Yardım Merkezi" onPress={() => {}} />
          <MenuItem icon="chatbubble-outline" label="Canlı Destek" onPress={() => {}} />
          <MenuItem icon="star-outline" label="Uygulamayı Değerlendir" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap</Text>
        <View style={styles.card}>
          <MenuItem icon="notifications-outline" label="Bildirimler" onPress={() => {}} />
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
  avatarSection: { alignItems: 'center', marginBottom: SPACING.md },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.warning, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  avatarText: { color: COLORS.white, fontSize: 36, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  email: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  roleBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF9E7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.round, marginTop: SPACING.sm, gap: 4 },
  roleText: { color: COLORS.warning, fontSize: 13, fontWeight: '600' },
  statsRow: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: RADIUS.md, marginBottom: SPACING.lg, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: SPACING.md },
  statCardBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: COLORS.border },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  section: { marginBottom: SPACING.md },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  menuLabel: { flex: 1, fontSize: 15, color: COLORS.text },
  menuBadge: { backgroundColor: COLORS.primary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.round, marginRight: SPACING.xs },
  menuBadgeText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
});
