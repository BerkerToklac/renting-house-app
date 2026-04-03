import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_HOUSES } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { House } from '../../types';
import { Badge } from '../../components/Badge';

const HouseCard = ({ item, onAddListing }: { item: House; onAddListing: () => void }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.images[0] }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <View style={styles.cardHeader}>
        <Text style={styles.houseTitle} numberOfLines={1}>{item.title}</Text>
        <Badge label={item.isAvailable ? 'Müsait' : 'Dolu'} variant={item.isAvailable ? 'success' : 'error'} />
      </View>
      <Text style={styles.address} numberOfLines={1}>{item.address}, {item.city}</Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Ionicons name="bed-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.statText}>{item.bedrooms} Yatak</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="water-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.statText}>{item.bathrooms} Banyo</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="people-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.statText}>{item.maxGuests} Kişi</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="star" size={14} color="#FFB400" />
          <Text style={styles.statText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>₺{item.pricePerNight}<Text style={styles.perNight}>/gece</Text></Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil-outline" size={16} color={COLORS.info} />
            <Text style={styles.editText}>Düzenle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export const MyListingsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const myHouses = MOCK_HOUSES.filter((h) => h.landlordId === user?.id);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>İlanlarım</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddListing')}
        >
          <Ionicons name="add" size={22} color={COLORS.white} />
          <Text style={styles.addButtonText}>İlan Ekle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={myHouses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HouseCard item={item} onAddListing={() => navigation.navigate('AddListing')} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="home-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyTitle}>Henüz ilanınız yok</Text>
            <Text style={styles.emptySubtitle}>İlk ilanınızı ekleyin</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('AddListing')}
            >
              <Text style={styles.emptyButtonText}>İlan Ekle</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    gap: 4,
  },
  addButtonText: { color: COLORS.white, fontSize: 14, fontWeight: '600' },
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
  image: { width: '100%', height: 180 },
  cardBody: { padding: SPACING.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  houseTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, flex: 1, marginRight: SPACING.sm },
  address: { fontSize: 13, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  statsRow: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.sm },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 12, color: COLORS.textSecondary },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  perNight: { fontSize: 13, fontWeight: '400', color: COLORS.textSecondary },
  actions: { flexDirection: 'row', gap: SPACING.sm },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FB',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  editText: { fontSize: 13, color: COLORS.info, fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 60, gap: SPACING.sm },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  emptySubtitle: { fontSize: 14, color: COLORS.textSecondary },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    marginTop: SPACING.sm,
  },
  emptyButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '600' },
});
