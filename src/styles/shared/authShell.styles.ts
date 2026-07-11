import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const authShellStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.heroBase,
  },
  hero: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  backButtonPressed: {
    opacity: 0.65,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    color: colors.textOnNavy,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 22,
    color: colors.textOnNavySoft,
  },
  sheetWrapper: {
    flex: 1,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    overflow: 'hidden',
    ...clayShadow.floating,
  },
  sheetContent: {
    padding: spacing.xxl,
    gap: spacing.xl,
  },
  sheetContentCentered: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  blob: {
    position: 'absolute',
  },
  blobGoldPosition: {
    top: -90,
    right: -80,
  },
  blobCyanPosition: {
    bottom: -140,
    left: -120,
  },
});
