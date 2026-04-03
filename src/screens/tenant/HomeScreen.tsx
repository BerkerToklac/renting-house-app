import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_HOUSES } from '../../data/mockData';
import { House } from '../../types';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = ['Tümü', 'Daire', 'Ev', 'Villa', 'Stüdyo'];
const CAT_MAP: Record<string, string> = { Tümü: 'all', Daire: 'apartment', Ev: 'house', Villa: 'villa', Stüdyo: 'studio' };

const HouseCard = ({ item, onPress }: { item: House; onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item.images[0] }} style={styles.image} resizeMode="cover" />
      {!item.isAvailable && (
        <View style={styles.unavailableOverlay}>
          <Text style={styles.unavailableText}>Müsait Değil</Text>
        </View>
      )}
      <TouchableOpacity style={styles.heartBtn}>
        <Ionicons name="heart-outline" size={22} color={COLORS.white} />
      </TouchableOpacity>
    </View>
    <View style={styles.cardBody}>
      <View style={styles.cardRow}>
        <Text style={styles.city}>{item.city}, {item.country}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={13} color="#FFB400" />
          <Text style={styles.rating}>{item.rating} ({item.reviewCount})</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <View style={styles.amenitiesPreview}>
        <Text style={styles.amenity}>{item.bedrooms} oda</Text>
        <Text style={styles.dot}>·</Text>
        <Text style={styles.amenity}>{item.maxGuests} kişi</Text>
        <Text style={styles.dot}>·</Text>
        <Text style={styles.amenity}>{item.type === 'apartment' ? 'Daire' : item.type === 'house' ? 'Ev' : item.type === 'villa' ? 'Villa' : 'Stüdyo'}</Text>
      </View>
      <Text style={styles.price}>
        <Text style={styles.priceValue}>₺{item.pricePerNight}</Text>
        <Text style={styles.perNight}> /gece</Text>
      </Text>
    </View>
  </TouchableOpacity>
);

export const HomeScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tümü');

  const filtered = MOCK_HOUSES.filter((h) => {
    const matchSearch =
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase());
    const matchCat = CAT_MAP[category] === 'all' || h.type === CAT_MAP[category];
    return matchSearch && matchCat;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Merhaba, {user?.name?.split(' ')[0]} 👋</Text>
          <Text style={styles.subtitle}>Nereye gitmek istersin?</Text>
        </View>
        <View style={styles.logoCircle}>
          <Ionicons name="home" size={20} color={COLORS.white} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Şehir, konum veya ilan ara..."
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{filtered.length} ilan bulundu</Text>
      </View>

      {/* House List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HouseCard
            item={item}
            onPress={() => navigation.navigate('HouseDetail', { houseId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="home-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyTitle}>İlan bulunamadı</Text>
            <Text style={styles.emptySubtitle}>Farklı bir arama deneyin</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  greeting: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  logoCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 15 },
  categoryScroll: { marginTop: SPACING.sm },
  categoryContent: { paddingHorizontal: SPACING.md, gap: SPACING.xs },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  categoryChipActive: { backgroundColor: COLORS.text, borderColor: COLORS.text },
  categoryText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  categoryTextActive: { color: COLORS.white },
  resultsHeader: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  resultsCount: { fontSize: 13, color: COLORS.textSecondary },
  list: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  card: {
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 220 },
  unavailableOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  heartBtn: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: { padding: SPACING.md },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  city: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  amenitiesPreview: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  amenity: { fontSize: 13, color: COLORS.textSecondary },
  dot: { color: COLORS.textSecondary },
  price: {},
  priceValue: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  perNight: { fontSize: 13, color: COLORS.textSecondary },
  empty: { alignItems: 'center', paddingVertical: 60, gap: SPACING.sm },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  emptySubtitle: { fontSize: 14, color: COLORS.textSecondary },
});
