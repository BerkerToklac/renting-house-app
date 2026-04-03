import React from 'react';
import { LegalScreenBase } from './LegalScreenBase';
import { COLORS } from '../../navigation/theme';

const SECTIONS = [
  {
    title: 'Şirket Kimliği',
    content:
      'KiraEvim Teknoloji A.Ş. olarak, 2024 yılında İstanbul\'da kurulmuş bir gayrimenkul teknoloji şirketiyiz. Misyonumuz, ev sahiplerini güvenilir kiracılarla buluşturmak ve kira süreçlerini dijitalleştirerek herkes için daha kolay, güvenli ve şeffaf hale getirmektir.',
  },
  {
    title: 'İletişim Bilgileri',
    content:
      'Adres: Maslak Mah. Büyükdere Cad. No:255 Sarıyer/İstanbul\nTelefon: +90 212 555 00 00\nE-posta: info@kiraevim.com\nDestek: destek@kiraevim.com\nÇalışma Saatleri: Pazartesi–Cuma 09:00–18:00',
  },
  {
    title: 'Vergi & Ticaret Sicil',
    content:
      'Vergi Dairesi: Maslak\nVergi Kimlik Numarası: 1234567890\nTicaret Sicil Numarası: 123456-7\nMERSİS Numarası: 0123456789012345\nTicaret Odası: İstanbul Ticaret Odası',
  },
  {
    title: 'Lisanslar & Sertifikalar',
    content:
      'KiraEvim, Bilgi Teknolojileri ve İletişim Kurumu (BTK) tarafından lisanslı bir elektronik ticaret platformudur. ISO 27001 Bilgi Güvenliği Yönetim Sistemi sertifikasına sahiptir. PCI DSS Level 1 uyumlu ödeme altyapısı kullanmaktadır.',
  },
  {
    title: 'Misyon & Vizyon',
    content:
      'Misyon: Türkiye\'deki kiralık konut ekosistemini teknoloji aracılığıyla dönüştürmek, ev sahipleri ve kiracılar arasındaki güveni artırmak.\n\nVizyon: Gayrimenkul kiralama sektöründe Türkiye\'nin lider dijital platformu olmak ve bölgesel büyümeyle Avrupa\'ya açılmak.',
  },
];

export const CompanyInfoScreen = ({ navigation }: any) => {
  return (
    <LegalScreenBase
      title="Şirket Bilgileri"
      icon="business"
      iconColor={COLORS.info}
      lastUpdated="01 Ocak 2025"
      sections={SECTIONS}
      onBack={navigation?.goBack}
    />
  );
};
