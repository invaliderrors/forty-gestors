import { useMemo, useReducer } from 'react';

import { analyzeDocument } from '@/application/registration/analyzeDocument';
import { AppError } from '@/domain/auth/errors';
import type { DocumentAnalysis, DocumentAttachment } from '@/domain/documents/analysis';
import type { PickedFile } from '@/domain/media/types';
import { computeRifaProjection, type RifaProjection } from '@/domain/rifa/normative';
import {
  requiresOwnershipProof,
  type PrizeCategory,
  type Rifa,
  type RifaPrize,
} from '@/domain/rifa/types';
import { isValidVehicleYear, parseDrawDate } from '@/domain/rifa/validators';
import { OTHER_BRAND } from '@/domain/rifa/vehicles';
import { formatCop } from '@/domain/shared/money';
import { useServices } from '@/providers/ServicesProvider';

export const CREATE_RIFA_STEPS = ['Emisión', 'Premios', 'Revisión'] as const;

export type CreateRifaStep = 0 | 1 | 2;

type EmisionData = {
  name: string;
  ticketCountRaw: string;
  ticketPriceRaw: string;
  /** DD/MM/AAAA tal como se escribe. */
  drawDateRaw: string;
};

export type PrizeFormData = {
  category: PrizeCategory | null;
  vehicleType: string;
  brand: string;
  brandOther: string;
  model: string;
  year: string;
  color: string;
  city: string;
  description: string;
  commercialValueRaw: string;
  /** Declaración juramentada: bien nuevo (de paquete) con factura original. */
  swornAccepted: boolean;
  /** Soporte de propiedad: factura de compra original (con verificación OCR). */
  invoice: DocumentAttachment | null;
};

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'error'; message: string }
  | { status: 'success'; rifa: Rifa };

type WizardState = {
  step: CreateRifaStep;
  showErrors: boolean;
  emision: EmisionData;
  prizes: PrizeFormData[];
  submit: SubmitState;
};

type WizardAction =
  | { type: 'set_emision'; field: keyof EmisionData; value: string }
  | { type: 'set_prize_field'; index: number; field: keyof PrizeFormData; value: string }
  | { type: 'set_prize_category'; index: number; category: PrizeCategory }
  | { type: 'toggle_prize_sworn'; index: number }
  | { type: 'attach_invoice'; index: number; file: PickedFile }
  | { type: 'invoice_analyzed'; index: number; uri: string; analysis: DocumentAnalysis }
  | { type: 'remove_invoice'; index: number }
  | { type: 'add_prize' }
  | { type: 'remove_prize'; index: number }
  | { type: 'show_errors' }
  | { type: 'go_next' }
  | { type: 'go_back' }
  | { type: 'submit_started' }
  | { type: 'submit_failed'; message: string }
  | { type: 'submit_succeeded'; rifa: Rifa };

function emptyPrize(): PrizeFormData {
  return {
    category: null,
    vehicleType: '',
    brand: '',
    brandOther: '',
    model: '',
    year: '',
    color: '',
    city: '',
    description: '',
    commercialValueRaw: '',
    swornAccepted: false,
    invoice: null,
  };
}

const initialState: WizardState = {
  step: 0,
  showErrors: false,
  emision: { name: '', ticketCountRaw: '', ticketPriceRaw: '', drawDateRaw: '' },
  prizes: [emptyPrize()],
  submit: { status: 'idle' },
};

function updatePrize(
  prizes: PrizeFormData[],
  index: number,
  patch: Partial<PrizeFormData>,
): PrizeFormData[] {
  return prizes.map((prize, i) => (i === index ? { ...prize, ...patch } : prize));
}

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'set_emision':
      return { ...state, emision: { ...state.emision, [action.field]: action.value } };
    case 'set_prize_field':
      return {
        ...state,
        prizes: updatePrize(state.prizes, action.index, { [action.field]: action.value }),
      };
    case 'set_prize_category':
      // Cambiar de categoría limpia specs y soportes: son requisitos distintos.
      return {
        ...state,
        prizes: updatePrize(state.prizes, action.index, {
          ...emptyPrize(),
          category: action.category,
          commercialValueRaw: state.prizes[action.index]?.commercialValueRaw ?? '',
        }),
      };
    case 'toggle_prize_sworn':
      return {
        ...state,
        prizes: updatePrize(state.prizes, action.index, {
          swornAccepted: !state.prizes[action.index]?.swornAccepted,
        }),
      };
    case 'attach_invoice':
      return {
        ...state,
        prizes: updatePrize(state.prizes, action.index, {
          invoice: { file: action.file, analysis: { status: 'analyzing' } },
        }),
      };
    case 'invoice_analyzed': {
      const current = state.prizes[action.index]?.invoice;
      if (!current || current.file.uri !== action.uri) {
        return state;
      }
      return {
        ...state,
        prizes: updatePrize(state.prizes, action.index, {
          invoice: { ...current, analysis: action.analysis },
        }),
      };
    }
    case 'remove_invoice':
      return { ...state, prizes: updatePrize(state.prizes, action.index, { invoice: null }) };
    case 'add_prize':
      return { ...state, prizes: [...state.prizes, emptyPrize()], showErrors: false };
    case 'remove_prize':
      // El principal (índice 0) no se elimina.
      if (action.index === 0) {
        return state;
      }
      return { ...state, prizes: state.prizes.filter((_, i) => i !== action.index) };
    case 'show_errors':
      return { ...state, showErrors: true };
    case 'go_next':
      return { ...state, step: Math.min(state.step + 1, 2) as CreateRifaStep, showErrors: false };
    case 'go_back':
      return { ...state, step: Math.max(state.step - 1, 0) as CreateRifaStep, showErrors: false };
    case 'submit_started':
      return { ...state, submit: { status: 'submitting' } };
    case 'submit_failed':
      return { ...state, submit: { status: 'error', message: action.message } };
    case 'submit_succeeded':
      return { ...state, submit: { status: 'success', rifa: action.rifa } };
    default:
      return state;
  }
}

