import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import type { CreateRifaWizard, PrizeFormData } from '@/application/rifa/useCreateRifaWizard';
import { DocumentUploadCard } from '@/components/register/DocumentUploadCard';
import { ClayCheckbox } from '@/components/shared/clay/ClayCheckbox';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayPickerSheet, type PickerOption } from '@/components/shared/clay/ClayPickerSheet';
import { ClaySelectField } from '@/components/shared/clay/ClaySelectField';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { ClayPermissionModal } from '@/components/shared/ClayPermissionModal';
import { brandsForOtherGood, otherGoodDef, OTHER_GOOD_CATEGORIES, OTHER_KIND } from '@/domain/rifa/otherGoods';
import { PRIZE_CATEGORIES, requiresOwnershipProof, type PrizeCategory } from '@/domain/rifa/types';
import { brandsForVehicleType, OTHER_BRAND, VEHICLE_TYPES } from '@/domain/rifa/vehicles';
import type { MediaSource } from '@/domain/media/types';
import type { DocumentSlot } from '@/domain/registration/types';
import { prizeErrorKey } from '@/application/rifa/useCreateRifaWizard';
import { formatCop, formatThousands } from '@/domain/shared/money';
import { useDocumentSourceFlow } from '@/hooks/register/useDocumentSourceFlow';
import { usePrizeFormSheets } from '@/hooks/rifas/usePrizeFormSheets';
import { useServices } from '@/providers/ServicesProvider';
import { createRifaStepsStyles as stepStyles } from '@/styles/rifas/createRifaSteps.styles';
import { prizeFormStyles as styles } from '@/styles/rifas/prizeForm.styles';
import { colors } from '@/theme';

const CATEGORY_ICONS: Record<PrizeCategory, keyof typeof Ionicons.glyphMap> = {
  vehiculo: 'car-sport-outline',
  inmueble: 'home-outline',
  otro: 'gift-outline',
};

/** Soporte de propiedad exigido para vehículos e inmuebles. */
const INVOICE_SLOT: DocumentSlot = {
  kind: 'factura_compra',
  title: 'Factura de compra original',
  hint: 'Emitida por el concesionario o la constructora, que acredita el bien.',
  accepts: ['pdf', 'image'],
  required: true,
};

const INVOICE_SOURCE_OPTIONS: PickerOption<MediaSource>[] = [
  {
    value: 'camera',
    label: 'Tomar foto',
    description: 'Captura la factura con la cámara.',
    icon: 'camera-outline',
  },
  {
    value: 'gallery',
    label: 'Elegir de la galería',
    description: 'Usa una foto que ya tengas.',
    icon: 'images-outline',
  },
  {
    value: 'file',
    label: 'Subir archivo',
    description: 'PDF o imagen desde tus archivos.',
    icon: 'document-attach-outline',
  },
];

const vehicleTypeOptions = VEHICLE_TYPES.map((type) => ({ value: type, label: type }));
const otherCategoryOptions = OTHER_GOOD_CATEGORIES.map((def) => ({
  value: def.label,
  label: def.label,
}));

type PrizeFormProps = {
  index: number;
  prize: PrizeFormData;
  wizard: CreateRifaWizard;
};

