import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { KeyboardAwareScrollView } from '@/components/shared/KeyboardAwareScrollView';
import { ScreenBackground } from '@/components/shared/ScreenBackground';
import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

type AuthShellProps = {
  title?: string;
  subtitle?: string;
  /** Contenido extra del hero (logo, progreso del wizard...). */
  heroAccessory?: ReactNode;
  onBack?: () => void;
  /** Centra el contenido verticalmente dentro del sheet (vistas cortas). */
  centerContent?: boolean;
  children: ReactNode;
};

function SheetBlob({
  size,
  color,
  style,
  id,
}: {
  size: number;
  color: string;
  style: object;
  id: string;
}) {
  return (
    <View pointerEvents="none" style={[styles.blob, style, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <Stop offset="70%" stopColor={color} stopOpacity="0.35" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

/**
 * Cascarón de las vistas de auth de Fortu Gestor: hero navy de marca
 * (gradiente SVG) y "sheet" claro claymórfico que sube por encima,
 * donde vive el contenido.
 */
export function AuthShell({
  title,
  subtitle,
  heroAccessory,
  onBack,
  centerContent = false,
  children,
}: AuthShellProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScreenBackground />
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
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <KeyboardAvoidingView
        style={styles.sheetWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheet}>
          <SheetBlob
            id="sheetBlobGold"
            size={260}
            color={colors.blobGold}
            style={styles.blobGoldPosition}
          />
          <SheetBlob
            id="sheetBlobCyan"
            size={320}
            color={colors.blobCyan}
            style={styles.blobCyanPosition}
          />
          <KeyboardAwareScrollView
            contentContainerStyle={[
              styles.sheetContent,
              centerContent && styles.sheetContentCentered,
              { paddingBottom: insets.bottom + spacing.xxxl },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
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
