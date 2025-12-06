import { Dimensions, PixelRatio, ViewStyle } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = (size: number): number =>
  (windowWidth / guidelineBaseWidth) * size;

export const scaleFont = (size: number): number => size * PixelRatio.getFontScale();

function dimensions(
  top: number,
  right: number = top,
  bottom: number = top,
  left: number = right,
  property: 'margin' | 'padding',
): Record<string, number> {
  const styles: Record<string, number> = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top: number, right?: number, bottom?: number, left?: number): Record<string, number> {
  return dimensions(top, right ?? top, bottom ?? top, left ?? (right ?? top), 'margin');
}

export function padding(top: number, right?: number, bottom?: number, left?: number): Record<string, number> {
  return dimensions(top, right ?? top, bottom ?? top, left ?? (right ?? top), 'padding');
}

export function boxShadow(
  color: string,
  offset: { height: number; width: number } = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2,
): ViewStyle {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
