import { Ionicons } from '@expo/vector-icons';
import { Fragment } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useWallet } from '@/application/billetera/useWallet';
import { MovementRow } from '@/components/billetera/MovementRow';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { LightBackground } from '@/components/shared/LightBackground';
import { LoadingDots } from '@/components/shared/LoadingDots';
import { formatCop } from '@/domain/shared/money';
import { billeteraStyles as styles } from '@/styles/billetera/billetera.styles';
import { colors, spacing } from '@/theme';

/** Espacio para que el final del scroll no quede debajo de la tab bar flotante. */
const TAB_BAR_SPACE = 84;

/**
 * Billetera del gestor (fase 3.2 del PDF): tesorería, conciliación
 * efectivo/digital, comisiones y trazabilidad ante el Operador.
 */
export function BilleteraScreen() {
  const insets = useSafeAreaInsets();
  const wallet = useWallet();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LightBackground />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.xxxl + TAB_BAR_SPACE,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>Billetera</Text>
          <Text style={styles.subtitle}>Ingresos, tesorería y comisiones.</Text>
        </View>

        {wallet.status === 'loading' ? (
          <View style={styles.loading}>
            <LoadingDots color={colors.textMuted} />
          </View>
        ) : null}

        {wallet.status === 'error' ? (
          <ClayNotice tone="error" message="No pudimos cargar tu billetera. Vuelve a intentarlo." />
        ) : null}

        {wallet.status === 'ready' ? (
          <>
            <View style={styles.hero}>
              <Text style={styles.heroLabel}>Recaudo disponible</Text>
              <Text style={styles.heroValue}>{formatCop(wallet.summary.availableCop)}</Text>
              <View style={styles.heroSplitRow}>
                <View style={styles.heroSplitItem}>
                  <Ionicons name="card" size={13} color={colors.textOnGold} />
                  <Text style={styles.heroSplitLabel}>
                    Digital {formatCop(wallet.summary.digitalCop)}
                  </Text>
                </View>
                <View style={styles.heroSplitItem}>
                  <Ionicons name="cash" size={13} color={colors.textOnGold} />
                  <Text style={styles.heroSplitLabel}>
                    Efectivo {formatCop(wallet.summary.cashPendingCop)}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Conciliación de caja</Text>
            <View>
              <View style={styles.reconciliationRow}>
                <View style={[styles.reconciliationIcon, styles.reconciliationIconOk]}>
                  <Ionicons name="checkmark-circle" size={19} color={colors.successDeep} />
                </View>
                <View style={styles.reconciliationBody}>
                  <Text style={styles.reconciliationTitle}>Ventas digitales</Text>
                  <Text style={styles.reconciliationHint}>
                    Conciliadas automáticamente con tu recaudo.
                  </Text>
                </View>
                <Text style={styles.reconciliationValue}>
                  {formatCop(wallet.summary.digitalCop)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.reconciliationRow}>
                <View style={[styles.reconciliationIcon, styles.reconciliationIconPending]}>
                  <Ionicons name="time" size={19} color={colors.ctaDepth} />
                </View>
                <View style={styles.reconciliationBody}>
                  <Text style={styles.reconciliationTitle}>Efectivo en campo</Text>
                  <Text style={styles.reconciliationHint}>
                    En manos de tus vendedores, pendiente de rendir.
                  </Text>
                </View>
                <Text style={styles.reconciliationValue}>
                  {formatCop(wallet.summary.cashPendingCop)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.reconciliationRow}>
                <View style={[styles.reconciliationIcon, styles.reconciliationIconOk]}>
                  <Ionicons name="people" size={19} color={colors.successDeep} />
                </View>
                <View style={styles.reconciliationBody}>
                  <Text style={styles.reconciliationTitle}>Comisiones pagadas</Text>
                  <Text style={styles.reconciliationHint}>A tus vendedores.</Text>
                </View>
                <Text style={styles.reconciliationValue}>
                  {formatCop(wallet.summary.commissionsCop)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.reconciliationRow}>
                <View style={[styles.reconciliationIcon, styles.reconciliationIconOk]}>
                  <Ionicons name="shield-checkmark" size={19} color={colors.successDeep} />
                </View>
                <View style={styles.reconciliationBody}>
                  <Text style={styles.reconciliationTitle}>Enviado al Operador y Coljuegos</Text>
                  <Text style={styles.reconciliationHint}>
                    Derechos de explotación con trazabilidad completa.
                  </Text>
                </View>
                <Text style={styles.reconciliationValue}>
                  {formatCop(wallet.summary.remittedCop)}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Movimientos</Text>
            {wallet.movements.length === 0 ? (
              <Text style={styles.emptyMovements}>
                Aún no tienes movimientos. Aparecerán con tus primeras ventas.
              </Text>
            ) : (
              <View style={styles.movementsList}>
                {wallet.movements.map((movement, index) => (
                  <Fragment key={movement.id}>
                    {index > 0 ? <View style={styles.divider} /> : null}
                    <MovementRow movement={movement} />
                  </Fragment>
                ))}
              </View>
            )}

            <ClayNotice
              tone="info"
              message="Datos de demostración: la billetera se conectará a tus ventas reales con el backend."
            />
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}
