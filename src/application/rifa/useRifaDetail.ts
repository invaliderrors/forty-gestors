import { useEffect, useState } from 'react';

import type { Rifa } from '@/domain/rifa/types';
import { useServices } from '@/providers/ServicesProvider';

type DetailState =
  | { status: 'loading' }
  | { status: 'ready'; rifa: Rifa }
  | { status: 'not_found' }
  | { status: 'error' };

/** Detalle de una rifa por su número institucional. */
export function useRifaDetail(id: string) {
  const { rifas } = useServices();
  const [state, setState] = useState<DetailState>({ status: 'loading' });

  useEffect(() => {
    let isActive = true;
    rifas
      .getById(id)
      .then((rifa) => {
        if (isActive) {
          setState(rifa ? { status: 'ready', rifa } : { status: 'not_found' });
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
  }, [id, rifas]);

  return state;
}
