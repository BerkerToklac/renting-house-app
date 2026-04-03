import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_RESERVATIONS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Reservation } from '../../types';
import { Badge } from '../../components/Badge';

const STATUS_MAP: Record<string, { label: string; variant: any }> = {
  confirmed: { label: 'Onaylı', variant: 'success' },
  pending: { label: 'Bekliyor', variant: 'warning' },
  cancelled: { label: 'İptal', variant: 'error' },
  completed: { label: 'Tamamlandı', variant: 'info' },
};

const RentalCard = ({ item }: { item: Reservation }) => {
  const s = STATUS_MAP[item.status];
  return (
    <View style={styles.card}>
      {/* Timeline dot */}
      <View style={styles.timelineDot}>
        <View style={[
          styles.dot,
          { backgroundColor: item.status === 'confirmed' ? COLORS.success : item.status === 'completed' ? COLORS.info : item.status === 'pending' ? COLORS.warning : COLORS.error }
        ]} />
        <View style={styles.line} />
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.tenantName}>{item.tenantName}</Text>
          <Badge label={s.label} variant={s.variant} />
        </View>
        <Text style={styles.houseName} numberOfLines={1}>{item.houseName}</Text>

        <View style={styles.datesRow}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Giriş</Text>
            <Text style={styles.dateValue}>{item.checkIn}</Text>
          </View>
          <Ionicons name="arrow-forward" size={16} color={COLORS.textSecondary} />
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Çıkış</Text>
            <Text style={styles.dateValue}>{item.checkOut}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.meta}>
            <Ionicons name="people-outline" size={13} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{item.guests} misafir</Text>
          </View>
          <View style={styles.meta}>
            <Ionicons name="moon-outline" size={13} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{item.nightCount} gece</Text>
          </View>
          <View style={[styles.meta, { marginLeft: 'auto' }]}>
            <Text style={styles.earnings}>₺{item.totalPrice.toLocaleString('tr-TR')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const RentalHistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  const myReservations = MOCK_RESERVATIONS.filter((r) => r.landlordId === user?.id);
  const filtered = filter === 'all' ? myReservations : myReservations.filter((r) => r.status === filter);

  const totalEarnings = myReservations
    .filter((r) => r.paymentStatus === 'paid')
    .reduce((s, r) => s + r.totalPrice, 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Kiralama Geçmişi</Text>
      </View>

      {/* Earnings Summary */}
      <View style={styles.earningsBanner}>
        <View>
          <Text style={styles.earningsLabel}>Toplam Kazanç</Text>
          <Text style={styles.earningsValue}>₺{totalEarnings.toLocaleString('tr-TR')}</Text>
        </View>
        <View style={styles.earningsStats}>
          <Text style={styles.earningsStat}>{myReservations.length} Toplam</Text>
          <Text style={styles.earningsStat}>{myReservations.filter(r => r.status === 'confirmed').length} Aktif</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.chipRow}>
        {[
          { key: 'all', label: 'Tümü' },
          { key: 'confirmed', label: 'Onaylı' },
          { key: 'completed', label: 'Tamamlandı' },
          { key: 'pending', label: 'Bekliyor' },
          { key: 'cancelled', label: 'İptal' },
        ].map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.chip, filter === f.key && styles.chipActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.chipText, filter === f.key && styles.chipTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RentalCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyText}>Kayıt bulunamadı</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  earningsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  earningsLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  earningsValue: { fontSize: 28, fontWeight: '800', color: COLORS.white },
  earningsStats: { alignItems: 'flex-end', gap: 4 },
  earningsStat: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  chipRow: { flexDirection: 'row', paddingHorizontal: SPACING.md, gap: SPACING.xs, marginBottom: SPACING.sm, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.round, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  chipTextActive: { color: COLORS.white },
  list: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  card: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  timelineDot: { width: 24, alignItems: 'center', marginRight: SPACING.sm },
  dot: { width: 14, height: 14, borderRadius: 7, marginTop: SPACING.sm },
  line: { flex: 1, width: 2, backgroundColor: COLORS.border, marginTop: 4 },
  cardContent: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  tenantName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  houseName: { fontSize: 13, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  datesRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  dateBox: {},
  dateLabel: { fontSize: 11, color: COLORS.textSecondary },
  dateValue: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: COLORS.textSecondary },
  earnings: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  empty: { alignItems: 'center', paddingVertical: 60, gap: SPACING.sm },
  emptyText: { fontSize: 15, color: COLORS.textSecondary },
});
