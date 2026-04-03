import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_HOUSES, MOCK_RESERVATIONS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/Badge';

export const LandlordDashboardScreen = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const myHouses = MOCK_HOUSES.filter((h) => h.landlordId === user?.id);
  const myReservations = MOCK_RESERVATIONS.filter((r) => r.landlordId === user?.id);
  const activeReservations = myReservations.filter((r) => r.status === 'confirmed');
  const totalEarnings = myReservations
    .filter((r) => r.paymentStatus === 'paid')
    .reduce((s, r) => s + r.totalPrice, 0);

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
          <Text style={styles.subtitle}>İlanlarınızın durumu</Text>
        </View>
        <View style={styles.landlordBadge}>
          <Ionicons name="business" size={14} color={COLORS.white} />
          <Text style={styles.landlordBadgeText}>Ev Sahibi</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { icon: 'home', label: 'İlanlarım', value: myHouses.length, color: COLORS.primary },
          { icon: 'checkmark-circle', label: 'Aktif Kiralama', value: activeReservations.length, color: COLORS.success },
          { icon: 'cash', label: 'Toplam Kazanç', value: `₺${(totalEarnings / 1000).toFixed(0)}K`, color: COLORS.secondary },
        ].map((s) => (
          <View key={s.label} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: s.color + '20' }]}>
              <Ionicons name={s.icon as any} size={22} color={s.color} />
            </View>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Active Reservations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yaklaşan Rezervasyonlar</Text>
        {activeReservations.length === 0 ? (
          <View style={styles.emptySection}>
            <Text style={styles.emptyText}>Aktif rezervasyon yok</Text>
          </View>
        ) : (
          activeReservations.map((res) => (
            <View key={res.id} style={styles.resCard}>
              <View style={styles.resLeft}>
                <Text style={styles.resHouse} numberOfLines={1}>{res.houseName}</Text>
                <Text style={styles.resTenant}>{res.tenantName} · {res.guests} kişi</Text>
                <Text style={styles.resDates}>{res.checkIn} → {res.checkOut}</Text>
              </View>
              <View style={styles.resRight}>
                <Text style={styles.resPrice}>₺{res.totalPrice.toLocaleString('tr-TR')}</Text>
                <Badge label="Onaylı" variant="success" />
              </View>
            </View>
          ))
        )}
      </View>

      {/* My Listings Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>İlanlarım</Text>
        {myHouses.map((house) => (
          <View key={house.id} style={styles.houseCard}>
            <View style={styles.houseLeft}>
              <View style={styles.houseIcon}>
                <Ionicons name="home" size={20} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.houseTitle} numberOfLines={1}>{house.title}</Text>
                <Text style={styles.houseCity}>{house.city} · ₺{house.pricePerNight}/gece</Text>
              </View>
            </View>
            <Badge label={house.isAvailable ? 'Müsait' : 'Dolu'} variant={house.isAvailable ? 'success' : 'error'} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  content: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  greeting: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  landlordBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.info,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    gap: 4,
  },
  landlordBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2, textAlign: 'center' },
  section: { marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  emptySection: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.lg, alignItems: 'center' },
  emptyText: { color: COLORS.textSecondary, fontSize: 14 },
  resCard: {
    flexDirection: 'row',
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
  resLeft: { flex: 1 },
  resHouse: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  resTenant: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  resDates: { fontSize: 12, color: COLORS.primary, marginTop: 4 },
  resRight: { alignItems: 'flex-end', gap: 6 },
  resPrice: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  houseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  houseLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: SPACING.sm },
  houseIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF5F5', justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  houseTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text, maxWidth: 160 },
  houseCity: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
});
