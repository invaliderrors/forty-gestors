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

  /** El usuario eligió una fecha en el calendario. */
  const handleValueChange = (_event: unknown, date: Date) => {
    setIsOpen(false);
    onPick(dateToDisplay(date));
  };

  /** El usuario cerró el calendario sin elegir. */
  const handleDismiss = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open: () => setIsOpen(true),
    pickerValue,
    minimumDate: tomorrow,
    handleValueChange,
    handleDismiss,
  };
}
