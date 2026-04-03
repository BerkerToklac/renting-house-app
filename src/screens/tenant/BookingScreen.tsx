import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_HOUSES, MOCK_RESERVATIONS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Reservation } from '../../types';

const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const displayDate = (dateStr: string) => {
  if (!dateStr) return 'Seçiniz';
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const BookingScreen = ({ route, navigation }: any) => {
  const { houseId } = route.params;
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const house = MOCK_HOUSES.find((h) => h.id === houseId);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 4);

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [step, setStep] = useState<'details' | 'payment' | 'confirm'>('details');

  if (!house) return null;

  const nightCount = Math.max(1, Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  ));
  const subtotal = house.pricePerNight * nightCount;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleBook = () => {
    if (!user) return;

    const newRes: Reservation = {
      id: `res_${Date.now()}`,
      houseId: house.id,
      houseName: house.title,
      houseCity: house.city,
      houseImage: house.images[0],
      tenantId: user.id,
      tenantName: user.name,
      tenantEmail: user.email,
      landlordId: house.landlordId,
      landlordName: house.landlordName,
      checkIn,
      checkOut,
      guests,
      nightCount,
      pricePerNight: house.pricePerNight,
      totalPrice: total,
      serviceFee,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: formatDate(new Date()),
    };

    MOCK_RESERVATIONS.push(newRes);

    Alert.alert(
      'Rezervasyon Alındı!',
      'Rezervasyonunuz başarıyla oluşturuldu. Ev sahibi onayından sonra bilgilendirileceksiniz.',
      [{ text: 'Tamam', onPress: () => navigation.navigate('Home') }]
    );
  };

  const PriceRow = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
    <View style={styles.priceRow}>
      <Text style={[styles.priceLabel, bold && styles.priceLabelBold]}>{label}</Text>
      <Text style={[styles.priceValue, bold && styles.priceValueBold]}>{value}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rezervasyon Yap</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* House Summary */}
        <View style={styles.houseSummary}>
          <View style={styles.houseIcon}>
            <Ionicons name="home" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.houseInfo}>
            <Text style={styles.houseName} numberOfLines={1}>{house.title}</Text>
            <Text style={styles.houseCity}>{house.city} · ₺{house.pricePerNight}/gece</Text>
          </View>
        </View>

        {/* Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarihler</Text>
          <View style={styles.datesRow}>
            <View style={styles.dateCard}>
              <Text style={styles.dateLabel}>Giriş</Text>
              <Text style={styles.dateValue}>{displayDate(checkIn)}</Text>
              <TouchableOpacity
                style={styles.changeDateBtn}
                onPress={() => {
                  const d = new Date(checkIn);
                  d.setDate(d.getDate() + 1);
                  if (d < new Date(checkOut)) setCheckIn(formatDate(d));
                }}
              >
                <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <Ionicons name="arrow-forward" size={20} color={COLORS.textSecondary} />
            <View style={styles.dateCard}>
              <Text style={styles.dateLabel}>Çıkış</Text>
              <Text style={styles.dateValue}>{displayDate(checkOut)}</Text>
              <TouchableOpacity
                style={styles.changeDateBtn}
                onPress={() => {
                  const d = new Date(checkOut);
                  d.setDate(d.getDate() + 1);
                  setCheckOut(formatDate(d));
                }}
              >
                <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.nightsInfo}>{nightCount} gece</Text>
        </View>

        {/* Guests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Misafir Sayısı</Text>
          <View style={styles.guestRow}>
            <Text style={styles.guestLabel}>Misafir (maks. {house.maxGuests})</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setGuests(Math.max(1, guests - 1))}
              >
                <Ionicons name="remove" size={18} color={guests > 1 ? COLORS.text : COLORS.border} />
              </TouchableOpacity>
              <Text style={styles.counterVal}>{guests}</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setGuests(Math.min(house.maxGuests, guests + 1))}
              >
                <Ionicons name="add" size={18} color={guests < house.maxGuests ? COLORS.text : COLORS.border} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Special Note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Özel Not (isteğe bağlı)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Ev sahibine iletmek istediğiniz notlar..."
            placeholderTextColor={COLORS.textSecondary}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ödeme Yöntemi</Text>
          <View style={styles.paymentOptions}>
            {[
              { key: 'credit_card', label: 'Kredi Kartı', icon: 'card' },
              { key: 'bank_transfer', label: 'Banka Transferi', icon: 'business' },
            ].map((p) => (
              <TouchableOpacity
                key={p.key}
                style={[styles.paymentOption, paymentMethod === p.key && styles.paymentOptionActive]}
                onPress={() => setPaymentMethod(p.key)}
              >
                <Ionicons name={p.icon as any} size={22} color={paymentMethod === p.key ? COLORS.primary : COLORS.textSecondary} />
                <Text style={[styles.paymentLabel, paymentMethod === p.key && styles.paymentLabelActive]}>{p.label}</Text>
                {paymentMethod === p.key && <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fiyat Özeti</Text>
          <View style={styles.priceSummaryCard}>
            <PriceRow label={`₺${house.pricePerNight} × ${nightCount} gece`} value={`₺${subtotal.toLocaleString('tr-TR')}`} />
            <PriceRow label="Hizmet bedeli (%10)" value={`₺${serviceFee.toLocaleString('tr-TR')}`} />
            <View style={styles.divider} />
            <PriceRow label="Toplam" value={`₺${total.toLocaleString('tr-TR')}`} bold />
          </View>
        </View>

        {/* Terms */}
        <Text style={styles.termsText}>
          "Rezervasyonu Onayla" butonuna tıklayarak{' '}
          <Text style={styles.termsLink}>Rezervasyon Şartları</Text>
          {' '}ve{' '}
          <Text style={styles.termsLink}>İptal & İade Kuralları</Text>
          'nı kabul etmiş olursunuz.
        </Text>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.white} />
          <Text style={styles.bookButtonText}>Rezervasyonu Onayla · ₺{total.toLocaleString('tr-TR')}</Text>
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
  houseSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  houseIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF5F5', justifyContent: 'center', alignItems: 'center' },
  houseInfo: { flex: 1 },
  houseName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  houseCity: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  section: { marginBottom: SPACING.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  datesRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  dateCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  dateLabel: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '600', marginBottom: 4 },
  dateValue: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  changeDateBtn: { alignSelf: 'flex-end', marginTop: 4 },
  nightsInfo: { fontSize: 13, color: COLORS.textSecondary, marginTop: SPACING.xs, textAlign: 'center' },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  guestLabel: { fontSize: 14, color: COLORS.text },
  counter: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterVal: { fontSize: 18, fontWeight: '700', color: COLORS.text, minWidth: 28, textAlign: 'center' },
  noteInput: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
    color: COLORS.text,
    fontSize: 14,
    minHeight: 80,
  },
  paymentOptions: { gap: SPACING.xs },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  paymentOptionActive: { borderColor: COLORS.primary, backgroundColor: '#FFF5F5' },
  paymentLabel: { flex: 1, fontSize: 14, color: COLORS.textSecondary, fontWeight: '500' },
  paymentLabelActive: { color: COLORS.primary, fontWeight: '600' },
  priceSummaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.sm },
  priceLabel: { fontSize: 14, color: COLORS.textSecondary },
  priceLabelBold: { color: COLORS.text, fontWeight: '700', fontSize: 16 },
  priceValue: { fontSize: 14, color: COLORS.textSecondary },
  priceValueBold: { color: COLORS.text, fontWeight: '800', fontSize: 18 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.xs },
  termsText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  termsLink: { color: COLORS.primary, fontWeight: '600' },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 56,
    gap: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: { color: COLORS.white, fontSize: 17, fontWeight: '700' },
});
