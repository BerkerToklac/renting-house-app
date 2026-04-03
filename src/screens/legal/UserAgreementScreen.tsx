import React from 'react';
import { LegalScreenBase } from './LegalScreenBase';
import { COLORS } from '../../navigation/theme';

const SECTIONS = [
  {
    title: 'Taraflar ve Kapsam',
    content:
      'Bu Kullanıcı Sözleşmesi ("Sözleşme"), KiraEvim Teknoloji A.Ş. ("Platform") ile platformu kullanan gerçek ya da tüzel kişi ("Kullanıcı") arasında akdedilmiştir. Platforma erişerek veya kayıt oluşturarak bu sözleşmeyi kabul etmiş sayılırsınız.',
  },
  {
    title: 'Hesap Oluşturma ve Güvenlik',
    content:
      'Platforma kayıt olurken doğru, eksiksiz ve güncel bilgi vermeyi kabul edersiniz. Hesabınızın güvenliğinden siz sorumlusunuz; şifrenizi kimseyle paylaşmamalı, şüpheli aktivite fark ettiğinizde derhal bize bildirmelisiniz.',
  },
  {
    title: 'Platformun Kullanımı',
    content:
      'Platform yalnızca yasal amaçlarla kullanılabilir. Platformu spam göndermek, zararlı yazılım yaymak, başkalarına ait içerikleri izinsiz kullanmak veya platforma zarar verebilecek herhangi bir eylem için kullanamazsınız.',
  },
  {
    title: 'Ücretler ve Ödemeler',
    content:
      'Platform, kiracıdan rezervasyon tutarının %10\'u oranında hizmet bedeli tahsil eder. Tüm ödemeler güvenli ödeme altyapısı üzerinden işlenir. Vergi yükümlülükleri kullanıcıların sorumluluğundadır.',
  },
  {
    title: 'Sözleşmenin Feshi',
    content:
      'Platform, kullanıcının bu sözleşmeyi ihlal etmesi durumunda hesabı askıya alma veya silme hakkını saklı tutar. Kullanıcı da istediği zaman hesabını kapatabilir; ancak tamamlanmamış rezervasyonlar sözleşme şartlarına tabidir.',
  },
  {
    title: 'Sorumluluk Sınırlaması',
    content:
      'Platform, ev sahipleri ve kiracılar arasındaki anlaşmazlıklarda arabuluculuk hizmeti sunar; ancak taraflar arasındaki sözleşmelerden doğrudan sorumlu tutulamaz. Platforma erişim kesintilerinden kaynaklanan zararlar için sorumluluğumuz sınırlıdır.',
  },
];

export const UserAgreementScreen = ({ navigation }: any) => {
  return (
    <LegalScreenBase
      title="Kullanıcı Sözleşmesi"
      icon="document-text"
      iconColor={COLORS.primary}
      lastUpdated="15 Ocak 2025"
      sections={SECTIONS}
      onBack={navigation?.goBack}
    />
  );
};
