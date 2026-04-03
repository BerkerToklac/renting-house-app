import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_RESERVATIONS, MOCK_PAYMENTS, MOCK_HOUSES } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ icon, label, value, color, bg }: any) => (
  <View style={[styles.statCard, { backgroundColor: bg }]}>
    <View style={[styles.statIcon, { backgroundColor: color + '22' }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const AdminDashboardScreen = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const totalRevenue = MOCK_PAYMENTS.filter((p) => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const activeReservations = MOCK_RESERVATIONS.filter((r) => r.status === 'confirmed').length;
  const pendingPayments = MOCK_PAYMENTS.filter((p) => p.status === 'pending').length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + SPACING.md }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Merhaba, {user?.name?.split(' ')[0]} 👋</Text>
          <Text style={styles.subtitle}>Platform genel durumu</Text>
        </View>
        <View style={styles.adminBadge}>
          <Ionicons name="shield-checkmark" size={16} color={COLORS.white} />
          <Text style={styles.adminBadgeText}>Admin</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          icon="home"
          label="Toplam İlan"
          value={MOCK_HOUSES.length}
          color={COLORS.info}
          bg={COLORS.white}
        />
        <StatCard
          icon="checkmark-circle"
          label="Aktif Kiralama"
          value={activeReservations}
          color={COLORS.success}
          bg={COLORS.white}
        />
        <StatCard
          icon="card"
          label="Bekleyen Ödeme"
          value={pendingPayments}
          color={COLORS.warning}
          bg={COLORS.white}
        />
        <StatCard
          icon="cash"
          label="Toplam Gelir"
          value={`₺${(totalRevenue / 1000).toFixed(1)}K`}
          color={COLORS.primary}
          bg={COLORS.white}
        />
      </View>

      {/* Recent Reservations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Son Rezervasyonlar</Text>
        {MOCK_RESERVATIONS.slice(0, 4).map((res) => (
          <View key={res.id} style={styles.reservationItem}>
            <View style={styles.reservationIcon}>
              <Ionicons name="home-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.reservationInfo}>
              <Text style={styles.reservationName} numberOfLines={1}>{res.houseName}</Text>
              <Text style={styles.reservationTenant}>{res.tenantName} · {res.checkIn} → {res.checkOut}</Text>
            </View>
            <View style={[
              styles.statusDot,
              { backgroundColor: res.status === 'confirmed' ? COLORS.success : res.status === 'pending' ? COLORS.warning : COLORS.error }
            ]} />
          </View>
        ))}
      </View>

      {/* Platform Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Özeti</Text>
        <View style={styles.summaryCard}>
          {[
            { label: 'Toplam Kullanıcı', value: '5', icon: 'people' },
            { label: 'Ev Sahipleri', value: '2', icon: 'business' },
            { label: 'Kiracılar', value: '2', icon: 'person' },
            { label: 'Tamamlanan Rezervasyon', value: MOCK_RESERVATIONS.filter(r => r.status === 'completed').length.toString(), icon: 'checkmark-done' },
          ].map((item) => (
            <View key={item.label} style={styles.summaryRow}>
              <Ionicons name={item.icon as any} size={18} color={COLORS.textSecondary} />
              <Text style={styles.summaryLabel}>{item.label}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  content: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  greeting: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    gap: 4,
  },
  adminBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  statCard: {
    width: '47%',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  statValue: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  section: { marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  reservationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  reservationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  reservationInfo: { flex: 1 },
  reservationName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  reservationTenant: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  summaryLabel: { flex: 1, fontSize: 14, color: COLORS.textSecondary },
  summaryValue: { fontSize: 14, fontWeight: '700', color: COLORS.text },
});
