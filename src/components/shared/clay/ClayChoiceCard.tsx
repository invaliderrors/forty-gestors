import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

type ClayChoiceCardProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
};

/** Card grande de opción excluyente (tipo de persona en el registro). */
export function ClayChoiceCard({
  title,
  description,
  icon,
  selected,
  onPress,
}: ClayChoiceCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        selected && clayShadow.subtle,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.iconBubble, selected && styles.iconBubbleSelected]}>
        <Ionicons
          name={icon}
          size={24}
          color={selected ? colors.textOnGold : colors.textSecondary}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <Ionicons name="checkmark" size={14} color={colors.textOnGold} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 2,
    borderColor: colors.surfaceBorder,
    padding: spacing.lg,
  },
  cardSelected: {
    borderColor: colors.ctaFace,
    backgroundColor: colors.goldSoftBg,
  },
  cardPressed: {
    opacity: 0.85,
  },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleSelected: {
    backgroundColor: colors.ctaFace,
  },
  body: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },
  titleSelected: {
    color: colors.textPrimary,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  radioSelected: {
    borderColor: colors.ctaDepth,
    backgroundColor: colors.ctaFace,
  },
});
