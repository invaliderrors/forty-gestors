import { StyleSheet } from 'react-native';

export const ORB_CYAN_SIZE = 340;
export const ORB_GOLD_SIZE = 320;

export const screenBackgroundStyles = StyleSheet.create({
  orbCyan: {
    position: 'absolute',
    top: -110,
    right: -90,
    width: ORB_CYAN_SIZE,
    height: ORB_CYAN_SIZE,
  },
  orbGold: {
    position: 'absolute',
    bottom: -100,
    left: -80,
    width: ORB_GOLD_SIZE,
    height: ORB_GOLD_SIZE,
  },
});
