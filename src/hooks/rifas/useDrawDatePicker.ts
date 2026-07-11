import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';

import { dateToDisplay, displayToDate } from '@/domain/rifa/validators';

/**
 * Estado del calendario nativo para la fecha del sorteo: la persona puede
 * escribir la fecha o seleccionarla; al elegir en el calendario se vuelca
 * al campo en formato DD/MM/AAAA.
 */
export function useDrawDatePicker(currentDisplay: string, onPick: (display: string) => void) {
  const [isOpen, setIsOpen] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const typed = displayToDate(currentDisplay);
  const pickerValue = typed && typed >= tomorrow ? typed : tomorrow;

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    // Android dispara 'set' o 'dismissed' una sola vez; se cierra siempre.
    setIsOpen(false);
    if (event.type === 'set' && date) {
      onPick(dateToDisplay(date));
    }
  };

  return {
    isOpen,
    open: () => setIsOpen(true),
    pickerValue,
    minimumDate: tomorrow,
    handleChange,
  };
}
