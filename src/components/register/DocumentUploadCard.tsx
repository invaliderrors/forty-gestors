import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LoadingDots } from '@/components/shared/LoadingDots';
import type { DocumentAttachment } from '@/domain/documents/analysis';
import type { DocumentSlot } from '@/domain/registration/types';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type DocumentUploadCardProps = {
  slot: DocumentSlot;
  attachment: DocumentAttachment | null;
  error?: string;
  onPick: () => void;
  onRemove: () => void;
};

/**
 * Card clay de un documento KYC. Estados: vacía (subir), verificando
 * (OCR en curso), verificado (aprobado) y rechazado (volver a intentar).
 */
export function DocumentUploadCard({
  slot,
  attachment,
  error,
  onPick,
  onRemove,
}: DocumentUploadCardProps) {
  const acceptsLabel = slot.accepts.includes('pdf') ? 'Foto o PDF' : 'Foto';
  const analysis = attachment?.analysis ?? null;
  const isAnalyzing = analysis?.status === 'analyzing';

  const borderStyle =
    analysis === null
      ? styles.cardEmpty
      : analysis.status === 'analyzing'
        ? styles.cardAnalyzing
        : analysis.status === 'approved'
          ? styles.cardApproved
          : styles.cardRejected;

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={attachment ? `Reemplazar ${slot.title}` : `Subir ${slot.title}`}
        accessibilityState={{ busy: isAnalyzing }}
        onPress={onPick}
        disabled={isAnalyzing}
        style={({ pressed }) => [
          styles.card,
          borderStyle,
          error ? styles.cardError : null,
          pressed && styles.cardPressed,
        ]}
      >
        {attachment ? (
          <>
            {attachment.file.kind === 'image' ? (
              <Image
                source={{ uri: attachment.file.uri }}
                style={styles.thumbnail}
                contentFit="cover"
              />
            ) : (
              <View style={styles.pdfBadge}>
                <Ionicons name="document-text" size={26} color={colors.accentDeep} />
                <Text style={styles.pdfLabel}>PDF</Text>
              </View>
            )}
            <View style={styles.body}>
              <Text style={styles.title}>{slot.title}</Text>
              {analysis?.status === 'analyzing' ? (
                <View style={styles.statusRow}>
                  <LoadingDots color={colors.accentDeep} size={5} />
                  <Text style={styles.analyzingTag}>Verificando documento…</Text>
                </View>
              ) : null}
              {analysis?.status === 'approved' ? (
                <>
                  <View style={styles.statusRow}>
                    <Ionicons name="shield-checkmark" size={15} color={colors.successDeep} />
                    <Text style={styles.approvedTag}>
                      Verificado — toca para reemplazar
                    </Text>
                  </View>
                  {analysis.note ? <Text style={styles.note}>{analysis.note}</Text> : null}
                </>
              ) : null}
              {analysis?.status === 'rejected' ? (
                <>
                  <View style={styles.statusRow}>
                    <Ionicons name="alert-circle" size={15} color={colors.danger} />
                    <Text style={styles.rejectedTag}>No pasó la verificación</Text>
                  </View>
                  <Text style={styles.rejectedReason}>{analysis.reason}</Text>
                  <Text style={styles.retryHint}>Toca para intentar de nuevo</Text>
                </>
              ) : null}
            </View>
            {!isAnalyzing ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Quitar ${slot.title}`}
                onPress={onRemove}
                hitSlop={10}
                style={styles.removeButton}
              >
                <Ionicons name="close" size={17} color={colors.textSecondary} />
              </Pressable>
            ) : null}
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
    backgroundColor: colors.surface,
    borderWidth: 2,
  },
  cardEmpty: {
    borderStyle: 'dashed',
    borderColor: colors.inputBorder,
  },
  cardAnalyzing: {
    borderColor: colors.accent,
  },
  cardApproved: {
    borderColor: colors.success,
  },
  cardRejected: {
    borderColor: colors.danger,
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  analyzingTag: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
  },
  approvedTag: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.successDeep,
  },
  rejectedTag: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.danger,
  },
  rejectedReason: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  retryHint: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
    marginTop: 2,
  },
  note: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    lineHeight: 15,
    color: colors.textMuted,
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