/** Formulario de UN premio del plan: categoría, specs, valor y soportes legales. */
export function PrizeForm({ index, prize, wizard }: PrizeFormProps) {
  const { mediaPicker } = useServices();
  const errors = wizard.visibleErrors;
  const key = (field: string) => prizeErrorKey(index, field);
  const isPrincipal = index === 0;

  const sheets = usePrizeFormSheets();
  const invoiceFlow = useDocumentSourceFlow({
    mediaPicker,
    attachDocument: (_kind, file) => wizard.attachInvoice(index, file),
  });

  const otherDef = otherGoodDef(prize.otherCategory);
  const brandSource =
    prize.category === 'otro'
      ? brandsForOtherGood(prize.otherCategory)
      : brandsForVehicleType(prize.vehicleType);
  const brandOptions = brandSource.map((brand) => ({ value: brand, label: brand }));
  const otherKindOptions = (otherDef?.kinds ?? []).map((kind) => ({ value: kind, label: kind }));
  const needsOtherDescription =
    otherDef !== null &&
    (otherDef.requiresDescription === true ||
      (otherDef.kinds !== undefined && prize.otherKind === OTHER_KIND));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Ionicons name={isPrincipal ? 'trophy' : 'gift'} size={12} color={colors.ctaDepth} />
          <Text style={styles.headerBadgeLabel}>
            {isPrincipal ? 'Premio principal' : `Premio ${index + 1}`}
          </Text>
        </View>
        <View style={styles.headerSpacer} />
        {!isPrincipal ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Quitar premio ${index + 1}`}
            onPress={() => wizard.removePrize(index)}
            hitSlop={8}
            style={styles.removeButton}
          >
            <Ionicons name="trash-outline" size={16} color={colors.danger} />
          </Pressable>
        ) : null}
      </View>

      <View style={stepStyles.categoryRow}>
        {PRIZE_CATEGORIES.map((category) => {
          const isSelected = prize.category === category.value;
          return (
            <Pressable
              key={category.value}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={category.label}
              onPress={() => wizard.setPrizeCategory(index, category.value)}
              style={[stepStyles.categoryChip, isSelected && stepStyles.categoryChipSelected]}
            >
              <View style={[stepStyles.categoryIcon, isSelected && stepStyles.categoryIconSelected]}>
                <Ionicons
                  name={CATEGORY_ICONS[category.value]}
                  size={20}
                  color={isSelected ? colors.textOnGold : colors.textSecondary}
                />
              </View>
              <Text
                style={[stepStyles.categoryLabel, isSelected && stepStyles.categoryLabelSelected]}
              >
                {category.label}
              </Text>
              <Text style={stepStyles.categoryHint}>{category.hint}</Text>
            </Pressable>
          );
        })}
      </View>
      {errors[key('category')] ? (
        <Text style={stepStyles.categoryError}>{errors[key('category')]}</Text>
      ) : null}

      {prize.category === 'vehiculo' ? (
        <>
          <ClaySelectField
            label="Tipo de vehículo"
            value={prize.vehicleType || null}
            placeholder="Selecciona el tipo"
            icon="car-sport-outline"
            onPress={sheets.openVehicleType}
            error={errors[key('vehicleType')]}
          />
          <ClaySelectField
            label="Marca"
            value={prize.brand || null}
            placeholder={prize.vehicleType ? 'Selecciona la marca' : 'Elige primero el tipo'}
            icon="pricetag-outline"
            onPress={() => {
              if (prize.vehicleType) {
                sheets.openBrand();
              } else {
                sheets.openVehicleType();
              }
            }}
            error={errors[key('brand')]}
          />
          {prize.brand === OTHER_BRAND ? (
            <ClayTextInput
              label="¿Cuál marca?"
              value={prize.brandOther}
              onChangeText={(value) => wizard.setPrizeField(index, 'brandOther', value)}
              placeholder="Escribe la marca"
              autoCapitalize="words"
              icon="create-outline"
              error={errors[key('brandOther')]}
            />
          ) : null}
          <ClayTextInput
            label="Modelo"
            value={prize.model}
            onChangeText={(value) => wizard.setPrizeField(index, 'model', value)}
            placeholder="Ej: Logan Zen"
            autoCapitalize="words"
            icon="pricetags-outline"
            error={errors[key('model')]}
          />
          <ClayTextInput
            label="Año"
            value={prize.year}
            onChangeText={(value) =>
              wizard.setPrizeField(index, 'year', value.replace(/\D/g, '').slice(0, 4))
            }
            placeholder="Ej: 2026"
            keyboardType="number-pad"
            maxLength={4}
            icon="calendar-outline"
            error={errors[key('year')]}
          />
          <ClayTextInput
            label="Color"
            value={prize.color}
            onChangeText={(value) => wizard.setPrizeField(index, 'color', value)}
            placeholder="Ej: Rojo fuego"
            autoCapitalize="words"
            icon="color-fill-outline"
            error={errors[key('color')]}
          />
        </>
      ) : null}

      {prize.category === 'inmueble' ? (
        <>
          <ClayTextInput
            label="Ciudad"
            value={prize.city}
            onChangeText={(value) => wizard.setPrizeField(index, 'city', value)}
            placeholder="Ej: Ibagué"
            autoCapitalize="words"
            icon="location-outline"
            error={errors[key('city')]}
          />
          <ClayTextInput
            label="Descripción"
            value={prize.description}
            onChangeText={(value) => wizard.setPrizeField(index, 'description', value)}
            placeholder="Ej: Apartamento de 62 m² en el barrio..."
            autoCapitalize="sentences"
            icon="home-outline"
            error={errors[key('description')]}
          />
        </>
      ) : null}

      {prize.category === 'otro' ? (
        <>
          <ClaySelectField
            label="¿Qué tipo de bien?"
            value={prize.otherCategory || null}
            placeholder="Electrodoméstico, viaje, efectivo..."
            icon="gift-outline"
            onPress={sheets.openOtherCategory}
            error={errors[key('otherCategory')]}
          />
          {otherDef?.kinds ? (
            <ClaySelectField
              label="Tipo"
              value={prize.otherKind || null}
              placeholder={`Ej: ${otherDef.kinds[0]}`}
              icon="list-outline"
              onPress={sheets.openOtherKind}
              error={errors[key('otherKind')]}
            />
          ) : null}
          {otherDef?.brands ? (
            <>
              <ClaySelectField
                label="Marca"
                value={prize.brand || null}
                placeholder="Selecciona la marca"
                icon="pricetag-outline"
                onPress={sheets.openBrand}
                error={errors[key('brand')]}
              />
              {prize.brand === OTHER_BRAND ? (
                <ClayTextInput
                  label="¿Cuál marca?"
                  value={prize.brandOther}
                  onChangeText={(value) => wizard.setPrizeField(index, 'brandOther', value)}
                  placeholder="Escribe la marca"
                  autoCapitalize="words"
                  icon="create-outline"
                  error={errors[key('brandOther')]}
                />
              ) : null}
            </>
          ) : null}
          {needsOtherDescription ? (
            <ClayTextInput
              label={otherDef?.descriptionLabel ?? 'Descripción del bien'}
              value={prize.description}
              onChangeText={(value) => wizard.setPrizeField(index, 'description', value)}
              placeholder="Ej: Viaje a San Andrés para 2 personas, 4 noches..."
              autoCapitalize="sentences"
              icon="create-outline"
              error={errors[key('description')]}
            />
          ) : null}
          {otherDef && !needsOtherDescription && otherDef.label !== 'Efectivo' ? (
            <ClayTextInput
              label="Detalles (opcional)"
              value={prize.description}
              onChangeText={(value) => wizard.setPrizeField(index, 'description', value)}
              placeholder="Ej: No frost, 300 litros..."
              autoCapitalize="sentences"
              icon="create-outline"
            />
          ) : null}
        </>
      ) : null}

      {prize.category ? (
        <ClayTextInput
          label="Valor comercial del premio"
          value={formatThousands(prize.commercialValueRaw)}
          onChangeText={(value) =>
            wizard.setPrizeField(index, 'commercialValueRaw', value.replace(/\D/g, '').slice(0, 12))
          }
          placeholder="Ej: 45.000.000"
          keyboardType="number-pad"
          icon="cash-outline"
          error={errors[key('commercialValue')]}
          helper={
            isPrincipal && wizard.projection
              ? `El plan completo debe sumar al menos ${formatCop(wizard.projection.prizeMinimum)}.`
              : undefined
          }
        />
      ) : null}

      {prize.category && requiresOwnershipProof(prize.category) ? (
        <>
          {invoiceFlow.pickError ? (
            <ClayNotice tone="error" message={invoiceFlow.pickError} />
          ) : null}
          <DocumentUploadCard
            slot={INVOICE_SLOT}
            attachment={prize.invoice}
            error={errors[key('invoice')]}
            onPick={() => invoiceFlow.setActiveSlot(INVOICE_SLOT)}
            onRemove={() => wizard.removeInvoice(index)}
          />

          <View style={styles.swornBox}>
            <ClayCheckbox
              checked={prize.swornAccepted}
              onToggle={() => wizard.togglePrizeSworn(index)}
              label="Declaro bajo juramento que el bien es nuevo (de paquete) y que cuento con la factura de compra original que lo acredita."
              error={errors[key('sworn')]}
            />
          </View>
        </>
      ) : null}

      <ClayPickerSheet
        visible={sheets.isVehicleTypeOpen}
        title="Tipo de vehículo"
        options={vehicleTypeOptions}
        selectedValue={prize.vehicleType || null}
        onSelect={(value) => {
          if (value !== prize.vehicleType) {
            // La marca depende del tipo: al cambiarlo se limpia.
            wizard.setPrizeField(index, 'brand', '');
            wizard.setPrizeField(index, 'brandOther', '');
          }
          wizard.setPrizeField(index, 'vehicleType', value);
        }}
        onClose={sheets.closeVehicleType}
      />
      <ClayPickerSheet
        visible={sheets.isBrandOpen}
        title={
          prize.category === 'otro'
            ? `Marcas — ${prize.otherCategory || 'bien'}`
            : prize.vehicleType
              ? `Marcas — ${prize.vehicleType}`
              : 'Marca'
        }
        options={brandOptions}
        selectedValue={prize.brand || null}
        searchable
        onSelect={(value) => wizard.setPrizeField(index, 'brand', value)}
        onClose={sheets.closeBrand}
      />
      <ClayPickerSheet
        visible={sheets.isOtherCategoryOpen}
        title="¿Qué tipo de bien?"
        options={otherCategoryOptions}
        selectedValue={prize.otherCategory || null}
        onSelect={(value) => {
          if (value !== prize.otherCategory) {
            // Tipo y marca dependen de la subcategoría: al cambiarla se limpian.
            wizard.setPrizeField(index, 'otherKind', '');
            wizard.setPrizeField(index, 'brand', '');
            wizard.setPrizeField(index, 'brandOther', '');
          }
          wizard.setPrizeField(index, 'otherCategory', value);
        }}
        onClose={sheets.closeOtherCategory}
      />
      <ClayPickerSheet
        visible={sheets.isOtherKindOpen}
        title={prize.otherCategory ? `Tipo — ${prize.otherCategory}` : 'Tipo'}
        options={otherKindOptions}
        selectedValue={prize.otherKind || null}
        onSelect={(value) => wizard.setPrizeField(index, 'otherKind', value)}
        onClose={sheets.closeOtherKind}
      />
      <ClayPickerSheet
        visible={invoiceFlow.activeSlot !== null}
        title={INVOICE_SLOT.title}
        options={INVOICE_SOURCE_OPTIONS}
        onSelect={(source) => {
          void invoiceFlow.handleSource(INVOICE_SLOT, source);
        }}
        onClose={() => invoiceFlow.setActiveSlot(null)}
      />
      <ClayPermissionModal
        visible={invoiceFlow.permissionRequest !== null}
        kind={invoiceFlow.permissionRequest?.permission ?? 'camera'}
        blocked={invoiceFlow.permissionRequest?.blocked ?? false}
        onAllow={() => void invoiceFlow.handleAllowPermission()}
        onOpenSettings={invoiceFlow.handleOpenSettings}
        onDismiss={() => invoiceFlow.setPermissionRequest(null)}
      />
    </View>
  );
}
