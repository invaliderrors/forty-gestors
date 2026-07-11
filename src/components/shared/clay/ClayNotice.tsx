import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type NoticeTone = 'error' | 'info' | 'success';

type ClayNoticeProps = {
  tone: NoticeTone;
  message: string;
};

const toneConfig: Record<
  NoticeTone,
  { bg: string; fg: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  error: { bg: colors.dangerSoftBg, fg: colors.danger, icon: 'alert-circle' },
  info: { bg: colors.accentSoftBg, fg: colors.accentDeep, icon: 'information-circle' },
  success: { bg: colors.successSoftBg, fg: colors.successDeep, icon: 'checkmark-circle' },
};

/** Banner inline de feedback (errores de login, avisos de permisos, éxito). */
export function ClayNotice({ tone, message }: ClayNoticeProps) {
  const config = toneConfig[tone];
  return (
    <View style={[styles.banner, { backgroundColor: config.bg }]} accessibilityRole="alert">
      <Ionicons name={config.icon} size={19} color={config.fg} />
      <Text style={[styles.message, { color: config.fg }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  message: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    lineHeight: 18,
  },
});