export type WizardErrors = Partial<Record<string, string>>;

function validateEmision(emision: EmisionData): WizardErrors {
  const errors: WizardErrors = {};
  if (emision.name.trim().length < 4) {
    errors.name = 'Dale un nombre a tu rifa (mínimo 4 caracteres).';
  }
  const count = Number.parseInt(emision.ticketCountRaw, 10) || 0;
  if (count < 2) {
    errors.ticketCount = 'Escribe la cantidad total de boletas.';
  }
  const price = Number.parseInt(emision.ticketPriceRaw, 10) || 0;
  if (price < 100) {
    errors.ticketPrice = 'Escribe el valor por boleta (mínimo $ 100).';
  }
  if (parseDrawDate(emision.drawDateRaw) === null) {
    errors.drawDate = 'Escribe una fecha futura válida (DD/MM/AAAA).';
  }
  return errors;
}

export function prizeErrorKey(index: number, field: string): string {
  return `p${index}_${field}`;
}

function prizeValue(prize: PrizeFormData): number {
  return Number.parseInt(prize.commercialValueRaw, 10) || 0;
}

function validatePrize(prize: PrizeFormData, index: number): WizardErrors {
  const errors: WizardErrors = {};
  const key = (field: string) => prizeErrorKey(index, field);

  if (!prize.category) {
    errors[key('category')] = 'Selecciona la categoría del bien.';
    return errors;
  }

  if (prize.category === 'vehiculo') {
    if (!prize.vehicleType) {
      errors[key('vehicleType')] = 'Selecciona el tipo de vehículo.';
    }
    if (!prize.brand) {
      errors[key('brand')] = 'Selecciona la marca.';
    } else if (prize.brand === OTHER_BRAND && prize.brandOther.trim().length < 2) {
      errors[key('brandOther')] = 'Escribe la marca.';
    }
    if (prize.model.trim().length < 2) {
      errors[key('model')] = 'Escribe el modelo (ej: Logan).';
    }
    if (!isValidVehicleYear(prize.year)) {
      errors[key('year')] = 'Escribe un año válido (ej: 2026).';
    }
    if (prize.color.trim().length < 3) {
      errors[key('color')] = 'Escribe el color.';
    }
  }
  if (prize.category === 'inmueble') {
    if (prize.city.trim().length < 3) {
      errors[key('city')] = 'Escribe la ciudad del inmueble.';
    }
    if (prize.description.trim().length < 10) {
      errors[key('description')] = 'Describe el inmueble (tipo, área, ubicación...).';
    }
  }
  if (prize.category === 'otro' && prize.description.trim().length < 10) {
    errors[key('description')] = 'Describe el bien que vas a rifar.';
  }

  if (prizeValue(prize) <= 0) {
    errors[key('commercialValue')] = 'Escribe el valor comercial del premio.';
  }

  if (requiresOwnershipProof(prize.category)) {
    if (!prize.swornAccepted) {
      errors[key('sworn')] = 'Debes aceptar la declaración juramentada para continuar.';
    }
    if (!prize.invoice) {
      errors[key('invoice')] = 'Adjunta la factura de compra original.';
    } else if (prize.invoice.analysis.status === 'analyzing') {
      errors[key('invoice')] = 'Estamos verificando la factura, espera un momento.';
    } else if (prize.invoice.analysis.status === 'rejected') {
      errors[key('invoice')] = 'La factura no pasó la verificación. Súbela de nuevo.';
    }
  }
  return errors;
}

