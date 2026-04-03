import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_PAYMENTS } from '../../data/mockData';
import { Payment } from '../../types';
import { Badge } from '../../components/Badge';

const STATUS_MAP: Record<string, { label: string; variant: any }> = {
  completed: { label: 'Tamamlandı', variant: 'success' },
  pending: { label: 'Bekliyor', variant: 'warning' },
  failed: { label: 'Başarısız', variant: 'error' },
  refunded: { label: 'İade Edildi', variant: 'secondary' },
};

const PaymentCard = ({ item }: { item: Payment }) => {
  const s = STATUS_MAP[item.status];
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconWrapper, { backgroundColor: item.status === 'completed' ? '#E8F8F0' : '#FEF9E7' }]}>
          <Ionicons
            name={item.status === 'completed' ? 'checkmark-circle' : 'time'}
            size={22}
            color={item.status === 'completed' ? COLORS.success : COLORS.warning}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.houseName} numberOfLines={1}>{item.houseName}</Text>
          <Text style={styles.tenant}>{item.tenantName} → {item.landlordName}</Text>
        </View>
        <Text style={styles.amount}>₺{item.amount.toLocaleString('tr-TR')}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.method}><Ionicons name="card-outline" size={12} /> {item.method}</Text>
        <Text style={styles.date}>{item.createdAt}</Text>
        <Badge label={s.label} variant={s.variant} />
      </View>
    </View>
  );
};

export const PaymentsScreen = () => {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');

  const totalCompleted = MOCK_PAYMENTS.filter((p) => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const totalPending = MOCK_PAYMENTS.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);

  const filtered = filter === 'all' ? MOCK_PAYMENTS : MOCK_PAYMENTS.filter((p) => p.status === filter);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Ödemeler</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: '#E8F8F0' }]}>
          <Text style={styles.summaryAmount}>₺{totalCompleted.toLocaleString('tr-TR')}</Text>
          <Text style={[styles.summaryLabel, { color: COLORS.success }]}>Tamamlanan</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#FEF9E7' }]}>
          <Text style={styles.summaryAmount}>₺{totalPending.toLocaleString('tr-TR')}</Text>
          <Text style={[styles.summaryLabel, { color: COLORS.warning }]}>Bekleyen</Text>
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.chipRow}>
        {['all', 'completed', 'pending', 'refunded'].map((f) => {
          const labels: Record<string, string> = { all: 'Tümü', completed: 'Tamamlandı', pending: 'Bekliyor', refunded: 'İade' };
          return (
            <TouchableOpacity
              key={f}
              style={[styles.chip, filter === f && styles.chipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>{labels[f]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PaymentCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  summaryRow: { flexDirection: 'row', gap: SPACING.sm, paddingHorizontal: SPACING.md, marginBottom: SPACING.sm },
  summaryCard: {
    flex: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  summaryAmount: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  summaryLabel: { fontSize: 12, fontWeight: '600', marginTop: 4 },
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
  iconWrapper: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  info: { flex: 1 },
  houseName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  tenant: { fontSize: 12, color: COLORS.textSecondary },
  amount: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  method: { fontSize: 12, color: COLORS.textSecondary },
  date: { fontSize: 12, color: COLORS.textSecondary },
});
