import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { computeWalletSummary, type WalletMovement, type WalletSummary } from '@/domain/billetera/types';
import { useServices } from '@/providers/ServicesProvider';

type WalletState =
  | { status: 'loading' }
  | { status: 'ready'; movements: WalletMovement[]; summary: WalletSummary }
  | { status: 'error' };

/** Movimientos + resumen de tesorería; se recarga al ganar foco. */
export function useWallet() {
  const { wallet } = useServices();
  const [state, setState] = useState<WalletState>({ status: 'loading' });

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      wallet
        .getMovements()
        .then((movements) => {
          if (isActive) {
            const sorted = [...movements].sort((a, b) =>
              b.occurredAt.localeCompare(a.occurredAt),
            );
            setState({ status: 'ready', movements: sorted, summary: computeWalletSummary(sorted) });
          }
        })
        .catch(() => {
          if (isActive) {
            setState({ status: 'error' });
          }
        });
      return () => {
        isActive = false;
      };
    }, [wallet]),
  );

  return state;
}
