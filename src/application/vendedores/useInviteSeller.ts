import { useState } from 'react';

import { AppError } from '@/domain/auth/errors';
import {
  isValidColombianMobile,
  isValidEmail,
  isValidFullName,
} from '@/domain/registration/validators';
import type { Seller, SellerPermission } from '@/domain/vendedores/types';
import { useServices } from '@/providers/ServicesProvider';

type InviteErrors = Partial<Record<string, string>>;

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'error'; message: string }
  | { status: 'success'; seller: Seller };

const MAX_COMMISSION_PERCENT = 50;

/** Formulario de invitación de un vendedor: datos, permisos y comisión. */
export function useInviteSeller() {
  const { sellers } = useServices();
  const [fullName, setFullName] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState<SellerPermission[]>(['vender']);
  const [commissionRaw, setCommissionRaw] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' });

  const commissionPercent = Number.parseInt(commissionRaw, 10) || 0;

  const errors: InviteErrors = {};
  if (!isValidFullName(fullName)) {
    errors.fullName = 'Escribe el nombre completo del vendedor.';
  }
  if (!/^\d{5,15}$/.test(docNumber.trim())) {
    errors.docNumber = 'Escribe la cédula del vendedor.';
  }
  if (!isValidColombianMobile(phone)) {
    errors.phone = 'Escribe un celular colombiano válido (10 dígitos, inicia en 3).';
  }
  if (!isValidEmail(email)) {
    errors.email = 'Escribe un correo válido.';
  }
  if (permissions.length === 0) {
    errors.permissions = 'Asigna al menos un permiso.';
  }
  if (commissionRaw.length > 0 && commissionPercent > MAX_COMMISSION_PERCENT) {
    errors.commission = `La comisión no puede superar el ${MAX_COMMISSION_PERCENT}%.`;
  }

  const visibleErrors: InviteErrors = showErrors ? errors : {};

  const togglePermission = (permission: SellerPermission) => {
    setPermissions((current) =>
      current.includes(permission)
        ? current.filter((entry) => entry !== permission)
        : [...current, permission],
    );
  };

  const send = async () => {
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      return;
    }
    setSubmit({ status: 'submitting' });
    try {
      const seller = await sellers.invite({
        fullName: fullName.trim(),
        docNumber: docNumber.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        permissions,
        commissionPercent,
      });
      setSubmit({ status: 'success', seller });
    } catch (error) {
      setSubmit({
        status: 'error',
        message:
          error instanceof AppError
            ? error.message
            : 'No pudimos enviar la invitación. Intenta de nuevo.',
      });
    }
  };

  return {
    fullName,
    setFullName,
    docNumber,
    setDocNumber: (value: string) => setDocNumber(value.replace(/\D/g, '').slice(0, 15)),
    phone,
    setPhone: (value: string) => setPhone(value.replace(/\D/g, '').slice(0, 10)),
    email,
    setEmail,
    permissions,
    togglePermission,
    commissionRaw,
    setCommission: (value: string) => setCommissionRaw(value.replace(/\D/g, '').slice(0, 2)),
    visibleErrors,
    submit,
    send,
  };
}
