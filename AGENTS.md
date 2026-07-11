# Fortu Gestor — Guía del proyecto

App móvil (Expo SDK 57 + expo-router + React Native + TypeScript estricto) para el **gestor de rifas** (rifero) del ecosistema Fortu: onboarding con KYC, y próximamente operación (rifas, vendedores, recaudo). Es hermana de `fortu-app` (el monorepo Nx en `../fortu-app`): comparte marca, convenciones de arquitectura y, a futuro, la API.

> Expo cambió mucho entre SDKs: ante dudas de API, consulta los docs versionados en https://docs.expo.dev/versions/v57.0.0/ antes de escribir código.

## Arquitectura por capas (misma vocabulario que fortu-app)

```
src/
  app/              # SOLO rutas expo-router (archivos delgados que re-exportan pantallas)
  screens/<feature>/    # pantalla por feature (solo render + wiring)
  components/<feature>/ # componentes de esa feature (solo render)
  components/shared/    # componentes reutilizables (kit clay en shared/clay/)
  styles/<vista>/       # TODOS los StyleSheet, uno por componente: <nombre>.styles.ts
  hooks/<vista>/        # lógica de UI por vista (animaciones, estados de flujo, cooldowns)
  application/<feature>/ # casos de uso de negocio (useLoginForm, useRegisterWizard)
  domain/<feature>/      # tipos, puertos (interfaces) y validadores puros — sin I/O ni React
  infrastructure/<feature>/ # implementaciones concretas (Mock*, Expo*, futuros Http*)
  providers/         # composition root (ServicesProvider, SessionProvider)
  theme/             # tokens de diseño (colores, tipografía, sombras clay)
```

**Componentes sin estilos ni lógica embebidos** (regla pedida por el usuario, como fortu-app):
- Los `StyleSheet.create` viven en `src/styles/<vista>/<nombreCamel>.styles.ts` exportando `<nombreCamel>Styles`; el componente los importa `as styles`.
- La lógica de vista (animaciones, temporizadores, flujos de permisos, OTP) vive en `src/hooks/<vista>/useX.ts`. `application/` queda para casos de uso de negocio.

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

## Diseño: "Fortu Clay" (claymorfismo, identidad PROPIA)

**Regla de oro (pedida por el usuario): compartimos la marca de fortu-app (dorado, azules navy, cyan, logos) pero NO replicamos su identidad visual.** Fortu Gestor es clara y claymórfica; fortu-app es oscura y glass. No copiar sus layouts/estilos tal cual.

- Patrón de pantalla: hero navy (gradiente **SVG** propio, `ScreenBackground`: orbes cyan arriba-derecha / dorado abajo-izquierda — disposición inversa a fortu-app a propósito) + sheet claro que sube (`AuthShell`, blobs también en SVG radial).
- Kit clay en `components/shared/clay/`: superficies blancas con labio de profundidad + sombra azulada; CTA dorado que se hunde (`ClayButton`).
- Splash: **solo el wordmark "Fortu"** (nunca isotipo + isologo juntos) con arcos orbitando en **Lottie** (`assets/lottie/splash-halo.json`, autorado a mano — editable).
- Registro: `/register` pregunta el tipo de cuenta (natural/jurídica) con `PersonaTypeCard`; al elegir navega a `/register/natural` o `/register/juridica` (wizard fijado a ese tipo vía `useRegisterWizard(personaType)`).
- Tipografía: Nunito (display) + Plus Jakarta Sans (UI); cada peso es su propia `fontFamily` (así funciona RN).
- Loading: `LoadingDots` en botones; **no** introducir `ActivityIndicator`.
- Feedback inline con `ClayNotice`; selección en sheets con `ClayPickerSheet`.
- `react-native-safe-area-context` se queda: expo-router lo requiere y los insets evitan el notch. No agregar la etiqueta "GESTOR" bajo el wordmark.
- `@lottiefiles/dotlottie-react` existe solo para que el target web bundlee Lottie.
- `experiments.typedRoutes` está **desactivado** a propósito: en esta versión el generador emite rutas incorrectas (`/register/index` en vez de `/register`) y rompe el typecheck sin motivo. No reactivarlo sin verificar que el bug esté resuelto.

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
