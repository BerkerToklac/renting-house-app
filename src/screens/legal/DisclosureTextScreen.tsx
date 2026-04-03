import React from 'react';
import { LegalScreenBase } from './LegalScreenBase';
import { COLORS } from '../../navigation/theme';

const SECTIONS = [
  {
    title: 'Veri Sorumlusu',
    content:
      'Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla KiraEvim Teknoloji A.Ş. tarafından işlenmektedir. Veri sorumlusuna ait iletişim bilgileri: Maslak Mah. Büyükdere Cad. No:255 Sarıyer/İstanbul, kvkk@kiraevim.com.',
  },
  {
    title: 'İşlenen Kişisel Veriler',
    content:
      'Platform üzerinden şu kişisel verileriniz işlenebilir:\n• Kimlik verileri: Ad, soyad, TC kimlik numarası\n• İletişim verileri: E-posta, telefon, adres\n• Finansal veriler: IBAN, kredi kartı bilgileri (şifreli)\n• İşlem verileri: Rezervasyon ve ödeme geçmişi\n• Teknik veriler: IP adresi, cihaz kimliği, çerezler',
  },
  {
    title: 'İşleme Amaçları ve Hukuki Dayanak',
    content:
      'Kişisel verileriniz şu amaçlarla ve hukuki dayanakla işlenmektedir:\n• Sözleşmenin ifası: Hesap oluşturma, rezervasyon yönetimi\n• Yasal yükümlülük: Vergi ve denetim gereklilikleri\n• Meşru menfaat: Güvenlik, dolandırıcılık önleme\n• Açık rıza: Pazarlama iletişimleri (isteğe bağlı)',
  },
  {
    title: 'Verilerin Aktarılması',
    content:
      'Kişisel verileriniz;\n• Ödeme hizmeti sağlayıcılarına (ödeme işlemi için)\n• Bulut altyapısı sağlayıcılarına (veri depolama için)\n• Resmi makamlarına (yasal zorunluluk halinde)\naktarılabilir. Yurt dışı aktarımlarda KVKK\'nın 9. maddesi uyarınca gerekli güvenceler sağlanmaktadır.',
  },
  {
    title: 'Veri Sahibinin Hakları',
    content:
      'KVKK\'nın 11. maddesi kapsamında haklarınız:\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme\n• İşlenmişse buna ilişkin bilgi talep etme\n• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme\n• Yurt içinde veya yurt dışında üçüncü kişilere aktarıldığı kişileri bilme\n• Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme\n• Kişisel verilerinizin silinmesini veya yok edilmesini isteme',
  },
  {
    title: 'Başvuru Yöntemi',
    content:
      'Haklarınızı kullanmak için; kvkk@kiraevim.com adresine e-posta, Maslak Mah. Büyükdere Cad. No:255 Sarıyer/İstanbul adresine iadeli taahhütlü mektup veya noter aracılığıyla başvurabilirsiniz. Başvurular 30 gün içinde sonuçlandırılır.',
  },
];

export const DisclosureTextScreen = ({ navigation }: any) => {
  return (
    <LegalScreenBase
      title="Aydınlatma Metni"
      icon="eye"
      iconColor={COLORS.success}
      lastUpdated="01 Şubat 2025"
      sections={SECTIONS}
      onBack={navigation?.goBack}
    />
  );
};
