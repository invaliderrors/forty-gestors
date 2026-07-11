import { useState } from 'react';

/** Estado compartido de campos de texto: foco y visibilidad del secreto. */
export function useTextFieldState() {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecretVisible, setIsSecretVisible] = useState(false);

  return {
    isFocused,
    isSecretVisible,
    handleFocus: () => setIsFocused(true),
    handleBlur: () => setIsFocused(false),
    toggleSecret: () => setIsSecretVisible((current) => !current),
  };
}
