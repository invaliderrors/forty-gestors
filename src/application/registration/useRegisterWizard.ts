import { useMemo, useReducer } from 'react';

import { AppError } from '@/domain/auth/errors';
import type { PickedFile } from '@/domain/media/types';
import type {
  ContactData,
  DocumentKind,
  IdentityData,
  PersonaType,
  RegistrationDocuments,
  RegistrationResult,
} from '@/domain/registration/types';
import { documentSlotsFor } from '@/domain/registration/types';
import {
  isValidColombianMobile,
  isValidEmail,
  isValidFullName,
  isValidNaturalDoc,
  isValidNit,
  isValidPassword,
} from '@/domain/registration/validators';
import { useServices } from '@/providers/ServicesProvider';

export const WIZARD_STEPS = ['Identidad', 'Contacto', 'Documentos', 'Seguridad'] as const;

export type WizardStep = 0 | 1 | 2 | 3;

type SecurityData = {
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'error'; message: string }
  | { status: 'success'; result: RegistrationResult };

type WizardState = {
  step: WizardStep;
  showErrors: boolean;
  identity: IdentityData;
  contact: ContactData;
  documents: RegistrationDocuments;
  security: SecurityData;
  submit: SubmitState;
};

type WizardAction =
  | { type: 'set_identity'; field: keyof IdentityData; value: string }
  | { type: 'set_contact'; field: keyof ContactData; value: string }
  | { type: 'set_document'; kind: DocumentKind; file: PickedFile }
  | { type: 'remove_document'; kind: DocumentKind }
  | { type: 'set_security'; field: 'password' | 'confirmPassword'; value: string }
  | { type: 'toggle_terms' }
  | { type: 'show_errors' }
  | { type: 'go_next' }
  | { type: 'go_back' }
  | { type: 'submit_started' }
  | { type: 'submit_failed'; message: string }
  | { type: 'submit_succeeded'; result: RegistrationResult };

function buildInitialState(personaType: PersonaType): WizardState {
  return {
    step: 0,
    showErrors: false,
    identity: {
      personaType,
      docType: 'CC',
      docNumber: '',
      fullName: '',
      nit: '',
      razonSocial: '',
      repLegalName: '',
      repLegalDocNumber: '',
    },
    contact: {
      address: '',
      department: null,
      city: '',
      phone: '',
      email: '',
    },
    documents: {},
    security: {
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
    submit: { status: 'idle' },
  };
}

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'set_identity':
      return { ...state, identity: { ...state.identity, [action.field]: action.value } };
    case 'set_contact':
      return { ...state, contact: { ...state.contact, [action.field]: action.value } };
    case 'set_document':
      return { ...state, documents: { ...state.documents, [action.kind]: action.file } };
    case 'remove_document': {
      const documents = { ...state.documents };
      delete documents[action.kind];
      return { ...state, documents };
    }
    case 'set_security':
      return { ...state, security: { ...state.security, [action.field]: action.value } };
    case 'toggle_terms':
      return {
        ...state,
        security: { ...state.security, acceptedTerms: !state.security.acceptedTerms },
      };
    case 'show_errors':
      return { ...state, showErrors: true };
    case 'go_next':
      return { ...state, step: Math.min(state.step + 1, 3) as WizardStep, showErrors: false };
    case 'go_back':
      return { ...state, step: Math.max(state.step - 1, 0) as WizardStep, showErrors: false };
    case 'submit_started':
      return { ...state, submit: { status: 'submitting' } };
    case 'submit_failed':
      return { ...state, submit: { status: 'error', message: action.message } };
    case 'submit_succeeded':
      return { ...state, submit: { status: 'success', result: action.result } };
    default:
      return state;
  }
}

export type WizardErrors = Partial<Record<string, string>>;

function validateIdentity(identity: IdentityData): WizardErrors {
  const errors: WizardErrors = {};
  if (identity.personaType === 'natural') {
    if (!isValidNaturalDoc(identity.docType, identity.docNumber)) {
      errors.docNumber =
        identity.docType === 'PA'
          ? 'Escribe un número de pasaporte válido (5 a 20 caracteres).'
          : 'Escribe un número de documento válido (5 a 15 dígitos).';
    }
    if (!isValidFullName(identity.fullName)) {
      errors.fullName = 'Escribe tu nombre completo.';
    }
  } else {
    if (!isValidNit(identity.nit)) {
      errors.nit = 'Escribe un NIT válido, ej: 900123456-7 (verificamos el dígito).';
    }
    if (identity.razonSocial.trim().length < 3) {
      errors.razonSocial = 'Escribe la razón social de la empresa.';
    }
    if (!isValidFullName(identity.repLegalName)) {
      errors.repLegalName = 'Escribe el nombre completo del representante legal.';
    }
    if (!isValidNaturalDoc('CC', identity.repLegalDocNumber)) {
      errors.repLegalDocNumber = 'Escribe la cédula del representante legal.';
    }
  }
  return errors;
}

