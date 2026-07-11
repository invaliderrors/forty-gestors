import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

const WORDMARK_RATIO = 422 / 156;

type FortuLogoProps = {
  /** Altura del wordmark en px. */
  size?: number;
  /** Muestra la etiqueta "GESTOR" bajo el wordmark. */
  withGestorTag?: boolean;
};

/** Wordmark de Fortu + distintivo del producto Gestor. */
export function FortuLogo({ size = 44, withGestorTag = false }: FortuLogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/Logo_FORTU.png')}
        style={{ height: size, width: size * WORDMARK_RATIO }}
        contentFit="contain"
        accessibilityLabel="Fortu"
      />
      {withGestorTag ? (
        <View style={styles.tag}>
          <Text style={styles.tagLabel}>GESTOR</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
  },
  tag: {
    backgroundColor: colors.ctaFace,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
  },
  tagLabel: {
    fontFamily: fonts.display,
    fontSize: 13,
    letterSpacing: 4,
    color: colors.textOnGold,
  },
});
