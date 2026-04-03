import React from 'react';
import { LegalScreenBase } from './LegalScreenBase';
import { COLORS } from '../../navigation/theme';

const SECTIONS = [
  {
    title: 'Toplanan Veriler',
    content:
      'Platformumuzu kullanırken ad-soyad, e-posta, telefon numarası, ödeme bilgileri, konum verisi ve cihaz bilgileri gibi kişisel verilerinizi işleyebiliriz. Bu veriler, hizmet sunumu, güvenlik ve yasal yükümlülükler için toplanır.',
  },
  {
    title: 'Verilerin Kullanım Amacı',
    content:
      'Kişisel verileriniz; hesap yönetimi, rezervasyon süreçleri, ödeme işlemleri, müşteri desteği, güvenlik kontrolleri ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.',
  },
  {
    title: 'Üçüncü Taraflarla Paylaşım',
    content:
      'Kişisel verileriniz, rezervasyon onayı sürecinde ev sahipleri ile sınırlı ölçüde paylaşılabilir. Ödeme bilgileriniz yalnızca PCI DSS uyumlu ödeme altyapımızla paylaşılır. Verileriniz hiçbir koşulda reklam amaçlı üçüncü taraflara satılmaz.',
  },
  {
    title: 'Veri Güvenliği',
    content:
      'Kişisel verilerinizi korumak için SSL/TLS şifreleme, güvenli veri depolama ve erişim kontrolü gibi teknik önlemler uygulamaktayız. Veri ihlali durumunda yasal süre içinde bilgilendirme yapılır.',
  },
  {
    title: 'Çerezler (Cookies)',
    content:
      'Platformumuz, oturum yönetimi ve kullanıcı deneyimini geliştirmek amacıyla çerezler kullanır. Tarayıcı ayarlarından çerezleri devre dışı bırakabilirsiniz; ancak bu bazı işlevlerin çalışmamasına neden olabilir.',
  },
  {
    title: 'Haklarınız',
    content:
      'KVKK kapsamında; verilerinize erişme, düzeltme, silme, işlemenin kısıtlanması ve itiraz etme haklarına sahipsiniz. Bu haklarınızı kullanmak için kvkk@kiraevim.com adresine başvurabilirsiniz.',
  },
  {
    title: 'Veri Saklama Süresi',
    content:
      'Kişisel verileriniz, hesabınız aktif olduğu sürece ve yasal yükümlülükler çerçevesinde saklanır. Hesabınızı kapattığınızda, yasal saklama süresi dolan veriler silinir.',
  },
];

export const PrivacyPolicyScreen = ({ navigation }: any) => {
  return (
    <LegalScreenBase
      title="Gizlilik Politikası"
      icon="lock-closed"
      iconColor="#9B59B6"
      lastUpdated="01 Şubat 2025"
      sections={SECTIONS}
      onBack={navigation?.goBack}
    />
  );
};
