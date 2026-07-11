import { useRouter } from 'expo-router';
import { Text } from 'react-native';

import { PersonaTypeCard } from '@/components/register/PersonaTypeCard';
import { AuthShell } from '@/components/shared/AuthShell';
import { registerTypeStyles as styles } from '@/styles/register/registerType.styles';

/** Antesala del registro: el gestor elige cómo opera y de ahí va a su flujo. */
export function RegisterTypeScreen() {
  const router = useRouter();

  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Cuéntanos cómo operas tu negocio para pedirte solo los documentos que te corresponden."
      onBack={() => router.back()}
      centerContent
    >
      <PersonaTypeCard
        title="Persona natural"
        description="Operas a tu nombre, con tu cédula."
        requirementsHint="Necesitas: cédula (ambas caras) y RUT."
        icon="person-outline"
        onPress={() => router.push('/register/natural')}
      />
      <PersonaTypeCard
        title="Persona jurídica"
        description="Operas a través de una empresa con NIT."
        requirementsHint="Necesitas: RUT de la empresa, certificado de representación y cédula del representante."
        icon="business-outline"
        onPress={() => router.push('/register/juridica')}
      />
      <Text style={styles.note}>
        En ambos casos la cuenta será pasada por un filtro de revisión para validar que la
        información sea verdadera.
      </Text>
    </AuthShell>
  );
}
