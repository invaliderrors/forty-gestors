import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const profileMenuGroupStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 3,
    borderBottomColor: colors.surfaceDepth,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 2,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBody: {
    flex: 1,
  },
  headerLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  headerSub: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
    marginLeft: spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 12,
    paddingRight: spacing.lg,
    paddingLeft: spacing.xl + spacing.sm,
    backgroundColor: colors.surfaceSunken,
  },
  itemIcon: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBody: {
    flex: 1,
  },
  itemLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  itemSub: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textSecondary,
    marginTop: 1,
  },
  itemMeta: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.accentDeep,
  },
  pressed: {
    opacity: 0.7,
  },
});