function validateContact(contact: ContactData): WizardErrors {
  const errors: WizardErrors = {};
  if (contact.address.trim().length < 6) {
    errors.address = 'Escribe la dirección donde operas.';
  }
  if (!contact.department) {
    errors.department = 'Selecciona el departamento.';
  }
  if (contact.city.trim().length === 0) {
    errors.city = 'Selecciona el municipio.';
  }
  if (!isValidColombianMobile(contact.phone)) {
    errors.phone = 'Escribe un celular colombiano válido (10 dígitos, inicia en 3).';
  }
  if (!isValidEmail(contact.email)) {
    errors.email = 'Escribe un correo válido.';
  }
  return errors;
}

function validateDocuments(state: WizardState): WizardErrors {
  const errors: WizardErrors = {};
  for (const slot of documentSlotsFor(state.identity.personaType)) {
    if (slot.required && !state.documents[slot.kind]) {
      errors[slot.kind] = 'Este documento es obligatorio.';
    }
  }
  return errors;
}

function validateSecurity(security: SecurityData): WizardErrors {
  const errors: WizardErrors = {};
  if (!isValidPassword(security.password)) {
    errors.password = 'Mínimo 8 caracteres, con mayúscula, minúscula y número.';
  }
  if (security.confirmPassword !== security.password || security.confirmPassword.length === 0) {
    errors.confirmPassword = 'Las contraseñas no coinciden.';
  }
  if (!security.acceptedTerms) {
    errors.acceptedTerms = 'Debes aceptar los términos para continuar.';
  }
  return errors;
}

function validateStep(state: WizardState): WizardErrors {
  switch (state.step) {
    case 0:
      return validateIdentity(state.identity);
    case 1:
      return validateContact(state.contact);
    case 2:
      return validateDocuments(state);
    case 3:
      return validateSecurity(state.security);
  }
}

/** @param personaType Fijado por la pantalla previa de selección de tipo de cuenta. */
export function useRegisterWizard(personaType: PersonaType) {
  const { registration } = useServices();
  const [state, dispatch] = useReducer(reducer, personaType, buildInitialState);

  const stepErrors = useMemo(() => validateStep(state), [state]);
  const visibleErrors: WizardErrors = state.showErrors ? stepErrors : {};

  const goNext = () => {
    if (Object.keys(stepErrors).length > 0) {
      dispatch({ type: 'show_errors' });
      return;
    }
    dispatch({ type: 'go_next' });
  };

  const submit = async () => {
    if (Object.keys(stepErrors).length > 0) {
      dispatch({ type: 'show_errors' });
      return;
    }
    dispatch({ type: 'submit_started' });
    try {
      const result = await registration.submit({
        identity: state.identity,
        contact: state.contact,
        documents: state.documents,
        password: state.security.password,
      });
      dispatch({ type: 'submit_succeeded', result });
    } catch (error) {
      dispatch({
        type: 'submit_failed',
        message:
          error instanceof AppError
            ? error.message
            : 'No pudimos enviar tu solicitud. Intenta de nuevo.',
      });
    }
  };

  return {
    state,
    visibleErrors,
    isStepValid: Object.keys(stepErrors).length === 0,
    goNext,
    goBack: () => dispatch({ type: 'go_back' }),
    setIdentity: (field: keyof IdentityData, value: string) =>
      dispatch({ type: 'set_identity', field, value }),
    setContact: (field: keyof ContactData, value: string) =>
      dispatch({ type: 'set_contact', field, value }),
    setDocument: (kind: DocumentKind, file: PickedFile) =>
      dispatch({ type: 'set_document', kind, file }),
    removeDocument: (kind: DocumentKind) => dispatch({ type: 'remove_document', kind }),
    setSecurity: (field: 'password' | 'confirmPassword', value: string) =>
      dispatch({ type: 'set_security', field, value }),
    toggleTerms: () => dispatch({ type: 'toggle_terms' }),
    submit,
  };
}

export type RegisterWizard = ReturnType<typeof useRegisterWizard>;
