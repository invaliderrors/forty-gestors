import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { clayPickerSheetStyles as styles } from '@/styles/clay/clayPickerSheet.styles';
import { colors, spacing } from '@/theme';

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
