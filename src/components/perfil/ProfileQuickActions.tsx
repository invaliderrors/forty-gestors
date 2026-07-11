import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

type QuickAction = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

type ProfileQuickActionsProps = {
  actions: readonly QuickAction[];
};

/** Accesos rápidos bajo el hero (equivalente clay del ProfileQuickActions de fortu-app). */
export function ProfileQuickActions({ actions }: ProfileQuickActionsProps) {
  return (
    <View style={styles.row}>
      {actions.map((action) => (
        <Pressable
          key={action.label}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          onPress={action.onPress}
        >
          {({ pressed }) => (
            <View style={[styles.shell, !pressed && clayShadow.subtle]}>
              <View style={[styles.face, pressed && styles.facePressed]}>
                <View style={styles.iconBubble}>
                  <Ionicons name={action.icon} size={19} color={colors.textOnGold} />
                </View>
                <Text style={styles.label}>{action.label}</Text>
              </View>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  shell: {
    borderRadius: radii.lg,
    backgroundColor: colors.secondaryDepth,
  },
  face: {
    alignItems: 'center',
    gap: 6,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: 4,
    minWidth: 96,
  },
  facePressed: {
    marginBottom: 1,
    transform: [{ translateY: 3 }],
  },
  iconBubble: {
    width: 34,
    height: 34,
    borderRadius: radii.sm,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 2,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.textPrimary,
  },
});
