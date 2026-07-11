import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const prizeFormStyles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.goldSoftBg,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  headerBadgeLabel: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.micro,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.ctaDepth,
  },
  headerSpacer: {
    flex: 1,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: colors.dangerSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swornBox: {
    backgroundColor: colors.surfaceSunken,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    padding: spacing.lg,
  },
});
