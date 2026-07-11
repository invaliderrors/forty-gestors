import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  TextInput,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewProps,
} from 'react-native';

type KeyboardAwareScrollViewProps = ScrollViewProps & {
  /** Espacio (px) que se conserva entre el borde inferior del input enfocado y el teclado. */
  extraScrollHeight?: number;
};

/**
 * ScrollView que sube el TextInput enfocado a la zona visible cuando se abre
 * el teclado. El auto-scroll legado de RN no dispara bajo la New Architecture
 * (Fabric), así que lo manejamos a mano: al mostrarse el teclado medimos el
 * input enfocado contra el borde superior del teclado y scrolleamos el
 * solapamiento. JS puro — sin módulo nativo, sin rebuild. (Mismo patrón
 * probado en fortu-app.)
 */
export const KeyboardAwareScrollView = forwardRef<ScrollView, KeyboardAwareScrollViewProps>(
  ({ extraScrollHeight = 28, onScroll, keyboardShouldPersistTaps, ...rest }, ref) => {
    const innerRef = useRef<ScrollView>(null);
    useImperativeHandle(ref, () => innerRef.current as ScrollView);
    const offsetRef = useRef(0);

    useEffect(() => {
      // iOS reporta el frame antes de animar (más fluido); en Android las
      // coordenadas solo son confiables cuando el teclado ya se mostró.
      const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const subscription = Keyboard.addListener(showEvent, (event) => {
        const keyboardTop = event.endCoordinates.screenY;
        const focused = TextInput.State.currentlyFocusedInput?.();
        if (!focused || !innerRef.current) {
          return;
        }
        focused.measureInWindow((_x, y, _width, height) => {
          const overlap = y + height + extraScrollHeight - keyboardTop;
          if (overlap > 0) {
            innerRef.current?.scrollTo({
              y: offsetRef.current + overlap,
              animated: true,
            });
          }
        });
      });
      return () => subscription.remove();
    }, [extraScrollHeight]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      offsetRef.current = event.nativeEvent.contentOffset.y;
      onScroll?.(event);
    };

    return (
      <ScrollView
        ref={innerRef}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? 'handled'}
        onScroll={handleScroll}
        {...rest}
      />
    );
  },
);
KeyboardAwareScrollView.displayName = 'KeyboardAwareScrollView';
