import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

type PersonaTypeCardProps = {
  title: string;
  description: string;
  requirementsHint: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

/** Card clay grande del selector de tipo de cuenta: al tocarla navega al registro. */
export function PersonaTypeCard({
  title,
  description,
  requirementsHint,
  icon,
  onPress,
}: PersonaTypeCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
    >
      {({ pressed }) => (
        <View style={[styles.shell, !pressed && clayShadow.raised]}>
          <View style={[styles.face, pressed && styles.facePressed]}>
            <View style={styles.iconBubble}>
              <Ionicons name={icon} size={26} color={colors.textOnGold} />
            </View>
            <View style={styles.body}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.requirements}>{requirementsHint}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: radii.xxl,
    backgroundColor: colors.surfaceDepth,
  },
  face: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.xl,
    marginBottom: 5,
  },
  facePressed: {
    marginBottom: 2,
    transform: [{ translateY: 3 }],
  },
  iconBubble: {
    width: 54,
    height: 54,
    borderRadius: radii.lg,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  requirements: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
    marginTop: 2,
  },
});
