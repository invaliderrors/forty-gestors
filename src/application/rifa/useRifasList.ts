import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import type { Rifa } from '@/domain/rifa/types';
import { useServices } from '@/providers/ServicesProvider';

type ListState =
  | { status: 'loading' }
  | { status: 'ready'; rifas: Rifa[] }
  | { status: 'error' };

/** Rifas del gestor; se recarga cada vez que la pantalla gana foco. */
export function useRifasList() {
  const { rifas } = useServices();
  const [state, setState] = useState<ListState>({ status: 'loading' });

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      rifas
        .list()
        .then((items) => {
          if (isActive) {
            setState({ status: 'ready', rifas: items });
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
    }, [rifas]),
  );

  return state;
}
