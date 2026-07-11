import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const perfilStyles = StyleSheet.create({
  heroBlock: {
    gap: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topSlot: {
    width: 40,
    height: 40,
  },
  topEyebrow: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    letterSpacing: 2.3,
    textTransform: 'uppercase',
    color: colors.textOnNavySoft,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.65,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: radii.xl,
    padding: spacing.lg,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: radii.pill,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 4,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIdentity: {
    flex: 1,
    gap: 2,
  },
  heroName: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    color: colors.textOnNavy,
  },
  heroEmail: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textOnNavySoft,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(254,201,55,0.16)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginTop: 3,
  },
  statusLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.ctaFace,
  },
  menuStack: {
    gap: spacing.md,
  },
  version: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textMuted,
  },
});
