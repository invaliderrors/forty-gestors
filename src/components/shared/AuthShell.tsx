import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

type AuthShellProps = {
  title: string;
  subtitle?: string;
  /** Contenido extra del hero (logo, progreso del wizard...). */
  heroAccessory?: ReactNode;
  onBack?: () => void;
  children: ReactNode;
};

/**
 * Cascarón de las vistas de auth: hero navy de marca arriba y "sheet"
 * claro claymórfico que sube por encima, donde vive el contenido.
 */
export function AuthShell({ title, subtitle, heroAccessory, onBack, children }: AuthShellProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.heroTop} />
      <LinearGradient
        colors={[colors.heroTop, colors.heroMid, colors.heroBottom]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.hero, { paddingTop: insets.top + spacing.lg }]}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver"
            onPress={onBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={22} color={colors.textOnNavy} />
          </Pressable>
        ) : null}
        {heroAccessory}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <KeyboardAvoidingView
        style={styles.sheetWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheet}>
          <View style={styles.blobGold} pointerEvents="none" />
          <View style={styles.blobCyan} pointerEvents="none" />
          <ScrollView
            contentContainerStyle={[
              styles.sheetContent,
              { paddingBottom: insets.bottom + spacing.xxxl },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.heroBottom,
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
  blobGold: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.blobGold,
    top: -90,
    right: -80,
    opacity: 0.8,
  },
  blobCyan: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.blobCyan,
    bottom: -140,
    left: -120,
    opacity: 0.9,
  },
});
