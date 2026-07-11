# Fortu Gestor — Guía del proyecto

App móvil (Expo SDK 57 + expo-router + React Native + TypeScript estricto) para el **gestor de rifas** (rifero) del ecosistema Fortu: onboarding con KYC, y próximamente operación (rifas, vendedores, recaudo). Es hermana de `fortu-app` (el monorepo Nx en `../fortu-app`): comparte marca, convenciones de arquitectura y, a futuro, la API.

> Expo cambió mucho entre SDKs: ante dudas de API, consulta los docs versionados en https://docs.expo.dev/versions/v57.0.0/ antes de escribir código.

## Arquitectura por capas (misma vocabulario que fortu-app)

```
src/
  app/              # SOLO rutas expo-router (archivos delgados que re-exportan pantallas)
  screens/<feature>/    # pantalla por feature
  components/<feature>/ # componentes de esa feature
  components/shared/    # componentes reutilizables (kit clay en shared/clay/)
  application/<feature>/ # hooks y casos de uso (useLoginForm, useRegisterWizard)
  domain/<feature>/      # tipos, puertos (interfaces) y validadores puros — sin I/O ni React
  infrastructure/<feature>/ # implementaciones concretas (Mock*, Expo*, futuros Http*)
  providers/         # composition root (ServicesProvider)
  theme/             # tokens de diseño (colores, tipografía, sombras clay)
```

Reglas:
- **Imports absolutos siempre**: `@/...` (alias a `src/`) y `@/assets/...`. Nada de `../../..`.
- **Dependencias hacia adentro**: domain no importa nada; application solo domain; las pantallas no tocan infrastructure — reciben los puertos vía `useServices()`.
- **Named exports** en componentes; las rutas de `src/app/` son la única excepción (expo-router exige default export, por eso solo re-exportan).
- **Cero hex en componentes**: todo color/fuente/sombra sale de `@/theme`. Es el punto único de theming para el whitelabel futuro.
- Componentes de más de ~150 líneas se parten.

## Entorno mock (sin backend todavía)

`src/providers/ServicesProvider.tsx` es el composition root: instancia `MockAuthRepository`, `MockRegistrationRepository` y `ExpoMediaPicker` contra los puertos de `domain/`. **Integrar el backend = escribir `Http*` que implementen esos mismos puertos y cambiarlos ahí** — pantallas y hooks no se tocan.

- Los mocks comparten `src/infrastructure/mock/mockDb.ts` (memoria): registrarse deja la cuenta lista para hacer login en la misma sesión.
- Cuenta demo: `gestor@fortu.app` / `Fortu123!`.
- Los errores de dominio usan códigos string estables (`AUTH/INVALID_CREDENTIALS`) siguiendo `libs/shared-errors` de fortu-app; al integrar, deben coincidir con el contrato real.

## Diseño: "Fortu Clay" (claymorfismo)

Colores de marca Fortu (dorado `gold`, azules `navy`, cyan, blanco en vistas para contraste). Patrón de pantalla: hero navy + sheet claro que sube (`AuthShell`). Kit en `components/shared/clay/`: superficies con labio de profundidad inferior + sombra exterior azulada; el CTA dorado se hunde al presionar (`ClayButton`). Tipografía: Nunito (display, redonda como el wordmark) + Plus Jakarta Sans (UI); cada peso es su propia `fontFamily` (así funciona RN).

- Loading: `LoadingDots` en botones; **no** introducir `ActivityIndicator`.
- Feedback inline con `ClayNotice`; selección en sheets con `ClayPickerSheet`.

## Dominio (registro KYC — Decreto 1486 de 2024)

- Persona **natural**: CC/CE + nombre; documentos: cédula frente/reverso (foto) + RUT (PDF/foto).
- Persona **jurídica**: NIT (con DV validado por el algoritmo de la DIAN en `domain/registration/validators.ts`), razón social, representante legal; documentos: RUT de la empresa, certificado de existencia y representación legal (≤30 días), cédula del representante frente/reverso.
- Validadores colombianos puros en `domain/registration/validators.ts` (celular 3XXXXXXXXX, NIT+DV, etc.).

## Comandos

- `npm start` — dev server (Expo Go / dev client)
- `npm run typecheck` — `tsc --noEmit` (debe estar en verde antes de cerrar un cambio)
- `npm run lint` — ESLint (config Expo)
- `npx expo export --platform web` — smoke test de bundle + render estático de rutas

## Cosas a saber

- `demo-template/` es la demo original de create-expo-app, archivada como referencia; está excluida de tsconfig y ESLint. No la importes.
- EAS: el proyecto está vinculado a un projectId prestado con slug `project-test2` en `app.json`. **No renombrar el proyecto en expo.dev ni cambiar el slug** hasta tener cuenta propia (el `name`/`scheme` sí son `fortu-gestor`).
- Alcance actual: splash, login y registro. Sin social auth (Google/Apple) por decisión de producto en esta fase. Próximo: panel del gestor (reemplaza `screens/home/HomePlaceholderScreen`).
