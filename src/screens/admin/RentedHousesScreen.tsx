import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_RESERVATIONS } from '../../data/mockData';
import { Reservation } from '../../types';
import { Badge } from '../../components/Badge';

const STATUS_MAP: Record<string, { label: string; variant: any }> = {
  confirmed: { label: 'Onaylı', variant: 'success' },
  pending: { label: 'Bekliyor', variant: 'warning' },
  cancelled: { label: 'İptal', variant: 'error' },
  completed: { label: 'Tamamlandı', variant: 'info' },
};

const ReservationCard = ({ item }: { item: Reservation }) => {
  const nights = item.nightCount;
  const s = STATUS_MAP[item.status];
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.houseIcon}>
          <Ionicons name="home" size={22} color={COLORS.primary} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.houseName} numberOfLines={1}>{item.houseName}</Text>
          <Text style={styles.houseCity}>{item.houseCity}</Text>
        </View>
        <Badge label={s.label} variant={s.variant} />
      </View>
      <View style={styles.divider} />
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{item.tenantName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{item.checkIn} → {item.checkOut} ({nights} gece)</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{item.guests} misafir</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="business-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>Ev sahibi: {item.landlordName}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.totalLabel}>Toplam Tutar</Text>
        <Text style={styles.totalValue}>₺{item.totalPrice.toLocaleString('tr-TR')}</Text>
      </View>
    </View>
  );
};

export const RentedHousesScreen = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filters = ['all', 'confirmed', 'pending', 'completed', 'cancelled'];
  const filterLabels: Record<string, string> = {
    all: 'Tümü',
    confirmed: 'Onaylı',
    pending: 'Bekliyor',
    completed: 'Tamamlandı',
    cancelled: 'İptal',
  };

  const filtered = MOCK_RESERVATIONS.filter((r) => {
    const matchSearch =
      r.houseName.toLowerCase().includes(search.toLowerCase()) ||
      r.tenantName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Kiralanan Evler</Text>
        <Text style={styles.count}>{filtered.length} kayıt</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Ev veya kiracı ara..."
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.chipRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filter === f && styles.chipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>
              {filterLabels[f]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReservationCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="home-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyText}>Kayıt bulunamadı</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  count: { fontSize: 13, color: COLORS.textSecondary },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  searchInput: { flex: 1, height: 44, color: COLORS.text, fontSize: 14, marginLeft: SPACING.xs },
  chipRow: { flexDirection: 'row', paddingHorizontal: SPACING.md, gap: SPACING.xs, marginBottom: SPACING.sm, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: RADIUS.round, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  chipTextActive: { color: COLORS.white },
  list: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  houseIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF5F5', justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  cardInfo: { flex: 1 },
  houseName: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  houseCity: { fontSize: 12, color: COLORS.textSecondary },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.sm },
  cardDetails: { gap: 6 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 13, color: COLORS.textSecondary },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: { fontSize: 13, color: COLORS.textSecondary },
  totalValue: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  empty: { alignItems: 'center', paddingVertical: 60, gap: SPACING.sm },
  emptyText: { fontSize: 15, color: COLORS.textSecondary },
});
