import { useState } from 'react';

/**
 * Estado de los sheets encadenados del premio:
 * vehículo (tipo → marca) y otro bien (subcategoría → tipo → marca).
 */
export function usePrizeFormSheets() {
  const [isVehicleTypeOpen, setIsVehicleTypeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isOtherCategoryOpen, setIsOtherCategoryOpen] = useState(false);
  const [isOtherKindOpen, setIsOtherKindOpen] = useState(false);

  return {
    isVehicleTypeOpen,
    openVehicleType: () => setIsVehicleTypeOpen(true),
    closeVehicleType: () => setIsVehicleTypeOpen(false),
    isBrandOpen,
    openBrand: () => setIsBrandOpen(true),
    closeBrand: () => setIsBrandOpen(false),
    isOtherCategoryOpen,
    openOtherCategory: () => setIsOtherCategoryOpen(true),
    closeOtherCategory: () => setIsOtherCategoryOpen(false),
    isOtherKindOpen,
    openOtherKind: () => setIsOtherKindOpen(true),
    closeOtherKind: () => setIsOtherKindOpen(false),
  };
}
