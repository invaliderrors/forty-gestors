import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  TextInput,
  View,
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
 * el teclado.
 *
 * Dos piezas, ambas necesarias:
 * 1. Un espaciador del alto del teclado al final del contenido. Con
 *    edge-to-edge (default de Expo en Android) el teclado se SUPERPONE a la
 *    app en vez de encogerla, así que sin este espaciador una pantalla corta
 *    no tiene rango de scroll y no habría a dónde subir el input.
 * 2. Al mostrarse el teclado medimos el input enfocado contra el borde del
 *    teclado y scrolleamos el solapamiento (el auto-scroll de RN no dispara
 *    bajo Fabric).
 *
 * JS puro — sin módulo nativo, sin rebuild.
 */
export const KeyboardAwareScrollView = forwardRef<ScrollView, KeyboardAwareScrollViewProps>(
  ({ extraScrollHeight = 28, onScroll, keyboardShouldPersistTaps, children, ...rest }, ref) => {
    const innerRef = useRef<ScrollView>(null);
    useImperativeHandle(ref, () => innerRef.current as ScrollView);
    const offsetRef = useRef(0);
    const [keyboardPad, setKeyboardPad] = useState(0);

    useEffect(() => {
      // iOS reporta el frame antes de animar (más fluido); en Android las
      // coordenadas solo son confiables cuando el teclado ya se mostró.
      const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

      const showSubscription = Keyboard.addListener(showEvent, (event) => {
        const keyboardTop = event.endCoordinates.screenY;
        setKeyboardPad(event.endCoordinates.height);

        const focused = TextInput.State.currentlyFocusedInput?.();
        if (!focused || !innerRef.current) {
          return;
        }
        // El scroll se difiere un frame largo: el espaciador recién seteado
        // tiene que pasar por layout para que exista el rango de scroll.
        setTimeout(() => {
          focused.measureInWindow((_x, y, _width, height) => {
            const overlap = y + height + extraScrollHeight - keyboardTop;
            if (overlap > 0) {
              innerRef.current?.scrollTo({
                y: offsetRef.current + overlap,
                animated: true,
              });
            }
          });
        }, 80);
      });

      const hideSubscription = Keyboard.addListener(hideEvent, () => {
        setKeyboardPad(0);
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
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
      >
        {children}
        {keyboardPad > 0 ? <View style={{ height: keyboardPad }} /> : null}
      </ScrollView>
    );
  },
);
KeyboardAwareScrollView.displayName = 'KeyboardAwareScrollView';
