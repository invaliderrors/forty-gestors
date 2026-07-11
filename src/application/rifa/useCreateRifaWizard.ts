import { useMemo, useReducer } from 'react';

import { AppError } from '@/domain/auth/errors';
import { computeRifaProjection, type RifaProjection } from '@/domain/rifa/normative';
import type { PrizeCategory, PrizeSpec, Rifa } from '@/domain/rifa/types';
import { isValidVehicleYear, parseDrawDate } from '@/domain/rifa/validators';
import { formatCop } from '@/domain/shared/money';
import { useServices } from '@/providers/ServicesProvider';

export const CREATE_RIFA_STEPS = ['Emisión', 'Premio', 'Revisión'] as const;

export type CreateRifaStep = 0 | 1 | 2;

type EmisionData = {
  name: string;
  ticketCountRaw: string;
  ticketPriceRaw: string;
  /** DD/MM/AAAA tal como se escribe. */
  drawDateRaw: string;
};

type PremioData = {
  category: PrizeCategory | null;
  brand: string;
  model: string;
  year: string;
  color: string;
  city: string;
  description: string;
  commercialValueRaw: string;
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
  premio: PremioData;
  submit: SubmitState;
};

type WizardAction =
  | { type: 'set_emision'; field: keyof EmisionData; value: string }
  | { type: 'set_premio'; field: keyof PremioData; value: string }
  | { type: 'set_category'; category: PrizeCategory }
  | { type: 'show_errors' }
  | { type: 'go_next' }
  | { type: 'go_back' }
  | { type: 'submit_started' }
  | { type: 'submit_failed'; message: string }
  | { type: 'submit_succeeded'; rifa: Rifa };

const initialState: WizardState = {
  step: 0,
  showErrors: false,
  emision: { name: '', ticketCountRaw: '', ticketPriceRaw: '', drawDateRaw: '' },
  premio: {
    category: null,
    brand: '',
    model: '',
    year: '',
    color: '',
    city: '',
    description: '',
    commercialValueRaw: '',
  },
  submit: { status: 'idle' },
};

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'set_emision':
      return { ...state, emision: { ...state.emision, [action.field]: action.value } };
    case 'set_premio':
      return { ...state, premio: { ...state.premio, [action.field]: action.value } };
    case 'set_category':
      return { ...state, premio: { ...state.premio, category: action.category } };
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

function validatePremio(premio: PremioData, projection: RifaProjection | null): WizardErrors {
  const errors: WizardErrors = {};
  if (!premio.category) {
    errors.category = 'Selecciona la categoría del bien.';
    return errors;
  }
  if (premio.category === 'vehiculo') {
    if (premio.brand.trim().length < 2) {
      errors.brand = 'Escribe la marca (ej: Renault).';
    }
    if (premio.model.trim().length < 2) {
      errors.model = 'Escribe el modelo (ej: Logan).';
    }
    if (!isValidVehicleYear(premio.year)) {
      errors.year = 'Escribe un año válido (ej: 2025).';
    }
    if (premio.color.trim().length < 3) {
      errors.color = 'Escribe el color.';
    }
  }
  if (premio.category === 'inmueble') {
    if (premio.city.trim().length < 3) {
      errors.city = 'Escribe la ciudad del inmueble.';
    }
    if (premio.description.trim().length < 10) {
      errors.description = 'Describe el inmueble (tipo, área, ubicación...).';
    }
  }
  if (premio.category === 'otro') {
    if (premio.description.trim().length < 10) {
      errors.description = 'Describe el bien que vas a rifar.';
    }
  }
  const value = Number.parseInt(premio.commercialValueRaw, 10) || 0;
  if (value <= 0) {
    errors.commercialValue = 'Escribe el valor comercial del premio.';
  } else if (projection && value < projection.prizeMinimum) {
    // Cumplimiento legal (PDF): el premio no puede quedar por debajo del
    // tope mínimo respecto a la emisión total.
    errors.commercialValue = `Por norma, el premio no puede valer menos de ${formatCop(projection.prizeMinimum)} para esta emisión.`;
  }
  return errors;
}

export function useCreateRifaWizard() {
  const { rifas } = useServices();
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
        return validatePremio(state.premio, projection);
      case 2:
        return {};
    }
  }, [state.step, state.emision, state.premio, projection]);

  const visibleErrors: WizardErrors = state.showErrors ? stepErrors : {};

  const goNext = () => {
    if (Object.keys(stepErrors).length > 0) {
      dispatch({ type: 'show_errors' });
      return;
    }
    dispatch({ type: 'go_next' });
  };

  const submit = async () => {
    const drawDate = parseDrawDate(state.emision.drawDateRaw);
    const category = state.premio.category;
    if (!drawDate || !category) {
      return;
    }
    dispatch({ type: 'submit_started' });
    const prize: PrizeSpec = {
      category,
      brand: state.premio.brand.trim() || undefined,
      model: state.premio.model.trim() || undefined,
      year: state.premio.year.trim() || undefined,
      color: state.premio.color.trim() || undefined,
      city: state.premio.city.trim() || undefined,
      description: state.premio.description.trim() || undefined,
      commercialValue: Number.parseInt(state.premio.commercialValueRaw, 10) || 0,
    };
    try {
      const rifa = await rifas.create({
        name: state.emision.name.trim(),
        ticketCount,
        ticketPrice,
        drawDate,
        prize,
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
    setPremio: (field: keyof PremioData, value: string) =>
      dispatch({ type: 'set_premio', field, value }),
    setCategory: (category: PrizeCategory) => dispatch({ type: 'set_category', category }),
    submit,
  };
}

export type CreateRifaWizard = ReturnType<typeof useCreateRifaWizard>;
