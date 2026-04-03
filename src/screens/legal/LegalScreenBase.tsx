import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';

interface Section {
  title: string;
  content: string;
}

interface LegalScreenBaseProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  lastUpdated: string;
  sections: Section[];
  onBack?: () => void;
}

export const LegalScreenBase = ({
  title,
  icon,
  iconColor = COLORS.primary,
  lastUpdated,
  sections,
  onBack,
}: LegalScreenBaseProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {onBack && (
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={{ width: 32 }} />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: iconColor + '15' }]}>
          <View style={[styles.iconWrapper, { backgroundColor: iconColor + '25' }]}>
            <Ionicons name={icon} size={36} color={iconColor} />
          </View>
          <Text style={styles.heroTitle}>{title}</Text>
          <Text style={styles.lastUpdated}>Son güncelleme: {lastUpdated}</Text>
        </View>

        {sections.map((section, i) => (
          <View key={i} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionNumber, { backgroundColor: iconColor }]}>
                <Text style={styles.sectionNumberText}>{i + 1}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
          <Text style={styles.footerText}>
            KiraEvim, kullanıcılarının kişisel bilgilerini gizlilik politikası kapsamında korumaktadır.
          </Text>
        </View>
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
  hero: {
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  heroTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  lastUpdated: { fontSize: 12, color: COLORS.textSecondary, marginTop: 6 },
  section: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm, gap: SPACING.sm },
  sectionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionNumberText: { color: COLORS.white, fontSize: 13, fontWeight: '700' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, flex: 1 },
  sectionContent: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22 },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F8F0',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  footerText: { flex: 1, fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
});
