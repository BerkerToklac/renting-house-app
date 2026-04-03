import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_HOUSES } from '../../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AMENITY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  WiFi: 'wifi',
  Klima: 'snow',
  Mutfak: 'restaurant',
  Havuz: 'water',
  Otopark: 'car',
  TV: 'tv',
  Balkon: 'home',
  Bahçe: 'leaf',
  Barbekü: 'flame',
  Sauna: 'thermometer',
  Jakuzi: 'water',
  'Çamaşır Makinesi': 'water-outline',
  'Deniz Manzarası': 'eye',
  'Kahvaltı Dahil': 'cafe',
};

export const HouseDetailScreen = ({ route, navigation }: any) => {
  const { houseId } = route.params;
  const insets = useSafeAreaInsets();
  const house = MOCK_HOUSES.find((h) => h.id === houseId);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!house) {
    return (
      <View style={styles.notFound}>
        <Text>İlan bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.galleryWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setActiveImage(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH))
            }
          >
            {house.images.map((img, i) => (
              <Image key={i} source={{ uri: img }} style={styles.image} resizeMode="cover" />
            ))}
          </ScrollView>

          {/* Back button */}
          <TouchableOpacity
            style={[styles.floatBtn, { top: insets.top + SPACING.sm, left: SPACING.md }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.text} />
          </TouchableOpacity>

          {/* Save button */}
          <TouchableOpacity
            style={[styles.floatBtn, { top: insets.top + SPACING.sm, right: SPACING.md }]}
            onPress={() => setSaved(!saved)}
          >
            <Ionicons name={saved ? 'heart' : 'heart-outline'} size={22} color={saved ? COLORS.primary : COLORS.text} />
          </TouchableOpacity>

          {/* Pagination */}
          <View style={styles.pagination}>
            {house.images.map((_, i) => (
              <View key={i} style={[styles.pageDot, activeImage === i && styles.pageDotActive]} />
            ))}
          </View>

          {/* Not Available Overlay */}
          {!house.isAvailable && (
            <View style={styles.notAvailableOverlay}>
              <Text style={styles.notAvailableText}>Şu an müsait değil</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Rating */}
          <Text style={styles.title}>{house.title}</Text>
          <View style={styles.row}>
            <Text style={styles.location}>
              <Ionicons name="location-outline" size={14} /> {house.city}, {house.country}
            </Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFB400" />
              <Text style={styles.rating}>{house.rating} · {house.reviewCount} değerlendirme</Text>
            </View>
          </View>

          {/* Host */}
          <View style={styles.hostCard}>
            <View style={styles.hostAvatar}>
              <Text style={styles.hostAvatarText}>{house.landlordName[0]}</Text>
            </View>
            <View>
              <Text style={styles.hostedBy}>Ev sahibi: {house.landlordName}</Text>
              <Text style={styles.superhost}>Süper Ev Sahibi</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Key Stats */}
          <View style={styles.statsRow}>
            {[
              { icon: 'people-outline', label: `${house.maxGuests} misafir` },
              { icon: 'bed-outline', label: `${house.bedrooms} yatak odası` },
              { icon: 'water-outline', label: `${house.bathrooms} banyo` },
            ].map((s) => (
              <View key={s.label} style={styles.stat}>
                <Ionicons name={s.icon as any} size={22} color={COLORS.text} />
                <Text style={styles.statText}>{s.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Hakkında</Text>
          <Text style={styles.description}>{house.description}</Text>

          <View style={styles.divider} />

          {/* Amenities */}
          <Text style={styles.sectionTitle}>Olanaklar</Text>
          <View style={styles.amenitiesGrid}>
            {house.amenities.map((a) => (
              <View key={a} style={styles.amenityItem}>
                <Ionicons name={AMENITY_ICONS[a] ?? 'checkmark-circle-outline'} size={20} color={COLORS.text} />
                <Text style={styles.amenityLabel}>{a}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Location */}
          <Text style={styles.sectionTitle}>Konum</Text>
          <View style={styles.locationBox}>
            <Ionicons name="location" size={18} color={COLORS.primary} />
            <Text style={styles.locationText}>{house.address}, {house.city}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + SPACING.sm }]}>
        <View>
          <Text style={styles.bottomPrice}>₺{house.pricePerNight}<Text style={styles.bottomPerNight}> /gece</Text></Text>
        </View>
        <TouchableOpacity
          style={[styles.bookBtn, !house.isAvailable && styles.bookBtnDisabled]}
          disabled={!house.isAvailable}
          onPress={() => navigation.navigate('Booking', { houseId: house.id })}
        >
          <Text style={styles.bookBtnText}>
            {house.isAvailable ? 'Rezervasyon Yap' : 'Müsait Değil'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  galleryWrapper: { position: 'relative' },
  image: { width: SCREEN_WIDTH, height: 300 },
  floatBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  pagination: { position: 'absolute', bottom: SPACING.sm, alignSelf: 'center', flexDirection: 'row', gap: 6 },
  pageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.6)' },
  pageDotActive: { backgroundColor: COLORS.white, width: 18 },
  notAvailableOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAvailableText: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  content: { padding: SPACING.md },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.xs },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  location: { fontSize: 13, color: COLORS.textSecondary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  hostCard: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  hostAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  hostAvatarText: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  hostedBy: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  superhost: { fontSize: 12, color: COLORS.secondary },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.md },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center', gap: 6 },
  statText: { fontSize: 12, color: COLORS.textSecondary, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  description: { fontSize: 15, color: COLORS.textSecondary, lineHeight: 24 },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  amenityItem: { flexDirection: 'row', alignItems: 'center', width: '45%', gap: SPACING.sm },
  amenityLabel: { fontSize: 14, color: COLORS.text },
  locationBox: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: COLORS.surface, borderRadius: RADIUS.md, padding: SPACING.md },
  locationText: { fontSize: 14, color: COLORS.textSecondary, flex: 1 },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  bottomPrice: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  bottomPerNight: { fontSize: 14, fontWeight: '400', color: COLORS.textSecondary },
  bookBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderRadius: RADIUS.md },
  bookBtnDisabled: { backgroundColor: COLORS.textSecondary },
  bookBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
