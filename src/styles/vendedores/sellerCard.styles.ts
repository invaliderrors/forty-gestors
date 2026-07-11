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
    gap: 1,
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
  },
  rightColumn: {
    alignItems: 'flex-end',
    gap: 6,
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
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionLink: {
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
  },
  trashButton: {
    width: 26,
    height: 26,
    borderRadius: radii.sm,
    backgroundColor: colors.dangerSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPressed: {
    opacity: 0.6,
  },
  actionLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
  },
  actionActivate: {
    color: colors.successDeep,
  },
  actionDeactivate: {
    color: colors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statBlock: {
    gap: 2,
  },
  statBlockEnd: {
    alignItems: 'flex-end',
  },
  statLabel: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  statValue: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  permissionsLine: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textMuted,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.goldSoftBg,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.ctaFace,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  codeBlock: {
    flex: 1,
    gap: 1,
  },
  codeLabel: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  codeValue: {
    fontFamily: fonts.display,
    fontSize: fontSizes.subtitle,
    letterSpacing: 3,
    color: colors.textPrimary,
  },
  shareButton: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharePressed: {
    opacity: 0.7,
  },
});
