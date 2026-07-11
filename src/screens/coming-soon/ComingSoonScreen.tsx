import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { AuthShell } from '@/components/shared/AuthShell';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

const TAB_BAR_SPACE = 84;

type ComingSoonScreenProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
};

/** Placeholder clay de las secciones que llegan en próximas iteraciones. */
export function ComingSoonScreen({ title, subtitle, icon, message }: ComingSoonScreenProps) {
  return (
    <AuthShell title={title} subtitle={subtitle} centerContent extraBottomPadding={TAB_BAR_SPACE}>
      <ClayCard style={styles.card}>
        <View style={styles.iconBubble}>
          <Ionicons name={icon} size={26} color={colors.accentDeep} />
        </View>
        <Text style={styles.cardTitle}>Próximamente</Text>
        <Text style={styles.message}>{message}</Text>
      </ClayCard>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBubble: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
