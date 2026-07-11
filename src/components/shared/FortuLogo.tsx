import { Image } from 'expo-image';

const WORDMARK_RATIO = 422 / 156;

type FortuLogoProps = {
  /** Altura del wordmark en px. */
  size?: number;
};

/** Wordmark de Fortu. */
export function FortuLogo({ size = 44 }: FortuLogoProps) {
  return (
    <Image
      source={require('@/assets/images/Logo_FORTU.png')}
      style={{ height: size, width: size * WORDMARK_RATIO }}
      contentFit="contain"
      accessibilityLabel="Fortu"
    />
  );
}
