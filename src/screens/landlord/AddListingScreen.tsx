import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';

const AMENITY_LIST = [
  'WiFi', 'Klima', 'Isıtma', 'Mutfak', 'Çamaşır Makinesi', 'TV', 'Balkon',
  'Bahçe', 'Otopark', 'Havuz', 'Barbekü', 'Jakuzi', 'Sauna', 'Deniz Manzarası',
  'Kahvaltı Dahil', 'Evcil Hayvan Kabul',
];

const HOUSE_TYPES = [
  { key: 'apartment', label: 'Daire', icon: 'business' },
  { key: 'house', label: 'Ev', icon: 'home' },
  { key: 'villa', label: 'Villa', icon: 'sunny' },
  { key: 'studio', label: 'Stüdyo', icon: 'bed' },
];

export const AddListingScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [maxGuests, setMaxGuests] = useState('2');
  const [bedrooms, setBedrooms] = useState('1');
  const [bathrooms, setBathrooms] = useState('1');
  const [houseType, setHouseType] = useState('apartment');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const toggleAmenity = (a: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const handleSubmit = () => {
    if (!title || !description || !address || !city || !price) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    Alert.alert('Başarılı', 'İlanınız başarıyla oluşturuldu!', [
      { text: 'Tamam', onPress: () => navigation.goBack() },
    ]);
  };

  const Field = ({ label, required }: { label: string; required?: boolean }) => (
    <Text style={styles.label}>
      {label}
      {required && <Text style={{ color: COLORS.error }}> *</Text>}
    </Text>
  );

  const Counter = ({
    value,
    onInc,
    onDec,
    label,
  }: {
    value: string;
    onInc: () => void;
    onDec: () => void;
    label: string;
  }) => (
    <View style={styles.counterRow}>
      <Text style={styles.counterLabel}>{label}</Text>
      <View style={styles.counter}>
        <TouchableOpacity style={styles.counterBtn} onPress={onDec}>
          <Ionicons name="remove" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>
        <TouchableOpacity style={styles.counterBtn} onPress={onInc}>
          <Ionicons name="add" size={18} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yeni İlan</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* House Type */}
        <Text style={styles.sectionTitle}>Mülk Türü</Text>
        <View style={styles.typeRow}>
          {HOUSE_TYPES.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.typeCard, houseType === t.key && styles.typeCardActive]}
              onPress={() => setHouseType(t.key)}
            >
              <Ionicons name={t.icon as any} size={24} color={houseType === t.key ? COLORS.primary : COLORS.textSecondary} />
              <Text style={[styles.typeLabel, houseType === t.key && styles.typeLabelActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Basic Info */}
        <Text style={styles.sectionTitle}>Temel Bilgiler</Text>
        <Field label="İlan Başlığı" required />
        <TextInput
          style={styles.input}
          placeholder="örn: Boğaz Manzaralı Lüks Daire"
          placeholderTextColor={COLORS.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        <Field label="Açıklama" required />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Evinizi detaylı olarak tanıtın..."
          placeholderTextColor={COLORS.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        {/* Location */}
        <Text style={styles.sectionTitle}>Konum</Text>
        <Field label="Adres" required />
        <TextInput
          style={styles.input}
          placeholder="Mahalle, Sokak, No"
          placeholderTextColor={COLORS.textSecondary}
          value={address}
          onChangeText={setAddress}
        />

        <Field label="Şehir" required />
        <TextInput
          style={styles.input}
          placeholder="İstanbul"
          placeholderTextColor={COLORS.textSecondary}
          value={city}
          onChangeText={setCity}
        />

        {/* Pricing */}
        <Text style={styles.sectionTitle}>Fiyatlandırma</Text>
        <Field label="Gecelik Fiyat (₺)" required />
        <View style={styles.priceInput}>
          <Text style={styles.priceSymbol}>₺</Text>
          <TextInput
            style={styles.priceFill}
            placeholder="0"
            placeholderTextColor={COLORS.textSecondary}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <Text style={styles.priceUnit}>/gece</Text>
        </View>

        {/* Counters */}
        <Text style={styles.sectionTitle}>Kapasite</Text>
        <View style={styles.countersCard}>
          <Counter
            label="Misafir Sayısı"
            value={maxGuests}
            onInc={() => setMaxGuests(String(Math.min(20, +maxGuests + 1)))}
            onDec={() => setMaxGuests(String(Math.max(1, +maxGuests - 1)))}
          />
          <View style={styles.divider} />
          <Counter
            label="Yatak Odası"
            value={bedrooms}
            onInc={() => setBedrooms(String(Math.min(10, +bedrooms + 1)))}
            onDec={() => setBedrooms(String(Math.max(0, +bedrooms - 1)))}
          />
          <View style={styles.divider} />
          <Counter
            label="Banyo"
            value={bathrooms}
            onInc={() => setBathrooms(String(Math.min(10, +bathrooms + 1)))}
            onDec={() => setBathrooms(String(Math.max(1, +bathrooms - 1)))}
          />
        </View>

        {/* Amenities */}
        <Text style={styles.sectionTitle}>Olanaklar</Text>
        <View style={styles.amenitiesGrid}>
          {AMENITY_LIST.map((a) => {
            const selected = selectedAmenities.includes(a);
            return (
              <TouchableOpacity
                key={a}
                style={[styles.amenityChip, selected && styles.amenityChipActive]}
                onPress={() => toggleAmenity(a)}
              >
                {selected && <Ionicons name="checkmark" size={14} color={COLORS.primary} />}
                <Text style={[styles.amenityText, selected && styles.amenityTextActive]}>{a}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Availability */}
        <Text style={styles.sectionTitle}>Yayın Durumu</Text>
        <View style={styles.availableRow}>
          <View>
            <Text style={styles.availableLabel}>İlanı Yayınla</Text>
            <Text style={styles.availableDesc}>İlanınız hemen yayına alınır</Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="add-circle-outline" size={20} color={COLORS.white} />
          <Text style={styles.submitButtonText}>İlanı Oluştur</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { padding: SPACING.xs },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600', color: COLORS.text },
  content: { padding: SPACING.md, paddingBottom: SPACING.xxl },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm, marginTop: SPACING.md },
  typeRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  typeCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 4,
  },
  typeCardActive: { borderColor: COLORS.primary, backgroundColor: '#FFF5F5' },
  typeLabel: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  typeLabelActive: { color: COLORS.primary },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.xs },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    color: COLORS.text,
    fontSize: 15,
    marginBottom: SPACING.sm,
  },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  priceSymbol: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginRight: 6 },
  priceFill: { flex: 1, height: 50, color: COLORS.text, fontSize: 18, fontWeight: '600' },
  priceUnit: { fontSize: 14, color: COLORS.textSecondary },
  countersCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  counterLabel: { fontSize: 15, color: COLORS.text },
  counter: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: { fontSize: 16, fontWeight: '600', color: COLORS.text, minWidth: 24, textAlign: 'center' },
  divider: { height: 1, backgroundColor: COLORS.border },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginBottom: SPACING.sm },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    gap: 4,
  },
  amenityChipActive: { borderColor: COLORS.primary, backgroundColor: '#FFF5F5' },
  amenityText: { fontSize: 13, color: COLORS.textSecondary },
  amenityTextActive: { color: COLORS.primary, fontWeight: '600' },
  availableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  availableLabel: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  availableDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 54,
    gap: SPACING.sm,
  },
  submitButtonText: { color: COLORS.white, fontSize: 17, fontWeight: '700' },
});