function validatePrizePlan(prizes: PrizeFormData[], projection: RifaProjection | null): WizardErrors {
  const errors: WizardErrors = {};
  for (const [index, prize] of prizes.entries()) {
    Object.assign(errors, validatePrize(prize, index));
  }

  const principalValue = prizeValue(prizes[0]);
  for (const [index, prize] of prizes.entries()) {
    if (index > 0 && prizeValue(prize) > principalValue) {
      errors[prizeErrorKey(index, 'commercialValue')] =
        'El premio principal debe ser el de mayor valor.';
    }
  }

  const total = prizes.reduce((sum, prize) => sum + prizeValue(prize), 0);
  if (projection && total > 0 && total < projection.prizeMinimum) {
    errors.prizePlanTotal = `Por norma, el valor total de tus premios (${formatCop(total)}) no puede ser menor a ${formatCop(projection.prizeMinimum)} para esta emisión.`;
  }
  return errors;
}

function toRifaPrize(prize: PrizeFormData): RifaPrize {
  const brand =
    prize.brand === OTHER_BRAND ? prize.brandOther.trim() : prize.brand.trim() || undefined;
  return {
    category: prize.category ?? 'otro',
    vehicleType: prize.vehicleType || undefined,
    brand: brand || undefined,
    model: prize.model.trim() || undefined,
    year: prize.year.trim() || undefined,
    color: prize.color.trim() || undefined,
    city: prize.city.trim() || undefined,
    description: prize.description.trim() || undefined,
    commercialValue: prizeValue(prize),
    swornDeclaration: prize.swornAccepted,
    invoice: prize.invoice?.file,
  };
}

export function useCreateRifaWizard() {
  const { rifas, documentScanner } = useServices();
  const [state, dispatch] = useReducer(reducer, initialState);

  const ticketCount = Number.parseInt(state.emision.ticketCountRaw, 10) || 0;
  const ticketPrice = Number.parseInt(state.emision.ticketPriceRaw, 10) || 0;
  const projection =
    ticketCount >= 2 && ticketPrice >= 100 ? computeRifaProjection(ticketCount, ticketPrice) : null;

  const stepErrors = useMemo(() => {
    switch (state.step) {
      case 0:
        return validateEmision(state.emision);
      case 1:
        return validatePrizePlan(state.prizes, projection);
      case 2:
        return {};
    }
  }, [state.step, state.emision, state.prizes, projection]);

  const visibleErrors: WizardErrors = state.showErrors ? stepErrors : {};

  const goNext = () => {
    if (Object.keys(stepErrors).length > 0) {
      dispatch({ type: 'show_errors' });
      return;
    }
    dispatch({ type: 'go_next' });
  };

  /** Adjunta la factura del premio y dispara su verificación (OCR + reglas). */
  const attachInvoice = (index: number, file: PickedFile) => {
    dispatch({ type: 'attach_invoice', index, file });
    void analyzeDocument(documentScanner, file, { kind: 'factura_compra' }).then((analysis) => {
      dispatch({ type: 'invoice_analyzed', index, uri: file.uri, analysis });
    });
  };

  const submit = async () => {
    const drawDate = parseDrawDate(state.emision.drawDateRaw);
    if (!drawDate) {
      return;
    }
    dispatch({ type: 'submit_started' });
    try {
      const rifa = await rifas.create({
        name: state.emision.name.trim(),
        ticketCount,
        ticketPrice,
        drawDate,
        prizes: state.prizes.map(toRifaPrize),
      });
      dispatch({ type: 'submit_succeeded', rifa });
    } catch (error) {
      dispatch({
        type: 'submit_failed',
        message:
          error instanceof AppError
            ? error.message
            : 'No pudimos crear la rifa. Intenta de nuevo.',
      });
    }
  };

  return {
    state,
    projection,
    visibleErrors,
    goNext,
    goBack: () => dispatch({ type: 'go_back' }),
    setEmision: (field: keyof EmisionData, value: string) =>
      dispatch({ type: 'set_emision', field, value }),
    setPrizeField: (index: number, field: keyof PrizeFormData, value: string) =>
      dispatch({ type: 'set_prize_field', index, field, value }),
    setPrizeCategory: (index: number, category: PrizeCategory) =>
      dispatch({ type: 'set_prize_category', index, category }),
    togglePrizeSworn: (index: number) => dispatch({ type: 'toggle_prize_sworn', index }),
    attachInvoice,
    removeInvoice: (index: number) => dispatch({ type: 'remove_invoice', index }),
    addPrize: () => dispatch({ type: 'add_prize' }),
    removePrize: (index: number) => dispatch({ type: 'remove_prize', index }),
    submit,
  };
}

export type CreateRifaWizard = ReturnType<typeof useCreateRifaWizard>;
