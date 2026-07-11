import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

/** Diacríticos combinantes (U+0300–U+036F) que NFD separa de la letra base. */
const DIACRITICS_RE = new RegExp('[\\u0300-\\u036f]', 'g');

/** Normaliza para búsqueda: minúsculas y sin acentos. */
function normalize(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(DIACRITICS_RE, '');
}

export type PickerOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

type ClayPickerSheetProps<T extends string> = {
  visible: boolean;
  title: string;
  options: readonly PickerOption<T>[];
  selectedValue?: T | null;
  onSelect: (value: T) => void;
  onClose: () => void;
  /** Muestra un buscador arriba de la lista (útil con muchas opciones). */
  searchable?: boolean;
};

/** Bottom sheet clay para selección de opciones (departamentos, fuentes de archivo, etc.). */
export function ClayPickerSheet<T extends string>({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
  searchable = false,
}: ClayPickerSheetProps<T>) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const visibleOptions = useMemo(() => {
    if (!searchable || query.trim().length === 0) {
      return options as PickerOption<T>[];
    }
    const needle = normalize(query.trim());
    return (options as PickerOption<T>[]).filter((option) =>
      normalize(option.label).includes(needle),
    );
  }, [options, query, searchable]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      onShow={() => setQuery('')}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Cerrar" />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xl }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>{title}</Text>
          {searchable ? (
            <View style={styles.searchField}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar..."
                placeholderTextColor={colors.inputPlaceholder}
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel={`Buscar en ${title}`}
              />
              {query.length > 0 ? (
                <Pressable onPress={() => setQuery('')} hitSlop={8} accessibilityLabel="Limpiar búsqueda">
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </Pressable>
              ) : null}
            </View>
          ) : null}
          <FlatList
            data={visibleOptions}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.emptyLabel}>Sin resultados para “{query.trim()}”.</Text>
            }
            keyExtractor={(option) => option.value}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = item.value === selectedValue;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => {
                    onSelect(item.value);
                    onClose();
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    isSelected && styles.optionSelected,
                    pressed && styles.optionPressed,
                  ]}
                >
                  {item.icon ? (
                    <View style={[styles.optionIcon, isSelected && styles.optionIconSelected]}>
                      <Ionicons
                        name={item.icon}
                        size={18}
                        color={isSelected ? colors.accentDeep : colors.textSecondary}
                      />
                    </View>
                  ) : null}
                  <View style={styles.optionBody}>
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {item.label}
                    </Text>
                    {item.description ? (
                      <Text style={styles.optionDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                  {isSelected ? (
                    <Ionicons name="checkmark-circle" size={20} color={colors.accentDeep} />
                  ) : null}
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4,8,15,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surfaceModal,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    borderTopWidth: 1,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    maxHeight: '72%',
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceDepth,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.inputBg,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    minHeight: 46,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    paddingVertical: 10,
  },
  emptyLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  list: {
    flexGrow: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    marginBottom: spacing.sm,
  },
  optionSelected: {
    borderColor: colors.inputBorderFocused,
    backgroundColor: colors.accentSoftBg,
  },
  optionPressed: {
    opacity: 0.75,
  },
  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconSelected: {
    backgroundColor: colors.surface,
  },
  optionBody: {
    flex: 1,
  },
  optionLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  optionLabelSelected: {
    color: colors.accentDeep,
  },
  optionDescription: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
