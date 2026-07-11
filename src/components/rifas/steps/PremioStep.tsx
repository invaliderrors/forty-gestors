import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import type { CreateRifaWizard } from '@/application/rifa/useCreateRifaWizard';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { PRIZE_CATEGORIES, type PrizeCategory } from '@/domain/rifa/types';
import { formatCop, formatThousands } from '@/domain/shared/money';
import { createRifaStepsStyles as styles } from '@/styles/rifas/createRifaSteps.styles';
import { colors } from '@/theme';

const CATEGORY_ICONS: Record<PrizeCategory, keyof typeof Ionicons.glyphMap> = {
  vehiculo: 'car-sport-outline',
  inmueble: 'home-outline',
  otro: 'gift-outline',
};

type PremioStepProps = {
  wizard: CreateRifaWizard;
};

/** Paso 2: plan de premios (fase 2.2 del PDF) — categoría del bien + specs + valor comercial. */
export function PremioStep({ wizard }: PremioStepProps) {
  const { premio } = wizard.state;
  const errors = wizard.visibleErrors;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Categoría del bien</Text>
      <View style={styles.categoryRow}>
        {PRIZE_CATEGORIES.map((category) => {
          const isSelected = premio.category === category.value;
          return (
            <Pressable
              key={category.value}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={category.label}
              onPress={() => wizard.setCategory(category.value)}
              style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
            >
              <View style={[styles.categoryIcon, isSelected && styles.categoryIconSelected]}>
                <Ionicons
                  name={CATEGORY_ICONS[category.value]}
                  size={20}
                  color={isSelected ? colors.textOnGold : colors.textSecondary}
                />
              </View>
              <Text style={[styles.categoryLabel, isSelected && styles.categoryLabelSelected]}>
                {category.label}
              </Text>
              <Text style={styles.categoryHint}>{category.hint}</Text>
            </Pressable>
          );
        })}
      </View>
      {errors.category ? <Text style={styles.categoryError}>{errors.category}</Text> : null}

      {premio.category === 'vehiculo' ? (
        <>
          <Text style={styles.sectionLabel}>Especificaciones técnicas</Text>
          <ClayTextInput
            label="Marca"
            value={premio.brand}
            onChangeText={(value) => wizard.setPremio('brand', value)}
            placeholder="Ej: Renault"
            autoCapitalize="words"
            icon="car-outline"
            error={errors.brand}
          />
          <ClayTextInput
            label="Modelo"
            value={premio.model}
            onChangeText={(value) => wizard.setPremio('model', value)}
            placeholder="Ej: Logan"
            autoCapitalize="words"
            icon="pricetag-outline"
            error={errors.model}
          />
          <ClayTextInput
            label="Año"
            value={premio.year}
            onChangeText={(value) => wizard.setPremio('year', value.replace(/\D/g, '').slice(0, 4))}
            placeholder="Ej: 2026"
            keyboardType="number-pad"
            maxLength={4}
            icon="calendar-outline"
            error={errors.year}
          />
          <ClayTextInput
            label="Color"
            value={premio.color}
            onChangeText={(value) => wizard.setPremio('color', value)}
            placeholder="Ej: Rojo fuego"
            autoCapitalize="words"
            icon="color-fill-outline"
            error={errors.color}
          />
        </>
      ) : null}

      {premio.category === 'inmueble' ? (
        <>
          <Text style={styles.sectionLabel}>Especificaciones del inmueble</Text>
          <ClayTextInput
            label="Ciudad"
            value={premio.city}
            onChangeText={(value) => wizard.setPremio('city', value)}
            placeholder="Ej: Ibagué"
            autoCapitalize="words"
            icon="location-outline"
            error={errors.city}
          />
          <ClayTextInput
            label="Descripción"
            value={premio.description}
            onChangeText={(value) => wizard.setPremio('description', value)}
            placeholder="Ej: Apartamento de 62 m² en el barrio..."
            autoCapitalize="sentences"
            icon="home-outline"
            error={errors.description}
          />
        </>
      ) : null}

      {premio.category === 'otro' ? (
        <>
          <Text style={styles.sectionLabel}>¿Qué vas a rifar?</Text>
          <ClayTextInput
            label="Descripción del bien"
            value={premio.description}
            onChangeText={(value) => wizard.setPremio('description', value)}
            placeholder="Ej: Motocarro de carga 0 km..."
            autoCapitalize="sentences"
            icon="gift-outline"
            error={errors.description}
          />
        </>
      ) : null}

      {premio.category ? (
        <ClayTextInput
          label="Valor comercial del premio"
          value={formatThousands(premio.commercialValueRaw)}
          onChangeText={(value) =>
            wizard.setPremio('commercialValueRaw', value.replace(/\D/g, '').slice(0, 12))
          }
          placeholder="Ej: 45.000.000"
          keyboardType="number-pad"
          icon="cash-outline"
          error={errors.commercialValue}
          helper={
            wizard.projection
              ? `Mínimo legal para tu emisión: ${formatCop(wizard.projection.prizeMinimum)}.`
              : undefined
          }
        />
      ) : null}
    </View>
  );
}
