import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LegalScreenBase } from './LegalScreenBase';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';

const SECTIONS = [
  {
    title: 'Kiracı İptal Politikası',
    content:
      'Kiracı, onaylanmış rezervasyonunu aşağıdaki koşullarla iptal edebilir:\n\n• Check-in\'den 7 gün veya daha önce: %80 iade (hizmet bedeli iade edilmez)\n• Check-in\'den 3–7 gün önce: %50 iade\n• Check-in\'den 3 günden kısa süre önce veya sonra: İade yapılmaz\n\nİptal talebi platform üzerinden yapılmalıdır.',
  },
  {
    title: 'Ev Sahibi İptal Politikası',
    content:
      'Ev sahibi onayladığı bir rezervasyonu iptal ederse:\n\n• Kiracıya tam iade yapılır (hizmet bedeli dahil)\n• Ev sahibinin profil puanı düşebilir\n• Tekrarlayan iptallerde hesap askıya alınabilir\n• Acil durumlar (yangın, su baskını vb.) belgelenmesi koşuluyla cezasız iptal kapsamında değerlendirilebilir.',
  },
  {
    title: 'Mücbir Sebep',
    content:
      'Doğal afet, salgın hastalık, savaş veya resmi makam kararı gibi mücbir sebep durumlarında her iki taraf için de ücretsiz iptal hakkı tanınabilir. Platform, mücbir sebep tespitini resmi kaynaklara dayandırarak yapacaktır.',
  },
  {
    title: 'İade Süreci',
    content:
      'Onaylanan iade talepleri 5–10 iş günü içinde işleme alınır. İade, ödemenin yapıldığı orijinal ödeme yöntemine gerçekleştirilir. Banka transferleri ek 2–3 iş günü sürebilir. Kredi kartı iadelerinde bankanın hesap döngüsüne göre gecikme yaşanabilir.',
  },
  {
    title: 'İptal Talebi Nasıl Yapılır?',
    content:
      'İptal talebini yapmak için:\n1. Uygulamada "Rezervasyonlarım" bölümüne gidin\n2. İptal etmek istediğiniz rezervasyonu seçin\n3. "İptal Et" butonuna basın\n4. İptal gerekçesini belirtin\n5. Onay e-postasını bekleyin\n\nSorun yaşamanız durumunda destek@kiraevim.com\'a başvurun.',
  },
  {
    title: 'Uyuşmazlık Süreci',
    content:
      'İptal veya iade konusundaki uyuşmazlıklarda önce platform destek ekibine başvurun. Destek ekibi 48 saat içinde dönüş yapar. Çözüm sağlanamazsa tüketici hakem heyetine veya mahkemeye başvurabilirsiniz. Tüm kayıt ve iletişim belgelerinizi saklayın.',
  },
];

export const CancellationPolicyScreen = ({ navigation }: any) => {
  return (
    <LegalScreenBase
      title="İptal & İade Kuralları"
      icon="return-down-back"
      iconColor={COLORS.error}
      lastUpdated="15 Ocak 2025"
      sections={SECTIONS}
      onBack={navigation?.goBack}
    />
  );
};
