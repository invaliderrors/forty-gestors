import { useState } from 'react';

import { computeRifaProjection, type RifaProjection } from '@/domain/rifa/normative';

const MIN_TICKETS = 2;
const MIN_TICKET_PRICE = 100;

/** Estado del formulario de emisión + proyección normativa en vivo. */
export function useRifaCalculator() {
  const [ticketCountRaw, setTicketCountRaw] = useState('');
  const [ticketPriceRaw, setTicketPriceRaw] = useState('');

  const ticketCount = Number.parseInt(ticketCountRaw, 10) || 0;
  const ticketPrice = Number.parseInt(ticketPriceRaw, 10) || 0;

  const projection: RifaProjection | null =
    ticketCount >= MIN_TICKETS && ticketPrice >= MIN_TICKET_PRICE
      ? computeRifaProjection(ticketCount, ticketPrice)
      : null;

  return {
    ticketCountRaw,
    ticketPriceRaw,
    setTicketCount: (value: string) => setTicketCountRaw(value.replace(/\D/g, '').slice(0, 7)),
    setTicketPrice: (value: string) => setTicketPriceRaw(value.replace(/\D/g, '').slice(0, 9)),
    projection,
  };
}

export type RifaCalculator = ReturnType<typeof useRifaCalculator>;
