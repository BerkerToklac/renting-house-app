import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../navigation/theme';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'secondary';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: '#E8F8F0', text: COLORS.success },
  warning: { bg: '#FEF9E7', text: COLORS.warning },
  error: { bg: '#FDEDEC', text: COLORS.error },
  info: { bg: '#EBF5FB', text: COLORS.info },
  secondary: { bg: COLORS.surface, text: COLORS.textSecondary },
};

export const Badge = ({ label, variant = 'secondary' }: BadgeProps) => {
  const colors = VARIANT_COLORS[variant];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.round,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
