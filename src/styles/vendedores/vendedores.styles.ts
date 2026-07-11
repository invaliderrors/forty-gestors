import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const vendedoresStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 4,
    borderBottomColor: colors.surfaceDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.65,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  loading: {
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
  },
  filterChipSelected: {
    borderColor: colors.ctaFace,
    backgroundColor: colors.goldSoftBg,
  },
  filterLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.textSecondary,
  },
  filterLabelSelected: {
    color: colors.textPrimary,
  },
  filterEmpty: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  list: {
    gap: spacing.lg,
  },
  empty: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  emptyBubble: {
    width: 72,
    height: 72,
    borderRadius: radii.xl,
    backgroundColor: colors.goldSoftBg,
    borderBottomWidth: 4,
    borderBottomColor: colors.ctaFace,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
  },
  emptyMessage: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
