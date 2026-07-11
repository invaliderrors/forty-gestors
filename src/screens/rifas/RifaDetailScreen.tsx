import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';

import { useRifaDetail } from '@/application/rifa/useRifaDetail';
import { TicketPreview } from '@/components/rifas/TicketPreview';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { LightBackground } from '@/components/shared/LightBackground';
import { LoadingDots } from '@/components/shared/LoadingDots';
import { computeRifaProjection } from '@/domain/rifa/normative';
import { totalPrizeValue, type Rifa } from '@/domain/rifa/types';
import { drawDateToDisplay } from '@/domain/rifa/validators';
import { formatCop } from '@/domain/shared/money';
import { rifaDetailStyles as styles } from '@/styles/rifas/rifaDetail.styles';
import { colors, spacing } from '@/theme';

function DetailShell({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LightBackground />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver"
            onPress={onBack}
            hitSlop={8}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          >
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>
        {children}
      </ScrollView>
    </View>
  );
}

function StatusCard({ rifa }: { rifa: Rifa }) {
  const isRevision = rifa.status === 'en_revision';
  return (
    <View style={[styles.statusCard, isRevision ? styles.statusCardRevision : styles.statusCardOk]}>
      <View style={[styles.statusIcon, isRevision ? styles.statusIconRevision : styles.statusIconOk]}>
        <Ionicons
          name={isRevision ? 'time' : 'checkmark-circle'}
          size={24}
          color={isRevision ? colors.textOnGold : colors.surface}
        />
      </View>
      <View style={styles.statusBody}>
        <Text style={styles.statusTitle}>
          {isRevision ? 'En proceso de revisión' : 'Rifa autorizada'}
        </Text>
        <Text style={styles.statusText}>
          {isRevision
            ? 'Estamos validando tu rifa para la autorización de Coljuegos. Te avisaremos por correo cuando esté autorizada y publicada en el marketplace de Fortu.'
            : 'Tu rifa está autorizada y publicada en el marketplace de Fortu.'}
        </Text>
      </View>
    </View>
  );
}

/** Detalle de una rifa: vista clara full-bleed (como el dashboard), sin contenedor. */
export function RifaDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const detail = useRifaDetail(typeof id === 'string' ? id : '');

  if (detail.status === 'loading') {
    return (
      <DetailShell title="Tu rifa" onBack={() => router.back()}>
        <View style={styles.loading}>
          <LoadingDots color={colors.textMuted} />
        </View>
      </DetailShell>
    );
  }

  if (detail.status !== 'ready') {
    return (
      <DetailShell title="Tu rifa" onBack={() => router.back()}>
        <ClayNotice
          tone="error"
          message={
            detail.status === 'not_found'
              ? 'No encontramos esta rifa.'
              : 'No pudimos cargar la rifa. Vuelve a intentarlo.'
          }
        />
      </DetailShell>
    );
  }

  const { rifa } = detail;
  const projection = computeRifaProjection(rifa.ticketCount, rifa.ticketPrice);
  const soldRatio = rifa.ticketCount > 0 ? rifa.soldTickets / rifa.ticketCount : 0;

  return (
    <DetailShell title={rifa.name} subtitle={`Rifa ${rifa.id}`} onBack={() => router.back()}>
      <StatusCard rifa={rifa} />

      <TicketPreview
        name={rifa.name}
        prizes={rifa.prizes}
        ticketPrice={rifa.ticketPrice}
        drawDateDisplay={drawDateToDisplay(rifa.drawDate)}
      />

      <Text style={styles.sectionLabel}>Ventas</Text>
      <View style={styles.salesSection}>
        <View style={styles.salesHeader}>
          <Text style={styles.salesTitle}>Boletas vendidas</Text>
          <Text style={styles.salesCount}>
            {rifa.soldTickets} / {rifa.ticketCount}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(soldRatio * 100)}%` }]} />
        </View>
        <Text style={styles.salesHint}>
          {rifa.status === 'en_revision'
            ? 'La venta comienza cuando tu rifa esté autorizada.'
            : `Recaudado: ${formatCop(rifa.soldTickets * rifa.ticketPrice)}`}
        </Text>
      </View>

      <Text style={styles.sectionLabel}>Tus números</Text>
      <View style={styles.numbersSection}>
        <View style={styles.numbersRow}>
          <Text style={styles.numbersLabel}>Fecha del sorteo</Text>
          <Text style={styles.numbersValue}>{drawDateToDisplay(rifa.drawDate)}</Text>
        </View>
        <View style={styles.numbersDivider} />
        <View style={styles.numbersRow}>
          <Text style={styles.numbersLabel}>Emisión total ({rifa.ticketCount} boletas)</Text>
          <Text style={styles.numbersValue}>{formatCop(projection.emissionTotal)}</Text>
        </View>
        <View style={styles.numbersDivider} />
        <View style={styles.numbersRow}>
          <Text style={styles.numbersLabel}>Valor total de premios</Text>
          <Text style={styles.numbersValue}>{formatCop(totalPrizeValue(rifa.prizes))}</Text>
        </View>
        <View style={styles.numbersDivider} />
        <View style={styles.numbersRow}>
          <Text style={styles.numbersLabel}>Derechos de explotación</Text>
          <Text style={styles.numbersValue}>{formatCop(projection.explotacionRights)}</Text>
        </View>
        <View style={styles.numbersDivider} />
        <View style={styles.numbersRow}>
          <Text style={styles.numbersLabel}>Póliza de cumplimiento (aprox.)</Text>
          <Text style={styles.numbersValue}>{formatCop(projection.insuranceCost)}</Text>
        </View>
      </View>
    </DetailShell>
  );
}
