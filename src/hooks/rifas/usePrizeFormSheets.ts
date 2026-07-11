import { useState } from 'react';

/** Estado de los sheets encadenados del premio: tipo de vehículo → marca. */
export function usePrizeFormSheets() {
  const [isVehicleTypeOpen, setIsVehicleTypeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  return {
    isVehicleTypeOpen,
    openVehicleType: () => setIsVehicleTypeOpen(true),
    closeVehicleType: () => setIsVehicleTypeOpen(false),
    isBrandOpen,
    openBrand: () => setIsBrandOpen(true),
    closeBrand: () => setIsBrandOpen(false),
  };
}
