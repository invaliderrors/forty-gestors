import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { PickedFile } from '@/domain/media/types';
import type { DocumentSlot } from '@/domain/registration/types';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type DocumentUploadCardProps = {
  slot: DocumentSlot;
  file: PickedFile | null;
  error?: string;
  onPick: () => void;
  onRemove: () => void;
};

/** Card clay de un documento KYC: vacía (subir) o con la evidencia adjunta. */
export function DocumentUploadCard({ slot, file, error, onPick, onRemove }: DocumentUploadCardProps) {
  const acceptsLabel = slot.accepts.includes('pdf') ? 'Foto o PDF' : 'Foto';

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={file ? `Reemplazar ${slot.title}` : `Subir ${slot.title}`}
        onPress={onPick}
        style={({ pressed }) => [
          styles.card,
          file ? styles.cardFilled : styles.cardEmpty,
          error ? styles.cardError : null,
          pressed && styles.cardPressed,
        ]}
      >
        {file ? (
          <>
            {file.kind === 'image' ? (
              <Image source={{ uri: file.uri }} style={styles.thumbnail} contentFit="cover" />
            ) : (
              <View style={styles.pdfBadge}>
                <Ionicons name="document-text" size={26} color={colors.accentDeep} />
                <Text style={styles.pdfLabel}>PDF</Text>
              </View>
            )}
            <View style={styles.body}>
              <Text style={styles.title}>{slot.title}</Text>
              <Text style={styles.fileName} numberOfLines={1}>
                {file.name}
              </Text>
              <View style={styles.filledTagRow}>
                <Ionicons name="checkmark-circle" size={15} color={colors.successDeep} />
                <Text style={styles.filledTag}>Adjunto — toca para reemplazar</Text>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Quitar ${slot.title}`}
              onPress={onRemove}
              hitSlop={10}
              style={styles.removeButton}
            >
              <Ionicons name="close" size={17} color={colors.textSecondary} />
            </Pressable>
          </>
        ) : (
          <>
            <View style={styles.uploadBubble}>
              <Ionicons name="cloud-upload-outline" size={24} color={colors.accentDeep} />
            </View>
            <View style={styles.body}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{slot.title}</Text>
                {slot.required ? <Text style={styles.requiredMark}>*</Text> : null}
              </View>
              <Text style={styles.hint}>{slot.hint}</Text>
              <Text style={styles.accepts}>{acceptsLabel}</Text>
            </View>
            <Ionicons name="add-circle" size={26} color={colors.ctaDepth} />
          </>
        )}
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.xl,
    padding: spacing.lg,
  },
  cardEmpty: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.inputBorder,
  },
  cardFilled: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.success,
  },
  cardError: {
    borderColor: colors.inputBorderError,
  },
  cardPressed: {
    opacity: 0.8,
  },
  uploadBubble: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSunken,
  },
  pdfBadge: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfLabel: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.accentDeep,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    gap: 2,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  requiredMark: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.danger,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  accepts: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
    marginTop: 2,
  },
  fileName: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
  filledTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  filledTag: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.successDeep,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: spacing.xs,
  },
});
