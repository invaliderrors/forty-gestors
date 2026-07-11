import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import type { Seller } from '@/domain/vendedores/types';
import { useServices } from '@/providers/ServicesProvider';

type ListState =
  | { status: 'loading' }
  | { status: 'ready'; sellers: Seller[] }
  | { status: 'error' };

/** Vendedores del gestor + cambio de estado (activar/desactivar). */
export function useSellersList() {
  const { sellers } = useServices();
  const [state, setState] = useState<ListState>({ status: 'loading' });
  const [busySellerId, setBusySellerId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const items = await sellers.list();
      setState({ status: 'ready', sellers: items });
    } catch {
      setState({ status: 'error' });
    }
  }, [sellers]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const toggleStatus = async (id: string, currentStatus: string) => {
    setBusySellerId(id);
    try {
      await sellers.setStatus(id, currentStatus === 'inactivo' ? 'activo' : 'inactivo');
      await load();
    } finally {
      setBusySellerId(null);
    }
  };

  const removeSeller = async (id: string) => {
    setBusySellerId(id);
    try {
      await sellers.remove(id);
      await load();
    } finally {
      setBusySellerId(null);
    }
  };

  return { state, busySellerId, toggleStatus, removeSeller };
}
