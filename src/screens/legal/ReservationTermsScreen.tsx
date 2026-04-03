import React from 'react';
import { LegalScreenBase } from './LegalScreenBase';
import { COLORS } from '../../navigation/theme';

const SECTIONS = [
  {
    title: 'Rezervasyon Süreci',
    content:
      'Rezervasyon talebi, kiracının platformda seçtiği tarihler, misafir sayısı ve ödeme bilgileriyle talep formunu doldurması ve onaylamasıyla başlar. Ev sahibinin talebi onaylamasıyla rezervasyon kesinleşir. Onay gelmeden rezervasyon tamamlanmış sayılmaz.',
  },
  {
    title: 'Ödeme Koşulları',
    content:
      'Rezervasyon tutarının tamamı, talep oluşturulduğu anda tahsil edilir. Ödeme başarısız olması halinde rezervasyon iptal edilir. Kabul edilen ödeme yöntemleri: kredi kartı, banka kartı ve banka transferidir.',
  },
  {
    title: 'Check-in ve Check-out',
    content:
      'Standart check-in saati 14:00, check-out saati 12:00\'dir. Farklı saatler ev sahibiyle önceden mutabık kalınarak belirlenebilir. Geç check-out durumunda ev sahibi ek ücret talep etme hakkına sahiptir.',
  },
  {
    title: 'Misafir Sayısı ve Kurallar',
    content:
      'İlanda belirtilen maksimum misafir sayısı aşılamaz. Ev, yalnızca rezervasyonda belirtilen kişiler tarafından kullanılabilir. Evcil hayvan, sigara ve parti gibi konularda ilanın özel kuralları geçerlidir.',
  },
  {
    title: 'Hasar ve Sorumluluk',
    content:
      'Kiracı, konaklama süresince mülkte oluşan hasarları karşılamakla yükümlüdür. Hasar tutarı, onaylanan güvence depozitosundan mahsup edilebilir. Anlaşmazlık durumunda platform devreye girerek arabuluculuk yapar.',
  },
  {
    title: 'İptal Koşulları',
    content:
      'Kiracı tarafından iptal: Check-in\'den 7 gün veya daha önce yapılan iptallerde %80 iade yapılır; 7 günden kısa sürede yapılan iptallerde iade yapılmaz. Ev sahibi tarafından iptal: Tam iade yapılır ve ev sahibine cezai yaptırım uygulanabilir.',
  },
  {
    title: 'Anlaşmazlık Çözümü',
    content:
      'Ev sahibi ve kiracı arasındaki anlaşmazlıklarda önce platform destek ekibi devreye girer. Çözüme kavuşturulamazsa ihtiyari arabuluculuk ve ardından İstanbul Mahkemeleri yetkilidir.',
  },
];

export const ReservationTermsScreen = ({ navigation }: any) => {
  return (
    <LegalScreenBase
      title="Rezervasyon Şartları"
      icon="receipt"
      iconColor={COLORS.warning}
      lastUpdated="15 Ocak 2025"
      sections={SECTIONS}
      onBack={navigation?.goBack}
    />
  );
};
