import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const sellerCardStyles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: radii.pill,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: fonts.display,
    fontSize: fontSizes.body,
    color: colors.textOnGold,
  },
  identity: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  phone: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  statusChipInvitado: {
    backgroundColor: colors.accentSoftBg,
  },
  statusChipActivo: {
    backgroundColor: colors.successSoftBg,
  },
  statusChipInactivo: {
    backgroundColor: colors.surfaceSunken,
  },
  statusLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
  },
  statusLabelInvitado: {
    color: colors.accentDeep,
  },
  statusLabelActivo: {
    color: colors.successDeep,
  },
  statusLabelInactivo: {
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceSunken,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  metaLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.textSecondary,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.goldSoftBg,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.ctaFace,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  codeLabel: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    lineHeight: 15,
    color: colors.textSecondary,
  },
  codeValue: {
    fontFamily: fonts.display,
    fontSize: fontSizes.body,
    letterSpacing: 2,
    color: colors.ctaDepth,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
  },
  actionPressed: {
    opacity: 0.6,
  },
  actionLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
  },
  actionActivate: {
    color: colors.successDeep,
  },
  actionDeactivate: {
    color: colors.danger,
  },
});
