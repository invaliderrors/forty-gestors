import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ProfileMenuGroup } from '@/components/perfil/ProfileMenuGroup';
import { ProfileMenuRow } from '@/components/perfil/ProfileMenuRow';
import { ProfileQuickActions } from '@/components/perfil/ProfileQuickActions';
import { ProfileStatsStrip } from '@/components/perfil/ProfileStatsStrip';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { useComingSoonNotice } from '@/hooks/perfil/useComingSoonNotice';
import { useSession } from '@/providers/SessionProvider';
import { perfilStyles as styles } from '@/styles/perfil/perfil.styles';
import { colors } from '@/theme';

const TAB_BAR_SPACE = 84;

/**
 * Perfil del gestor: hero con identidad + accesos rápidos y menú por
 * secciones (estructura del ProfileScreen de fortu-app en clay). Las
 * entradas reflejan las fases del PDF: whitelabel (Mi marca), vendedores
 * y trazabilidad ante el Operador y Coljuegos.
 */
export function PerfilScreen() {
  const router = useRouter();
  const { session, signOut } = useSession();
  const { infoMessage, comingSoon } = useComingSoonNotice();

  const displayName = session?.displayName ?? 'Gestor';
  const email = session?.email ?? '';

  return (
    <AuthShell
      extraBottomPadding={TAB_BAR_SPACE}
      heroAccessory={
        <View style={styles.heroBlock}>
          <View style={styles.topBar}>
            <View style={styles.topSlot} />
            <Text style={styles.topEyebrow}>MI CUENTA</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notificaciones"
              onPress={comingSoon('El inbox de notificaciones')}
              hitSlop={8}
              style={({ pressed }) => [styles.bellButton, pressed && styles.pressed]}
            >
              <Ionicons name="notifications-outline" size={19} color={colors.textOnNavy} />
            </Pressable>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={26} color={colors.textOnGold} />
            </View>
            <View style={styles.heroIdentity}>
              <Text style={styles.heroName} numberOfLines={1}>
                {displayName}
              </Text>
              {email ? (
                <Text style={styles.heroEmail} numberOfLines={1}>
                  {email}
                </Text>
              ) : null}
              <View style={styles.statusChip}>
                <Ionicons name="time-outline" size={12} color={colors.ctaFace} />
                <Text style={styles.statusLabel}>Cuenta en revisión</Text>
              </View>
            </View>
          </View>

          <ProfileQuickActions
            actions={[
              { icon: 'add', label: 'Nueva rifa', onPress: () => router.navigate('/rifas') },
              { icon: 'people', label: 'Vendedores', onPress: comingSoon('La gestión de vendedores') },
              { icon: 'bar-chart', label: 'Reportes', onPress: comingSoon('Los reportes del negocio') },
            ]}
          />
        </View>
      }
    >
      {infoMessage ? <ClayNotice tone="info" message={infoMessage} /> : null}

      <ProfileStatsStrip activeRifas={0} soldTickets={0} collectedLabel="$ 0" />

      <View style={styles.menuStack}>
        <ProfileMenuGroup
          icon="settings-outline"
          label="Cuenta"
          sub="Tu información, marca, seguridad y notificaciones"
          items={[
            {
              icon: 'id-card-outline',
              label: 'Tu información',
              sub: 'Datos personales y documentos',
              onPress: comingSoon('La edición de tu información'),
            },
            {
              icon: 'color-palette-outline',
              label: 'Mi marca',
              sub: 'Tu logo y tus colores en la app',
              onPress: comingSoon('La personalización de tu marca'),
            },
            {
              icon: 'lock-closed-outline',
              label: 'Seguridad',
              sub: 'Contraseña y sesiones activas',
              onPress: comingSoon('El módulo de seguridad'),
            },
            {
              icon: 'notifications-outline',
              label: 'Notificaciones',
              sub: 'Alertas de ventas y sorteos',
              onPress: comingSoon('Las preferencias de notificación'),
            },
          ]}
        />
        <ProfileMenuGroup
          icon="briefcase-outline"
          label="Mi negocio"
          sub="Billetera, vendedores, reportes y trazabilidad"
          items={[
            {
              icon: 'wallet-outline',
              label: 'Billetera',
              sub: 'Ingresos, tesorería y comisiones',
              meta: '$ 0',
              onPress: () => router.navigate('/billetera'),
            },
            {
              icon: 'people-outline',
              label: 'Vendedores',
              sub: 'Tu equipo y sus permisos',
              onPress: comingSoon('La gestión de vendedores'),
            },
            {
              icon: 'document-text-outline',
              label: 'Reportes y trazabilidad',
              sub: 'Transacciones al Operador y Coljuegos',
              onPress: comingSoon('La trazabilidad de transacciones'),
            },
          ]}
        />
        <ProfileMenuRow
          icon="help-buoy-outline"
          label="Ayuda y soporte"
          sub="Resolvemos tus dudas"
          onPress={comingSoon('El centro de ayuda')}
        />
      </View>

      <ClayButton
        label="Cerrar sesión"
        variant="secondary"
        onPress={() => {
          signOut();
          router.replace('/login');
        }}
      />
      <Text style={styles.version}>Fortu Gestor · versión de prueba (mock)</Text>
    </AuthShell>
  );
}
