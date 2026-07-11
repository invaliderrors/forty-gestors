import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type ProfileMenuRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  /** Dato corto a la derecha (ej: "0 rifas"). */
  meta?: string;
  onPress: () => void;
};

/** Fila de menú del perfil (equivalente clay del ProfileMenuRow de fortu-app). */
export function ProfileMenuRow({ icon, label, sub, meta, onPress }: ProfileMenuRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.iconBubble}>
        <Ionicons name={icon} size={19} color={colors.accentDeep} />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 3,
    borderBottomColor: colors.surfaceDepth,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  rowPressed: {
    opacity: 0.75,
  },
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  sub: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  meta: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.accentDeep,
  },
});
