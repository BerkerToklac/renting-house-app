import React from 'react';
import { LegalScreenBase } from './LegalScreenBase';
import { COLORS } from '../../navigation/theme';

const SECTIONS = [
  {
    title: 'Ev Sahibi Olma Koşulları',
    content:
      'Platformda ev sahibi olarak ilan verebilmek için 18 yaşını doldurmuş olmanız, kiralık mülkün yasal mülkiyet veya kullanım hakkına sahip olmanız ve gerekli yasal belgeleri (tapu, sigorta vb.) yüklemeniz gerekmektedir.',
  },
  {
    title: 'İlan Doğruluğu ve Sorumluluk',
    content:
      'Ev sahibi, ilandaki tüm bilgilerin (fotoğraf, açıklama, olanak listesi, fiyat) doğru ve güncel olduğunu taahhüt eder. Yanıltıcı bilgi vermek hesabın askıya alınmasına neden olabilir.',
  },
  {
    title: 'Yasal Belgeler',
    content:
      'Ev sahibi, platformun talep ettiği belgeleri (tapu belgesi, konut sigortası, kimlik belgesi) yüklemekle yükümlüdür. Belgeler platforma yüklendikten sonra 3 iş günü içinde incelenir ve onaylanır.',
  },
  {
    title: 'Fiyatlandırma ve Komisyon',
    content:
      'Ev sahibi, gecelik fiyatı ve minimum kiralama süresi gibi koşulları serbestçe belirler. Platform, tamamlanan her rezervasyondan kiracıdan alınan hizmet bedeli dışında ev sahibinden ek komisyon almaz.',
  },
  {
    title: 'Rezervasyon Yönetimi',
    content:
      'Ev sahibi, gelen rezervasyonları 24 saat içinde onaylamak veya reddetmekle yükümlüdür. Kabul edilen rezervasyonlar bağlayıcıdır; makul bir sebep olmaksızın iptal edilmesi durumunda cezai yaptırım uygulanabilir.',
  },
  {
    title: 'Mülk Standartları',
    content:
      'Kiralanan mülkün temiz, güvenli ve ilanda belirtilen standartları karşılar nitelikte olması zorunludur. Sağlık ve güvenlik açısından uygunsuz bulunan mülk ilanları kaldırılabilir.',
  },
  {
    title: 'Ödeme ve Vergi',
    content:
      'Rezervasyon tutarları, kiracı check-in yaptıktan sonra 24 saat içinde ev sahibinin belirttiği banka hesabına aktarılır. Kira gelirlerinden kaynaklanan vergi yükümlülükleri tamamen ev sahibine aittir.',
  },
];

export const LandlordAgreementScreen = ({ navigation }: any) => {
  return (
    <LegalScreenBase
      title="Ev Sahibi Sözleşmesi"
      icon="home"
      iconColor={COLORS.secondary}
      lastUpdated="15 Ocak 2025"
      sections={SECTIONS}
      onBack={navigation?.goBack}
    />
  );
};
