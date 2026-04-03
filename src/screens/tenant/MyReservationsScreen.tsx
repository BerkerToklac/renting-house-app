import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

const ReservationCard = ({ item }: { item: Reservation }) => {
  const s = STATUS_MAP[item.status];
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.houseImage }} style={styles.image} resizeMode="cover" />
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.houseName} numberOfLines={1}>{item.houseName}</Text>
          <Badge label={s.label} variant={s.variant} />
        </View>
        <Text style={styles.city}><Ionicons name="location-outline" size={12} /> {item.houseCity}</Text>

        <View style={styles.datesRow}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Giriş</Text>
            <Text style={styles.dateValue}>{item.checkIn}</Text>
          </View>
          <View style={styles.arrowWrapper}>
            <Ionicons name="arrow-forward" size={16} color={COLORS.textSecondary} />
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Çıkış</Text>
            <Text style={styles.dateValue}>{item.checkOut}</Text>
          </View>
          <View style={styles.nightsBox}>
            <Text style={styles.nights}>{item.nightCount}G</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.guestInfo}>
            <Ionicons name="people-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.guestText}>{item.guests} misafir</Text>
          </View>
          <Text style={styles.total}>₺{item.totalPrice.toLocaleString('tr-TR')}</Text>
        </View>

        {item.status === 'confirmed' && (
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble-outline" size={14} color={COLORS.info} />
              <Text style={[styles.actionText, { color: COLORS.info }]}>Ev Sahibiyle İletişim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.cancelBtn]}>
              <Ionicons name="close-circle-outline" size={14} color={COLORS.error} />
              <Text style={[styles.actionText, { color: COLORS.error }]}>İptal Et</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export const MyReservationsScreen = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const myReservations = MOCK_RESERVATIONS.filter((r) => r.tenantId === user?.id);
  const upcoming = myReservations.filter((r) => r.status === 'confirmed' || r.status === 'pending');
  const past = myReservations.filter((r) => r.status === 'completed' || r.status === 'cancelled');

  const data = tab === 'upcoming' ? upcoming : past;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Rezervasyonlarım</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'upcoming' && styles.tabActive]}
          onPress={() => setTab('upcoming')}
        >
          <Text style={[styles.tabText, tab === 'upcoming' && styles.tabTextActive]}>
            Yaklaşan ({upcoming.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'past' && styles.tabActive]}
          onPress={() => setTab('past')}
        >
          <Text style={[styles.tabText, tab === 'past' && styles.tabTextActive]}>
            Geçmiş ({past.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReservationCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="bookmark-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyTitle}>
              {tab === 'upcoming' ? 'Yaklaşan rezervasyon yok' : 'Geçmiş rezervasyon yok'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {tab === 'upcoming' ? 'Hemen bir ev kirala!' : 'Tamamlanan rezervasyonlar burada görünür'}
            </Text>
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
  tabs: { flexDirection: 'row', paddingHorizontal: SPACING.md, marginBottom: SPACING.sm, gap: SPACING.sm },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },
  list: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: { width: '100%', height: 140 },
  cardBody: { padding: SPACING.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  houseName: { fontSize: 16, fontWeight: '700', color: COLORS.text, flex: 1, marginRight: SPACING.sm },
  city: { fontSize: 12, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  datesRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  dateBox: {},
  dateLabel: { fontSize: 11, color: COLORS.textSecondary },
  dateValue: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  arrowWrapper: { flex: 1, alignItems: 'center' },
  nightsBox: { backgroundColor: COLORS.surface, borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 4 },
  nights: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  guestInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  guestText: { fontSize: 13, color: COLORS.textSecondary },
  total: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: '#EBF5FB',
    gap: 4,
  },
  cancelBtn: { backgroundColor: '#FDEDEC' },
  actionText: { fontSize: 12, fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 60, gap: SPACING.sm },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  emptySubtitle: { fontSize: 14, color: COLORS.textSecondary },
});
